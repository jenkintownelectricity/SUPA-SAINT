# L0 AUTHORITATIVE COMMAND
## PROJECT SAINT — ASSEMBLER & APPLICATION SCAFFOLD
### Extract Entity Definitions → Produce Deployable Application

---

| Field | Value |
|-------|-------|
| **COMMAND ID** | L0-CMD-2026-0215-001 |
| **AUTHORITY** | L0 GOVERNANCE — Armand Lefebvre, President, LDS LLC |
| **TARGET** | L2 UNTRUSTED PROPOSER (Claude Code Instance) |
| **ISSUED** | 2026-02-15T12:00:00Z |
| **EXPIRY** | 2026-04-15T23:59:59Z (60 days) |
| **CLASSIFICATION** | PROJECT SAINT — Assembly & Scaffold Phase |
| **PARENT CMDS** | L0-CMD-2026-0214-001 through L0-CMD-2026-0214-006 (Phases 1-6) |
| **INVARIANTS** | IV.01, IV.02, IV.03, IV.04, IV.05, IV.06, IV.07, IV.08 (ALL) |
| **GOVERNANCE** | L0 Human → L1 LDS Kernel V1 → L2 You (Untrusted Proposer) |

---

## §1. MISSION DIRECTIVE

### 1.1 Primary Objective

Build the **SAINT_ASSEMBLER** that reads all 18 entity definition files (`.lds.json`), extracts the `react_component` specifications, and scaffolds a complete, runnable application. The output is a deployable Next.js application with:

- Working React components for all 18 entities
- Express/Next.js API routes matching all ~130 backend endpoints
- Kernel validation engine wired into every action
- Role-based auth with demo mode functional on first run
- Entity loader rendering the correct component per navigation

### 1.2 Strategic Context

All 6 phases of entity definitions are complete (18 entities, 296 KB of specifications). The definitions contain everything needed to build the app:

- **`react_component`** blocks define component filenames, exports, and dependencies
- **`data_model`** blocks define the data structures
- **`backend.api_endpoints`** blocks define the API surface
- **`demo_data`** blocks provide synthetic data for immediate demo capability
- **`workflow`** / **`stages`** / **`states`** blocks define business logic

The assembler transforms these specifications into running code.

### 1.3 What "Assembly" Means

```
INPUT:  18 .lds.json entity definition files
PROCESS: SAINT_ASSEMBLER reads, extracts, resolves, generates
OUTPUT: Deployable Next.js application in /app directory
```

This is NOT a rewrite. This is an **extraction and scaffold**. The entity files ARE the source of truth. The assembler produces code that implements what the entities define.

### 1.4 Scope — IN

- SAINT_ASSEMBLER.lds.json — assembler entity definition
- Next.js application scaffold in `/app` directory
- React components for all 18 entities (extracted from react_component blocks)
- API routes for all ~130 endpoints (extracted from backend blocks)
- Kernel validation engine (SAINTKernel.jsx from SAINT_KERNEL)
- Role boundaries enforcement (from SAINT_BOUNDARIES)
- App shell with entity loader (from SAINT_SHELL)
- Auth system with working demo mode (from SAINT_AUTH)
- Demo data loaded for all entities (from demo_data blocks)
- package.json with all dependencies
- Environment variable configuration
- Railway + Vercel deployment config

### 1.5 Scope — NOT IN

- Production database setup (use in-memory/demo data for now)
- Stripe live keys or real payment processing
- Real Clerk configuration (use demo mode)
- Real SSO/SAML integration (use stub)
- Real scraper jobs hitting external APIs
- ShopDrawings.AI backend integration (use mock)
- Groq API integration (use mock classification)
- Actual DXF file generation (use mock output)

### 1.6 Success Criteria

| # | Criterion | Measure |
|---|-----------|---------|
| 1 | App starts locally | `npm run dev` produces running app on localhost |
| 2 | Demo login works | Click any of 4 role cards → enter app as that role |
| 3 | Role-aware navigation | Each role sees correct nav items from SAINT_SHELL |
| 4 | Entity loading works | Clicking nav item loads correct entity component |
| 5 | Kernel validates | Every action passes through kernel CHECK-THEN-ACT |
| 6 | DENIED shown correctly | Unauthorized actions show denial reason, not error |
| 7 | All 18 entities render | Every entity has a functional component (data from demo_data) |
| 8 | Glassmorphism theme | Default ValidKernel dark theme with glass effects |
| 9 | Responsive layout | Sidebar collapses on mobile, bottom nav on small screens |
| 10 | Audit log records | Kernel decisions visible in admin audit log viewer |

---

## §2. ARCHITECTURE

### 2.1 Application Stack

```
Frontend:
  Framework:    Next.js 14+ (App Router)
  UI:           React 18+ with Tailwind CSS
  State:        React Context (kernel, auth) + entity-local state
  Icons:        Lucide React
  Charts:       Recharts
  Maps:         Mapbox GL JS (territory maps)
  Theme:        CSS custom properties driven by white-label config

Backend:
  Runtime:      Next.js API routes (server-side)
  Validation:   SAINT Kernel (runs on every request)
  Auth:         Demo mode (in-memory) + Clerk stub
  Data:         In-memory store populated from demo_data
  File format:  JSON responses

Deployment:
  Option A:     Vercel (full-stack Next.js)
  Option B:     Railway (backend) + Vercel (frontend)
  Option C:     All Railway
```

### 2.2 Directory Structure

```
/app
├── package.json
├── next.config.js
├── tailwind.config.js
├── .env.example
├── README.md
│
├── src/
│   ├── app/                          ← Next.js App Router
│   │   ├── layout.tsx                ← Root layout with providers
│   │   ├── page.tsx                  ← Login page
│   │   ├── dashboard/
│   │   │   ├── layout.tsx            ← Shell layout (sidebar + header + entity loader)
│   │   │   └── [entity]/
│   │   │       └── page.tsx          ← Dynamic entity renderer
│   │   └── api/                      ← API routes
│   │       ├── kernel/
│   │       │   └── validate/route.ts
│   │       ├── shop-drawings/
│   │       ├── opportunities/
│   │       ├── products/
│   │       ├── warranty/
│   │       ├── submittals/
│   │       ├── pipeline/
│   │       ├── territories/
│   │       ├── reports/
│   │       ├── admin/
│   │       ├── billing/
│   │       ├── integrations/
│   │       ├── brands/
│   │       ├── sso/
│   │       └── keys/
│   │
│   ├── kernel/                       ← L1 Kernel Engine
│   │   ├── SAINTKernel.tsx           ← Kernel provider + validate()
│   │   ├── boundaries.ts            ← Role definitions from SAINT_BOUNDARIES
│   │   ├── invariants.ts            ← Invariant enforcement
│   │   └── audit.ts                 ← Audit log
│   │
│   ├── auth/                         ← Authentication
│   │   ├── SAINTAuth.tsx             ← Auth provider + demo mode
│   │   ├── LoginScreen.tsx           ← Login page with demo cards
│   │   └── ProtectedRoute.tsx        ← Auth gate
│   │
│   ├── shell/                        ← App Shell
│   │   ├── SAINTShell.tsx            ← Shell layout
│   │   ├── Sidebar.tsx               ← Role-aware navigation
│   │   ├── Header.tsx                ← Page header + breadcrumbs
│   │   └── EntityLoader.tsx          ← Dynamic entity component loader
│   │
│   ├── entities/                     ← Entity Components (one per entity)
│   │   ├── shop-drawings/
│   │   │   └── SAINTShopDrawings.tsx
│   │   ├── opp-scraper/
│   │   │   └── SAINTOppScraper.tsx
│   │   ├── product-config/
│   │   │   └── SAINTProductConfig.tsx
│   │   ├── contractor-dash/
│   │   │   └── SAINTContractorDash.tsx
│   │   ├── warranty/
│   │   │   └── SAINTWarranty.tsx
│   │   ├── submittals/
│   │   │   └── SAINTSubmittals.tsx
│   │   ├── pipeline/
│   │   │   └── SAINTPipeline.tsx
│   │   ├── territories/
│   │   │   └── SAINTTerritories.tsx
│   │   ├── reporting/
│   │   │   └── SAINTReporting.tsx
│   │   ├── white-label/
│   │   │   └── SAINTWhiteLabel.tsx
│   │   ├── sso/
│   │   │   └── SAINTSSO.tsx
│   │   ├── api/
│   │   │   └── SAINTAPI.tsx
│   │   ├── admin/
│   │   │   └── SAINTAdmin.tsx
│   │   ├── billing/
│   │   │   └── SAINTBilling.tsx
│   │   └── integrations/
│   │       └── SAINTIntegrations.tsx
│   │
│   ├── data/                         ← Demo Data Store
│   │   ├── store.ts                  ← In-memory data store
│   │   └── seed.ts                   ← Seed from entity demo_data blocks
│   │
│   ├── theme/                        ← Theming
│   │   ├── theme.ts                  ← Default ValidKernel theme
│   │   └── globals.css               ← Global styles + glassmorphism
│   │
│   └── lib/                          ← Shared utilities
│       ├── types.ts                  ← Shared TypeScript types
│       └── utils.ts                  ← Common helpers
│
├── public/
│   ├── assets/                       ← Logos, icons
│   └── favicon.ico
│
└── deployment/
    ├── railway.json                  ← Railway config
    ├── vercel.json                   ← Vercel config
    └── Dockerfile                    ← Railway Docker deployment
```

### 2.3 Data Flow (Runtime)

```
User clicks nav item
  → Shell calls EntityLoader
    → EntityLoader calls kernel.validate({action: 'load_entity', entity, role})
      → Kernel checks SAINT_BOUNDARIES for role permission
        → If ALLOWED: load entity component, render in main area
        → If DENIED: show denial reason, log audit entry

User performs action within entity (e.g., "create_shop_drawing")
  → Entity component calls kernel.validate({action, role, context})
    → Kernel checks boundaries
      → If ALLOWED: call API route → API validates server-side → execute → return
      → If DENIED: show denial, log audit
      → If ESCALATE: show escalation message, notify admin
```

---

## §3. DELIVERABLES

### 3.1 Deliverable Matrix

| # | Deliverable | Description |
|---|------------|-------------|
| 1 | `SAINT_ASSEMBLER.lds.json` | Assembler entity definition |
| 2 | `/app/package.json` | Dependencies and scripts |
| 3 | `/app/src/kernel/` | L1 Kernel engine (validate, boundaries, invariants, audit) |
| 4 | `/app/src/auth/` | Auth system with working demo mode |
| 5 | `/app/src/shell/` | App shell with sidebar, header, entity loader |
| 6 | `/app/src/entities/` | 14 entity components (Phase 2-6 tools) |
| 7 | `/app/src/app/api/` | ~130 API routes |
| 8 | `/app/src/data/` | Demo data store seeded from entity definitions |
| 9 | `/app/src/theme/` | ValidKernel glassmorphism theme |
| 10 | Deployment configs | Railway, Vercel, Docker, .env.example |

### 3.2 Build Priority Order

The assembler MUST build in this order (dependencies):

```
1. package.json + config files       ← No dependencies
2. Theme + global styles             ← No dependencies
3. Types + utilities                 ← No dependencies
4. Kernel engine                     ← Types
5. Auth system                       ← Kernel (audit logging)
6. Demo data store + seed            ← Types
7. Shell (sidebar, header, loader)   ← Kernel, Auth
8. Entity components (Phase 2-6)     ← Kernel, Auth, Shell, Data
9. API routes                        ← Kernel, Data
10. Deployment configs               ← Everything else
```

---

## §4. ENTITY COMPONENT SPECIFICATIONS

### 4.1 Component Extraction Rules

For each of the 18 entity `.lds.json` files:

1. Read `react_component.filename` → output filename
2. Read `react_component.exports` → component exports
3. Read `react_component.dependencies` → import statements
4. Read `react_component.views` → role-based rendering logic
5. Read `data_model` → TypeScript interfaces
6. Read `demo_data` → seed data for in-memory store
7. Read `backend.api_endpoints` → API route implementations
8. Read workflow/stages/states → business logic

### 4.2 Component Quality Requirements

Each entity component MUST:

- Render meaningful UI using demo data (not just "Coming Soon" placeholders)
- Show role-appropriate view (check `react_component.views`)
- Call `kernel.validate()` before any action
- Handle DENIED results gracefully (show reason, not crash)
- Use Tailwind CSS with glassmorphism design tokens
- Be responsive (sidebar layout on desktop, stacked on mobile)
- Include at minimum: a list/table view, a detail view, and primary actions

### 4.3 Minimum Viable Entity Component

Even for the most complex entities, the minimum to deliver is:

```
1. Dashboard/list view — shows demo data in a styled table or card grid
2. Detail view — click an item to see its full detail
3. Primary action — at least one action that triggers kernel validation
4. Role gating — different content per role (or DENIED message)
5. Loading/error states — skeleton while loading, error boundary
```

Full workflow implementation (e.g., 11-state warranty claims, submittal assembly wizard) can be iterative — but the entity MUST be functional, not a placeholder.

---

## §5. KERNEL IMPLEMENTATION

### 5.1 Kernel Engine Requirements

The kernel is the MOST CRITICAL component. It must:

```typescript
// Core interface
interface SAINTKernel {
  validate(request: ValidationRequest): ValidationResponse;
  getAuditLog(): AuditEntry[];
  getCurrentRole(): Role;
}

interface ValidationRequest {
  action: string;
  role: Role;
  context?: Record<string, any>;
  timestamp?: string;
}

interface ValidationResponse {
  result: 'ALLOWED' | 'DENIED' | 'ESCALATE' | 'MISSING_REQUIREMENT';
  action: string;
  role: Role;
  reason?: string;
  escalateTo?: string;
  auditId: string;
  latencyMs: number;
}
```

### 5.2 Validation Logic

```
1. Check role exists in SAINT_BOUNDARIES → if not: DENIED "Unknown role"
2. Check action in role.denied[] → if yes: DENIED with reason
3. Check action in role.allowed[] → if yes: ALLOWED
4. Check escalation rules → if triggered: ESCALATE
5. Default: DENIED "Action not explicitly allowed" (IV.02 FAIL-CLOSED)
6. Log audit entry (IV.06 NON-REPUDIATION)
7. Return result with latencyMs
```

### 5.3 Performance Target

- Sub-millisecond validation (<0.3ms target)
- Synchronous — no async/await in validate()
- Pure function — no side effects except audit log append

---

## §6. AUTH IMPLEMENTATION

### 6.1 Demo Mode (Priority)

Demo mode MUST work on first `npm run dev` with zero configuration:

```
1. Login screen shows "Try Demo" tab
2. 4 role cards in 2x2 grid (Sarah Chen, Nicole Calpin, Marcus Rivera, Trinity BE)
3. Click card → instantly logged in as that role
4. Role stored in React context
5. Navigation updates to role-specific items
6. Kernel validates all actions against this role
7. Demo data loaded from entity demo_data blocks
8. No backend calls, no tokens, no expiry
9. Page refresh returns to login (in-memory session)
```

### 6.2 Clerk Mode (Stub)

Clerk integration stubbed but not functional until Clerk keys provided:

```
1. "Sign In" tab on login screen
2. Placeholder for Clerk <SignIn /> component
3. Environment variable: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
4. If key not set: show "Production auth not configured" message
5. If key set: Clerk handles everything
```

---

## §7. DEMO DATA REQUIREMENTS

### 7.1 Data Seeding

Every entity has a `demo_data` block in its `.lds.json` file. The assembler must:

1. Extract all `demo_data` blocks from all 18 entity files
2. Create a unified in-memory data store
3. Seed the store on app startup
4. API routes read from this store
5. Entity components display this data

### 7.2 Demo Data Consistency

The demo data across entities tells a coherent story:

- **Nicole Calpin** (gcp_engineer) works on Philadelphia-area building envelope projects
- **Marcus Rivera** (sales_rep) manages the Greater Philadelphia territory
- **Trinity Building Envelope** (contractor) is working on One Liberty Place, Comcast Tech Center, and 30th Street Station
- **Sarah Chen** (gcp_admin) administers the entire platform

All demo data references these same projects, people, and products across entities.

---

## §8. OPERATIONAL CONSTRAINTS

### 8.1 Invariant Compliance

ALL 8 invariants must be enforced in the running application:

| Code | Enforcement |
|------|-------------|
| IV.01 | validate() is a pure function — same input = same output |
| IV.02 | Unknown actions DENIED — whitelist architecture |
| IV.03 | No role can modify its own permissions at runtime |
| IV.04 | Every UI action checks kernel before execution |
| IV.05 | Demo tokens don't expire, Clerk tokens do |
| IV.06 | Every validate() call produces audit log entry |
| IV.07 | Audit log is append-only array — no delete, no modify |
| IV.08 | Audit entries contain full inputs for replay |

### 8.2 Prohibited Actions

- DO NOT create the app without working kernel validation
- DO NOT use placeholder "Coming Soon" pages for entity components
- DO NOT skip demo data — every entity must show real demo data
- DO NOT hardcode role checks in UI — always go through kernel
- DO NOT modify the `.lds.json` entity definition files
- DO NOT add features not defined in the entity specifications
- DO NOT deploy to production (local development only for now)

### 8.3 Technology Constraints

- Next.js 14+ with App Router (NOT Pages Router)
- TypeScript (strict mode)
- Tailwind CSS (NOT CSS modules, NOT styled-components)
- Lucide React for icons (matches SAINT_SHELL icon references)
- No ORM — in-memory data store for demo
- No database — demo data from entity definitions

---

## §9. EXECUTION PROTOCOL

### 9.1 Build Sequence

| Step | Action | Entry Criteria | Exit Criteria |
|------|--------|---------------|--------------|
| 1 | Create SAINT_ASSEMBLER.lds.json | This command acknowledged | Assembler entity defined |
| 2 | Scaffold /app with package.json | Assembler exists | `npm install` succeeds |
| 3 | Build kernel engine | package.json exists | validate() works with boundaries |
| 4 | Build auth system | Kernel exists | Demo login works (4 roles) |
| 5 | Build shell | Kernel + Auth exist | Sidebar renders per role, entity loader works |
| 6 | Build demo data store | Types exist | All entity demo data seeded |
| 7 | Build entity components | Shell + Data exist | All 14 tool entities render with demo data |
| 8 | Build API routes | Kernel + Data exist | All ~130 endpoints return data |
| 9 | Build theme | Shell exists | Glassmorphism dark theme renders |
| 10 | Build deployment configs | App works locally | Railway + Vercel configs ready |

### 9.2 Checkpoint After Each Step

After each step, verify:
1. App still starts (`npm run dev`)
2. No TypeScript errors
3. Demo login still works
4. Previously built components still render
5. Update PROGRESS.md

### 9.3 Completion Verification

Assembly is COMPLETE when:
- `npm run dev` starts the app on localhost
- All 4 demo roles login successfully
- Navigation shows correct items per role
- All 18 entities have rendered components with demo data
- Kernel validates and denies correctly
- Audit log shows all decisions
- Glassmorphism theme renders properly
- Mobile responsive layout works

---

## §10. AUTHORIZATION

```
╔══════════════════════════════════════════════════════════════════════════╗
║  AUTHORIZED BY                                                          ║
║                                                                          ║
║  Name:         Armand Lefebvre                                          ║
║  Role:         L0 GOVERNANCE (ROOT)                                     ║
║  Organization: Lefebvre Design Solutions LLC                            ║
║  Date:         2026-02-15                                               ║
║  Token Expiry: 2026-04-15T23:59:59Z                                    ║
║                                                                          ║
║  THE BLUEPRINTS ARE DONE. NOW WE BUILD.                                ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

*END OF L0 COMMAND — L0-CMD-2026-0215-001*
