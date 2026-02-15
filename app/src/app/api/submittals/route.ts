import { NextResponse } from 'next/server';

export async function GET() {
  const { getSubmittals } = await import('@/data/store');
  return NextResponse.json(getSubmittals());
}
