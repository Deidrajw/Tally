# Release Checklist

Complete this for each meaningful release. Do not interpret unchecked items as completed.

- [ ] Read latest `PROJECT_STATE.md` and `docs/HANDOFF.md`
- [ ] Confirm scope, acceptance criteria, dependency and storage risks
- [ ] Inspect and preserve current functionality
- [ ] Build/update isolated fictional-data preview
- [ ] Supply standalone DEMO HTML
- [ ] Supply versioned deployable ZIP with root `index.html` and correct Cloudflare files
- [ ] Run and record regression results in `TESTING.md`
- [ ] Check Gemini free tier, secrets, and graceful error behavior
- [ ] Verify browser storage compatibility and DEMO/LIVE isolation
- [ ] Update `CHANGELOG.md`, `ROADMAP.md`, and affected docs
- [ ] Review/merge approved code to GitHub `main`
- [ ] Verify actual Cloudflare deployed commit, URL, and critical routes
- [ ] Verify data export/import before retiring Netlify
- [ ] Record final state, exact commit, blockers, and next action
