import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    users: 4,
    entities: 15,
    uptime: '99.9%',
    kernel_validations: 0,
  });
}
