# Roadmap

## P0 — Cloudflare migration and data safety
- [ ] Choose and document Cloudflare Pages/Workers deployment mode.
- [ ] Port Netlify food-estimate function and adapt frontend URL.
- [ ] Secure Gemini API key as a Cloudflare secret; free tier only.
- [ ] Connect GitHub `main` to Cloudflare automated production deployment.
- [ ] Establish preview deployment and synthetic DEMO data isolation.
- [ ] Export production data from Netlify origin and successfully import on new domain.
- [ ] Pass regression gates and verify live Cloudflare release.

## P1 — Reliability
- [ ] Improve free-tier quota/error handling; manual and database logging remain usable.
- [ ] Add repeatable smoke tests for data persistence and import/export.
- [ ] Audit mobile loading, search errors, and user-facing estimation labels.

## P2 — Quality and polish
- [ ] Review nutrition source matching for Canadian and culturally diverse foods.
- [ ] Review accessibility and interaction consistency.
- [ ] Add automated CI checks when architecture permits.

Priorities may change after inspection and QA. Document decisions before material changes.
