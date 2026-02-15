'use client';

// ═══════════════════════════════════════════════════════════════════════
// PROJECT SAINT — Authentication Provider
// Demo-mode auth context extracted from SAINT_AUTH.lds.json
// ═══════════════════════════════════════════════════════════════════════

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { Role, DemoUser, AuthState } from '@/lib/types';

// ─── Demo Users ──────────────────────────────────────────────────────

const DEMO_USERS: Record<Role, DemoUser> = {
  gcp_admin: {
    id: 'demo-gcp-admin-001',
    name: 'Sarah Chen',
    title: 'Platform Administrator',
    email: 'admin@gcp-demo.saint.dev',
    avatar_initials: 'SC',
    role: 'gcp_admin',
  },
  gcp_engineer: {
    id: 'demo-gcp-engineer-001',
    name: 'Nicole Calpin',
    title: 'Design Engineer',
    email: 'nicole.calpin@gcp-demo.saint.dev',
    avatar_initials: 'NC',
    role: 'gcp_engineer',
  },
  sales_rep: {
    id: 'demo-sales-rep-001',
    name: 'Marcus Rivera',
    title: 'Regional Sales Manager',
    email: 'm.rivera@gcp-demo.saint.dev',
    avatar_initials: 'MR',
    role: 'sales_rep',
  },
  contractor: {
    id: 'demo-contractor-001',
    name: 'Trinity Building Envelope',
    title: 'Building Envelope Contractor',
    email: 'info@trinity-demo.saint.dev',
    avatar_initials: 'TB',
    role: 'contractor',
  },
};

// ─── Auth Context ────────────────────────────────────────────────────

interface AuthContextValue extends AuthState {
  login: (role: Role) => void;
  logout: () => void;
  demoUsers: Record<Role, DemoUser>;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isDemoMode: false,
  currentUser: null,
  currentRole: null,
};

const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  login: () => {},
  logout: () => {},
  demoUsers: DEMO_USERS,
});

// ─── Provider ────────────────────────────────────────────────────────

export function SAINTAuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  const login = useCallback((role: Role) => {
    const user = DEMO_USERS[role];
    if (!user) return;

    setAuthState({
      isAuthenticated: true,
      isDemoMode: true,
      currentUser: user,
      currentRole: role,
    });
  }, []);

  const logout = useCallback(() => {
    setAuthState(initialState);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...authState,
      login,
      logout,
      demoUsers: DEMO_USERS,
    }),
    [authState, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hook ────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error('useAuth must be used within a SAINTAuthProvider');
  }
  return ctx;
}

// Alias for backward compatibility
export const useSAINTAuth = useAuth;

export { DEMO_USERS };
export default SAINTAuthProvider;
