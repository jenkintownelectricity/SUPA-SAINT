import { NextResponse } from 'next/server';

export async function GET() {
  const { getExecutiveKPIs } = await import('@/data/store');
  return NextResponse.json(getExecutiveKPIs());
}
