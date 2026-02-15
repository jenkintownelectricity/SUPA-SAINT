'use client';
// ═══════════════════════════════════════════════════════════════════════
// SAINT Entity — Opportunity Scraper Dashboard
// Role-gated opportunity management with scoring and territory mapping
// ═══════════════════════════════════════════════════════════════════════

import { useState, useMemo } from 'react';
import { Target, TrendingUp, MapPin, Filter } from 'lucide-react';
import { useSAINTKernel } from '@/kernel/SAINTKernel';
import { getOpportunities } from '@/data/store';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils';
import type { Role, Opportunity, OpportunityStatus } from '@/lib/types';

// ─── Score badge color mapping ───────────────────────────────────────
function getScoreColor(score: number): { bg: string; text: string; ring: string } {
  if (score >= 80) return { bg: 'bg-emerald-400', text: 'text-emerald-400', ring: 'ring-emerald-400/30' };
  if (score >= 60) return { bg: 'bg-yellow-400', text: 'text-yellow-400', ring: 'ring-yellow-400/30' };
  return { bg: 'bg-gray-400', text: 'text-gray-400', ring: 'ring-gray-400/30' };
}

// ─── GCP Fit badge styling ───────────────────────────────────────────
function getFitBadge(fit: string): string {
  switch (fit) {
    case 'high': return 'bg-emerald-400/15 border-emerald-400/30 text-emerald-400';
    case 'medium': return 'bg-yellow-400/15 border-yellow-400/30 text-yellow-400';
    case 'low': return 'bg-orange-400/15 border-orange-400/30 text-orange-400';
    default: return 'bg-gray-400/15 border-gray-400/30 text-gray-400';
  }
}

// ─── Urgency badge styling ───────────────────────────────────────────
function getUrgencyBadge(urgency: string): string {
  switch (urgency) {
    case 'immediate': return 'bg-red-400/15 border-red-400/30 text-red-400';
    case 'near_term': return 'bg-orange-400/15 border-orange-400/30 text-orange-400';
    case 'pipeline': return 'bg-blue-400/15 border-blue-400/30 text-blue-400';
    default: return 'bg-gray-400/15 border-gray-400/30 text-gray-400';
  }
}

export function SAINTOppScraper({ role }: { role: Role }) {
  const kernel = useSAINTKernel();
  const [statusFilter, setStatusFilter] = useState<OpportunityStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // ─── Kernel validation ─────────────────────────────────────────────
  const accessCheck = kernel.validate({ action: 'view_opportunities', role });
  const canScore = kernel.validate({ action: 'score_opportunities', role }).result === 'ALLOWED';
  const canAssign = kernel.validate({ action: 'assign_opportunities', role }).result === 'ALLOWED';

  if (accessCheck.result !== 'ALLOWED') {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="glass-card p-8 text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-400/10 border border-red-400/20 flex items-center justify-center">
            <Target className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Access Denied</h3>
          <p className="text-white/50 text-sm">
            {accessCheck.reason || 'Opportunity management is not available for your role.'}
          </p>
          <p className="text-white/30 text-xs mt-3">
            Role: <span className="text-white/50">{role}</span> | Audit: <span className="text-white/50">{accessCheck.auditId}</span>
          </p>
        </div>
      </div>
    );
  }

  // ─── Load demo data ────────────────────────────────────────────────
  const opportunities: Opportunity[] = getOpportunities();

  // ─── Compute KPIs ──────────────────────────────────────────────────
  const totalOpps = opportunities.length;
  const hotOpps = opportunities.filter(o => o.score >= 80).length;
  const avgScore = totalOpps > 0
    ? Math.round(opportunities.reduce((sum, o) => sum + o.score, 0) / totalOpps)
    : 0;
  const totalValue = opportunities.reduce((sum, o) => sum + o.estimated_value, 0);

  // ─── Filtering ─────────────────────────────────────────────────────
  const filteredOpps = opportunities.filter(o => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesSearch = searchQuery === '' ||
      o.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.project_address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.project_city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const kpis = [
    { label: 'Total Opportunities', value: String(totalOpps), color: 'text-white', icon: <Target className="w-5 h-5" /> },
    { label: 'Hot (Score >= 80)', value: String(hotOpps), color: 'text-emerald-400', icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Avg Score', value: String(avgScore), color: 'text-yellow-400', icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Total Value', value: formatCurrency(totalValue), color: 'text-blue-400', icon: <MapPin className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-6">
      {/* ─── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Opportunity Scraper</h2>
          <p className="text-white/50 text-sm mt-1">
            AI-scored construction opportunities for GCP product placement
          </p>
        </div>
        {canAssign && (
          <button className="glass-button flex items-center gap-2 px-4 py-2 text-sm font-medium">
            <Target className="w-4 h-4" />
            Scan for Opportunities
          </button>
        )}
      </div>

      {/* ─── KPI Cards ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="kpi-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/50 text-xs font-medium uppercase tracking-wider">
                {kpi.label}
              </span>
              <span className={`${kpi.color} opacity-60`}>{kpi.icon}</span>
            </div>
            <div className={`text-3xl font-bold ${kpi.color}`}>
              {kpi.value}
            </div>
          </div>
        ))}
      </div>

      {/* ─── Filters Bar ────────────────────────────────────────────── */}
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2 text-white/50">
            <Filter className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Filters</span>
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by project name, address, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['all', 'new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                  statusFilter === status
                    ? 'bg-white/10 border-white/20 text-white'
                    : 'bg-white/[0.03] border-white/[0.06] text-white/40 hover:text-white/60 hover:border-white/10'
                }`}
              >
                {status === 'all' ? 'All' : status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Opportunities Table ────────────────────────────────────── */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Project Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Address</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Value</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Score</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">GCP Fit</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Urgency</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filteredOpps.map((opp) => {
                const scoreColors = getScoreColor(opp.score);
                return (
                  <tr
                    key={opp.id}
                    className="hover:bg-white/[0.03] transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <span className="text-sm font-medium text-white">{opp.project_name}</span>
                        <p className="text-xs text-white/30 mt-0.5">{opp.opportunity_type.replace(/_/g, ' ')}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-white/30 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-sm text-white/60">{opp.project_address}</span>
                          <p className="text-xs text-white/30">{opp.project_city}, {opp.project_state} {opp.project_zip}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-semibold text-white">
                        {formatCurrency(opp.estimated_value)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${scoreColors.bg} ring-2 ${scoreColors.ring}`} />
                        <span className={`text-sm font-bold ${scoreColors.text}`}>
                          {opp.score}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`status-badge px-2 py-0.5 text-xs font-medium rounded-full border ${getFitBadge(opp.gcp_product_fit)}`}>
                        {opp.gcp_product_fit}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`status-badge px-2 py-0.5 text-xs font-medium rounded-full border ${getUrgencyBadge(opp.urgency)}`}>
                        {opp.urgency.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs font-medium ${getStatusColor(opp.status)}`}>
                        {opp.status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-white/40 font-mono">{opp.source}</span>
                    </td>
                  </tr>
                );
              })}
              {filteredOpps.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center">
                    <Target className="w-8 h-8 text-white/20 mx-auto mb-3" />
                    <p className="text-white/40 text-sm">No opportunities match the current filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ─── Table Footer ────────────────────────────────────────── */}
        <div className="border-t border-white/[0.06] px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-white/30">
            Showing {filteredOpps.length} of {totalOpps} opportunities
          </span>
          <div className="flex items-center gap-3 text-xs text-white/30">
            <span>Role: <span className="text-white/50">{role}</span></span>
            <span className="text-white/10">|</span>
            <span>Score: <span className={canScore ? 'text-emerald-400' : 'text-gray-400'}>{canScore ? 'Enabled' : 'Disabled'}</span></span>
            <span className="text-white/10">|</span>
            <span>Assign: <span className={canAssign ? 'text-emerald-400' : 'text-gray-400'}>{canAssign ? 'Enabled' : 'Disabled'}</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
