'use client';
// ═══════════════════════════════════════════════════════════════════════
// SAINT API — API Key Management
// Create, monitor, and revoke API keys with usage metrics
// ═══════════════════════════════════════════════════════════════════════

import { useState } from 'react';
import { Key, Code, BarChart3, Plus, Copy } from 'lucide-react';
import { useSAINTKernel } from '@/kernel/SAINTKernel';
import { formatDate, getStatusColor } from '@/lib/utils';
import type { Role } from '@/lib/types';

interface APIKey {
  id: string;
  name: string;
  prefix: string;
  roleScope: Role;
  created: string;
  lastUsed: string | null;
  status: 'active' | 'expired' | 'revoked';
  requestsToday: number;
}

const DEMO_API_KEYS: APIKey[] = [
  { id: 'key-001', name: 'Production Backend', prefix: 'sk_live_9f3k', roleScope: 'gcp_admin', created: '2026-01-05T10:00:00Z', lastUsed: '2026-02-15T09:45:00Z', status: 'active', requestsToday: 1247 },
  { id: 'key-002', name: 'Staging Environment', prefix: 'sk_test_4m2n', roleScope: 'gcp_engineer', created: '2026-01-12T14:30:00Z', lastUsed: '2026-02-14T22:10:00Z', status: 'active', requestsToday: 342 },
  { id: 'key-003', name: 'CI/CD Pipeline', prefix: 'sk_live_7x1p', roleScope: 'gcp_engineer', created: '2025-11-20T08:00:00Z', lastUsed: '2026-02-15T06:30:00Z', status: 'active', requestsToday: 89 },
  { id: 'key-004', name: 'Sales Widget', prefix: 'sk_live_2d8w', roleScope: 'sales_rep', created: '2025-12-01T16:00:00Z', lastUsed: '2026-01-30T11:00:00Z', status: 'expired', requestsToday: 0 },
  { id: 'key-005', name: 'Contractor Portal (Legacy)', prefix: 'sk_live_0q5r', roleScope: 'contractor', created: '2025-09-15T12:00:00Z', lastUsed: null, status: 'revoked', requestsToday: 0 },
];

const USAGE_METRICS = {
  requestsToday: 1678,
  rateLimit: 10000,
  avgLatency: '45ms',
  errorRate: '0.3%',
};

export function SAINTAPI({ role }: { role: Role }) {
  const { validate } = useSAINTKernel();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const canManage = validate({
    action: 'manage_api_keys',
    role,
    context: { entity: 'api' },
  }).result === 'ALLOWED';

  const handleCopy = (prefix: string, id: string) => {
    navigator.clipboard?.writeText(`${prefix}...`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
              <Code size={20} className="text-amber-400" />
            </div>
            API Management
          </h1>
          <p className="text-white/50 mt-1">API keys, usage metrics, and developer resources</p>
        </div>
        {canManage && (
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="glass-button flex items-center gap-2 text-emerald-400"
          >
            <Plus size={16} />
            Create Key
          </button>
        )}
      </div>

      {/* Usage Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="kpi-card">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-1">
            <BarChart3 size={14} />
            Requests Today
          </div>
          <div className="text-2xl font-bold text-white">{USAGE_METRICS.requestsToday.toLocaleString()}</div>
          <div className="mt-2 w-full bg-white/5 rounded-full h-1.5">
            <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: `${(USAGE_METRICS.requestsToday / USAGE_METRICS.rateLimit) * 100}%` }} />
          </div>
          <div className="text-xs text-white/30 mt-1">{((USAGE_METRICS.requestsToday / USAGE_METRICS.rateLimit) * 100).toFixed(1)}% of limit</div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-1">
            <BarChart3 size={14} />
            Rate Limit
          </div>
          <div className="text-2xl font-bold text-white">{USAGE_METRICS.rateLimit.toLocaleString()}</div>
          <div className="text-xs text-white/30 mt-1">requests / day</div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-1">
            <Code size={14} />
            Avg Latency
          </div>
          <div className="text-2xl font-bold text-emerald-400">{USAGE_METRICS.avgLatency}</div>
          <div className="text-xs text-white/30 mt-1">p50 response time</div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-1">
            <BarChart3 size={14} />
            Error Rate
          </div>
          <div className="text-2xl font-bold text-emerald-400">{USAGE_METRICS.errorRate}</div>
          <div className="text-xs text-white/30 mt-1">last 24 hours</div>
        </div>
      </div>

      {/* Create Key Form */}
      {showCreateForm && canManage && (
        <div className="glass-card border border-blue-400/20">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Plus size={18} className="text-blue-400" />
            Create New API Key
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/60 mb-1">Key Name</label>
              <input
                type="text"
                placeholder="e.g. Production Backend"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-blue-400/50"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Role Scope</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/80 focus:outline-none focus:ring-1 focus:ring-blue-400/50">
                <option value="gcp_admin">gcp_admin</option>
                <option value="gcp_engineer">gcp_engineer</option>
                <option value="sales_rep">sales_rep</option>
                <option value="contractor">contractor</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button className="glass-button text-emerald-400 text-sm flex items-center gap-1">
              <Key size={14} />
              Generate Key
            </button>
            <button onClick={() => setShowCreateForm(false)} className="glass-button text-white/40 text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* API Keys Table */}
      <div className="glass-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Key size={18} className="text-amber-400" />
            API Keys
            <span className="text-xs text-white/30 font-normal ml-2">{DEMO_API_KEYS.length} total</span>
          </h2>
          <a href="#" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
            <Code size={14} />
            API Documentation
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Name</th>
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Key Prefix</th>
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Role Scope</th>
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Created</th>
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Last Used</th>
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Status</th>
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Reqs/Day</th>
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {DEMO_API_KEYS.map((apiKey) => (
                <tr key={apiKey.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 text-sm text-white/80 font-medium">{apiKey.name}</td>
                  <td className="py-3 text-sm text-white/50 font-mono">{apiKey.prefix}...</td>
                  <td className="py-3">
                    <span className="status-badge text-blue-400">{apiKey.roleScope}</span>
                  </td>
                  <td className="py-3 text-sm text-white/40">{formatDate(apiKey.created)}</td>
                  <td className="py-3 text-sm text-white/40">{apiKey.lastUsed ? formatDate(apiKey.lastUsed) : '—'}</td>
                  <td className="py-3">
                    <span className={`text-sm font-medium ${getStatusColor(apiKey.status)}`}>
                      {apiKey.status}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-white/60">{apiKey.requestsToday.toLocaleString()}</td>
                  <td className="py-3">
                    <button
                      onClick={() => handleCopy(apiKey.prefix, apiKey.id)}
                      className="text-white/30 hover:text-white/60 transition-colors"
                      title="Copy key prefix"
                    >
                      <Copy size={14} />
                    </button>
                    {copiedId === apiKey.id && (
                      <span className="text-xs text-emerald-400 ml-1">Copied</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!canManage && (
          <div className="mt-4 pt-3 border-t border-white/5 text-xs text-yellow-400/60">
            DENIED — Only gcp_admin can create or revoke API keys
          </div>
        )}
      </div>
    </div>
  );
}
