'use client';
// ═══════════════════════════════════════════════════════════════════════
// SAINT Admin — Platform Administration Console
// System overview, user management, audit log viewer, and system health
// ═══════════════════════════════════════════════════════════════════════

import { Settings, Users, Shield, Activity, Eye } from 'lucide-react';
import { useSAINTKernel } from '@/kernel/SAINTKernel';
import { formatDate, getStatusColor } from '@/lib/utils';
import type { Role } from '@/lib/types';

const PLATFORM_KPIS = [
  { label: 'Total Users', value: 4, icon: Users, color: 'text-blue-400', bgColor: 'bg-blue-500/20 border-blue-500/30' },
  { label: 'Active Entities', value: 15, icon: Settings, color: 'text-purple-400', bgColor: 'bg-purple-500/20 border-purple-500/30' },
  { label: 'Platform Uptime', value: '99.9%', icon: Activity, color: 'text-emerald-400', bgColor: 'bg-emerald-500/20 border-emerald-500/30' },
  { label: 'Kernel Decisions', value: '2.4K', icon: Shield, color: 'text-amber-400', bgColor: 'bg-amber-500/20 border-amber-500/30' },
];

const DEMO_USERS = [
  { id: 'usr-001', name: 'Sarah Chen', email: 'sarah.chen@validkernel.com', role: 'gcp_admin' as Role, title: 'Platform Administrator', lastLogin: '2026-02-15T09:30:00Z', active: true },
  { id: 'usr-002', name: 'Nicole Calpin', email: 'nicole.calpin@validkernel.com', role: 'gcp_engineer' as Role, title: 'Building Envelope Engineer', lastLogin: '2026-02-15T08:15:00Z', active: true },
  { id: 'usr-003', name: 'Marcus Rivera', email: 'marcus.rivera@validkernel.com', role: 'sales_rep' as Role, title: 'Territory Sales Representative', lastLogin: '2026-02-14T17:45:00Z', active: true },
  { id: 'usr-004', name: 'Trinity BE', email: 'trinity@trinitybe.com', role: 'contractor' as Role, title: 'Certified Contractor', lastLogin: '2026-02-13T14:00:00Z', active: true },
];

const ROLE_BADGE_COLORS: Record<Role, string> = {
  gcp_admin: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  gcp_engineer: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  sales_rep: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  contractor: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
};

const SYSTEM_INDICATORS = [
  { name: 'SAINT Kernel', status: 'operational', latency: '0.12ms' },
  { name: 'Audit Pipeline', status: 'operational', latency: '0.08ms' },
  { name: 'Entity Loader', status: 'operational', latency: '1.2ms' },
  { name: 'Auth Provider', status: 'operational', latency: '0.5ms' },
  { name: 'Theme Engine', status: 'operational', latency: '0.03ms' },
];

export function SAINTAdmin({ role }: { role: Role }) {
  const { validate, getRecentAuditEntries } = useSAINTKernel();

  const canManage = validate({
    action: 'manage_admin',
    role,
    context: { entity: 'admin' },
  }).result === 'ALLOWED';

  if (!canManage) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="glass-card max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-400/10 border border-red-400/20 flex items-center justify-center">
            <Shield size={28} className="text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Access Denied</h2>
          <p className="text-white/60">Admin console requires gcp_admin privileges.</p>
          <p className="text-xs text-white/30 mt-3">Current role: {role}</p>
        </div>
      </div>
    );
  }

  const recentAudit = getRecentAuditEntries(20);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <Settings size={20} className="text-blue-400" />
          </div>
          Admin Console
        </h1>
        <p className="text-white/50 mt-1">Platform administration, user management, and system health</p>
      </div>

      {/* Platform KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {PLATFORM_KPIS.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="kpi-card">
              <div className="flex items-center gap-2 text-white/50 text-sm mb-1">
                <Icon size={14} className={kpi.color} />
                {kpi.label}
              </div>
              <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
            </div>
          );
        })}
      </div>

      {/* User Management Table */}
      <div className="glass-card">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Users size={18} className="text-blue-400" />
          User Management
          <span className="text-xs text-white/30 font-normal ml-2">{DEMO_USERS.length} users</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">User</th>
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Role</th>
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Title</th>
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Last Login</th>
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {DEMO_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-xs text-white/60 font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm text-white/80 font-medium">{user.name}</div>
                        <div className="text-xs text-white/30">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`status-badge border ${ROLE_BADGE_COLORS[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-white/50">{user.title}</td>
                  <td className="py-3 text-sm text-white/40">{formatDate(user.lastLogin)}</td>
                  <td className="py-3">
                    <span className={`text-sm ${user.active ? 'text-emerald-400' : 'text-red-400'}`}>
                      {user.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Log Viewer */}
      <div className="glass-card">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Eye size={18} className="text-purple-400" />
          Recent Kernel Decisions
          <span className="text-xs text-white/30 font-normal ml-2">Last {recentAudit.length} entries</span>
        </h2>
        {recentAudit.length === 0 ? (
          <div className="text-center py-8 text-white/30 text-sm">
            No audit entries yet. Kernel decisions will appear here as users interact with the system.
          </div>
        ) : (
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {recentAudit.slice().reverse().map((entry) => (
              <div key={entry.id} className="flex items-center gap-3 py-2 px-3 rounded hover:bg-white/5 transition-colors text-sm">
                <span className={`font-mono text-xs px-2 py-0.5 rounded ${
                  entry.response.result === 'ALLOWED' ? 'bg-emerald-400/10 text-emerald-400' :
                  entry.response.result === 'DENIED' ? 'bg-red-400/10 text-red-400' :
                  'bg-yellow-400/10 text-yellow-400'
                }`}>
                  {entry.response.result}
                </span>
                <span className="text-white/60 flex-1 truncate">{entry.request.action}</span>
                <span className={`status-badge border ${ROLE_BADGE_COLORS[entry.request.role]}`}>
                  {entry.request.role}
                </span>
                <span className="text-white/20 text-xs font-mono">{entry.latencyMs.toFixed(2)}ms</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* System Status */}
      <div className="glass-card">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Activity size={18} className="text-emerald-400" />
          System Status
        </h2>
        <div className="space-y-3">
          {SYSTEM_INDICATORS.map((system) => (
            <div key={system.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-white/80">{system.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-white/30 font-mono">{system.latency}</span>
                <span className={`text-sm ${getStatusColor('active')}`}>Operational</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
