# Known Issues & Limitations

| ID | Status | Issue / risk | Planned action |
|---|---|---|---|
| TALLY-001 | Implemented / Not Tested | Cloudflare Pages food-estimate handler and frontend route committed; runtime success unverified. | Deploy to Pages and run end-to-end checks. |
| TALLY-002 | Open | Browser `localStorage` is scoped to the old domain; Cloudflare cannot see previous logs automatically. | Backup, import and verify before cutover. |
| TALLY-003 | Open | Gemini free tier may return model/quota errors; API success is not guaranteed. | Graceful fallback to database/manual logging. |
| TALLY-004 | Not tested | End-to-end Cloudflare deployment and iPhone regressions have not been verified. | Run documented release checklist. |
| TALLY-005 | Open design concern | Smart Search estimates are not verified nutrition values or live-web research. | Keep explicit AI-estimate labels. |

Previously reported selective copying was stated to work; do not label it broken without reproduction.
