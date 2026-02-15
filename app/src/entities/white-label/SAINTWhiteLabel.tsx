'use client';
// ═══════════════════════════════════════════════════════════════════════
// SAINT White Label — Branding Engine
// Manage theme configuration, accent colors, logo settings, and preview
// ═══════════════════════════════════════════════════════════════════════

import { useState } from 'react';
import { Palette, Eye, Settings, Save } from 'lucide-react';
import { useSAINTKernel } from '@/kernel/SAINTKernel';
import { formatDate } from '@/lib/utils';
import type { Role } from '@/lib/types';
import { DEFAULT_THEME } from '@/theme/theme';

const BRAND_CONFIG_ROWS = [
  { key: 'app_name', label: 'Application Name', value: DEFAULT_THEME.app_name },
  { key: 'tagline', label: 'Tagline', value: DEFAULT_THEME.tagline },
  { key: 'background', label: 'Background Gradient', value: DEFAULT_THEME.background },
  { key: 'glass', label: 'Glass Opacity', value: DEFAULT_THEME.glass },
  { key: 'glass_border', label: 'Glass Border', value: DEFAULT_THEME.glass_border },
  { key: 'text_primary', label: 'Primary Text', value: DEFAULT_THEME.text_primary },
  { key: 'text_secondary', label: 'Secondary Text', value: DEFAULT_THEME.text_secondary },
  { key: 'sidebar_bg', label: 'Sidebar Background', value: DEFAULT_THEME.sidebar_bg },
];

const ACCENT_COLORS = [
  { label: 'Accent', key: 'accent', value: DEFAULT_THEME.accent },
  { label: 'Success', key: 'success', value: DEFAULT_THEME.success },
  { label: 'Warning', key: 'warning', value: DEFAULT_THEME.warning },
  { label: 'Error', key: 'error', value: DEFAULT_THEME.error },
];

export function SAINTWhiteLabel({ role }: { role: Role }) {
  const { validate } = useSAINTKernel();
  const [previewActive, setPreviewActive] = useState(false);

  const canManage = validate({
    action: 'manage_white_label',
    role,
    context: { entity: 'white-label' },
  }).result === 'ALLOWED';

  const lastUpdated = '2026-01-28T14:30:00Z';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
              <Palette size={20} className="text-purple-400" />
            </div>
            White Label Branding
          </h1>
          <p className="text-white/50 mt-1">Theme configuration and brand identity management</p>
        </div>
        {canManage && (
          <button className="glass-button flex items-center gap-2 text-emerald-400">
            <Save size={16} />
            Save Changes
          </button>
        )}
      </div>

      {/* Current Theme Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="kpi-card">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-1">
            <Settings size={14} />
            Active Theme
          </div>
          <div className="text-xl font-bold text-white">ValidKernel Dark</div>
          <div className="text-xs text-white/40 mt-1">Default glassmorphism</div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-1">
            <Palette size={14} />
            App Name
          </div>
          <div className="text-xl font-bold text-white">{DEFAULT_THEME.app_name}</div>
          <div className="text-xs text-white/40 mt-1">{DEFAULT_THEME.tagline}</div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-1">
            <Eye size={14} />
            Last Updated
          </div>
          <div className="text-xl font-bold text-white">{formatDate(lastUpdated)}</div>
          <div className="text-xs text-white/40 mt-1">by gcp_admin</div>
        </div>
      </div>

      {/* Accent Color Pickers */}
      <div className="glass-card">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Palette size={18} className="text-purple-400" />
          Accent Colors
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ACCENT_COLORS.map((color) => (
            <div key={color.key} className="space-y-2">
              <label className="text-sm text-white/60 block">{color.label}</label>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg border border-white/10 flex-shrink-0"
                  style={{ backgroundColor: color.value }}
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={color.value}
                    readOnly={!canManage}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white/80 font-mono disabled:opacity-50"
                    disabled={!canManage}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {!canManage && (
          <div className="mt-4 text-xs text-yellow-400/60 flex items-center gap-1">
            <Settings size={12} />
            {role === 'gcp_admin' ? 'Read-only mode' : 'DENIED — Only gcp_admin can modify branding'}
          </div>
        )}
      </div>

      {/* Preview Panel */}
      <div className="glass-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Eye size={18} className="text-blue-400" />
            Brand Preview
          </h2>
          <button
            onClick={() => setPreviewActive(!previewActive)}
            className="glass-button text-sm flex items-center gap-1"
          >
            <Eye size={14} />
            {previewActive ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>
        {previewActive && (
          <div
            className="rounded-lg border border-white/10 p-6"
            style={{ background: DEFAULT_THEME.background }}
          >
            <div className="rounded-lg p-4" style={{ background: DEFAULT_THEME.glass, borderColor: DEFAULT_THEME.glass_border, borderWidth: '1px' }}>
              <h3 className="text-lg font-bold" style={{ color: DEFAULT_THEME.text_primary }}>
                {DEFAULT_THEME.app_name}
              </h3>
              <p className="text-sm mt-1" style={{ color: DEFAULT_THEME.text_secondary }}>
                {DEFAULT_THEME.tagline}
              </p>
              <div className="flex gap-3 mt-4">
                <span className="px-3 py-1 rounded text-xs font-medium" style={{ backgroundColor: DEFAULT_THEME.accent, color: '#fff' }}>Accent</span>
                <span className="px-3 py-1 rounded text-xs font-medium" style={{ backgroundColor: DEFAULT_THEME.success, color: '#fff' }}>Success</span>
                <span className="px-3 py-1 rounded text-xs font-medium" style={{ backgroundColor: DEFAULT_THEME.warning, color: '#fff' }}>Warning</span>
                <span className="px-3 py-1 rounded text-xs font-medium" style={{ backgroundColor: DEFAULT_THEME.error, color: '#fff' }}>Error</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Brand Configuration Table */}
      <div className="glass-card">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Settings size={18} className="text-white/60" />
          Full Theme Configuration
          <span className="text-xs text-white/30 font-normal ml-2">ValidKernel defaults</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Property</th>
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Key</th>
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Value</th>
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {BRAND_CONFIG_ROWS.map((row) => (
                <tr key={row.key} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 text-sm text-white/80">{row.label}</td>
                  <td className="py-3 text-sm text-white/40 font-mono">{row.key}</td>
                  <td className="py-3 text-sm text-white/60 font-mono max-w-xs truncate">{row.value}</td>
                  <td className="py-3">
                    {row.value.startsWith('#') || row.value.startsWith('rgba') ? (
                      <div className="w-6 h-6 rounded border border-white/10" style={{ backgroundColor: row.value }} />
                    ) : (
                      <span className="text-xs text-white/30">--</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
