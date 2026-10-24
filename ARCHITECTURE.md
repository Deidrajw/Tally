# Architecture

## Current implementation
- Client: iPhone-first application primarily contained in root `index.html`.
- Persistence: browser `localStorage`, key `tally.v1`; preserves user diary and other app data. No assumption of cloud synchronization.
- Nutrition: embedded Canadian Nutrient File data and external Open Food Facts lookup, plus other food-management flows visible in the source.
- AI: browser Smart Food Search invokes `POST /.netlify/functions/smart-food`; Netlify function reads secret `GEMINI_API_KEY` and calls Gemini's `generateContent`. Google Search grounding was removed to avoid paid access.
- Existing host: Netlify. **Target host: Cloudflare; unimplemented and unverified.**

## Target topology
GitHub `main` → Cloudflare Pages production deployment (plus preview branches) → Cloudflare server function/Worker → Gemini free-tier endpoint. API key must be a server-side secret, never bundled into HTML. Food databases/manual logging must not depend on Gemini uptime.

## Migration constraints
1. Rewrite Netlify `exports.handler` to Cloudflare-compatible server entrypoint.
2. Move/route the browser request to the new Cloudflare endpoint, taking care not to break current Netlify fallback during the transition.
3. Implement safe error handling for missing credentials, unsupported model, quotas and timeouts without disclosing secrets.
4. Audit `tally.v1` compatibility; no hidden data resets or demo writes.
5. Export on old origin, verify import and persistence on new origin, then retire Netlify only after approval and QA.

## Costs and security
$0 mandatory services; respect limits on Cloudflare and Gemini free tiers. Never commit credentials or production exports. Disable fee-incurring grounding. Treat Gemini nutrition as an estimate, not a verified source.
