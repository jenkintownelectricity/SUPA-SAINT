import { NextResponse } from 'next/server';

export async function GET() {
  const { getDeals } = await import('@/data/store');
  return NextResponse.json(getDeals());
}
