# Tally — Project State

_Last recorded: 2026-10-23. This document describes the repository state at project-documentation initialization; do not mistake it for production validation._

## Status
- Repository: `Deidrajw/Tally`, branch `main`
- App UI: single-file `index.html`
- Browser data: `localStorage` key `tally.v1`
- Current backend in GitHub: `netlify/functions/smart-food.js` (Gemini, free-tier interpretation without Google Search grounding)
- Current known host: Netlify; last inspected site reported a ready deploy, but no end-to-end feature validation for this documentation change
- Cloudflare candidate URL: `https://tally-4fg.pages.dev/` (user-provided, not independently verified). **Production cutover NOT verified.**
- Release identifier: v1.3 Smart Food Search was the last named development milestone; exact currently deployed production version **unverified**

## Existing feature baseline
Diary, meal categories, calories/macros, daily/weekly views, calendar, Canadian Nutrient File, Open Food Facts, barcode, Gemini estimates, multi-food logging, saved foods/meals/recipes, selective copying, weight, import/export. Preserve all existing workflows; audit before modifying.

## Immediate priority
1. Establish repository documentation (this initialization).
2. Cloudflare Pages function + origin-aware frontend routing committed (runtime still Not Tested).
3. Set up Cloudflare Git continuous deployment and server-only `GEMINI_API_KEY`.
4. Add separate DEMO/preview testing with synthetic records.
5. Export production diary data from old origin, test import/restore on new Cloudflare origin, then perform release gate testing.
6. Only after verification, document new production URL, commit, and release.

## Critical safeguards
No paid services. No real diary records or secrets in GitHub. Do not change the `tally.v1` schema silently. Netlify shutdown is blocked until successful Cloudflare data import and app checks.

## Latest known work
- Smart Food Search frontend and Netlify function were committed on `main`.
- Google Search grounding was removed in favor of free-tier Gemini estimates.
- This documentation initialization is not a Cloudflare release.

## Next action
Cloudflare Pages URL supplied: https://tally-4fg.pages.dev/. Confirm deployment commit and functions, add encrypted `GEMINI_API_KEY`, test `/api/smart-food`, verify app with fictional data, then export Netlify data and import into Cloudflare before cutover. Export Netlify user data and verify import before cutover.

## Cloudflare migration Phase 1 code
- `functions/api/smart-food.js`: Cloudflare Pages POST handler, Gemini free-tier estimation, explicit estimates/no sources.
- `index.html`: cloudflare `/api/smart-food` URL with `.netlify.app` compatibility branch.
- Netlify backend remains as safety fallback.
- Tests: source inspection completed; runtime HTTP/Gemini/Cloudflare/iPhone all **Not Tested**.
- No data schema changes. No Cloudflare deployment verified.

## Home Screen icon update (2026-10-23)
- Added root `apple-touch-icon.png` (180×180 simplified leaf artwork) and linked it from `index.html`.
- GitHub changes committed; Cloudflare and iPhone Home Screen display not yet independently verified.
- Storage schema and food data untouched. Next verify the live icon URL, then refresh the installed shortcut on iPhone if the old icon is cached.

## Exact Apple icon correction
- Replaced `apple-touch-icon.png` on `main` with the exact uploaded 180×180 PNG; verified GitHub blob SHA `c9b2adc74705f4cd071edfde5bff82beae5d3880` and size 29,397 bytes.
- `index.html` already references this asset. Cloudflare live serving and physical iPhone refresh not yet verified.
