# Architecture & Product Decisions

## ADR-001 — GitHub is source of truth
**Decision:** Keep `Deidrajw/Tally` `main` as canonical source; maintain living docs and handoff.
**Reason:** Reproducibility and cross-chat continuity.

## ADR-002 — Cloudflare is hosting target
**Decision:** Migrate from Netlify to Cloudflare with GitHub-connected deployment, after backend conversion and verification.
**Reason:** User preference for durable, zero-mandatory-cost hosting.
**Status:** Planned; not yet deployed.

## ADR-003 — Gemini free tier only
**Decision:** Server-side key and ordinary Gemini estimation without paid Google Search grounding.
**Reason:** Mandatory AI/API costs must be $0.
**Consequence:** Free-tier quota can block AI; database/manual logging must remain accessible.

## ADR-004 — Preserve local data and provide explicit migration
**Decision:** Keep `tally.v1` compatibility and export/import records across hosting origins.
**Reason:** Browser storage is origin-specific; data is not copied by publishing the same HTML at another domain.

## ADR-005 — Separate LIVE and DEMO
**Decision:** Real records never enter synthetic testing, and DEMO content may not overwrite production.
**Reason:** Data integrity and reliable release testing.
