'use client';

import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, FileText, Target, Package, Shield, ClipboardCheck,
  TrendingUp, Map, BarChart3, Palette, CreditCard, Settings, Users,
  FolderOpen, ChevronLeft, ChevronRight, X, HardHat, LogOut
} from 'lucide-react';
import type { Role, NavItem } from '@/lib/types';
import { useSAINTAuth } from '@/auth/SAINTAuth';

// ── Navigation definitions from SAINT_SHELL.lds.json ──────────────────

const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  gcp_admin: [
    { id: 'admin', label: 'Dashboard', icon: 'LayoutDashboard', entity: 'admin' },
    { id: 'users', label: 'Users', icon: 'Users', entity: 'admin' },
    { id: 'shop-drawings', label: 'Shop Drawings', icon: 'FileText', entity: 'shop-drawings' },
    { id: 'opp-scraper', label: 'Opportunities', icon: 'Target', entity: 'opp-scraper' },
    { id: 'product-config', label: 'Products', icon: 'Package', entity: 'product-config' },
    { id: 'warranty', label: 'Warranty', icon: 'Shield', entity: 'warranty' },
    { id: 'pipeline', label: 'Pipeline', icon: 'TrendingUp', entity: 'pipeline' },
    { id: 'territories', label: 'Territories', icon: 'Map', entity: 'territories' },
    { id: 'reporting', label: 'Reports', icon: 'BarChart3', entity: 'reporting' },
    { id: 'white-label', label: 'Branding', icon: 'Palette', entity: 'white-label' },
    { id: 'billing', label: 'Billing', icon: 'CreditCard', entity: 'billing' },
    { id: 'settings', label: 'Settings', icon: 'Settings', entity: 'admin' },
  ],
  gcp_engineer: [
    { id: 'engineer-dash', label: 'Dashboard', icon: 'LayoutDashboard', entity: 'reporting' },
    { id: 'shop-drawings', label: 'Shop Drawings', icon: 'FileText', entity: 'shop-drawings' },
    { id: 'product-config', label: 'Products', icon: 'Package', entity: 'product-config' },
    { id: 'warranty', label: 'Warranty', icon: 'Shield', entity: 'warranty' },
    { id: 'submittals', label: 'Submittals', icon: 'ClipboardCheck', entity: 'submittals' },
    { id: 'contractor-dash', label: 'Projects', icon: 'FolderOpen', entity: 'contractor-dash' },
    { id: 'reporting', label: 'My Reports', icon: 'BarChart3', entity: 'reporting' },
  ],
  sales_rep: [
    { id: 'reporting', label: 'Dashboard', icon: 'LayoutDashboard', entity: 'reporting' },
    { id: 'opp-scraper', label: 'Opportunities', icon: 'Target', entity: 'opp-scraper' },
    { id: 'pipeline', label: 'Pipeline', icon: 'TrendingUp', entity: 'pipeline' },
    { id: 'territories', label: 'My Territory', icon: 'Map', entity: 'territories' },
    { id: 'contractor-dash', label: 'Contractors', icon: 'HardHat', entity: 'contractor-dash' },
    { id: 'product-config', label: 'Products', icon: 'Package', entity: 'product-config' },
  ],
  contractor: [
    { id: 'contractor-dash', label: 'Dashboard', icon: 'LayoutDashboard', entity: 'contractor-dash' },
    { id: 'shop-drawings', label: 'Shop Drawings', icon: 'FileText', entity: 'shop-drawings' },
    { id: 'warranty', label: 'Warranty', icon: 'Shield', entity: 'warranty' },
    { id: 'submittals', label: 'Submittals', icon: 'ClipboardCheck', entity: 'submittals' },
    { id: 'product-config', label: 'Product Catalog', icon: 'Package', entity: 'product-config' },
  ],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, any> = {
  LayoutDashboard, FileText, Target, Package, Shield, ClipboardCheck,
  TrendingUp, Map, BarChart3, Palette, CreditCard, Settings, Users,
  FolderOpen, HardHat,
};

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapse: () => void;
  onMobileClose: () => void;
  activeEntity?: string;
}

export function Sidebar({ collapsed, mobileOpen, onToggleCollapse, onMobileClose, activeEntity }: SidebarProps) {
  const { currentRole, currentUser, logout } = useSAINTAuth();
  const role = currentRole || 'gcp_admin';
  const navItems = NAV_BY_ROLE[role as Role] || NAV_BY_ROLE.gcp_admin;
  const user = currentUser;

  return (
    <aside
      className={`
        glass-sidebar flex flex-col h-full z-40 transition-all duration-300
        ${collapsed ? 'w-16' : 'w-[260px]'}
        ${mobileOpen ? 'fixed inset-y-0 left-0 w-[260px]' : 'hidden md:flex'}
      `}
    >
      {/* Logo area */}
      <div className="h-16 flex items-center px-4 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-3 flex-1">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <Shield size={18} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">SAINT</h1>
              <p className="text-[10px] text-white/40">Building Envelope Intel</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 mx-auto rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <Shield size={18} className="text-blue-400" />
          </div>
        )}

        {/* Mobile close button */}
        <button onClick={onMobileClose} className="md:hidden ml-auto text-white/60 hover:text-white">
          <X size={20} />
        </button>

        {/* Desktop collapse button */}
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex items-center justify-center w-6 h-6 rounded-md hover:bg-white/10 text-white/40 hover:text-white/80 transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const IconComponent = ICON_MAP[item.icon] || LayoutDashboard;
          const isActive = activeEntity === item.entity || activeEntity === item.id;

          return (
            <Link
              key={item.id}
              href={`/dashboard/${item.entity}`}
              onClick={onMobileClose}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                ${isActive
                  ? 'bg-blue-500/15 border border-blue-500/20 text-blue-400'
                  : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                }
                ${collapsed ? 'justify-center px-0' : ''}
              `}
              title={collapsed ? item.label : undefined}
            >
              <IconComponent size={18} className={isActive ? 'text-blue-400' : ''} />
              {!collapsed && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User section at bottom */}
      <div className="border-t border-white/10 p-3">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/80">
              {user?.avatar_initials || 'SC'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white/80 truncate">{user?.name || 'Sarah Chen'}</p>
              <p className="text-[10px] text-white/40 truncate capitalize">{(role || '').replace('_', ' ')}</p>
            </div>
            <button
              onClick={() => {
                logout();
                window.location.href = '/';
              }}
              className="text-white/30 hover:text-white/70 transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/80">
              {user?.avatar_initials || 'SC'}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export { NAV_BY_ROLE };
