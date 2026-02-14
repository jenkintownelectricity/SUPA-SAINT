# L0 AUTHORITATIVE COMMAND
## PROJECT SAINT — SUPER APP PLATFORM
### Unified Saint-Gobain/GCP Tools Platform Built on LDS Streaming Architecture

---

| Field | Value |
|-------|-------|
| **COMMAND ID** | L0-CMD-2026-0214-001 |
| **AUTHORITY** | L0 GOVERNANCE — Armand Lefebvre, President, LDS LLC |
| **TARGET** | L2 UNTRUSTED PROPOSER (Claude Code Instance) |
| **ISSUED** | 2026-02-14T12:00:00Z |
| **EXPIRY** | 2026-04-14T23:59:59Z (60 days) |
| **CLASSIFICATION** | PROJECT SAINT — GCP/Saint-Gobain Super App |
| **PARENT CMDS** | L0-CMD-2026-0209-002 (ShopDrawing SaaS), L0-CMD-2026-0211-001 (Saint-Gobain Demo) |
| **INVARIANTS** | IV.01, IV.02, IV.04, IV.05, IV.06, IV.08 (KI-2026-001) |
| **GOVERNANCE** | L0 Human → L1 LDS Kernel V1 → L2 You (Untrusted Proposer) |

---

## §1. MISSION DIRECTIVE

### 1.1 Primary Objective

Build the PROJECT SAINT Super App as a **unified platform** that consolidates all Saint-Gobain/GCP contractor tools under a single LDS-governed application. This follows the proven TradeOS architecture pattern: kernel-first, entity-driven, stateless shell with CHECK-THEN-ACT validation on every action.

The Super App is the **delivery vehicle** for the entire GCP partnership — not individual standalone apps, but a single platform with modular capabilities that Saint-Gobain can white-label, extend, and deploy to their contractor network.

### 1.2 Strategic Context

Nicole Calpin (Design Engineer, Saint-Gobain/GCP) has already seen ShopDrawings.AI and the Opportunity Scraper demos. Keith Berg (Manager, Warranty & Compliance, 610-893-5225) holds pricing approval authority. The Super App unifies these demos into a production platform that Saint-Gobain's AI leadership can evaluate as an enterprise partnership.

### 1.3 What "Super App" Means

A single application shell with:
- **One login** (Clerk auth with GCP SSO integration path)
- **One kernel** (LDS L1 validation engine)
- **Modular tools** loaded as LDS entities (shop drawings, opportunity scraper, warranty tracker, product configurator, etc.)
- **Role-based access** (GCP Engineer, Sales Rep, Contractor, Admin)
- **White-label ready** (Saint-Gobain branding swap via config entity)

### 1.4 Scope — IN

- Super App kernel (`SAINT_KERNEL.lds.json`) — L1 validation engine
- Super App boundaries (`SAINT_BOUNDARIES.lds.json`) — role permissions
- Super App shell (`SAINT_SHELL.lds.json`) — app shell, navigation, entity loader
- Super App auth (`SAINT_AUTH.lds.json`) — authentication with GCP SSO path
- Super App master index (`SAINT_MASTER_INDEX.lds.json`) — application manifest
- Phase completion summaries
- L0 commands for each subsequent module phase

### 1.5 Scope — NOT IN

- Individual tool modules (ShopDrawings, OppScraper, etc.) — those are Phase 2+
- Pricing negotiation with Keith Berg
- Legal/NDA/contract documents
- Modifications to existing ShopDrawings.AI codebase (that stays standalone)
- Production deployment (this command produces the kernels and architecture only)

### 1.6 Success Criteria

| # | Criterion | Measure |
|---|-----------|---------|
| 1 | All 5 kernel files created | Valid .lds.json, parseable, schema-compliant |
| 2 | Kernel validates all actions | CHECK-THEN-ACT on every user interaction |
| 3 | Role boundaries enforced | 4 roles with distinct permission sets |
| 4 | Shell renders with entity loader | Modular tool loading from entity registry |
| 5 | Auth supports demo + production | Demo quick-login AND Clerk production auth |
| 6 | Master index defines all phases | 6-phase build plan with entity manifest |
| 7 | Architecture matches TradeOS pattern | Stateless shell, entity-driven rendering |

---

## §2. ARCHITECTURE

### 2.1 Authority Hierarchy

```
L0 — GOVERNANCE (ROOT)     → Armand Lefebvre (human authority)
L1 — KERNEL (ENFORCEMENT)  → SAINT_KERNEL.lds.json (deterministic validator)
L2 — PROPOSER (UNTRUSTED)  → Claude Code / AI agents (bounded execution)
L3 — EXECUTORS             → Atomic workers (no authority, no decisions)
```

**Rule:** Authority flows DOWN only. Information flows UP. Authority NEVER flows upward.

### 2.2 LDS Streaming Architecture

```
User Action → L1 Kernel Check → If ALLOWED → Load Entity → Render → Execute
                              → If DENIED  → Show Reason → Log Audit → STOP
```

### 2.3 Data Architecture

```
SAINT_MASTER_INDEX.lds.json          ← Application manifest (6-phase plan)
├── Phase 1: FOUNDATION
│   ├── SAINT_KERNEL.lds.json        ← L1 validation engine
│   ├── SAINT_BOUNDARIES.lds.json    ← Role-based permissions
│   ├── SAINT_SHELL.lds.json         ← App shell + entity loader
│   └── SAINT_AUTH.lds.json          ← Authentication system
├── Phase 2: GCP TOOLS
│   ├── SAINT_SHOP_DRAWINGS.lds.json ← Shop drawing automation
│   ├── SAINT_OPP_SCRAPER.lds.json   ← Opportunity finder
│   └── SAINT_PRODUCT_CONFIG.lds.json ← GCP product configurator
├── Phase 3: CONTRACTOR PORTAL
│   ├── SAINT_CONTRACTOR_DASH.lds.json ← Contractor dashboard
│   ├── SAINT_WARRANTY.lds.json      ← Warranty tracking
│   └── SAINT_SUBMITTALS.lds.json    ← Submittal management
├── Phase 4: SALES & CRM
│   ├── SAINT_PIPELINE.lds.json      ← Sales pipeline
│   ├── SAINT_TERRITORIES.lds.json   ← Territory management
│   └── SAINT_REPORTING.lds.json     ← Analytics & reporting
├── Phase 5: ENTERPRISE
│   ├── SAINT_WHITE_LABEL.lds.json   ← Branding/theming engine
│   ├── SAINT_SSO.lds.json           ← Enterprise SSO integration
│   └── SAINT_API.lds.json           ← External API layer
└── Phase 6: OPERATIONS
    ├── SAINT_ADMIN.lds.json         ← Admin console
    ├── SAINT_BILLING.lds.json       ← Subscription management
    └── SAINT_INTEGRATIONS.lds.json  ← Third-party integrations
```

### 2.4 Role Model

| Role | Access Level | Description |
|------|-------------|-------------|
| `gcp_admin` | Full platform | Saint-Gobain internal — manages all tools, users, branding |
| `gcp_engineer` | Engineering tools | Nicole's role — shop drawings, product config, warranty |
| `sales_rep` | Sales tools | Opportunity scraper, pipeline, territory, reporting |
| `contractor` | Contractor portal | Dashboard, submittals, warranty status, product lookup |

---

## §3. DELIVERABLES

### 3.1 Phase 1 Deliverable Matrix

| # | File | Type | Description |
|---|------|------|-------------|
| 1 | `SAINT_MASTER_INDEX.lds.json` | Application manifest | 6-phase build plan, entity registry, architecture spec |
| 2 | `SAINT_KERNEL.lds.json` | Kernel definition | L1 CHECK-THEN-ACT engine with all 8 invariants |
| 3 | `SAINT_BOUNDARIES.lds.json` | Permissions | 4-role boundary definitions with action whitelists |
| 4 | `SAINT_SHELL.lds.json` | UI component | Responsive app shell with role-aware nav + entity loader |
| 5 | `SAINT_AUTH.lds.json` | Auth component | Clerk auth + demo quick-login + GCP SSO stub |
| 6 | `PHASE1_COMPLETE.lds.json` | Phase summary | Completion attestation + Phase 2 instructions |

### 3.2 File Format

All files follow the LDS Kernel Document Specification v1.1 (KDS-2026-02-03-001):

```
Layer 0: Header    — doc_id, version, authority_chain
Layer 1: Schema    — taxonomy_definition, strict_mode
Layer 2: Data      — entities, relations, metadata
Layer 3: Permissions — read_access, write_access, execute_access
Layer 4: Audit     — event_log, hash_chain
```

Each `.lds.json` file contains:
- `_lds` metadata block (uuid, type, version, governance chain)
- `core` block (name, description, principle)
- `invariants` block (where applicable — kernel only)
- `react_component` block (filename + embedded React/JSX code)
- Component follows the TradeOS pattern: self-contained, stateless, kernel-aware

---

## §4. PERSISTENT PROGRESS PROTOCOL (PPP)

### 4.1 Progress File Location

Create and maintain: `/.validkernel/L0-CMD-2026-0214-001/PROGRESS.md`

### 4.2 Checkpoint Requirements

- Create checkpoint JSON every entity file completed
- Update PROGRESS.md status table after each checkpoint
- Log timestamp, entity completed, next entity, session ID

### 4.3 Resume Protocol

When starting a new session:
1. FIRST ACTION: Read PROGRESS.md
2. Identify last checkpoint
3. Continue from "next_item" field
4. Do NOT re-create completed entities

### 4.4 Completion Verification

Phase 1 is COMPLETE when:
- All 6 files created and valid JSON
- Kernel validates all 4 roles correctly
- Shell renders with entity loader functional
- Auth handles both demo and Clerk flows
- PHASE1_COMPLETE.lds.json attests all checks passed

---

## §5. OPERATIONAL CONSTRAINTS

### 5.1 Invariant Compliance

| Code | Invariant | Enforcement in This Command |
|------|-----------|----------------------------|
| IV.01 | DETERMINISM | Same role + same action = same validation result |
| IV.02 | FAIL-CLOSED | Unknown actions DENIED, unknown roles DENIED |
| IV.04 | NO IMPLICIT AUTHORITY | Every tool access requires explicit role permission |
| IV.05 | TEMPORAL CONTAINMENT | Command expires 2026-04-14T23:59:59Z |
| IV.06 | NON-REPUDIATION | Every kernel decision logged with audit ID |
| IV.08 | FULL TRACEABILITY | Logs reproduce any decision deterministically |

### 5.2 Prohibited Actions

- DO NOT modify existing ShopDrawings.AI code
- DO NOT create database schemas (kernel files only)
- DO NOT deploy to production (architecture phase only)
- DO NOT include placeholder content — every component functional
- DO NOT skip kernel validation on any action
- DO NOT grant roles permissions not explicitly defined in boundaries

### 5.3 FAIL-CLOSED Triggers

If any of these conditions are met, STOP and ask L0:
- Ambiguity in role permissions
- Conflict between kernel invariants
- Entity dependency that doesn't exist yet
- Any action not explicitly authorized by this command

---

## §6. EXECUTION PROTOCOL

### Phase 1: FOUNDATION (This Command)

| Step | Action | Entry Criteria | Exit Criteria |
|------|--------|---------------|--------------|
| 1.1 | Create SAINT_MASTER_INDEX.lds.json | Command acknowledged | Valid manifest with all 6 phases |
| 1.2 | Create SAINT_KERNEL.lds.json | Master index exists | All 8 invariants enforced, CHECK-THEN-ACT functional |
| 1.3 | Create SAINT_BOUNDARIES.lds.json | Kernel exists | 4 roles defined with action whitelists |
| 1.4 | Create SAINT_SHELL.lds.json | Kernel + boundaries exist | App shell renders, entity loader functional |
| 1.5 | Create SAINT_AUTH.lds.json | Shell exists | Demo login works, Clerk stub ready |
| 1.6 | Create PHASE1_COMPLETE.lds.json | All entities created | Attestation with Phase 2 instructions |

### Future Phases (Separate L0 Commands)

| Phase | Name | Entities | L0 Command |
|-------|------|----------|------------|
| 2 | GCP TOOLS | Shop Drawings, Opp Scraper, Product Config | L0-CMD-2026-0214-002 (TBD) |
| 3 | CONTRACTOR PORTAL | Dashboard, Warranty, Submittals | L0-CMD-2026-0214-003 (TBD) |
| 4 | SALES & CRM | Pipeline, Territories, Reporting | L0-CMD-2026-0214-004 (TBD) |
| 5 | ENTERPRISE | White Label, SSO, API | L0-CMD-2026-0214-005 (TBD) |
| 6 | OPERATIONS | Admin, Billing, Integrations | L0-CMD-2026-0214-006 (TBD) |

---

## §7. L2 PROPOSER INSTRUCTIONS

### 7.1 Role Definition

You are an L2 Untrusted Proposer. You have bounded authority to create the 6 entity files specified in §3.1. You may NOT:
- Create files not listed in §3.1
- Modify existing repository files
- Deploy anything
- Make architectural decisions not specified in §2

### 7.2 Execution Steps

```
1. ACKNOWLEDGE this command (exact format below)
2. CREATE .validkernel/L0-CMD-2026-0214-001/ directory
3. CREATE PROGRESS.md in that directory
4. BUILD SAINT_MASTER_INDEX.lds.json
5. CHECKPOINT → update PROGRESS.md
6. BUILD SAINT_KERNEL.lds.json
7. CHECKPOINT → update PROGRESS.md
8. BUILD SAINT_BOUNDARIES.lds.json
9. CHECKPOINT → update PROGRESS.md
10. BUILD SAINT_SHELL.lds.json
11. CHECKPOINT → update PROGRESS.md
12. BUILD SAINT_AUTH.lds.json
13. CHECKPOINT → update PROGRESS.md
14. BUILD PHASE1_COMPLETE.lds.json
15. FINAL CHECKPOINT → mark command COMPLETE
```

### 7.3 Acknowledgment Format

```
ACKNOWLEDGED: L0-CMD-2026-0214-001
TARGET: PROJECT SAINT SUPER APP — PHASE 1 FOUNDATION
DELIVERABLES: 6 entity files (.lds.json)
INVARIANTS: IV.01, IV.02, IV.04, IV.05, IV.06, IV.08
STATUS: EXECUTING PHASE 1
```

### 7.4 Error Handling

- Unknown role in action request → FAIL-CLOSED → DENY → log reason
- Missing entity dependency → STOP → report to L0 → wait for guidance
- JSON validation failure → FIX immediately → do not proceed with invalid files
- Ambiguous permission scope → FAIL-CLOSED → ask L0 for clarification

---

## §8. KERNEL INVARIANT SPECIFICATIONS

The SAINT kernel enforces all 8 ValidKernel invariants from KI-2026-001:

| Code | Name | Rule | Status |
|------|------|------|--------|
| IV.01 | DETERMINISM | Same input MUST produce same output | ENFORCED |
| IV.02 | FAIL-CLOSED | Unknown actions DENIED by default | ENFORCED |
| IV.03 | SEPARATION OF POWERS | Roles cannot grant themselves higher permissions | ENFORCED |
| IV.04 | NO IMPLICIT AUTHORITY | Every action requires explicit authorization | ENFORCED |
| IV.05 | TEMPORAL CONTAINMENT | All tokens have hard expiration | ENFORCED |
| IV.06 | NON-REPUDIATION | Every decision produces audit log | ENFORCED |
| IV.07 | MONOTONIC STATE | State transitions are append-only, no rollback | ENFORCED |
| IV.08 | FULL TRACEABILITY | Logs reproduce decision deterministically | ENFORCED |

---

## §9. GCP-SPECIFIC ROLE BOUNDARIES

### 9.1 gcp_admin

```
ALLOWED:
  - manage_users, manage_roles, manage_branding
  - view_all_tools, configure_tools, deploy_tools
  - view_all_reports, export_reports
  - manage_api_keys, manage_integrations
  - manage_billing, manage_subscriptions
  - ALL actions available to gcp_engineer, sales_rep, contractor

DENIED:
  - modify_kernel (L0 only)
  - modify_invariants (L0 only)
  - delete_audit_logs (immutable)

ESCALATION:
  - billing > $10,000/month → requires L0 approval
  - new_integration → requires security review
```

### 9.2 gcp_engineer

```
ALLOWED:
  - create_shop_drawing, edit_shop_drawing, review_shop_drawing
  - upload_assembly_letter, parse_assembly_letter
  - configure_product, view_product_catalog
  - view_warranty_status, create_warranty_claim
  - manage_submittals, review_submittals
  - view_own_reports

DENIED:
  - manage_users, manage_roles
  - view_sales_pipeline, view_territories
  - manage_billing, manage_api_keys
  - modify_branding

ESCALATION:
  - warranty_claim > $50,000 → requires gcp_admin approval
  - product_config_override → requires gcp_admin approval
```

### 9.3 sales_rep

```
ALLOWED:
  - view_opportunities, score_opportunities, assign_opportunities
  - manage_own_pipeline, update_deal_status
  - view_own_territory, request_territory_change
  - view_contractor_list, contact_contractor
  - generate_sales_reports, view_dashboards
  - request_product_sample

DENIED:
  - create_shop_drawing, edit_shop_drawing
  - manage_warranty, manage_submittals
  - manage_users, manage_billing
  - configure_products

ESCALATION:
  - deal > $500,000 → requires gcp_admin visibility
  - territory_reassignment → requires gcp_admin approval
```

### 9.4 contractor

```
ALLOWED:
  - view_own_dashboard, view_own_projects
  - download_shop_drawings (assigned to them)
  - view_warranty_status (own projects)
  - submit_warranty_claim
  - view_product_catalog, request_product_info
  - update_project_status

DENIED:
  - create_shop_drawing (GCP engineers only)
  - view_other_contractors_data
  - manage_users, manage_billing
  - view_opportunities, view_pipeline
  - modify_any_system_config

ESCALATION:
  - warranty_claim_dispute → escalates to gcp_engineer
  - project_scope_change → escalates to gcp_engineer
```

---

## §10. AUTHORIZATION

```
╔══════════════════════════════════════════════════════════════════════════╗
║  AUTHORIZED BY                                                          ║
║                                                                          ║
║  Name:         Armand Lefebvre                                          ║
║  Role:         L0 GOVERNANCE (ROOT)                                     ║
║  Organization: Lefebvre Design Solutions LLC                            ║
║  Date:         2026-02-14                                               ║
║  Token Expiry: 2026-04-14T23:59:59Z                                    ║
║                                                                          ║
║  INFRASTRUCTURE FIRST. BORING BY DESIGN.                                ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

*END OF L0 COMMAND — L0-CMD-2026-0214-001*
