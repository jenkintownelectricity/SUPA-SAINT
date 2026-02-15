import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    sso_enabled: false,
    status: 'not_configured',
    provider: null,
    domain: null,
    protocols_available: ['SAML 2.0', 'OpenID Connect', 'OAuth 2.0'],
    enforcement: 'optional',
    configured_at: null,
    last_login_via_sso: null,
  });
}
