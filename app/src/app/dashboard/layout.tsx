'use client';

import { SAINTKernelProvider } from '@/kernel/SAINTKernel';
import { SAINTAuthProvider, useSAINTAuth } from '@/auth/SAINTAuth';
import { SAINTShell } from '@/shell/SAINTShell';
import { LoginScreen } from '@/auth/LoginScreen';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, currentRole, currentUser } = useSAINTAuth();
  const pathname = usePathname();

  // Extract the active entity from the URL
  const activeEntity = pathname?.split('/dashboard/')[1]?.split('/')[0] || '';

  // Set global references for sidebar (since it needs auth context)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__SAINT_ROLE__ = currentRole;
      (window as any).__SAINT_USER__ = currentUser;
    }
  }, [currentRole, currentUser]);

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <SAINTShell activeEntity={activeEntity}>
      {children}
    </SAINTShell>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SAINTKernelProvider>
      <SAINTAuthProvider>
        <DashboardContent>{children}</DashboardContent>
      </SAINTAuthProvider>
    </SAINTKernelProvider>
  );
}
