import { NextResponse } from 'next/server';

export async function GET() {
  const { getOpportunities } = await import('@/data/store');
  return NextResponse.json(getOpportunities());
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json(
    {
      id: `opp-${Date.now()}`,
      ...body,
      stage: 'prospecting',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { status: 201 }
  );
}

export async function PATCH(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    ...body,
    updated_at: new Date().toISOString(),
  });
}
