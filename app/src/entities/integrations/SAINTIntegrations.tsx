'use client';
// ═══════════════════════════════════════════════════════════════════════
// SAINT Integrations — Connector Management
// Pre-built integration connectors, health dashboard, and sync status
// ═══════════════════════════════════════════════════════════════════════

import { Plug, RefreshCw, CheckCircle, XCircle, Settings } from 'lucide-react';
import { useSAINTKernel } from '@/kernel/SAINTKernel';
import { formatDate, getStatusColor } from '@/lib/utils';
import type { Role } from '@/lib/types';

interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'connected' | 'not_configured' | 'error';
  lastSync: string | null;
  syncFrequency: string;
  recordsSynced: number;
  color: string;
  icon: string;
}

const INTEGRATIONS: Integration[] = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'CRM',
    description: 'Bi-directional sync of accounts, contacts, and opportunities',
    status: 'connected',
    lastSync: '2026-02-15T09:30:00Z',
    syncFrequency: 'Every 15 min',
    recordsSynced: 12480,
    color: 'blue',
    icon: 'SF',
  },
  {
    id: 'procore',
    name: 'Procore',
    category: 'Construction',
    description: 'Project management, RFIs, submittals, and daily logs',
    status: 'connected',
    lastSync: '2026-02-15T09:15:00Z',
    syncFrequency: 'Every 30 min',
    recordsSynced: 3240,
    color: 'orange',
    icon: 'PC',
  },
  {
    id: 'plangrid',
    name: 'PlanGrid',
    category: 'Field',
    description: 'Field reports, punch lists, and blueprint versioning',
    status: 'not_configured',
    lastSync: null,
    syncFrequency: 'Not set',
    recordsSynced: 0,
    color: 'green',
    icon: 'PG',
  },
  {
    id: 'bim360',
    name: 'BIM 360',
    category: 'Design',
    description: 'BIM model sync, design review, and clash detection data',
    status: 'not_configured',
    lastSync: null,
    syncFrequency: 'Not set',
    recordsSynced: 0,
    color: 'purple',
    icon: 'BIM',
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    category: 'Accounting',
    description: 'Invoice sync, expense tracking, and revenue reporting',
    status: 'connected',
    lastSync: '2026-02-15T06:00:00Z',
    syncFrequency: 'Daily',
    recordsSynced: 856,
    color: 'emerald',
    icon: 'QB',
  },
];

const ICON_BG_COLORS: Record<string, string> = {
  blue: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
  orange: 'bg-orange-500/20 border-orange-500/30 text-orange-400',
  green: 'bg-green-500/20 border-green-500/30 text-green-400',
  purple: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
  emerald: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
};

const HEALTH_METRICS = [
  { label: 'Connected', value: 3, color: 'text-emerald-400' },
  { label: 'Not Configured', value: 2, color: 'text-white/40' },
  { label: 'Errors', value: 0, color: 'text-red-400' },
  { label: 'Total Records', value: '16.6K', color: 'text-blue-400' },
];

export function SAINTIntegrations({ role }: { role: Role }) {
  const { validate } = useSAINTKernel();

  const canManage = validate({
    action: 'manage_integrations',
    role,
    context: { entity: 'integrations' },
  }).result === 'ALLOWED';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <Plug size={20} className="text-indigo-400" />
            </div>
            Integrations
          </h1>
          <p className="text-white/50 mt-1">Manage third-party connectors and data synchronization</p>
        </div>
        {canManage && (
          <button className="glass-button flex items-center gap-2 text-blue-400">
            <RefreshCw size={16} />
            Sync All
          </button>
        )}
      </div>

      {/* Health Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {HEALTH_METRICS.map((metric) => (
          <div key={metric.label} className="kpi-card">
            <div className="text-sm text-white/50 mb-1">{metric.label}</div>
            <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
          </div>
        ))}
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {INTEGRATIONS.map((integration) => {
          const isConnected = integration.status === 'connected';
          const hasError = integration.status === 'error';

          return (
            <div key={integration.id} className="glass-card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-lg border flex items-center justify-center text-xs font-bold ${ICON_BG_COLORS[integration.color]}`}>
                    {integration.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{integration.name}</h3>
                    <span className="text-xs text-white/40">{integration.category}</span>
                  </div>
                </div>
                <div>
                  {isConnected ? (
                    <CheckCircle size={18} className="text-emerald-400" />
                  ) : hasError ? (
                    <XCircle size={18} className="text-red-400" />
                  ) : (
                    <XCircle size={18} className="text-white/20" />
                  )}
                </div>
              </div>

              <p className="text-xs text-white/40 mb-4">{integration.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Status</span>
                  <span className={`font-medium ${
                    isConnected ? 'text-emerald-400' :
                    hasError ? 'text-red-400' :
                    'text-white/30'
                  }`}>
                    {integration.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Sync</span>
                  <span className="text-white/60 flex items-center gap-1">
                    {isConnected && <RefreshCw size={10} className="text-emerald-400 animate-spin" style={{ animationDuration: '3s' }} />}
                    {integration.syncFrequency}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Last Sync</span>
                  <span className="text-white/50 text-xs">
                    {integration.lastSync ? formatDate(integration.lastSync) : '---'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Records</span>
                  <span className="text-white/60">{integration.recordsSynced.toLocaleString()}</span>
                </div>
              </div>

              {canManage && (
                <div className="mt-4 pt-3 border-t border-white/5">
                  <button className="glass-button w-full text-center text-sm flex items-center justify-center gap-2">
                    <Settings size={14} />
                    {isConnected ? 'Configure' : 'Connect'}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!canManage && (
        <div className="glass-card text-center py-4">
          <p className="text-xs text-yellow-400/60">
            DENIED — Only gcp_admin can manage integration connectors
          </p>
        </div>
      )}
    </div>
  );
}
