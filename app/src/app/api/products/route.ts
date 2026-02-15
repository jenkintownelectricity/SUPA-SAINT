import { NextResponse } from 'next/server';

export async function GET() {
  const { getProducts } = await import('@/data/store');
  return NextResponse.json(getProducts());
}
