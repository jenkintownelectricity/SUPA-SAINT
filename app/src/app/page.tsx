'use client';

import { SAINTAuthProvider, useSAINTAuth } from '@/auth/SAINTAuth';
import { SAINTKernelProvider } from '@/kernel/SAINTKernel';
import { LoginScreen } from '@/auth/LoginScreen';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function LoginGate() {
  const { isAuthenticated, currentRole } = useSAINTAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && currentRole) {
      // Navigate to the appropriate default entity for the role
      const defaultEntity: Record<string, string> = {
        gcp_admin: 'admin',
        gcp_engineer: 'shop-drawings',
        sales_rep: 'opp-scraper',
        contractor: 'contractor-dash',
      };
      router.push(`/dashboard/${defaultEntity[currentRole] || 'admin'}`);
    }
  }, [isAuthenticated, currentRole, router]);

  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="glass-card text-center">
          <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return <LoginScreen />;
}

export default function Home() {
  return (
    <SAINTKernelProvider>
      <SAINTAuthProvider>
        <LoginGate />
      </SAINTAuthProvider>
    </SAINTKernelProvider>
  );
}
