# PROJECT SAINT — ENTITY REGISTRY

Quick reference for all entity UUIDs, types, and status.

---

| # | Entity | UUID | Type | Phase | Seq | Status |
|---|--------|------|------|-------|-----|--------|
| 1 | Master Index | saint-master-2026-001 | application_manifest | - | - | ACTIVE |
| 2 | Kernel | saint-kernel-2026-001 | kernel_definition | 1 | 1 | ACTIVE |
| 3 | Boundaries | saint-boundaries-2026-001 | boundary_definition | 1 | 2 | ACTIVE |
| 4 | Shell | saint-shell-2026-001 | ui_component | 1 | 3 | ACTIVE |
| 5 | Auth | saint-auth-2026-001 | auth_component | 1 | 4 | ACTIVE |
| 6 | Shop Drawings | saint-shop-drawings-2026-001 | tool_entity | 2 | 1 | ACTIVE |
| 7 | Opp Scraper | saint-opp-scraper-2026-001 | tool_entity | 2 | 2 | ACTIVE |
| 8 | Product Config | saint-product-config-2026-001 | tool_entity | 2 | 3 | ACTIVE |
| 9 | Contractor Dash | saint-contractor-dash-2026-001 | tool_entity | 3 | 1 | ACTIVE |
| 10 | Warranty | saint-warranty-2026-001 | tool_entity | 3 | 2 | ACTIVE |
| 11 | Submittals | saint-submittals-2026-001 | tool_entity | 3 | 3 | ACTIVE |
| 12 | Pipeline | saint-pipeline-2026-001 | tool_entity | 4 | 1 | ACTIVE |
| 13 | Territories | saint-territories-2026-001 | tool_entity | 4 | 2 | ACTIVE |
| 14 | Reporting | saint-reporting-2026-001 | tool_entity | 4 | 3 | ACTIVE |
| 15 | White Label | saint-white-label-2026-001 | tool_entity | 5 | 1 | ACTIVE |
| 16 | SSO | saint-sso-2026-001 | tool_entity | 5 | 2 | ACTIVE |
| 17 | API | saint-api-2026-001 | tool_entity | 5 | 3 | ACTIVE |
| 18 | Admin | saint-admin-2026-001 | tool_entity | 6 | 1 | ACTIVE |
| 19 | Billing | saint-billing-2026-001 | tool_entity | 6 | 2 | ACTIVE |
| 20 | Integrations | saint-integrations-2026-001 | tool_entity | 6 | 3 | ACTIVE |

---

## Phase Summaries

| Phase | UUID | Status |
|-------|------|--------|
| 1 | saint-phase1-complete-2026-001 | COMPLETE |
| 2 | saint-phase2-complete-2026-001 | COMPLETE |
| 3 | saint-phase3-complete-2026-001 | COMPLETE |
| 4 | saint-phase4-complete-2026-001 | COMPLETE |
| 5 | saint-phase5-complete-2026-001 | COMPLETE |
| 6 | saint-phase6-complete-2026-001 | COMPLETE |

---

## Dependency Graph (Entity → Entity)

```
SAINT_KERNEL ──────────────────────────── ALL ENTITIES
SAINT_BOUNDARIES ──────────────────────── ALL ENTITIES
SAINT_AUTH ─────────────────────────────── ALL ENTITIES
SAINT_SHELL ────────────────────────────── ALL ENTITIES (entity loader)

SAINT_SHOP_DRAWINGS ───→ SAINT_PRODUCT_CONFIG (product catalog)
SAINT_OPP_SCRAPER ─────→ SAINT_TERRITORIES (territory filtering)
SAINT_PRODUCT_CONFIG ──→ SAINT_SHOP_DRAWINGS (config → drawing pipeline)

SAINT_CONTRACTOR_DASH ─→ SAINT_SHOP_DRAWINGS (drawing delivery)
SAINT_CONTRACTOR_DASH ─→ SAINT_WARRANTY (warranty summary)
SAINT_CONTRACTOR_DASH ─→ SAINT_SUBMITTALS (submittal tracking)

SAINT_WARRANTY ────────→ SAINT_PRODUCT_CONFIG (warranty terms)
SAINT_WARRANTY ────────→ SAINT_SHOP_DRAWINGS (assembly references)

SAINT_SUBMITTALS ──────→ SAINT_PRODUCT_CONFIG (data sheets, test reports)
SAINT_SUBMITTALS ──────→ SAINT_SHOP_DRAWINGS (approved drawings)
SAINT_SUBMITTALS ──────→ SAINT_WARRANTY (warranty letters)

SAINT_PIPELINE ────────→ SAINT_OPP_SCRAPER (opportunity conversion)
SAINT_PIPELINE ────────→ SAINT_TERRITORIES (territory filtering)
SAINT_PIPELINE ────────→ SAINT_CONTRACTOR_DASH (post-close project)
SAINT_PIPELINE ────────→ SAINT_SUBMITTALS (post-close submittal)

SAINT_TERRITORIES ─────→ SAINT_OPP_SCRAPER (opportunity density)
SAINT_TERRITORIES ─────→ SAINT_PIPELINE (pipeline by territory)

SAINT_REPORTING ───────→ ALL Phase 2-4 entities (data aggregation)

SAINT_WHITE_LABEL ─────→ SAINT_SHELL (theme system)
SAINT_SSO ─────────────→ SAINT_AUTH (third auth mode)
SAINT_SSO ─────────────→ SAINT_WHITE_LABEL (per-domain SSO)
SAINT_API ─────────────→ ALL Phase 2-4 entities (API routes)

SAINT_ADMIN ───────────→ SAINT_AUTH (user management)
SAINT_ADMIN ───────────→ SAINT_KERNEL (audit log)
SAINT_BILLING ─────────→ SAINT_API (usage metering)
SAINT_INTEGRATIONS ────→ SAINT_API (data exchange layer)
```

---

*All parent references: saint-master-2026-001*
