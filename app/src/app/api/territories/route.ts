import { NextResponse } from 'next/server';

export async function GET() {
  const { getTerritories } = await import('@/data/store');
  return NextResponse.json(getTerritories());
}
