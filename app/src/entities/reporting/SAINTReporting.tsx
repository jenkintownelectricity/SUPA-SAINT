'use client';
// ═══════════════════════════════════════════════════════════════════════
// SAINT Reporting — Analytics & Dashboards by Role
// Entity: reporting | Roles: gcp_admin (all), sales_rep (sales),
//   gcp_engineer (engineering), contractor (DENIED)
// ═══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { BarChart3, TrendingUp, PieChart, Calendar, Download, ShieldX, DollarSign, Target } from 'lucide-react';
import type { Role } from '@/lib/types';
import { useSAINTKernel } from '@/kernel/SAINTKernel';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { getExecutiveKPIs } from '@/data/store';

type DashboardTab = 'executive' | 'sales' | 'engineering';
type DateRange = '7d' | '30d' | '90d' | 'ytd';

const ICON_MAP: Record<string, React.ElementType> = {
  DollarSign,
  TrendingUp,
  Target,
  BarChart3,
};

function getAvailableTabs(role: Role): DashboardTab[] {
  switch (role) {
    case 'gcp_admin': return ['executive', 'sales', 'engineering'];
    case 'sales_rep': return ['sales'];
    case 'gcp_engineer': return ['engineering'];
    default: return [];
  }
}

export function SAINTReporting({ role }: { role: Role }) {
  const { validate } = useSAINTKernel();

  // ── Role Gate ────────────────────────────────────────────────────
  const check = validate({ action: role === 'gcp_admin' ? 'view_all_reports' : 'view_own_reports', role });
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

  const tabs = getAvailableTabs(role);
  const [activeTab, setActiveTab] = useState<DashboardTab>(tabs[0]);
  const [dateRange, setDateRange] = useState<DateRange>('30d');

  // ── Executive Data ───────────────────────────────────────────────
  const executiveKPIs = getExecutiveKPIs();

  // ── Sales Data ───────────────────────────────────────────────────
  const pipelineStages = [
    { label: 'Lead', value: 800000, count: 1, color: 'bg-gray-500' },
    { label: 'Qualified', value: 450000, count: 1, color: 'bg-blue-500' },
    { label: 'Proposal', value: 1200000, count: 1, color: 'bg-yellow-500' },
    { label: 'Negotiation', value: 2100000, count: 1, color: 'bg-orange-500' },
  ];
  const maxPipelineValue = Math.max(...pipelineStages.map(s => s.value), 1);
  const forecastMonths = [
    { month: 'Mar', expected: 2100000, best: 3300000, worst: 680000 },
    { month: 'Apr', expected: 1200000, best: 2400000, worst: 450000 },
    { month: 'May', expected: 800000, best: 1500000, worst: 200000 },
    { month: 'Jun', expected: 450000, best: 900000, worst: 100000 },
  ];
  const maxForecast = Math.max(...forecastMonths.map(m => m.best), 1);

  // ── Engineering Data ─────────────────────────────────────────────
  const drawingsByMonth = [{ month: 'Sep', count: 4 }, { month: 'Oct', count: 6 }, { month: 'Nov', count: 3 }, { month: 'Dec', count: 5 }, { month: 'Jan', count: 8 }, { month: 'Feb', count: 7 }];
  const maxDrawings = Math.max(...drawingsByMonth.map(d => d.count), 1);
  const submittalStats = [
    { status: 'Approved', count: 3, color: 'bg-emerald-500' },
    { status: 'Under Review', count: 2, color: 'bg-blue-500' },
    { status: 'Draft', count: 1, color: 'bg-gray-500' },
    { status: 'Revision Req.', count: 1, color: 'bg-orange-500' },
  ];
  const totalSubmittals = submittalStats.reduce((s, st) => s + st.count, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics & Reporting</h1>
          <p className="text-white/50 text-sm mt-1">{role === 'gcp_admin' ? 'Executive overview — all dashboards' : `${role.replace('_', ' ')} dashboard`}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
            {(['7d', '30d', '90d', 'ytd'] as DateRange[]).map(range => (
              <button key={range} onClick={() => setDateRange(range)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  dateRange === range ? 'bg-blue-500/20 text-blue-400' : 'text-white/40 hover:text-white/70'}`}>
                {range === 'ytd' ? 'YTD' : `Last ${range}`}
              </button>
            ))}
          </div>
          <button className="glass-button flex items-center gap-2 text-sm"><Download size={14} /> Export</button>
        </div>
      </div>

      {/* Tab Bar */}
      {tabs.length > 1 && (
        <div className="flex items-center gap-2 border-b border-white/10 pb-0">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab ? 'text-blue-400 border-blue-400' : 'text-white/40 border-transparent hover:text-white/70'}`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* ── Executive Dashboard ──────────────────────────────────────── */}
      {activeTab === 'executive' && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            {executiveKPIs.map(kpi => {
              const IconComp = ICON_MAP[kpi.icon] || BarChart3;
              const display = typeof kpi.value === 'number' && kpi.value > 1000 ? formatCurrency(kpi.value as number) : formatNumber(kpi.value as number);
              return (
                <div key={kpi.label} className="kpi-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/50 text-sm">{kpi.label}</span>
                    <IconComp size={18} className="text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{display}</div>
                  {kpi.change !== undefined && (
                    <p className="mt-1">
                      <span className={`text-xs font-medium ${kpi.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {kpi.change >= 0 ? '+' : ''}{kpi.change}%</span>{' '}
                      <span className="text-white/30 text-xs">{kpi.changeLabel}</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Revenue Trend Chart */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Revenue Trend</h3>
              <Calendar size={16} className="text-white/30" />
            </div>
            <div className="flex items-end gap-3 h-40">
              {[{ m: 'Sep', v: 185000 }, { m: 'Oct', v: 220000 }, { m: 'Nov', v: 195000 },
                { m: 'Dec', v: 310000 }, { m: 'Jan', v: 280000 }, { m: 'Feb', v: 390000 }].map((d, i) => (
                <div key={d.m} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-white/40 text-[10px]">{formatCurrency(d.v)}</span>
                  <div className="w-full relative" style={{ height: `${Math.max((d.v / 390000) * 100, 8)}%` }}>
                    <div className={`absolute inset-0 rounded-t-md ${i === 5 ? 'bg-blue-500' : 'bg-blue-500/40'}`} />
                  </div>
                  <span className="text-white/30 text-xs">{d.m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Sales Dashboard ──────────────────────────────────────────── */}
      {activeTab === 'sales' && (
        <div className="space-y-6">
          {/* Pipeline by Stage */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Pipeline by Stage</h3>
              <PieChart size={16} className="text-white/30" />
            </div>
            <div className="space-y-3">
              {pipelineStages.map(stage => (
                <div key={stage.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/70 text-sm">{stage.label} <span className="text-white/30 text-xs">({stage.count})</span></span>
                    <span className="text-white text-sm font-medium">{formatCurrency(stage.value)}</span>
                  </div>
                  <div className="h-4 rounded-full bg-white/5 overflow-hidden">
                    <div className={`h-full rounded-full ${stage.color} opacity-70`}
                      style={{ width: `${Math.max((stage.value / maxPipelineValue) * 100, 2)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Forecast */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Quarterly Forecast</h3>
              <TrendingUp size={16} className="text-white/30" />
            </div>
            <div className="flex items-end gap-6 h-44">
              {forecastMonths.map(fm => (
                <div key={fm.month} className="flex-1 flex flex-col items-center">
                  <div className="flex items-end gap-1 w-full justify-center" style={{ height: '140px' }}>
                    <div className="w-4 rounded-t-sm bg-emerald-500/30" style={{ height: `${Math.max((fm.best / maxForecast) * 100, 5)}%` }} title={`Best: ${formatCurrency(fm.best)}`} />
                    <div className="w-4 rounded-t-sm bg-blue-500/60" style={{ height: `${Math.max((fm.expected / maxForecast) * 100, 5)}%` }} title={`Expected: ${formatCurrency(fm.expected)}`} />
                    <div className="w-4 rounded-t-sm bg-red-500/30" style={{ height: `${Math.max((fm.worst / maxForecast) * 100, 5)}%` }} title={`Worst: ${formatCurrency(fm.worst)}`} />
                  </div>
                  <span className="text-white/30 text-xs mt-2">{fm.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-white/5">
              {[{ c: 'bg-emerald-500/30', l: 'Best Case' }, { c: 'bg-blue-500/60', l: 'Expected' }, { c: 'bg-red-500/30', l: 'Worst Case' }].map(legend => (
                <div key={legend.l} className="flex items-center gap-1.5">
                  <div className={`w-3 h-3 rounded-sm ${legend.c}`} />
                  <span className="text-white/40 text-xs">{legend.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Engineering Dashboard ────────────────────────────────────── */}
      {activeTab === 'engineering' && (
        <div className="space-y-6">
          {/* Engineering KPIs */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Drawings This Month', val: '7', sub: '+2 vs last month', subColor: 'text-emerald-400', Icon: BarChart3, ic: 'text-blue-400' },
              { label: 'Submittals Approved', val: '3', sub: 'of 7 total', subColor: 'text-white/30', Icon: Target, ic: 'text-emerald-400' },
              { label: 'Avg Review Time', val: '4.2d', sub: '-0.8d vs last month', subColor: 'text-emerald-400', Icon: Calendar, ic: 'text-yellow-400' },
              { label: 'AI Confidence', val: '94%', sub: '+3% vs last month', subColor: 'text-emerald-400', Icon: TrendingUp, ic: 'text-purple-400' },
            ].map(k => (
              <div key={k.label} className="kpi-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/50 text-sm">{k.label}</span>
                  <k.Icon size={18} className={k.ic} />
                </div>
                <div className="text-2xl font-bold text-white">{k.val}</div>
                <span className={`${k.subColor} text-xs`}>{k.sub}</span>
              </div>
            ))}
          </div>

          {/* Drawings Produced */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Shop Drawings Produced</h3>
              <BarChart3 size={16} className="text-white/30" />
            </div>
            <div className="flex items-end gap-4 h-40">
              {drawingsByMonth.map((d, i) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-white/40 text-xs">{d.count}</span>
                  <div className="w-full relative" style={{ height: `${Math.max((d.count / maxDrawings) * 100, 8)}%` }}>
                    <div className={`absolute inset-0 rounded-t-md ${i === drawingsByMonth.length - 1 ? 'bg-blue-500' : 'bg-blue-500/30'}`} />
                  </div>
                  <span className="text-white/30 text-xs">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Submittal Status Breakdown */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Submittal Status</h3>
              <PieChart size={16} className="text-white/30" />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <div className="h-8 rounded-full overflow-hidden flex">
                  {submittalStats.map(st => (
                    <div key={st.status} className={`${st.color} opacity-70`}
                      style={{ width: `${(st.count / totalSubmittals) * 100}%` }} title={`${st.status}: ${st.count}`} />
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3">
                  {submittalStats.map(st => (
                    <div key={st.status} className="flex items-center gap-1.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${st.color}`} />
                      <span className="text-white/50 text-xs">{st.status} ({st.count})</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center px-6">
                <div className="text-4xl font-bold text-white">{totalSubmittals}</div>
                <div className="text-white/40 text-xs mt-1">Total Submittals</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
