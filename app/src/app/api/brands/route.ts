import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    brand: 'SAINT',
    theme: {
      primary: '#6C63FF',
      secondary: '#1E1E2F',
      accent: '#00D4AA',
      background: '#0A0A1A',
      surface: '#1E1E2F',
      text_primary: '#FFFFFF',
      text_secondary: '#A0A0B8',
      border: '#2E2E45',
    },
    logo_url: '/saint-logo.svg',
    favicon_url: '/favicon.ico',
    company_name: 'SAINT Platform',
    support_email: 'support@saint.dev',
  });
}
