// Tally Smart Food Search — server-side Gemini grounded food discovery.
// Set GEMINI_API_KEY securely in Netlify environment variables (Functions scope).
exports.handler = async (event) => {
  const reply = (statusCode, body) => ({statusCode,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'},body:JSON.stringify(body)});
  if (event.httpMethod !== 'POST') return reply(405,{error:'POST required.'});
  const key = process.env.GEMINI_API_KEY;
  if (!key) return reply(503,{error:'Smart Search needs a Gemini API key configured in Netlify environment variables (GEMINI_API_KEY).'});
  let payload;
  try { payload=JSON.parse(event.body || '{}'); } catch { return reply(400,{error:'Invalid JSON.'}); }
  const description=String(payload.description||'').trim();
  if (!description || description.length > 600) return reply(400,{error:'Describe your food in 1–600 characters.'});
  const prompt='You are helping a Canadian user log food. Research the description using Google Search grounding. Prefer actual restaurant/brand nutrition pages or nationally published nutrition datasets. Interpret cultural foods and spelling variants intelligently. Break combinations into separately editable foods (e.g., beef patty and coco bread). Do not invent source URLs. If exact product nutrition is unavailable, estimate conservatively for plausible portion sizes and explicitly treat ALL calculated numbers as approximations. Return ONLY a JSON object (no markdown) with {"items":[{"name":"","grams":100,"kcal":0,"protein":0,"carbs":0,"fat":0}],"explanation":""}. Maximum 10 items. All nutrition numbers refer to the displayed grams/portion and must be nonnegative finite numbers. Do not claim precision or verified figures. User food: '+description;
  try {
    const response=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key='+encodeURIComponent(key), {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{role:'user',parts:[{text:prompt}]}],tools:[{google_search:{}}],generationConfig:{temperature:0.15}}),signal:AbortSignal.timeout(24000)});
    if(!response.ok) {
      let detail={}; try { detail=await response.json(); } catch {}
      const googleCode=String(detail?.error?.status||'').slice(0,64);
      const reason=response.status===400 ? 'Gemini rejected the request format or grounding configuration.' :
        response.status===401 || response.status===403 ? 'Gemini rejected access. Check that this API key is enabled for the Gemini API and any API restrictions.' :
        response.status===404 ? 'The configured Gemini model could not be found for this API key.' :
        response.status===429 ? 'Gemini rate limit or quota reached. Check usage and billing in Google AI Studio.' :
        response.status>=500 ? 'Gemini is temporarily unavailable.' : 'Gemini rejected the request.';
      console.error('Gemini upstream error', {status:response.status, code:googleCode});
      return reply(502,{error:reason, upstreamStatus:response.status, upstreamCode:googleCode, model:'gemini-3.1-flash-lite'});
    }
    const j=await response.json(); const c=j.candidates?.[0]||{};
    const raw=(c.content?.parts||[]).map(p=>p.text||'').join('').trim();
    const matched=raw.match(/\{[\s\S]*\}/); if(!matched) return reply(502,{error:'AI returned no structured food data.'});
    const obj=JSON.parse(matched[0]);
    const items=(Array.isArray(obj.items)?obj.items:[]).slice(0,10).map(v=>({name:String(v.name||'Food').slice(0,120),grams:Number(v.grams),kcal:Number(v.kcal),protein:Number(v.protein),carbs:Number(v.carbs),fat:Number(v.fat)})).filter(x=>x.grams>0&&x.grams<=2000&&['grams','kcal','protein','carbs','fat'].every(k=>Number.isFinite(x[k])&&x[k]>=0));
    const sources=(c.groundingMetadata?.groundingChunks||[]).map(k=>k.web).filter(Boolean).filter(s=>{try{return new URL(s.uri).protocol==='https:'}catch{return false}}).slice(0,6).map(s=>({title:String(s.title||'Web source').slice(0,150),url:s.uri}));
    return reply(200,{items,sources,explanation:String(obj.explanation||'').slice(0,300),estimated:true});
  }catch(e){return reply(502,{error:'Smart Search could not complete. Please try again.'});}
};
