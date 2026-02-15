// ═══════════════════════════════════════════════════════════════════════
// SAINT Theme — Default ValidKernel Dark Theme with Glassmorphism
// Extracted from SAINT_SHELL.lds.json theming block
// ═══════════════════════════════════════════════════════════════════════

import type { ThemeConfig } from '@/lib/types';

export const DEFAULT_THEME: ThemeConfig = {
  app_name: 'PROJECT SAINT',
  tagline: 'Building Envelope Intelligence',
  background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
  glass: 'rgba(255,255,255,0.06)',
  glass_border: 'rgba(255,255,255,0.1)',
  text_primary: '#ffffff',
  text_secondary: 'rgba(255,255,255,0.6)',
  accent: '#60a5fa',
  success: '#34d399',
  warning: '#fbbf24',
  error: '#f87171',
  sidebar_bg: 'rgba(0,0,0,0.3)',
};

export const ROLE_COLORS: Record<string, string> = {
  gcp_admin: '#1E40AF',
  gcp_engineer: '#059669',
  sales_rep: '#D97706',
  contractor: '#7C3AED',
};

export const STAGE_PROBABILITIES: Record<string, number> = {
  lead: 10,
  qualified: 25,
  spec_review: 40,
  proposal: 60,
  negotiation: 75,
  verbal_commit: 90,
  closed_won: 100,
  closed_lost: 0,
};
