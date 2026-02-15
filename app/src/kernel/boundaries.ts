// ═══════════════════════════════════════════════════════════════════════
// SAINT Kernel — Role Boundaries
// Extracted from SAINT_BOUNDARIES.lds.json
// Whitelist architecture: if not explicitly allowed, DENIED.
// ═══════════════════════════════════════════════════════════════════════

import type { Role, RoleBoundary, EscalationRule } from '@/lib/types';

export const ROLE_BOUNDARIES: Record<Role, RoleBoundary> = {
  gcp_admin: {
    label: 'GCP Administrator',
    description: 'Saint-Gobain internal — full platform management',
    icon: 'Shield',
    color: '#1E40AF',
    allowed: [
      'load_entity',
      'manage_users', 'manage_roles', 'manage_branding',
      'view_all_tools', 'configure_tools', 'deploy_tools',
      'view_all_reports', 'export_reports',
      'manage_api_keys', 'manage_integrations',
      'manage_billing', 'manage_subscriptions',
      'create_shop_drawing', 'edit_shop_drawing', 'review_shop_drawing',
      'upload_assembly_letter', 'parse_assembly_letter',
      'configure_product', 'view_product_catalog',
      'view_warranty_status', 'create_warranty_claim',
      'manage_submittals', 'review_submittals',
      'view_opportunities', 'score_opportunities', 'assign_opportunities',
      'manage_pipeline', 'update_deal_status',
      'view_territories', 'manage_territories',
      'generate_reports', 'view_contractor_dashboard', 'view_all_projects',
      'system_settings', 'view_audit_log',
      'download_shop_drawings', 'view_material_schedule',
      'manage_sso', 'view_admin_dashboard',
    ],
    denied: [
      { action: 'modify_kernel', reason: 'L0 authority only — kernel is immutable at runtime' },
      { action: 'modify_invariants', reason: 'L0 authority only — invariants are non-negotiable' },
      { action: 'delete_audit_logs', reason: 'Audit logs are immutable (IV.07 Monotonic State)' },
      { action: 'bypass_validation', reason: 'All actions must pass through L1 kernel' },
    ],
    escalation: [
      { condition: 'billing_change_exceeds_threshold', threshold: 10000, unit: 'USD/month', escalate_to: 'L0_governance', reason: 'Large billing changes require human governance approval' },
      { condition: 'new_integration_request', escalate_to: 'L0_governance', reason: 'New integrations require security review' },
    ],
  },
  gcp_engineer: {
    label: 'GCP Design Engineer',
    description: "Nicole Calpin's role — engineering tools, shop drawings, product configuration",
    icon: 'Compass',
    color: '#059669',
    allowed: [
      'load_entity',
      'create_shop_drawing', 'edit_shop_drawing', 'review_shop_drawing',
      'upload_assembly_letter', 'parse_assembly_letter',
      'configure_product', 'view_product_catalog',
      'view_warranty_status', 'create_warranty_claim',
      'manage_submittals', 'review_submittals',
      'view_own_reports', 'download_shop_drawings',
      'view_own_dashboard', 'view_assigned_projects',
      'generate_dxf', 'validate_cad_standards', 'view_material_schedule',
    ],
    denied: [
      { action: 'manage_users', reason: 'Admin-only function' },
      { action: 'manage_roles', reason: 'Admin-only function' },
      { action: 'view_sales_pipeline', reason: 'Sales team data — not engineering scope' },
      { action: 'view_territories', reason: 'Sales team data — not engineering scope' },
      { action: 'manage_billing', reason: 'Admin-only function' },
      { action: 'manage_api_keys', reason: 'Admin-only function' },
      { action: 'modify_branding', reason: 'Admin-only function' },
      { action: 'view_other_engineers_data', reason: 'Data isolation — own projects only' },
    ],
    escalation: [
      { condition: 'warranty_claim_exceeds_threshold', threshold: 50000, unit: 'USD', escalate_to: 'gcp_admin', reason: 'Large warranty claims require admin approval' },
      { condition: 'product_config_override', escalate_to: 'gcp_admin', reason: 'Overriding standard product configuration requires admin approval' },
    ],
  },
  sales_rep: {
    label: 'Sales Representative',
    description: 'GCP sales team — opportunity management, pipeline, territory',
    icon: 'TrendingUp',
    color: '#D97706',
    allowed: [
      'load_entity',
      'view_opportunities', 'score_opportunities', 'assign_opportunities',
      'manage_own_pipeline', 'update_deal_status',
      'view_own_territory', 'request_territory_change',
      'view_contractor_list', 'contact_contractor',
      'generate_sales_reports', 'view_dashboards',
      'request_product_sample', 'view_product_catalog',
      'schedule_demo', 'log_activity', 'view_own_reports',
    ],
    denied: [
      { action: 'create_shop_drawing', reason: 'Engineering function — not sales scope' },
      { action: 'edit_shop_drawing', reason: 'Engineering function — not sales scope' },
      { action: 'manage_warranty', reason: 'Engineering function — not sales scope' },
      { action: 'manage_submittals', reason: 'Engineering function — not sales scope' },
      { action: 'manage_users', reason: 'Admin-only function' },
      { action: 'manage_billing', reason: 'Admin-only function' },
      { action: 'configure_products', reason: 'Engineering function — not sales scope' },
      { action: 'view_other_reps_pipeline', reason: 'Data isolation — own pipeline only' },
    ],
    escalation: [
      { condition: 'deal_exceeds_threshold', threshold: 500000, unit: 'USD', escalate_to: 'gcp_admin', reason: 'Large deals require admin visibility' },
      { condition: 'territory_reassignment', escalate_to: 'gcp_admin', reason: 'Territory changes require admin approval' },
    ],
  },
  contractor: {
    label: 'Contractor',
    description: 'Building envelope contractor — project access, submittals, warranty status',
    icon: 'HardHat',
    color: '#7C3AED',
    allowed: [
      'load_entity',
      'view_own_dashboard', 'view_own_projects',
      'download_shop_drawings', 'view_warranty_status',
      'submit_warranty_claim', 'view_product_catalog',
      'request_product_info', 'update_project_status',
      'upload_field_photos', 'view_own_submittals',
      'request_submittal_review', 'view_installation_guides',
      'contact_gcp_engineer',
    ],
    denied: [
      { action: 'create_shop_drawing', reason: 'GCP engineers only' },
      { action: 'edit_shop_drawing', reason: 'GCP engineers only' },
      { action: 'view_other_contractors_data', reason: 'Data isolation — strict tenant boundary' },
      { action: 'manage_users', reason: 'Admin-only function' },
      { action: 'manage_billing', reason: 'Admin-only function' },
      { action: 'view_opportunities', reason: 'Sales team data — not contractor scope' },
      { action: 'view_pipeline', reason: 'Sales team data — not contractor scope' },
      { action: 'modify_system_config', reason: 'Admin-only function' },
      { action: 'configure_products', reason: 'Engineering function' },
    ],
    escalation: [
      { condition: 'warranty_claim_dispute', escalate_to: 'gcp_engineer', reason: 'Warranty disputes require engineering review' },
      { condition: 'project_scope_change', escalate_to: 'gcp_engineer', reason: 'Scope changes affect shop drawings and product specs' },
    ],
  },
};

export function getRoleBoundary(role: Role): RoleBoundary {
  return ROLE_BOUNDARIES[role];
}

export function isActionAllowed(role: Role, action: string): boolean {
  const boundary = ROLE_BOUNDARIES[role];
  if (!boundary) return false;
  return boundary.allowed.includes(action);
}

export function getDenialReason(role: Role, action: string): string | undefined {
  const boundary = ROLE_BOUNDARIES[role];
  if (!boundary) return 'Unknown role';
  const denied = boundary.denied.find(d => d.action === action);
  return denied?.reason;
}

export function getEscalationRule(role: Role, condition: string): EscalationRule | undefined {
  const boundary = ROLE_BOUNDARIES[role];
  if (!boundary) return undefined;
  return boundary.escalation.find(e => e.condition === condition);
}
