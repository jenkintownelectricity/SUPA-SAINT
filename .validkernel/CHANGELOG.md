# PROJECT SAINT — CHANGELOG

All notable changes to this project will be documented in this file.

---

## [1.0.0] — 2026-02-14

### Phase 1: FOUNDATION
- **Added** SAINT_MASTER_INDEX.lds.json — 6-phase application manifest with entity registry
- **Added** SAINT_KERNEL.lds.json — L1 CHECK-THEN-ACT validation engine, all 8 invariants enforced
- **Added** SAINT_BOUNDARIES.lds.json — 4-role permission system (gcp_admin, gcp_engineer, sales_rep, contractor)
- **Added** SAINT_SHELL.lds.json — Responsive app shell with role-aware navigation and entity loader
- **Added** SAINT_AUTH.lds.json — Dual-mode auth (demo quick-login + Clerk production + GCP SSO stub)
- **Added** 5 GCP-specific validation rules (VR-SAINT-001 through VR-SAINT-005)

### Phase 2: GCP_TOOLS
- **Added** SAINT_SHOP_DRAWINGS.lds.json — AI-powered shop drawing automation (6 assembly types, DXF output, CAD standards)
- **Added** SAINT_OPP_SCRAPER.lds.json — Commercial opportunity finder (4 data sources, Groq LPU classification, territory filtering)
- **Added** SAINT_PRODUCT_CONFIG.lds.json — GCP product configurator (13 products, 7 compatibility rules, CSI mapping)

### Phase 3: CONTRACTOR_PORTAL
- **Added** SAINT_CONTRACTOR_DASH.lds.json — Contractor command center (KPI cards, project detail, notifications, field photos)
- **Added** SAINT_WARRANTY.lds.json — Warranty tracking + claims (3 warranty types, 11-state claim workflow, escalation rules)
- **Added** SAINT_SUBMITTALS.lds.json — Submittal package management (10 doc types, auto-populate, PDF generation, 8-state review)

### Phase 4: SALES_CRM
- **Added** SAINT_PIPELINE.lds.json — Sales pipeline (8 deal stages, kanban/list/forecast/funnel views, activity logging)
- **Added** SAINT_TERRITORIES.lds.json — Territory management (3-level hierarchy, Mapbox maps, 10 performance metrics)
- **Added** SAINT_REPORTING.lds.json — Cross-entity analytics (15 reports, 3 dashboards, export, scheduled delivery)

### Phase 5: ENTERPRISE
- **Added** SAINT_WHITE_LABEL.lds.json — Branding engine (5 overridable categories, domain-based routing, 4 preset themes)
- **Added** SAINT_SSO.lds.json — Enterprise SSO (SAML 2.0 + OIDC, JIT provisioning, multi-tenant)
- **Added** SAINT_API.lds.json — External API (8 resource groups, role-scoped keys, rate limiting, 12 webhook events)

### Phase 6: OPERATIONS
- **Added** SAINT_ADMIN.lds.json — Admin console (user management, system settings, audit log viewer, platform health)
- **Added** SAINT_BILLING.lds.json — Stripe billing (4 plans $500-$15K, usage metering, add-ons)
- **Added** SAINT_INTEGRATIONS.lds.json — 7 pre-built connectors (Salesforce, Procore, PlanGrid, Bluebeam, M365, QuickBooks, Slack)

---

## [Unreleased]

### Planned: Assembly Phase
- SAINT_ASSEMBLER.lds.json — Code extraction from entity definitions, scaffold runnable application
- Next.js application scaffold with all 18 entity components
- Railway + Vercel deployment configuration
