'use client';
// ═══════════════════════════════════════════════════════════════════════
// SAINT Pipeline — Sales Pipeline Kanban & Deal Management
// Entity: pipeline | Roles: sales_rep (own), gcp_admin (all)
// ═══════════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from 'react';
import { TrendingUp, DollarSign, Target, Clock, BarChart3, ShieldX } from 'lucide-react';
import type { Role, Deal, DealStage } from '@/lib/types';
import { useSAINTKernel } from '@/kernel/SAINTKernel';
import { formatCurrency, formatDate, getStatusColor, formatNumber } from '@/lib/utils';
import { getDeals } from '@/data/store';

type ViewTab = 'kanban' | 'list' | 'forecast';

const STAGES: { key: DealStage; label: string; color: string }[] = [
  { key: 'lead', label: 'Lead', color: 'border-gray-500/40 bg-gray-500/5' },
  { key: 'qualified', label: 'Qualified', color: 'border-blue-500/40 bg-blue-500/5' },
  { key: 'spec_review', label: 'Spec Review', color: 'border-blue-400/40 bg-blue-400/5' },
  { key: 'proposal', label: 'Proposal', color: 'border-yellow-500/40 bg-yellow-500/5' },
  { key: 'negotiation', label: 'Negotiation', color: 'border-orange-500/40 bg-orange-500/5' },
  { key: 'verbal_commit', label: 'Verbal Commit', color: 'border-emerald-400/40 bg-emerald-400/5' },
  { key: 'closed_won', label: 'Closed Won', color: 'border-emerald-500/40 bg-emerald-500/5' },
  { key: 'closed_lost', label: 'Closed Lost', color: 'border-red-500/40 bg-red-500/5' },
];

const STAGE_HEADER_COLORS: Record<string, string> = {
  lead: 'bg-gray-500',
  qualified: 'bg-blue-500',
  spec_review: 'bg-blue-400',
  proposal: 'bg-yellow-500',
  negotiation: 'bg-orange-500',
  verbal_commit: 'bg-emerald-400',
  closed_won: 'bg-emerald-500',
  closed_lost: 'bg-red-500',
};

export function SAINTPipeline({ role }: { role: Role }) {
  const { validate } = useSAINTKernel();
  const [activeView, setActiveView] = useState<ViewTab>('kanban');

  // ── Role Gate ────────────────────────────────────────────────────
  const action = role === 'gcp_admin' ? 'manage_pipeline' : 'manage_own_pipeline';
  const check = validate({ action, role });

  if (check.result === 'DENIED') {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="glass-card max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-400/10 border border-red-400/20 flex items-center justify-center">
            <ShieldX size={28} className="text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Access Denied</h2>
          <p className="text-white/60">{check.reason}</p>
          <p className="text-xs text-white/30 mt-3">Audit: {check.auditId} | {check.latencyMs.toFixed(2)}ms</p>
        </div>
      </div>
    );
  }

  // ── Data ─────────────────────────────────────────────────────────
  const deals = getDeals();

  const totalPipeline = deals.reduce((s, d) => s + d.value, 0);
  const weightedPipeline = deals.reduce((s, d) => s + d.weighted_value, 0);
  const wonDeals = deals.filter(d => d.stage === 'closed_won').length;
  const lostDeals = deals.filter(d => d.stage === 'closed_lost').length;
  const closedDeals = wonDeals + lostDeals;
  const winRate = closedDeals > 0 ? Math.round((wonDeals / closedDeals) * 100) : 0;
  const activeDeals = deals.filter(d => d.stage !== 'closed_won' && d.stage !== 'closed_lost');
  const avgDealSize = activeDeals.length > 0 ? Math.round(totalPipeline / deals.length) : 0;

  const dealsByStage = useMemo(() => {
    const grouped: Record<string, Deal[]> = {};
    STAGES.forEach(s => { grouped[s.key] = []; });
    deals.forEach(d => {
      if (grouped[d.stage]) grouped[d.stage].push(d);
    });
    return grouped;
  }, [deals]);

  // ── KPI Cards ────────────────────────────────────────────────────
  const kpis = [
    { label: 'Total Pipeline', value: formatCurrency(totalPipeline), icon: DollarSign, color: 'text-blue-400' },
    { label: 'Weighted', value: formatCurrency(weightedPipeline), icon: TrendingUp, color: 'text-emerald-400' },
    { label: 'Win Rate', value: `${winRate}%`, icon: Target, color: 'text-yellow-400' },
    { label: 'Avg Deal Size', value: formatCurrency(avgDealSize), icon: BarChart3, color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Sales Pipeline</h1>
          <p className="text-white/50 text-sm mt-1">
            {role === 'gcp_admin' ? 'All pipelines' : 'Your pipeline'} — {formatNumber(deals.length)} deals
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(['kanban', 'list', 'forecast'] as ViewTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveView(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === tab
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map(kpi => (
          <div key={kpi.label} className="kpi-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/50 text-sm">{kpi.label}</span>
              <kpi.icon size={18} className={kpi.color} />
            </div>
            <div className="text-2xl font-bold text-white">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* View Content */}
      {activeView === 'kanban' && (
        <div className="flex gap-3 overflow-x-auto pb-4">
          {STAGES.map(stage => {
            const stageDeals = dealsByStage[stage.key] || [];
            const stageTotal = stageDeals.reduce((s, d) => s + d.value, 0);
            return (
              <div key={stage.key} className={`min-w-[260px] flex-shrink-0 rounded-xl border ${stage.color} p-3`}>
                {/* Column Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${STAGE_HEADER_COLORS[stage.key]}`} />
                    <span className="text-white text-sm font-semibold">{stage.label}</span>
                    <span className="text-white/40 text-xs">({stageDeals.length})</span>
                  </div>
                  <span className="text-white/40 text-xs">{formatCurrency(stageTotal)}</span>
                </div>

                {/* Deal Cards */}
                <div className="space-y-2">
                  {stageDeals.map(deal => (
                    <div key={deal.id} className="glass-card p-3 cursor-pointer hover:border-white/20 transition-all">
                      <h4 className="text-white text-sm font-medium truncate">{deal.deal_name}</h4>
                      <p className="text-white/40 text-xs mt-1">{deal.company_name}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-white font-semibold text-sm">{formatCurrency(deal.value)}</span>
                        <div className="flex items-center gap-1 text-white/30 text-xs">
                          <Clock size={10} />
                          <span>{deal.total_age_days}d</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {deal.products.slice(0, 2).map(p => (
                          <span key={p} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/50">{p}</span>
                        ))}
                        {deal.products.length > 2 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/40">
                            +{deal.products.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {stageDeals.length === 0 && (
                    <div className="text-center py-6 text-white/20 text-xs">No deals</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeView === 'list' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-white/50 text-xs font-medium py-3 px-4">Deal</th>
                <th className="text-left text-white/50 text-xs font-medium py-3 px-4">Company</th>
                <th className="text-left text-white/50 text-xs font-medium py-3 px-4">Stage</th>
                <th className="text-right text-white/50 text-xs font-medium py-3 px-4">Value</th>
                <th className="text-right text-white/50 text-xs font-medium py-3 px-4">Probability</th>
                <th className="text-right text-white/50 text-xs font-medium py-3 px-4">Close Date</th>
                <th className="text-right text-white/50 text-xs font-medium py-3 px-4">Age</th>
              </tr>
            </thead>
            <tbody>
              {deals.map(deal => (
                <tr key={deal.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-white text-sm font-medium">{deal.deal_name}</td>
                  <td className="py-3 px-4 text-white/60 text-sm">{deal.company_name}</td>
                  <td className="py-3 px-4">
                    <span className={`status-badge ${getStatusColor(deal.stage)}`}>
                      {deal.stage.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-white text-sm">{formatCurrency(deal.value)}</td>
                  <td className="py-3 px-4 text-right text-white/60 text-sm">{deal.probability}%</td>
                  <td className="py-3 px-4 text-right text-white/50 text-sm">{formatDate(deal.expected_close_date)}</td>
                  <td className="py-3 px-4 text-right text-white/40 text-sm">{deal.total_age_days}d</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeView === 'forecast' && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Pipeline Forecast</h3>
          <div className="space-y-4">
            {STAGES.filter(s => s.key !== 'closed_won' && s.key !== 'closed_lost').map(stage => {
              const stageDeals = dealsByStage[stage.key] || [];
              const stageTotal = stageDeals.reduce((s, d) => s + d.value, 0);
              const barWidth = totalPipeline > 0 ? Math.max((stageTotal / totalPipeline) * 100, 2) : 0;
              return (
                <div key={stage.key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/70 text-sm">{stage.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 text-xs">{stageDeals.length} deals</span>
                      <span className="text-white text-sm font-medium">{formatCurrency(stageTotal)}</span>
                    </div>
                  </div>
                  <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${STAGE_HEADER_COLORS[stage.key]} opacity-60`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-white/50 text-sm">Weighted forecast total</span>
            <span className="text-emerald-400 text-xl font-bold">{formatCurrency(weightedPipeline)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
