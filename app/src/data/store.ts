// ═══════════════════════════════════════════════════════════════════════
// SAINT Demo Data Store — In-memory demonstration data
// Provides typed accessors for all entity demo datasets
// ═══════════════════════════════════════════════════════════════════════

import type {
  ShopDrawing,
  Opportunity,
  Product,
  ProductCategory,
  Configuration,
  Project,
  Notification,
  WarrantyRecord,
  WarrantyClaim,
  SubmittalPackage,
  Deal,
  Territory,
  ReportKPI,
} from '@/lib/types';

// ─── Shop Drawings ───────────────────────────────────────────────────

const DEMO_SHOP_DRAWINGS: ShopDrawing[] = [
  { id: 'sd-001', project_id: 'proj-001', contractor_id: 'ctr-trinity', assembly_type: 'EIF', title: 'One Liberty Place — East Elevation EIF Detail', drawing_number: 'SD-OLP-001', revision: 2, status: 'approved', created_by: 'Nicole Calpin', reviewed_by: 'Sarah Chen', created_at: '2025-08-15T10:00:00Z', updated_at: '2025-09-20T14:30:00Z', products_referenced: ['Perma Finish EIF-220', 'Gold Coat CI-100'], warranty_eligible: true, ai_confidence: 94 },
  { id: 'sd-002', project_id: 'proj-001', contractor_id: 'ctr-trinity', assembly_type: 'EIF', title: 'One Liberty Place — Window Head/Sill EIF Integration', drawing_number: 'SD-OLP-002', revision: 1, status: 'approved', created_by: 'Nicole Calpin', reviewed_by: 'Sarah Chen', created_at: '2025-09-01T11:00:00Z', updated_at: '2025-10-05T09:00:00Z', products_referenced: ['Perma Finish EIF-220', 'Dur-O-Wal Base Coat BC-200'], warranty_eligible: true, ai_confidence: 91 },
  { id: 'sd-003', project_id: 'proj-001', contractor_id: 'ctr-trinity', assembly_type: 'AWB', title: 'One Liberty Place — AWB Curtain Wall Transition', drawing_number: 'SD-OLP-003', revision: 0, status: 'approved', created_by: 'Nicole Calpin', created_at: '2025-10-10T08:00:00Z', updated_at: '2025-11-15T16:00:00Z', products_referenced: ['Perm-A-Barrier NPS', 'Perm-A-Barrier VPL 50'], warranty_eligible: true, ai_confidence: 88 },
  { id: 'sd-004', project_id: 'proj-001', contractor_id: 'ctr-trinity', assembly_type: 'EIF', title: 'One Liberty Place — Parapet Cap EIF Assembly', drawing_number: 'SD-OLP-004', revision: 0, status: 'delivered', created_by: 'Nicole Calpin', created_at: '2025-12-01T09:00:00Z', updated_at: '2026-02-15T07:00:00Z', products_referenced: ['Perma Finish EIF-220', 'EIFS Adhesive ADH-50'], warranty_eligible: true, ai_confidence: 96 },
  { id: 'sd-005', project_id: 'proj-002', contractor_id: 'ctr-trinity', assembly_type: 'AWB', title: 'Comcast Tech Center — Level 12 AWB Detail', drawing_number: 'SD-CTC-001', revision: 0, status: 'in_review', created_by: 'Nicole Calpin', created_at: '2026-01-20T10:00:00Z', updated_at: '2026-02-10T14:00:00Z', products_referenced: ['Perm-A-Barrier NPS', 'Hydroduct 660'], warranty_eligible: false, ai_confidence: 85 },
  { id: 'sd-006', project_id: 'proj-002', contractor_id: 'ctr-trinity', assembly_type: 'AWB', title: 'Comcast Tech Center — Roof-to-Wall AWB Transition', drawing_number: 'SD-CTC-002', revision: 0, status: 'in_review', created_by: 'Nicole Calpin', created_at: '2026-02-01T11:00:00Z', updated_at: '2026-02-12T09:00:00Z', products_referenced: ['Perm-A-Barrier NPS', 'Perm-A-Barrier Primer'], warranty_eligible: true, ai_confidence: 82 },
  { id: 'sd-007', project_id: 'proj-003', contractor_id: 'ctr-metro', assembly_type: 'FP', title: "Children's Hospital Wing B — Spray Fireproofing", drawing_number: 'SD-CHP-001', revision: 0, status: 'draft', created_by: 'Nicole Calpin', created_at: '2026-02-10T14:00:00Z', updated_at: '2026-02-10T14:00:00Z', products_referenced: ['Monokote MK-6/HY', 'Cafco 300'], warranty_eligible: true, ai_confidence: 78 },
];

// ─── Opportunities ───────────────────────────────────────────────────

const DEMO_OPPORTUNITIES: Opportunity[] = [
  { id: 'opp-001', project_name: 'University City Science Center Phase 3', project_address: '3711 Market Street', project_city: 'Philadelphia', project_state: 'PA', project_zip: '19104', estimated_value: 28000000, square_footage: 450000, stories: 12, opportunity_type: 'new_construction', envelope_scope: ['EIFS', 'AWB', 'CI'], gcp_product_fit: 'high', urgency: 'immediate', score: 92, confidence: 88, territory_id: 'ter-001', assigned_rep_id: 'rep-marcus', status: 'contacted', owner_name: 'Wexford Science + Technology', contractor_name: 'Turner Construction', architect_name: 'Ennead Architects', bid_date: '2026-03-15', source: 'dodge_data', discovered_at: '2026-01-15T08:00:00Z', last_activity_at: '2026-02-10T14:00:00Z' },
  { id: 'opp-002', project_name: 'King of Prussia Town Center Building D', project_address: '160 N Gulph Road', project_city: 'King of Prussia', project_state: 'PA', project_zip: '19406', estimated_value: 15000000, square_footage: 280000, stories: 6, opportunity_type: 'new_construction', envelope_scope: ['EIFS'], gcp_product_fit: 'high', urgency: 'near_term', score: 78, confidence: 72, territory_id: 'ter-002', assigned_rep_id: 'rep-marcus', status: 'new', owner_name: 'Simon Property Group', contractor_name: 'Whiting-Turner', bid_date: '2026-05-01', source: 'dodge_data', discovered_at: '2026-02-01T10:00:00Z', last_activity_at: '2026-02-01T10:00:00Z' },
  { id: 'opp-003', project_name: 'Thomas Jefferson University Hospital Renovation', project_address: '111 S 11th Street', project_city: 'Philadelphia', project_state: 'PA', project_zip: '19107', estimated_value: 8500000, square_footage: 120000, stories: 4, opportunity_type: 'renovation', envelope_scope: ['AWB', 'WP'], gcp_product_fit: 'high', urgency: 'near_term', score: 85, confidence: 80, territory_id: 'ter-001', assigned_rep_id: 'rep-marcus', status: 'qualified', owner_name: 'Jefferson Health', contractor_name: 'Skanska USA', architect_name: 'Perkins&Will', bid_date: '2026-04-01', source: 'building_permits', discovered_at: '2026-01-20T09:00:00Z', last_activity_at: '2026-02-08T11:00:00Z' },
  { id: 'opp-004', project_name: 'Navy Yard Building 101 Conversion', project_address: '4747 S Broad Street', project_city: 'Philadelphia', project_state: 'PA', project_zip: '19112', estimated_value: 22000000, square_footage: 350000, stories: 8, opportunity_type: 'conversion', envelope_scope: ['EIFS', 'AWB', 'WP', 'FP'], gcp_product_fit: 'medium', urgency: 'pipeline', score: 71, confidence: 65, territory_id: 'ter-001', assigned_rep_id: 'rep-marcus', status: 'new', owner_name: 'PIDC', contractor_name: 'Barton Malow', source: 'dodge_data', discovered_at: '2026-02-05T12:00:00Z', last_activity_at: '2026-02-05T12:00:00Z' },
  { id: 'opp-005', project_name: 'Bryn Mawr Hospital New Patient Tower', project_address: '130 S Bryn Mawr Avenue', project_city: 'Bryn Mawr', project_state: 'PA', project_zip: '19010', estimated_value: 45000000, square_footage: 620000, stories: 10, opportunity_type: 'new_construction', envelope_scope: ['EIFS', 'AWB', 'FP', 'CI'], gcp_product_fit: 'high', urgency: 'immediate', score: 95, confidence: 92, territory_id: 'ter-003', assigned_rep_id: 'rep-marcus', status: 'proposal_sent', owner_name: 'Main Line Health', contractor_name: 'Gilbane Building Company', architect_name: 'HDR Architecture', bid_date: '2026-03-01', source: 'building_permits', discovered_at: '2025-12-10T08:00:00Z', last_activity_at: '2026-02-12T16:00:00Z' },
];

// ─── Products ────────────────────────────────────────────────────────

const DEMO_PRODUCTS: ProductCategory[] = [
  { id: 'cat-eifs', name: 'EIFS', description: 'Exterior Insulation and Finish Systems', products: [
    { id: 'prd-001', name: 'Perma Finish EIF-220', type: 'finish_coat', category_id: 'cat-eifs', description: 'Acrylic-based textured finish coat for EIFS assemblies', specifications: { coverage: '100-150 sqft/gal', colors: 800 }, compatible_with: ['prd-002','prd-003','prd-004'], warranty: { years: 10, type: 'system', covers: ['cracking','fading','delamination'] }, spec_section: '07 24 13', discontinued: false },
    { id: 'prd-002', name: 'Gold Coat CI-100', type: 'continuous_insulation', category_id: 'cat-eifs', description: 'Continuous insulation board for thermal performance', specifications: { r_value: 4.0, thickness: '1-4 inches' }, compatible_with: ['prd-001','prd-003'], warranty: { years: 15, type: 'system', covers: ['thermal_degradation'] }, spec_section: '07 21 00', discontinued: false },
    { id: 'prd-003', name: 'Dur-O-Wal Base Coat BC-200', type: 'base_coat', category_id: 'cat-eifs', description: 'Reinforced base coat with embedded fiberglass mesh', specifications: { thickness: '1/16 inch' }, compatible_with: ['prd-001','prd-002'], warranty: { years: 10, type: 'system', covers: ['impact_resistance'] }, spec_section: '07 24 13', discontinued: false },
    { id: 'prd-004', name: 'EIFS Adhesive ADH-50', type: 'adhesive', category_id: 'cat-eifs', description: 'Panel adhesive for EIFS board installation', specifications: { coverage: '50 sqft/bag' }, compatible_with: ['prd-001','prd-002'], warranty: { years: 10, type: 'system', covers: ['bond_failure'] }, spec_section: '07 24 13', discontinued: false },
  ]},
  { id: 'cat-awb', name: 'Air & Water Barriers', description: 'Air and water barrier membrane systems', products: [
    { id: 'prd-005', name: 'Perm-A-Barrier NPS', type: 'self_adhered_membrane', category_id: 'cat-awb', description: 'Non-permeable self-adhered air and water barrier', specifications: { width: '36 inches', thickness: '40 mil' }, compatible_with: ['prd-006','prd-007','prd-008'], warranty: { years: 15, type: 'system', covers: ['air_leakage','water_infiltration'] }, spec_section: '07 27 00', discontinued: false },
    { id: 'prd-006', name: 'Perm-A-Barrier VPL 50', type: 'vapor_permeable', category_id: 'cat-awb', description: 'Vapor-permeable liquid-applied air barrier', specifications: { coverage: '150-200 sqft/gal' }, compatible_with: ['prd-005','prd-007'], warranty: { years: 10, type: 'system', covers: ['air_leakage'] }, spec_section: '07 27 00', discontinued: false },
    { id: 'prd-007', name: 'Hydroduct 660', type: 'drainage_mat', category_id: 'cat-awb', description: 'Drainage and ventilation mat for wall assemblies', specifications: { thickness: '0.4 inches' }, compatible_with: ['prd-005','prd-006'], warranty: { years: 15, type: 'product', covers: ['drainage_failure'] }, spec_section: '07 27 00', discontinued: false },
    { id: 'prd-008', name: 'Perm-A-Barrier Primer', type: 'primer', category_id: 'cat-awb', description: 'Surface primer for membrane adhesion', specifications: { coverage: '200-300 sqft/gal' }, compatible_with: ['prd-005'], warranty: { years: 'included', type: 'system', covers: [] }, spec_section: '07 27 00', discontinued: false },
  ]},
  { id: 'cat-fp', name: 'Fireproofing', description: 'Spray-applied and board fireproofing systems', products: [
    { id: 'prd-009', name: 'Monokote MK-6/HY', type: 'spray_fireproofing', category_id: 'cat-fp', description: 'Gypsum-based spray-applied fireproofing', specifications: { density: '15 pcf', fire_rating: '4 hours' }, compatible_with: ['prd-010'], warranty: { years: 'project_life', type: 'product', covers: ['fire_resistance'] }, spec_section: '07 81 00', discontinued: false },
    { id: 'prd-010', name: 'Cafco 300', type: 'spray_fireproofing', category_id: 'cat-fp', description: 'Cementitious spray fireproofing for high-density applications', specifications: { density: '22 pcf', fire_rating: '4 hours' }, compatible_with: ['prd-009'], warranty: { years: 'project_life', type: 'product', covers: ['fire_resistance'] }, spec_section: '07 81 00', discontinued: false },
  ]},
  { id: 'cat-wp', name: 'Waterproofing', description: 'Below-grade and plaza waterproofing', products: [
    { id: 'prd-011', name: 'Bituthene 3000', type: 'sheet_membrane', category_id: 'cat-wp', description: 'Self-adhered rubberized asphalt waterproofing membrane', specifications: { thickness: '60 mil', width: '36 inches' }, compatible_with: ['prd-012','prd-013'], warranty: { years: 15, type: 'system', covers: ['water_infiltration'] }, spec_section: '07 11 13', discontinued: false },
    { id: 'prd-012', name: 'Bituthene Liquid Membrane', type: 'liquid_membrane', category_id: 'cat-wp', description: 'Cold-applied liquid waterproofing membrane', specifications: { coverage: '60 sqft/gal at 60 mil' }, compatible_with: ['prd-011','prd-013'], warranty: { years: 10, type: 'product', covers: ['water_infiltration'] }, spec_section: '07 11 13', discontinued: false },
    { id: 'prd-013', name: 'Hydroduct 220', type: 'drainage_board', category_id: 'cat-wp', description: 'Pre-formed drainage composite for foundation walls', specifications: { thickness: '0.6 inches', flow_rate: '16 gpm/ft' }, compatible_with: ['prd-011','prd-012'], warranty: { years: 15, type: 'system', covers: ['drainage_blockage'] }, spec_section: '07 11 13', discontinued: false },
  ]},
];

const DEMO_CONFIGURATIONS: Configuration[] = [
  { id: 'cfg-001', project_id: 'proj-001', assembly_type: 'EIF', substrate_type: 'CMU', layers: ['Perma Finish EIF-220', 'Gold Coat CI-100', 'Dur-O-Wal Base Coat BC-200', 'EIFS Adhesive ADH-50'], parameters: { area_sqft: 45000, finish_color: 'Custom #412' }, status: 'validated', warranty_eligible: true, coverage_area: 45000, estimated_cost: 285000, created_by: 'Nicole Calpin', created_at: '2025-08-01T09:00:00Z' },
  { id: 'cfg-002', project_id: 'proj-002', assembly_type: 'AWB', substrate_type: 'Steel_stud', layers: ['Perm-A-Barrier NPS', 'Hydroduct 660', 'Perm-A-Barrier Primer'], parameters: { area_sqft: 22000 }, status: 'submitted_to_shop_drawings', warranty_eligible: true, coverage_area: 22000, estimated_cost: 176000, created_by: 'Nicole Calpin', created_at: '2026-01-15T10:00:00Z' },
  { id: 'cfg-003', project_id: 'proj-003', assembly_type: 'FP', substrate_type: 'Steel_deck', layers: ['Monokote MK-6/HY'], parameters: { area_sqft: 85000, thickness_inches: 1.5 }, status: 'draft', warranty_eligible: true, coverage_area: 85000, estimated_cost: 340000, created_by: 'Nicole Calpin', created_at: '2026-02-10T14:00:00Z' },
];

// ─── Projects ────────────────────────────────────────────────────────

const DEMO_PROJECTS: Project[] = [
  {
    id: 'proj-001',
    contractor_id: 'ctr-trinity',
    project_name: 'One Liberty Place',
    project_address: '1650 Market Street',
    project_city: 'Philadelphia',
    project_state: 'PA',
    project_zip: '19103',
    status: 'in_progress',
    progress_percent: 65,
    start_date: '2025-06-15',
    target_completion: '2026-08-30',
    assigned_engineer_id: 'eng-001',
    assembly_types: ['EIF', 'AWB'],
    total_drawings: 12,
    total_submittals: 4,
    active_warranty_claims: 0,
    created_at: '2025-06-01T10:00:00Z',
    updated_at: '2026-02-10T14:30:00Z',
  },
  {
    id: 'proj-002',
    contractor_id: 'ctr-trinity',
    project_name: 'Comcast Tech Center',
    project_address: '1800 Arch Street',
    project_city: 'Philadelphia',
    project_state: 'PA',
    project_zip: '19103',
    status: 'pre_construction',
    progress_percent: 15,
    start_date: '2026-01-10',
    target_completion: '2027-03-15',
    assigned_engineer_id: 'eng-002',
    assembly_types: ['EIF', 'CI', 'CJ'],
    total_drawings: 6,
    total_submittals: 2,
    active_warranty_claims: 0,
    created_at: '2025-12-15T09:00:00Z',
    updated_at: '2026-02-12T11:00:00Z',
  },
  {
    id: 'proj-003',
    contractor_id: 'ctr-trinity',
    project_name: '30th Street Station',
    project_address: '2955 Market Street',
    project_city: 'Philadelphia',
    project_state: 'PA',
    project_zip: '19104',
    status: 'warranty_period',
    progress_percent: 100,
    start_date: '2024-03-01',
    target_completion: '2025-11-30',
    assigned_engineer_id: 'eng-001',
    assembly_types: ['WP', 'FP'],
    total_drawings: 18,
    total_submittals: 6,
    active_warranty_claims: 1,
    created_at: '2024-02-15T08:00:00Z',
    updated_at: '2026-01-20T16:45:00Z',
  },
];

// ─── Notifications ───────────────────────────────────────────────────

const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-001',
    contractor_id: 'ctr-trinity',
    type: 'drawing_approved',
    message: 'Shop Drawing SD-OLP-007 approved for One Liberty Place',
    priority: 'high',
    action_url: '/entities/shop-drawings',
    read: false,
    created_at: '2026-02-15T09:30:00Z',
  },
  {
    id: 'notif-002',
    contractor_id: 'ctr-trinity',
    type: 'submittal_review',
    message: 'Submittal PKG-2026-002 is under review by WJE Engineers',
    priority: 'medium',
    action_url: '/entities/submittals',
    read: false,
    created_at: '2026-02-14T15:20:00Z',
  },
  {
    id: 'notif-003',
    contractor_id: 'ctr-trinity',
    type: 'warranty_claim',
    message: 'Warranty claim WC-2026-001 status updated to under_review',
    priority: 'high',
    action_url: '/entities/warranty',
    read: true,
    created_at: '2026-02-13T11:00:00Z',
  },
  {
    id: 'notif-004',
    contractor_id: 'ctr-trinity',
    type: 'project_milestone',
    message: 'Comcast Tech Center — Pre-construction kickoff scheduled Feb 20',
    priority: 'low',
    action_url: '/entities/contractor-dash',
    read: true,
    created_at: '2026-02-12T08:45:00Z',
  },
];

// ─── Warranty Records ────────────────────────────────────────────────

const DEMO_WARRANTY_RECORDS: WarrantyRecord[] = [
  {
    id: 'wr-001',
    project_id: 'proj-003',
    contractor_id: 'ctr-trinity',
    assembly_type: 'WP',
    assembly_location: '30th Street Station — West Facade',
    warranty_type: 'system_warranty',
    products_covered: ['GCP WP-200 Membrane', 'GCP Hydroduct 220'],
    all_gcp_products: true,
    warranty_start_date: '2025-12-01',
    warranty_end_date: '2035-12-01',
    warranty_years: 10,
    status: 'claim_in_progress',
    covered_area_sqft: 24000,
    estimated_value: 480000,
  },
  {
    id: 'wr-002',
    project_id: 'proj-003',
    contractor_id: 'ctr-trinity',
    assembly_type: 'FP',
    assembly_location: '30th Street Station — Roof Assembly',
    warranty_type: 'system_warranty',
    products_covered: ['GCP FP-500 Board', 'GCP Firestop Sealant'],
    all_gcp_products: true,
    warranty_start_date: '2025-12-01',
    warranty_end_date: '2030-12-01',
    warranty_years: 5,
    status: 'active',
    covered_area_sqft: 18000,
    estimated_value: 270000,
  },
  {
    id: 'wr-003',
    project_id: 'proj-001',
    contractor_id: 'ctr-trinity',
    assembly_type: 'EIF',
    assembly_location: 'One Liberty Place — Floors 20-45',
    warranty_type: 'product_warranty',
    products_covered: ['GCP Perm-A-Barrier VPL 50'],
    all_gcp_products: false,
    warranty_start_date: '2025-09-15',
    warranty_end_date: '2030-09-15',
    warranty_years: 5,
    status: 'active',
    covered_area_sqft: 32000,
    estimated_value: 192000,
  },
];

// ─── Warranty Claims ─────────────────────────────────────────────────

const DEMO_WARRANTY_CLAIMS: WarrantyClaim[] = [
  {
    id: 'wc-001',
    claim_number: 'WC-2026-001',
    warranty_record_id: 'wr-001',
    project_id: 'proj-003',
    contractor_id: 'ctr-trinity',
    submitted_by: 'Tony Marciano',
    assigned_reviewer: 'David Kim',
    claim_type: 'water_infiltration',
    severity: 'major',
    description: 'Water infiltration detected at west facade expansion joint between floors 3-4. Moisture readings exceeding acceptable thresholds. Area affected approximately 200 sqft.',
    discovery_date: '2026-01-28',
    status: 'under_review',
    created_at: '2026-02-01T10:00:00Z',
    updated_at: '2026-02-13T11:00:00Z',
  },
];

// ─── Submittal Packages ──────────────────────────────────────────────

const DEMO_SUBMITTALS: SubmittalPackage[] = [
  {
    id: 'sub-001',
    package_number: 'PKG-2026-001',
    project_id: 'proj-001',
    contractor_id: 'ctr-trinity',
    title: 'EIF System — Perm-A-Barrier Air/Vapor Barrier',
    spec_sections: ['07 27 00', '07 26 13'],
    revision_number: 2,
    status: 'approved',
    documents_count: 8,
    submitted_date: '2025-11-15',
    actual_response_date: '2025-12-02',
    reviewer_name: 'Sarah Chen, PE',
    reviewer_firm: 'WJE Engineers',
    reviewer_stamp: 'APPROVED',
    reviewer_comments: 'All products meet specification requirements. Approved for construction.',
    completeness_status: 'complete',
    created_at: '2025-11-10T09:00:00Z',
  },
  {
    id: 'sub-002',
    package_number: 'PKG-2026-002',
    project_id: 'proj-001',
    contractor_id: 'ctr-trinity',
    title: 'AWB Assembly — Curtain Wall Integration Details',
    spec_sections: ['07 27 00', '08 44 13'],
    revision_number: 1,
    status: 'under_review',
    documents_count: 12,
    submitted_date: '2026-02-05',
    actual_response_date: undefined,
    reviewer_name: 'Sarah Chen, PE',
    reviewer_firm: 'WJE Engineers',
    reviewer_stamp: undefined,
    reviewer_comments: undefined,
    completeness_status: 'complete',
    created_at: '2026-02-01T14:00:00Z',
  },
  {
    id: 'sub-003',
    package_number: 'PKG-2026-003',
    project_id: 'proj-002',
    contractor_id: 'ctr-trinity',
    title: 'CI/CJ Insulation & Joint Sealant Package',
    spec_sections: ['07 21 00', '07 92 00', '07 27 00'],
    revision_number: 0,
    status: 'draft',
    documents_count: 5,
    submitted_date: undefined,
    actual_response_date: undefined,
    reviewer_name: undefined,
    reviewer_firm: undefined,
    reviewer_stamp: undefined,
    reviewer_comments: undefined,
    completeness_status: 'incomplete_with_gaps',
    created_at: '2026-02-10T10:30:00Z',
  },
];

// ─── Pipeline Deals ──────────────────────────────────────────────────

const DEMO_DEALS: Deal[] = [
  {
    id: 'deal-001',
    deal_name: 'Riverside Mixed-Use Tower',
    company_name: 'Granite Construction',
    contact_name: 'James Morrison',
    contact_email: 'jmorrison@granite.com',
    territory_id: 'terr-northeast',
    assigned_rep_id: 'user-sales-01',
    stage: 'proposal',
    value: 1200000,
    weighted_value: 720000,
    probability: 60,
    expected_close_date: '2026-04-15',
    products: ['EIF System', 'Air & Water Barrier'],
    assembly_types: ['EIF', 'AWB'],
    source: 'opp_scraper',
    created_at: '2025-11-20T10:00:00Z',
    stage_entered_at: '2026-01-28T14:00:00Z',
    days_in_stage: 18,
    total_age_days: 87,
    last_activity_at: '2026-02-12T09:30:00Z',
    activity_count: 14,
  },
  {
    id: 'deal-002',
    deal_name: 'Harbor Point Office Campus',
    company_name: 'Turner Building Co',
    contact_name: 'Sarah Chen',
    contact_email: 'schen@turner.com',
    territory_id: 'terr-northeast',
    assigned_rep_id: 'user-sales-01',
    stage: 'negotiation',
    value: 2100000,
    weighted_value: 1575000,
    probability: 75,
    expected_close_date: '2026-03-30',
    products: ['EIF System', 'Fire Protection', 'Waterproofing'],
    assembly_types: ['EIF', 'FP', 'WP'],
    source: 'referral',
    created_at: '2025-10-05T08:00:00Z',
    stage_entered_at: '2026-02-01T11:00:00Z',
    days_in_stage: 14,
    total_age_days: 133,
    last_activity_at: '2026-02-14T16:45:00Z',
    activity_count: 22,
  },
  {
    id: 'deal-003',
    deal_name: 'Meadowbrook School Renovation',
    company_name: 'Balfour Beatty',
    contact_name: 'Mike Rodriguez',
    territory_id: 'terr-southeast',
    assigned_rep_id: 'user-sales-01',
    stage: 'qualified',
    value: 450000,
    weighted_value: 112500,
    probability: 25,
    expected_close_date: '2026-06-30',
    products: ['Air & Water Barrier', 'CI Board'],
    assembly_types: ['AWB', 'CI'],
    source: 'dodge_reports',
    created_at: '2026-01-10T09:00:00Z',
    stage_entered_at: '2026-02-05T10:00:00Z',
    days_in_stage: 10,
    total_age_days: 36,
    last_activity_at: '2026-02-10T14:00:00Z',
    activity_count: 5,
  },
  {
    id: 'deal-004',
    deal_name: 'Skyline Luxury Condos',
    company_name: 'Skanska USA',
    contact_name: 'Lisa Park',
    contact_email: 'lpark@skanska.com',
    territory_id: 'terr-northeast',
    assigned_rep_id: 'user-sales-01',
    stage: 'lead',
    value: 800000,
    weighted_value: 80000,
    probability: 10,
    expected_close_date: '2026-08-15',
    products: ['EIF System'],
    assembly_types: ['EIF'],
    source: 'website',
    created_at: '2026-02-01T15:00:00Z',
    stage_entered_at: '2026-02-01T15:00:00Z',
    days_in_stage: 14,
    total_age_days: 14,
    last_activity_at: '2026-02-08T11:00:00Z',
    activity_count: 2,
  },
  {
    id: 'deal-005',
    deal_name: 'Federal Courthouse Restoration',
    company_name: 'Clark Construction',
    contact_name: 'David Kim',
    territory_id: 'terr-southeast',
    assigned_rep_id: 'user-sales-01',
    stage: 'closed_won',
    value: 680000,
    weighted_value: 680000,
    probability: 100,
    expected_close_date: '2026-01-15',
    products: ['EIF System', 'Waterproofing', 'Control Joints'],
    assembly_types: ['EIF', 'WP', 'CJ'],
    source: 'opp_scraper',
    created_at: '2025-08-20T10:00:00Z',
    stage_entered_at: '2026-01-12T09:00:00Z',
    days_in_stage: 34,
    total_age_days: 179,
    last_activity_at: '2026-01-15T17:00:00Z',
    activity_count: 31,
  },
  {
    id: 'deal-006',
    deal_name: 'Metro Health Clinic Expansion',
    company_name: 'Hensel Phelps',
    contact_name: 'Rachel Adams',
    territory_id: 'terr-midwest',
    assigned_rep_id: 'user-sales-01',
    stage: 'closed_lost',
    value: 370000,
    weighted_value: 0,
    probability: 0,
    expected_close_date: '2026-02-01',
    products: ['Air & Water Barrier'],
    assembly_types: ['AWB'],
    source: 'trade_show',
    created_at: '2025-09-15T12:00:00Z',
    stage_entered_at: '2026-01-28T10:00:00Z',
    days_in_stage: 18,
    total_age_days: 153,
    last_activity_at: '2026-01-28T10:00:00Z',
    activity_count: 18,
    loss_reason: 'Competitor pricing — went with Dryvit system',
  },
];

// ─── Territories ─────────────────────────────────────────────────────

const DEMO_TERRITORIES: Territory[] = [
  {
    id: 'terr-northeast',
    name: 'Northeast Corridor',
    code: 'NE-01',
    region: 'Northeast',
    district: 'Mid-Atlantic',
    assigned_rep_id: 'user-sales-01',
    assigned_rep_name: 'Marcus Webb',
    zip_codes: ['10001', '10002', '10003', '10004', '10005', '07001', '07002', '07003', '08001', '08002', '19101', '19102', '19103'],
    counties: ['New York', 'Bergen', 'Essex', 'Philadelphia'],
    states: ['NY', 'NJ', 'PA'],
    center_lat: 40.7128,
    center_lng: -74.006,
    quota: 4500000,
    pipeline_value: 4100000,
    opportunities_count: 12,
    hot_opportunities: 3,
    active: true,
  },
  {
    id: 'terr-southeast',
    name: 'Southeast Region',
    code: 'SE-01',
    region: 'Southeast',
    district: 'Carolinas',
    assigned_rep_id: 'user-sales-02',
    assigned_rep_name: 'Andrea Torres',
    zip_codes: ['27601', '27602', '27603', '28201', '28202', '28203', '29401', '29402', '30301', '30302'],
    counties: ['Wake', 'Mecklenburg', 'Charleston', 'Fulton'],
    states: ['NC', 'SC', 'GA'],
    center_lat: 35.2271,
    center_lng: -80.8431,
    quota: 3200000,
    pipeline_value: 2200000,
    opportunities_count: 8,
    hot_opportunities: 2,
    active: true,
  },
  {
    id: 'terr-midwest',
    name: 'Great Lakes',
    code: 'MW-01',
    region: 'Midwest',
    district: 'Great Lakes',
    assigned_rep_id: 'user-sales-03',
    assigned_rep_name: 'Brian Kowalski',
    zip_codes: ['60601', '60602', '60603', '48201', '48202', '43201', '43202', '53201', '53202'],
    counties: ['Cook', 'Wayne', 'Franklin', 'Milwaukee'],
    states: ['IL', 'MI', 'OH', 'WI'],
    center_lat: 41.8781,
    center_lng: -87.6298,
    quota: 2800000,
    pipeline_value: 1300000,
    opportunities_count: 6,
    hot_opportunities: 1,
    active: true,
  },
];

// ─── Executive KPIs ──────────────────────────────────────────────────

const DEMO_EXECUTIVE_KPIS: ReportKPI[] = [
  { label: 'Revenue YTD', value: 1580000, change: 12.4, changeLabel: 'vs last year', icon: 'DollarSign' },
  { label: 'Pipeline Value', value: 5600000, change: 8.2, changeLabel: 'vs last quarter', icon: 'TrendingUp' },
  { label: 'Open Opportunities', value: 26, change: -3, changeLabel: 'vs last month', icon: 'Target' },
  { label: 'Active Claims', value: 1, change: -50, changeLabel: 'vs last quarter', icon: 'BarChart3' },
];

// ─── Accessors ───────────────────────────────────────────────────────

export function getShopDrawings(): ShopDrawing[] {
  return DEMO_SHOP_DRAWINGS;
}

export function getOpportunities(): Opportunity[] {
  return DEMO_OPPORTUNITIES;
}

export function getProducts(): ProductCategory[] {
  return DEMO_PRODUCTS;
}

export function getConfigurations(): Configuration[] {
  return DEMO_CONFIGURATIONS;
}

export function getDeals(): Deal[] {
  return DEMO_DEALS;
}

export function getTerritories(): Territory[] {
  return DEMO_TERRITORIES;
}

export function getExecutiveKPIs(): ReportKPI[] {
  return DEMO_EXECUTIVE_KPIS;
}

export function getProjects(): Project[] {
  return DEMO_PROJECTS;
}

export function getNotifications(): Notification[] {
  return DEMO_NOTIFICATIONS;
}

export function getWarrantyRecords(): WarrantyRecord[] {
  return DEMO_WARRANTY_RECORDS;
}

export function getWarrantyClaims(): WarrantyClaim[] {
  return DEMO_WARRANTY_CLAIMS;
}

export function getSubmittals(): SubmittalPackage[] {
  return DEMO_SUBMITTALS;
}
