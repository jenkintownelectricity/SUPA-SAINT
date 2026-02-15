'use client';

// ═══════════════════════════════════════════════════════════════════════
// PROJECT SAINT — Protected Route
// Auth gate that renders LoginScreen when unauthenticated
// ═══════════════════════════════════════════════════════════════════════

import React from 'react';
import { useAuth } from './SAINTAuth';
import { LoginScreen } from './LoginScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return <>{children}</>;
}
