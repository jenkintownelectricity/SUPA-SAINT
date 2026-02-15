import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    {
      id: 'key-001',
      name: 'Production API Key',
      prefix: 'sk_live_',
      last4: '7f3a',
      scopes: ['read', 'write'],
      status: 'active',
      created_at: '2025-09-01T10:00:00Z',
      last_used_at: '2026-02-15T08:22:00Z',
      expires_at: '2027-09-01T10:00:00Z',
    },
    {
      id: 'key-002',
      name: 'Development API Key',
      prefix: 'sk_test_',
      last4: '9b2c',
      scopes: ['read', 'write'],
      status: 'active',
      created_at: '2026-01-15T14:00:00Z',
      last_used_at: '2026-02-14T16:45:00Z',
      expires_at: null,
    },
    {
      id: 'key-003',
      name: 'Read-Only Integration Key',
      prefix: 'sk_live_',
      last4: '4e1d',
      scopes: ['read'],
      status: 'revoked',
      created_at: '2025-06-10T09:00:00Z',
      last_used_at: '2025-12-01T12:00:00Z',
      expires_at: '2026-06-10T09:00:00Z',
    },
  ]);
}
