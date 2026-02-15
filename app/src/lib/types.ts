// ═══════════════════════════════════════════════════════════════════════
// PROJECT SAINT — Core TypeScript Types
// Extracted from 18 .lds.json entity definition files
// ═══════════════════════════════════════════════════════════════════════

// ─── Kernel Types ─────────────────────────────────────────────────────

export type Role = 'gcp_admin' | 'gcp_engineer' | 'sales_rep' | 'contractor';

export type ActionResult = 'ALLOWED' | 'DENIED' | 'ESCALATE' | 'MISSING_REQUIREMENT';

export interface ValidationRequest {
  action: string;
  role: Role;
  context?: Record<string, unknown>;
  timestamp?: string;
}

export interface ValidationResponse {
  result: ActionResult;
  action: string;
  role: Role;
  reason?: string;
  escalateTo?: string;
  auditId: string;
  latencyMs: number;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  request: ValidationRequest;
  response: Omit<ValidationResponse, 'auditId' | 'latencyMs'>;
  latencyMs: number;
}

export interface DeniedAction {
  action: string;
  reason: string;
}

export interface EscalationRule {
  condition: string;
  threshold?: number;
  unit?: string;
  escalate_to: string;
  reason: string;
}

export interface RoleBoundary {
  label: string;
  description: string;
  icon: string;
  color: string;
  allowed: string[];
  denied: DeniedAction[];
  escalation: EscalationRule[];
}

// ─── Auth Types ───────────────────────────────────────────────────────

export interface DemoUser {
  id: string;
  name: string;
  title: string;
  email: string;
  avatar_initials: string;
  role: Role;
}

export interface AuthState {
  isAuthenticated: boolean;
  isDemoMode: boolean;
  currentUser: DemoUser | null;
  currentRole: Role | null;
}

// ─── Navigation Types ─────────────────────────────────────────────────

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  entity: string;
}

// ─── Entity Types ─────────────────────────────────────────────────────

export type EntityId =
  | 'shop-drawings'
  | 'opp-scraper'
  | 'product-config'
  | 'contractor-dash'
  | 'warranty'
  | 'submittals'
  | 'pipeline'
  | 'territories'
  | 'reporting'
  | 'white-label'
  | 'sso'
  | 'api'
  | 'admin'
  | 'billing'
  | 'integrations';

// ─── Shop Drawing Types ───────────────────────────────────────────────

export type AssemblyType = 'EIF' | 'AWB' | 'FP' | 'WP' | 'CI' | 'CJ';

export type DrawingStatus = 'draft' | 'in_review' | 'revision_requested' | 'approved' | 'delivered';

export interface ShopDrawing {
  id: string;
  project_id: string;
  contractor_id: string;
  assembly_type: AssemblyType;
  title: string;
  drawing_number: string;
  revision: number;
  status: DrawingStatus;
  created_by: string;
  reviewed_by?: string;
  created_at: string;
  updated_at: string;
  products_referenced: string[];
  warranty_eligible: boolean;
  ai_confidence: number;
  notes?: string;
}

// ─── Opportunity Types ────────────────────────────────────────────────

export type OpportunityType = 'new_construction' | 'renovation' | 'restoration' | 'addition' | 'conversion';
export type OpportunityUrgency = 'immediate' | 'near_term' | 'pipeline' | 'future';
export type GCPProductFit = 'high' | 'medium' | 'low' | 'none';
export type OpportunityStatus = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'won' | 'lost' | 'archived';

export interface Opportunity {
  id: string;
  project_name: string;
  project_address: string;
  project_city: string;
  project_state: string;
  project_zip: string;
  estimated_value: number;
  square_footage?: number;
  stories?: number;
  opportunity_type: OpportunityType;
  envelope_scope: string[];
  gcp_product_fit: GCPProductFit;
  urgency: OpportunityUrgency;
  score: number;
  confidence: number;
  territory_id: string;
  assigned_rep_id: string;
  status: OpportunityStatus;
  owner_name?: string;
  contractor_name?: string;
  architect_name?: string;
  bid_date?: string;
  source: string;
  discovered_at: string;
  last_activity_at: string;
  notes?: string;
}

// ─── Product Types ────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  type: string;
  category_id: string;
  description: string;
  specifications: Record<string, unknown>;
  compatible_with: string[];
  warranty: { years: number | string; type: string; covers: string[] };
  spec_section: string;
  discontinued: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  products: Product[];
}

export type ConfigurationStatus = 'draft' | 'validated' | 'submitted_to_shop_drawings' | 'archived';

export interface Configuration {
  id: string;
  project_id: string;
  assembly_type: AssemblyType | 'MULTI';
  substrate_type: string;
  layers: string[];
  parameters: Record<string, unknown>;
  status: ConfigurationStatus;
  warranty_eligible: boolean;
  coverage_area?: number;
  estimated_cost?: number;
  created_by: string;
  created_at: string;
}

// ─── Contractor / Project Types ───────────────────────────────────────

export type ProjectStatus = 'pre_construction' | 'in_progress' | 'punch_list' | 'closeout' | 'warranty_period' | 'complete';

export interface Project {
  id: string;
  contractor_id: string;
  project_name: string;
  project_address: string;
  project_city: string;
  project_state: string;
  project_zip: string;
  status: ProjectStatus;
  progress_percent: number;
  start_date: string;
  target_completion: string;
  assigned_engineer_id: string;
  assembly_types: AssemblyType[];
  total_drawings: number;
  total_submittals: number;
  active_warranty_claims: number;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  contractor_id: string;
  type: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  action_url: string;
  read: boolean;
  created_at: string;
}

// ─── Warranty Types ───────────────────────────────────────────────────

export type WarrantyType = 'product_warranty' | 'system_warranty' | 'labor_warranty';
export type WarrantyStatus = 'active' | 'expiring_soon' | 'expired' | 'voided' | 'claim_in_progress';
export type ClaimStatus = 'draft' | 'submitted' | 'under_review' | 'inspection_scheduled' | 'info_requested' | 'approved' | 'denied' | 'under_appeal' | 'denied_final' | 'remedy_in_progress' | 'resolved';
export type ClaimSeverity = 'critical' | 'major' | 'minor' | 'cosmetic';

export interface WarrantyRecord {
  id: string;
  project_id: string;
  contractor_id: string;
  assembly_type: AssemblyType;
  assembly_location: string;
  warranty_type: WarrantyType;
  products_covered: string[];
  all_gcp_products: boolean;
  warranty_start_date: string;
  warranty_end_date: string;
  warranty_years: number;
  status: WarrantyStatus;
  covered_area_sqft: number;
  estimated_value: number;
}

export interface WarrantyClaim {
  id: string;
  claim_number: string;
  warranty_record_id: string;
  project_id: string;
  contractor_id: string;
  submitted_by: string;
  assigned_reviewer?: string;
  claim_type: string;
  severity: ClaimSeverity;
  description: string;
  discovery_date: string;
  status: ClaimStatus;
  created_at: string;
  updated_at: string;
}

// ─── Submittal Types ──────────────────────────────────────────────────

export type SubmittalStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'approved_as_noted' | 'acknowledged' | 'revise_and_resubmit' | 'rejected';

export interface SubmittalPackage {
  id: string;
  package_number: string;
  project_id: string;
  contractor_id: string;
  title: string;
  spec_sections: string[];
  revision_number: number;
  status: SubmittalStatus;
  documents_count: number;
  submitted_date?: string;
  actual_response_date?: string;
  reviewer_name?: string;
  reviewer_firm?: string;
  reviewer_stamp?: string;
  reviewer_comments?: string;
  completeness_status: 'complete' | 'incomplete_with_gaps';
  created_at: string;
}

// ─── Pipeline Types ───────────────────────────────────────────────────

export type DealStage = 'lead' | 'qualified' | 'spec_review' | 'proposal' | 'negotiation' | 'verbal_commit' | 'closed_won' | 'closed_lost';

export interface Deal {
  id: string;
  deal_name: string;
  company_name: string;
  contact_name: string;
  contact_email?: string;
  territory_id: string;
  assigned_rep_id: string;
  stage: DealStage;
  value: number;
  weighted_value: number;
  probability: number;
  expected_close_date: string;
  products: string[];
  assembly_types: string[];
  source: string;
  created_at: string;
  stage_entered_at: string;
  days_in_stage: number;
  total_age_days: number;
  last_activity_at: string;
  activity_count: number;
  loss_reason?: string;
}

// ─── Territory Types ──────────────────────────────────────────────────

export interface Territory {
  id: string;
  name: string;
  code: string;
  region: string;
  district: string;
  assigned_rep_id: string;
  assigned_rep_name: string;
  zip_codes: string[];
  counties: string[];
  states: string[];
  center_lat: number;
  center_lng: number;
  quota: number;
  pipeline_value: number;
  opportunities_count: number;
  hot_opportunities: number;
  active: boolean;
}

// ─── Reporting Types ──────────────────────────────────────────────────

export interface ReportKPI {
  label: string;
  value: number | string;
  change?: number;
  changeLabel?: string;
  icon: string;
}

// ─── Billing Types ────────────────────────────────────────────────────

export interface BillingPlan {
  id: string;
  name: string;
  price_monthly: number;
  price_annual: number;
  description: string;
  features: string[];
}

// ─── Admin Types ──────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: Role;
  active: boolean;
  last_login?: string;
  created_at: string;
}

// ─── Theme Types ──────────────────────────────────────────────────────

export interface ThemeConfig {
  app_name: string;
  tagline: string;
  background: string;
  glass: string;
  glass_border: string;
  text_primary: string;
  text_secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  sidebar_bg: string;
}
