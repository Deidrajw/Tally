# Tally — Project State

_Last recorded: 2026-10-23. This document describes the repository state at project-documentation initialization; do not mistake it for production validation._

## Status
- Repository: `Deidrajw/Tally`, branch `main`
- App UI: single-file `index.html`
- Browser data: `localStorage` key `tally.v1`
- Current backend in GitHub: `netlify/functions/smart-food.js` (Gemini, free-tier interpretation without Google Search grounding)
- Current known host: Netlify; last inspected site reported a ready deploy, but no end-to-end feature validation for this documentation change
- Production target: Cloudflare Pages, **NOT deployed or verified yet**
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
Configure GitHub-connected Cloudflare Pages (`main`, build `exit 0`, output `.`), add encrypted `GEMINI_API_KEY` secret, verify `/api/smart-food` and food logging with fake data. Export Netlify user data and verify import before cutover.

## Cloudflare migration Phase 1 code
- `functions/api/smart-food.js`: Cloudflare Pages POST handler, Gemini free-tier estimation, explicit estimates/no sources.
- `index.html`: cloudflare `/api/smart-food` URL with `.netlify.app` compatibility branch.
- Netlify backend remains as safety fallback.
- Tests: source inspection completed; runtime HTTP/Gemini/Cloudflare/iPhone all **Not Tested**.
- No data schema changes. No Cloudflare deployment verified.
