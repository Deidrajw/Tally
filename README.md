# Tally Food Tracker

Tally is an iPhone-first nutrition and food diary application. Its source of truth is this GitHub repository, branch `main`.

## Current deployment
The existing hosted implementation has used Netlify. **Cloudflare is the target, not yet verified as production.** Do not retire the old site until data has been exported and restored successfully on the new domain.

## Functionality baseline
Food diary and meal categories; calorie/macronutrient totals; calendar and daily/weekly budget views; Canadian Nutrient File and Open Food Facts; barcode workflows; Gemini-powered food interpretation; multi-food logging; saved foods/meals/recipes; selective copying; weight tracking; import/export. Inspect current code to confirm precise behavior.

## Key files
- `index.html`: current client application
- `netlify/functions/smart-food.js`: current Netlify-only Gemini endpoint, **not Cloudflare-compatible**
- `PROJECT_STATE.md`: state and immediate next work
- `docs/HANDOFF.md`: continuation across chats
- `ARCHITECTURE.md`, `DECISIONS.md`, `ROADMAP.md`, `KNOWN_ISSUES.md`, `TESTING.md`, `RELEASE_CHECKLIST.md`, `CHANGELOG.md`: engineering records

## Security and data
Never commit API keys or actual exports. Tally stores records locally under `tally.v1`; changing domains does **not** copy that browser storage. Make an export before changing hosts, then verify restoration on Cloudflare. Gemini must remain within the free tier and AI values must be labelled as estimates.

## Deployment
Target: GitHub-connected Cloudflare Pages (or another agreed Cloudflare configuration), with an explicitly migrated Functions endpoint and secret `GEMINI_API_KEY`. Deployment is not complete until the URL, server calls, and user-data migration have been verified.
