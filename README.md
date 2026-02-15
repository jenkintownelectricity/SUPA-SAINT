# PROJECT SAINT
## Unified GCP/Saint-Gobain Building Envelope Contractor Tools Platform

Built on LDS Streaming Architecture. Kernel-governed. Entity-driven. White-label ready.

---

### What Is This?

PROJECT SAINT is a unified Super App platform for Saint-Gobain/GCP Applied Technologies. It consolidates all building envelope contractor tools — shop drawings, opportunity discovery, product configuration, warranty management, submittals, sales pipeline, and more — under a single kernel-governed application.

**Architecture:** Stateless UI shell with modular tool entities loaded on-demand. Every user action passes through a deterministic L1 validation kernel before execution (CHECK-THEN-ACT).

---

### Repository Structure

```
SUPA-SAINT/
├── SAINT_MASTER_INDEX.lds.json          ← Application manifest (6-phase plan)
│
├── Phase 1: FOUNDATION
│   ├── SAINT_KERNEL.lds.json            ← L1 validation engine (8 invariants)
│   ├── SAINT_BOUNDARIES.lds.json        ← 4-role permission system
│   ├── SAINT_SHELL.lds.json             ← App shell + entity loader
│   └── SAINT_AUTH.lds.json              ← Dual-mode auth (demo + Clerk + SSO)
│
├── Phase 2: GCP_TOOLS
│   ├── SAINT_SHOP_DRAWINGS.lds.json     ← AI-powered shop drawing automation
│   ├── SAINT_OPP_SCRAPER.lds.json       ← Commercial opportunity finder (Groq LPU)
│   └── SAINT_PRODUCT_CONFIG.lds.json    ← GCP product configurator
│
├── Phase 3: CONTRACTOR_PORTAL
│   ├── SAINT_CONTRACTOR_DASH.lds.json   ← Contractor command center
│   ├── SAINT_WARRANTY.lds.json          ← Warranty tracking + claims (11-state workflow)
│   └── SAINT_SUBMITTALS.lds.json        ← Submittal package management
│
├── Phase 4: SALES_CRM
│   ├── SAINT_PIPELINE.lds.json          ← Sales pipeline (8-stage deals)
│   ├── SAINT_TERRITORIES.lds.json       ← Territory management + mapping
│   └── SAINT_REPORTING.lds.json         ← Cross-entity analytics (15 reports)
│
├── Phase 5: ENTERPRISE
│   ├── SAINT_WHITE_LABEL.lds.json       ← Branding engine
│   ├── SAINT_SSO.lds.json               ← SAML 2.0 / OIDC enterprise SSO
│   └── SAINT_API.lds.json               ← External REST API + webhooks
│
├── Phase 6: OPERATIONS
│   ├── SAINT_ADMIN.lds.json             ← Admin console + audit viewer
│   ├── SAINT_BILLING.lds.json           ← Stripe billing + usage metering
│   └── SAINT_INTEGRATIONS.lds.json      ← 7 pre-built connectors
│
├── Phase Completion Summaries
│   ├── PHASE1_COMPLETE.lds.json
│   ├── PHASE2_COMPLETE.lds.json
│   ├── PHASE3_COMPLETE.lds.json
│   ├── PHASE4_COMPLETE.lds.json
│   ├── PHASE5_COMPLETE.lds.json
│   └── PHASE6_COMPLETE.lds.json
│
├── Governance
│   ├── L0_CMD_2026_0214_001_SAINT_SUPERAPP.md    ← Phase 1 L0 command
│   ├── L0_CMD_2026_0215_001_SAINT_ASSEMBLER.md   ← Assembly L0 command
│   └── L0_CMD_2026_0215_002_DOCS_UPDATE.md       ← Ecosystem docs sync command
│
├── Progress Tracking
│   └── .validkernel/
│       └── PROGRESS.md                  ← Build progress log
│
├── CLAUDE_LOG.md                        ← Complete session history
└── README.md                            ← This file
```

---

### Role Model

| Role | Access Level | Description |
|------|-------------|-------------|
| `gcp_admin` | Full platform | Saint-Gobain internal — manages all tools, users, branding, billing |
| `gcp_engineer` | Engineering tools | Shop drawings, product config, warranty, submittals |
| `sales_rep` | Sales tools | Opportunity scraper, pipeline, territory, reporting |
| `contractor` | Contractor portal | Dashboard, submittals, warranty status, product lookup |

---

### Kernel Invariants

All 8 ValidKernel invariants enforced across all 18 entities:

| Code | Name | Rule |
|------|------|------|
| IV.01 | DETERMINISM | Same input = same output |
| IV.02 | FAIL-CLOSED | Unknown actions DENIED by default |
| IV.03 | SEPARATION OF POWERS | Roles cannot self-elevate |
| IV.04 | NO IMPLICIT AUTHORITY | Every action requires explicit authorization |
| IV.05 | TEMPORAL CONTAINMENT | All tokens have hard expiration |
| IV.06 | NON-REPUDIATION | Every decision produces audit log |
| IV.07 | MONOTONIC STATE | State transitions append-only |
| IV.08 | FULL TRACEABILITY | Logs reproduce any decision |

---

### GCP Validation Rules

| Rule | Name | Enforced In |
|------|------|------------|
| VR-SAINT-001 | Product Specification Integrity | Shop Drawings, Product Config |
| VR-SAINT-002 | Warranty Boundary | Warranty, Product Config |
| VR-SAINT-003 | Territory Compliance | Opp Scraper, Pipeline, Territories |
| VR-SAINT-004 | Contractor Data Isolation | Contractor Dash, Warranty, Submittals |
| VR-SAINT-005 | Shop Drawing CAD Standards | Shop Drawings |

---

### Build Status

| Phase | Name | Entities | Status |
|-------|------|----------|--------|
| 1 | FOUNDATION | 4 | COMPLETE |
| 2 | GCP_TOOLS | 3 | COMPLETE |
| 3 | CONTRACTOR_PORTAL | 3 | COMPLETE |
| 4 | SALES_CRM | 3 | COMPLETE |
| 5 | ENTERPRISE | 3 | COMPLETE |
| 6 | OPERATIONS | 3 | COMPLETE |
| **Total** | | **18 entities** | **ALL COMPLETE** |
| **Assembly** | SAINT_ASSEMBLER | L0-CMD-2026-0215-001 | **IN PROGRESS** |

**Current Phase:** SAINT_ASSEMBLER — extracting code from 18 entity definitions, scaffolding deployable Next.js application with kernel validation, demo mode, and glassmorphism UI.

---

### Deployment Target

| Component | Platform |
|-----------|----------|
| Backend | Railway |
| Frontend | Vercel (or Railway) |
| Auth | Clerk + Enterprise SSO |
| Payments | Stripe |
| AI (Drawings) | GPT-4o Vision |
| AI (Scoring) | Groq LPU (Llama 3.1 70B) |
| Maps | Mapbox GL JS |
| Storage | Cloud storage with CDN |

**Domains:**
- Production: `saint.validkernel.com`
- Staging: `saint-staging.validkernel.com`
- White-label: `{client}.validkernel.com`

---

### Pricing Model

| Tier | Monthly | Annual | Includes |
|------|---------|--------|----------|
| Contractor | $500 | $5,000 | Dashboard, submittals, warranty, product lookup |
| GCP Engineer | $2,000 | $20,000 | + Shop drawings, product config |
| Sales Team | $3,000 | $30,000 | Opportunity scraper, pipeline, territory, reporting |
| Enterprise | $15,000 | $150,000 | Full platform + white label + SSO + API |

---

### Governance

- **L0 Authority:** Armand Lefebvre, President, Lefebvre Design Solutions LLC
- **L1 Kernel:** SAINT_KERNEL.lds.json (deterministic validator)
- **L2 Proposers:** Claude Code / AI agents (bounded execution)
- **L3 Executors:** Atomic workers (no authority)

Authority flows DOWN only. Information flows UP. Authority NEVER flows upward.

---

### Key Contacts

| Name | Role | Contact |
|------|------|---------|
| Nicole Calpin | Design Engineer, GCP | 267-275-3870 |
| Keith Berg | Manager, Warranty & Compliance | 610-893-5225 |

---

### Command History

| # | Command ID | Description | Status |
|---|-----------|-------------|--------|
| 1 | L0-CMD-2026-0214-001 | Entity Definition Phase (6 phases, 18 entities) | Complete |
| 2 | L0-CMD-2026-0215-001 | SAINT_ASSEMBLER — scaffold runnable app | In Progress |
| 3 | L0-CMD-2026-0215-002 | Ecosystem documentation sync (5 repos) | In Progress |

---

### LDS Ecosystem

This repository is part of the Lefebvre Design Solutions construction technology platform:

| Repository | Description | Status |
|-----------|-------------|--------|
| **SUPA-SAINT** (this repo) | Unified GCP/Saint-Gobain Super App (18 entities) | Assembler Phase |
| [GPC_Shop_Drawings](https://github.com/jenkintownelectricity/GPC_Shop_Drawings) | AI-powered shop drawing production | Alpha Complete |
| [construction_dna](https://github.com/jenkintownelectricity/construction_dna) | 20-tier material DNA taxonomy | Kernel Ready |
| [construction_development_scraper](https://github.com/jenkintownelectricity/construction_development_scraper) | Groq-based opportunity discovery | Production |
| [holograph_details](https://github.com/jenkintownelectricity/holograph_details) | 3D BIM detail viewer (multi-tenant SaaS) | Demo Ready |

All repositories governed under LDS L0-command architecture with ValidKernel deterministic trust.

---

*Infrastructure first. Boring by design.*

*Last Updated: 2026-02-15*
