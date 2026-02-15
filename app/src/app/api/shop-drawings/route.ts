import { NextResponse } from 'next/server';

export async function GET() {
  const { getShopDrawings } = await import('@/data/store');
  return NextResponse.json(getShopDrawings());
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json(
    {
      id: `sd-${Date.now()}`,
      ...body,
      status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { status: 201 }
  );
}
