# Testing and Regression Guide

Statuses: **Passed**, **Failed**, **Not Tested**. Documentation presence is not proof of product QA.

## Mandatory checks
| Test | Initial status | Notes |
|---|---|---|
| Diary add/edit/delete | Not Tested | Use DEMO/synthetic data |
| Selective copy across dates/meals | Not Tested | Confirm selections/undo |
| Search CNF and Open Food Facts | Not Tested | Confirm source labels |
| Barcode scan/photo | Not Tested | Requires supported device |
| Multi-food add and quantity edits | Not Tested | No duplicates |
| Calories/macros and daily/weekly budgets | Not Tested | Check calculations |
| Saved foods, meals and recipes | Not Tested | CRUD/persistence |
| Calendar navigation | Not Tested | Date boundaries |
| Weight records | Not Tested | Edit/backdating |
| Import/export round trip | Not Tested | Test isolated data first |
| Gemini success / quota / errors | Not Tested | Free tier only |
| Mobile Safari / keyboard / touch | Not Tested | Physical device |
| DEMO/LIVE isolation | Not Tested | No production writes |
| Cloudflare function route | Not Tested | Pending migration |
| GitHub-to-Cloudflare deployment | Not Tested | Pending setup |
| Netlify-origin export → Cloudflare import | Not Tested | Required before cutover |

## Release reporting
For every version document environment, tested commit, device/browser, Passed/Failed/Not Tested, outstanding blockers and actual deployed commit. Never mark Passed based on visual inspection alone.

## Cloudflare Phase 1 (2026-10-23)
- Source inspection of Cloudflare handler and origin-aware route: **Passed** (static review only).
- GitHub commits and file availability: **Passed**.
- Cloudflare compilation/deploy: **Not Tested**.
- Live Gemini request, quota, and error path: **Not Tested**.
- Food diary, mobile Safari, import/export, DEMO isolation: **Not Tested** (no live regression environment).
- Netlify-to-Cloudflare browser storage migration: **Not Tested**.

## Pages candidate URL (2026-10-23)
- Reported URL: `https://tally-4fg.pages.dev/`.
- Automated network fetch of `/`: **Not Tested** (network could not reach origin).
- Automated network fetch of `/api/smart-food`: **Not Tested** (network could not reach origin).
- User-side page load, Cloudflare deployment SHA, secret configuration, POST function, Gemini, and browser data transfer: **Not Tested**.
