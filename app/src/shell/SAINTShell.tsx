'use client';
// ═══════════════════════════════════════════════════════════════════════
// SAINT Shell — App Shell with Role-Aware Navigation
// Extracted from SAINT_SHELL.lds.json
// ═══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface SAINTShellProps {
  children: React.ReactNode;
  activeEntity?: string;
}

export function SAINTShell({ children, activeEntity }: SAINTShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onMobileClose={() => setMobileSidebarOpen(false)}
        activeEntity={activeEntity}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          onMenuClick={() => setMobileSidebarOpen(true)}
          sidebarCollapsed={sidebarCollapsed}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
