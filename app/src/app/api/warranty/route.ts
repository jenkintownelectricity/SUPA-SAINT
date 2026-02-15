import { NextResponse } from 'next/server';

export async function GET() {
  const { getWarrantyRecords, getWarrantyClaims } = await import('@/data/store');
  return NextResponse.json({
    records: getWarrantyRecords(),
    claims: getWarrantyClaims(),
  });
}
