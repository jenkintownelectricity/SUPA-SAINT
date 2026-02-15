import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    { id: 'int-salesforce', name: 'Salesforce', category: 'crm', status: 'connected', last_sync: '2026-02-15T08:00:00Z' },
    { id: 'int-procore', name: 'Procore', category: 'construction', status: 'connected', last_sync: '2026-02-15T07:45:00Z' },
    { id: 'int-bluebeam', name: 'Bluebeam Revu', category: 'drawings', status: 'connected', last_sync: '2026-02-14T22:00:00Z' },
    { id: 'int-quickbooks', name: 'QuickBooks', category: 'accounting', status: 'disconnected', last_sync: null },
    { id: 'int-docusign', name: 'DocuSign', category: 'documents', status: 'available', last_sync: null },
    { id: 'int-plangrid', name: 'PlanGrid', category: 'construction', status: 'available', last_sync: null },
  ]);
}
