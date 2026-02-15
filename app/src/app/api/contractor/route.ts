import { NextResponse } from 'next/server';

export async function GET() {
  const { getProjects, getNotifications } = await import('@/data/store');
  return NextResponse.json({
    projects: getProjects(),
    notifications: getNotifications(),
  });
}
