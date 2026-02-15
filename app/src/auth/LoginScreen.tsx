'use client';

// ═══════════════════════════════════════════════════════════════════════
// PROJECT SAINT — Login Screen
// Glassmorphism split-layout with demo role selection
// ═══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import type { Role } from '@/lib/types';
import { useAuth, DEMO_USERS } from './SAINTAuth';

// ─── Role Card Metadata ─────────────────────────────────────────────

interface RoleCardInfo {
  role: Role;
  label: string;
  description: string;
  color: string;
  colorRing: string;
  colorBg: string;
  colorText: string;
}

const ROLE_CARDS: RoleCardInfo[] = [
  {
    role: 'gcp_admin',
    label: 'Platform Admin',
    description: 'Full system access, user management, audit logs, and configuration.',
    color: '#1E40AF',
    colorRing: 'ring-blue-700',
    colorBg: 'bg-blue-900/30',
    colorText: 'text-blue-400',
  },
  {
    role: 'gcp_engineer',
    label: 'Design Engineer',
    description: 'Shop drawings, product configurations, submittals, and technical review.',
    color: '#059669',
    colorRing: 'ring-emerald-600',
    colorBg: 'bg-emerald-900/30',
    colorText: 'text-emerald-400',
  },
  {
    role: 'sales_rep',
    label: 'Sales Rep',
    description: 'Pipeline management, opportunity tracking, territories, and reporting.',
    color: '#D97706',
    colorRing: 'ring-amber-600',
    colorBg: 'bg-amber-900/30',
    colorText: 'text-amber-400',
  },
  {
    role: 'contractor',
    label: 'Contractor',
    description: 'Project dashboard, warranty claims, submittals, and document access.',
    color: '#7C3AED',
    colorRing: 'ring-violet-600',
    colorBg: 'bg-violet-900/30',
    colorText: 'text-violet-400',
  },
];

// ─── Login Screen Component ─────────────────────────────────────────

export function LoginScreen() {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<'signin' | 'demo'>('demo');
  const [hoveredRole, setHoveredRole] = useState<Role | null>(null);

  return (
    <div className="fixed inset-0 flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
    >
      {/* ── Ambient Glow Effects ─────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Main Card ────────────────────────────────────────── */}
      <div
        className="relative z-10 flex flex-col lg:flex-row w-[95vw] max-w-[960px] min-h-[560px] max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {/* ── Left Panel — Branding ───────────────────────────── */}
        <div
          className="relative flex flex-col items-center justify-center p-10 lg:w-[380px] shrink-0"
          style={{
            background: 'linear-gradient(160deg, rgba(96,165,250,0.18) 0%, rgba(15,52,96,0.6) 100%)',
            borderRight: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Logo mark */}
          <div
            className="flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
              boxShadow: '0 0 40px rgba(96,165,250,0.3)',
            }}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold tracking-widest text-white mb-2">
            PROJECT SAINT
          </h1>

          <p className="text-sm text-blue-300/80 tracking-wide text-center">
            Building Envelope Intelligence
          </p>

          {/* Decorative line */}
          <div className="mt-8 w-24 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

          <p className="mt-6 text-xs text-white/30 text-center leading-relaxed max-w-[240px]">
            Unified platform for shop drawings, warranties, submittals, and sales pipeline management.
          </p>
        </div>

        {/* ── Right Panel — Auth ──────────────────────────────── */}
        <div className="flex-1 flex flex-col p-8 overflow-y-auto">
          {/* Tab Switcher */}
          <div className="flex gap-1 p-1 rounded-xl mb-8 self-start"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            {(['signin', 'demo'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${activeTab === tab
                    ? 'bg-blue-500/20 text-blue-300 shadow-sm'
                    : 'text-white/40 hover:text-white/60'
                  }
                `}
                style={
                  activeTab === tab
                    ? { border: '1px solid rgba(96,165,250,0.25)' }
                    : { border: '1px solid transparent' }
                }
              >
                {tab === 'signin' ? 'Sign In' : 'Try Demo'}
              </button>
            ))}
          </div>

          {/* ── Sign In Tab ───────────────────────────────────── */}
          {activeTab === 'signin' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <svg
                  className="w-7 h-7 text-white/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>

              <h2 className="text-lg font-semibold text-white/80 mb-2">
                Production Auth
              </h2>

              <p className="text-sm text-white/40 max-w-[280px] leading-relaxed">
                Production authentication is not configured. Switch to the{' '}
                <button
                  onClick={() => setActiveTab('demo')}
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                >
                  Demo mode
                </button>{' '}
                to explore the platform with a sample role.
              </p>
            </div>
          )}

          {/* ── Demo Tab ──────────────────────────────────────── */}
          {activeTab === 'demo' && (
            <div className="flex-1 flex flex-col">
              <p className="text-sm text-white/50 mb-5">
                Select a role to explore the platform with sample data.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                {ROLE_CARDS.map((card) => {
                  const user = DEMO_USERS[card.role];
                  const isHovered = hoveredRole === card.role;

                  return (
                    <button
                      key={card.role}
                      onClick={() => login(card.role)}
                      onMouseEnter={() => setHoveredRole(card.role)}
                      onMouseLeave={() => setHoveredRole(null)}
                      className="group relative flex flex-col items-start p-5 rounded-xl text-left transition-all duration-300 cursor-pointer"
                      style={{
                        background: isHovered
                          ? 'rgba(255,255,255,0.10)'
                          : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${isHovered ? card.color + '60' : 'rgba(255,255,255,0.08)'}`,
                        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                        boxShadow: isHovered
                          ? `0 8px 32px ${card.color}20, 0 0 0 1px ${card.color}30`
                          : '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      {/* Role color accent bar */}
                      <div
                        className="absolute top-0 left-4 right-4 h-[2px] rounded-b-full transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
                          opacity: isHovered ? 1 : 0,
                        }}
                      />

                      {/* Avatar + Role Label Row */}
                      <div className="flex items-center gap-3 mb-3 w-full">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-shadow duration-300"
                          style={{
                            background: `${card.color}25`,
                            color: card.color,
                            border: `2px solid ${card.color}50`,
                            boxShadow: isHovered
                              ? `0 0 16px ${card.color}30`
                              : 'none',
                          }}
                        >
                          {user.avatar_initials}
                        </div>

                        <div className="min-w-0">
                          <div
                            className="text-xs font-semibold tracking-wider uppercase mb-0.5"
                            style={{ color: card.color }}
                          >
                            {card.label}
                          </div>
                          <div className="text-sm font-medium text-white/90 truncate">
                            {user.name}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-white/40 leading-relaxed line-clamp-2">
                        {card.description}
                      </p>

                      {/* Hover arrow */}
                      <div
                        className="absolute bottom-4 right-4 transition-all duration-300"
                        style={{
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? 'translateX(0)' : 'translateX(-4px)',
                        }}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke={card.color}
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer hint */}
              <p className="mt-5 text-[11px] text-white/25 text-center">
                Demo mode uses synthetic data. No credentials are stored.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
