# Architecture

## Current implementation
- Client: iPhone-first application primarily contained in root `index.html`.
- Persistence: browser `localStorage`, key `tally.v1`; preserves user diary and other app data. No assumption of cloud synchronization.
- Nutrition: embedded Canadian Nutrient File data and external Open Food Facts lookup, plus other food-management flows visible in the source.
- AI: browser Smart Food Search invokes `POST /.netlify/functions/smart-food`; Netlify function reads secret `GEMINI_API_KEY` and calls Gemini's `generateContent`. Google Search grounding was removed to avoid paid access.
- Existing host: Netlify. **Target host: Cloudflare; function code committed, deployment unverified.**

## Target topology
GitHub `main` → Cloudflare Pages production deployment (plus preview branches) → Cloudflare server function/Worker → Gemini free-tier endpoint. API key must be a server-side secret, never bundled into HTML. Food databases/manual logging must not depend on Gemini uptime.

## Migration constraints
1. Cloudflare Pages handler now exists at `functions/api/smart-food.js` as `onRequestPost({request,env})`; deployment not yet tested.
2. Frontend selects `/.netlify/functions/smart-food` on `.netlify.app` domains and `/api/smart-food` otherwise. Cloudflare response/schema must still be tested.
3. Implement safe error handling for missing credentials, unsupported model, quotas and timeouts without disclosing secrets.
4. Audit `tally.v1` compatibility; no hidden data resets or demo writes.
5. Export on old origin, verify import and persistence on new origin, then retire Netlify only after approval and QA.

## Costs and security
$0 mandatory services; respect limits on Cloudflare and Gemini free tiers. Never commit credentials or production exports. Disable fee-incurring grounding. Treat Gemini nutrition as an estimate, not a verified source.

## Cloudflare Pages setup
- GitHub-linked Pages project, branch `main`, root directory repository root, build command `exit 0`, build output directory `.` (root where `index.html` lives).
- The root `functions/api/smart-food.js` generates POST `/api/smart-food`.
- Add encrypted Pages secret `GEMINI_API_KEY` in Settings → Variables and Secrets; optional `GEMINI_MODEL` for a model available to the free-tier project.
- No Google Search grounding. Secrets must never enter GitHub/client files. Check preview and production secrets separately.
- The old Netlify function remains intentionally in the repository during migration.
