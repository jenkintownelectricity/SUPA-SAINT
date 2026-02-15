import { NextResponse } from 'next/server';

// Server-side kernel validation endpoint
// Mirrors the client-side kernel but for API route protection

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, role, context } = body;

    if (!action || !role) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'action and role are required' } },
        { status: 400 }
      );
    }

    // Import boundaries for server-side validation
    const { ROLE_BOUNDARIES } = await import('@/kernel/boundaries');

    const boundary = ROLE_BOUNDARIES[role as keyof typeof ROLE_BOUNDARIES];
    if (!boundary) {
      return NextResponse.json({
        result: 'DENIED',
        action,
        role,
        reason: 'Unknown role',
      });
    }

    const denied = boundary.denied.find(d => d.action === action);
    if (denied) {
      return NextResponse.json({
        result: 'DENIED',
        action,
        role,
        reason: denied.reason,
      });
    }

    if (boundary.allowed.includes(action)) {
      return NextResponse.json({
        result: 'ALLOWED',
        action,
        role,
      });
    }

    return NextResponse.json({
      result: 'DENIED',
      action,
      role,
      reason: 'Action not explicitly allowed for this role',
    });
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Validation failed' } },
      { status: 500 }
    );
  }
}
