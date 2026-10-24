// Cloudflare Pages Function: POST /api/smart-food
// Gemini free tier only; estimates, never claimed verified nutrition.
export async function onRequestPost({ request, env }) {
  const reply = (status, body) => new Response(JSON.stringify(body), {status, headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
  const key = env.GEMINI_API_KEY;
  if (!key) return reply(503,{error:'Smart Search needs a Gemini API key configured as a Cloudflare Pages secret (GEMINI_API_KEY).'});
  let payload;
  try { payload=await request.json(); } catch { return reply(400,{error:'Invalid JSON.'}); }
  const description=String(payload?.description||'').trim();
  if (!description || description.length > 600) return reply(400,{error:'Describe your food in 1–600 characters.'});
  const model = String(env.GEMINI_MODEL || 'gemini-3.1-flash-lite');
  if (!/^[a-zA-Z0-9._-]+$/.test(model)) return reply(500,{error:'Invalid Gemini model configuration.'});
  const prompt='You are helping a Canadian user log food. Interpret the food description using general food knowledge. You do not have web search access; never claim current online verification. Prefer plausible Canadian serving sizes. Interpret cultural foods and spelling variants intelligently. Break combinations into separately editable foods (e.g., beef patty and coco bread). Do not invent source URLs. If exact product nutrition is unavailable, estimate conservatively for plausible portion sizes and explicitly treat ALL calculated numbers as approximations. Return ONLY a JSON object (no markdown) with {"items":[{"name":"","grams":100,"kcal":0,"protein":0,"carbs":0,"fat":0}],"explanation":""}. Maximum 10 items. All nutrition numbers refer to the displayed grams/portion and must be nonnegative finite numbers. Do not claim precision or verified figures. User food: '+description;
  try {
    const response=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent', {method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':key},body:JSON.stringify({contents:[{role:'user',parts:[{text:prompt}]}],generationConfig:{temperature:0.15}}),signal:AbortSignal.timeout(24000)});
    if(!response.ok) {
      let detail={}; try { detail=await response.json(); } catch {}
      const googleCode=String(detail?.error?.status||'').slice(0,64);
      const reason=response.status===400 ? 'Gemini rejected the request format.' :
        response.status===401 || response.status===403 ? 'Gemini rejected access. Check that this API key is enabled for the Gemini API and any API restrictions.' :
        response.status===404 ? 'The configured Gemini model could not be found for this API key.' :
        response.status===429 ? 'Gemini free-tier limit reached. Try again after quota resets.' :
        response.status>=500 ? 'Gemini is temporarily unavailable.' : 'Gemini rejected the request.';
      console.error('Gemini upstream error', {status:response.status, code:googleCode});
      return reply(502,{error:reason, upstreamStatus:response.status, upstreamCode:googleCode, model});
    }
    const j=await response.json(); const c=j.candidates?.[0]||{};
    const raw=(c.content?.parts||[]).map(p=>p.text||'').join('').trim();
    const matched=raw.match(/\{[\s\S]*\}/); if(!matched) return reply(502,{error:'AI returned no structured food data.'});
    let obj; try {obj=JSON.parse(matched[0]);} catch {return reply(502,{error:'AI returned invalid food data.'});}
    const items=(Array.isArray(obj.items)?obj.items:[]).slice(0,10).map(v=>({name:String(v.name||'Food').slice(0,120),grams:Number(v.grams),kcal:Number(v.kcal),protein:Number(v.protein),carbs:Number(v.carbs),fat:Number(v.fat)})).filter(x=>x.grams>0&&x.grams<=2000&&['grams','kcal','protein','carbs','fat'].every(k=>Number.isFinite(x[k])&&x[k]>=0));
    const sources=[]; // No grounding: do not invent sources.
    if (!items.length) return reply(502,{error:'AI found no usable foods. Try a more specific description.'});
    return reply(200,{items,sources,explanation:String(obj.explanation||'').slice(0,300),estimated:true, grounded:false});
  }catch(e){return reply(502,{error:'Smart Search could not complete. Please try again.'});}
};
