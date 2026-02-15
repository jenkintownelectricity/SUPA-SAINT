'use client';
// ═══════════════════════════════════════════════════════════════════════
// SAINT Territories — Territory Management & Coverage Analysis
// Entity: territories | Roles: sales_rep (view own), gcp_admin (manage all)
// ═══════════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { Map, MapPin, Users, Target, BarChart3, ShieldX, ChevronDown, ChevronUp } from 'lucide-react';
import type { Role, Territory } from '@/lib/types';
import { useSAINTKernel } from '@/kernel/SAINTKernel';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { getTerritories } from '@/data/store';

export function SAINTTerritories({ role }: { role: Role }) {
  const { validate } = useSAINTKernel();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // ── Role Gate ────────────────────────────────────────────────────
  const action = role === 'gcp_admin' ? 'manage_territories' : 'view_own_territory';
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
  const territories = getTerritories();

  const totalPipeline = territories.reduce((s, t) => s + t.pipeline_value, 0);
  const totalHot = territories.reduce((s, t) => s + t.hot_opportunities, 0);
  const totalOpps = territories.reduce((s, t) => s + t.opportunities_count, 0);
  const totalZips = territories.reduce((s, t) => s + t.zip_codes.length, 0);
  const coveredZips = territories.filter(t => t.active).reduce((s, t) => s + t.zip_codes.length, 0);
  const coverage = totalZips > 0 ? Math.round((coveredZips / totalZips) * 100) : 0;

  // ── KPI Cards ────────────────────────────────────────────────────
  const kpis = [
    { label: 'Territories', value: formatNumber(territories.length), icon: Map, color: 'text-blue-400' },
    { label: 'Total Pipeline', value: formatCurrency(totalPipeline), icon: BarChart3, color: 'text-emerald-400' },
    { label: 'Hot Opportunities', value: formatNumber(totalHot), icon: Target, color: 'text-orange-400' },
    { label: 'Coverage', value: `${coverage}%`, icon: MapPin, color: 'text-purple-400' },
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Territory Management</h1>
        <p className="text-white/50 text-sm mt-1">
          {role === 'gcp_admin' ? 'All territories' : 'Your assigned territory'} — {totalOpps} total opportunities
        </p>
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

      {/* Territory Table */}
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-white/50 text-xs font-medium py-3 px-4">Name</th>
              <th className="text-left text-white/50 text-xs font-medium py-3 px-4">Code</th>
              <th className="text-left text-white/50 text-xs font-medium py-3 px-4">Region</th>
              <th className="text-left text-white/50 text-xs font-medium py-3 px-4">District</th>
              <th className="text-left text-white/50 text-xs font-medium py-3 px-4">Assigned Rep</th>
              <th className="text-center text-white/50 text-xs font-medium py-3 px-4">ZIPs</th>
              <th className="text-right text-white/50 text-xs font-medium py-3 px-4">Pipeline</th>
              <th className="text-center text-white/50 text-xs font-medium py-3 px-4">Opps</th>
              <th className="text-right text-white/50 text-xs font-medium py-3 px-4">Quota</th>
              <th className="text-left text-white/50 text-xs font-medium py-3 px-4 min-w-[140px]">Attainment</th>
              <th className="text-center text-white/50 text-xs font-medium py-3 px-4 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {territories.map(territory => {
              const attainment = territory.quota > 0
                ? Math.round((territory.pipeline_value / territory.quota) * 100)
                : 0;
              const attainmentColor = attainment >= 100
                ? 'bg-emerald-500'
                : attainment >= 75
                  ? 'bg-blue-500'
                  : attainment >= 50
                    ? 'bg-yellow-500'
                    : 'bg-red-500';
              const isExpanded = expandedId === territory.id;

              return (
                <React.Fragment key={territory.id}>
                  <tr
                    className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => toggleExpand(territory.id)}
                  >
                    <td className="py-3 px-4 text-white text-sm font-medium">{territory.name}</td>
                    <td className="py-3 px-4 text-white/60 text-sm font-mono">{territory.code}</td>
                    <td className="py-3 px-4 text-white/60 text-sm">{territory.region}</td>
                    <td className="py-3 px-4 text-white/60 text-sm">{territory.district}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-white/30" />
                        <span className="text-white/70 text-sm">{territory.assigned_rep_name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center text-white/50 text-sm">{territory.zip_codes.length}</td>
                    <td className="py-3 px-4 text-right text-white text-sm font-medium">
                      {formatCurrency(territory.pipeline_value)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-white/70 text-sm">{territory.opportunities_count}</span>
                        {territory.hot_opportunities > 0 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 font-medium">
                            {territory.hot_opportunities} hot
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-white/50 text-sm">{formatCurrency(territory.quota)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${attainmentColor} transition-all`}
                            style={{ width: `${Math.min(attainment, 100)}%` }}
                          />
                        </div>
                        <span className="text-white/60 text-xs min-w-[36px] text-right">{attainment}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {isExpanded
                        ? <ChevronUp size={14} className="text-white/30" />
                        : <ChevronDown size={14} className="text-white/30" />}
                    </td>
                  </tr>

                  {/* Expanded Detail */}
                  {isExpanded && (
                    <tr>
                      <td colSpan={11} className="px-4 pb-4">
                        <div className="mt-2 p-4 rounded-lg bg-white/[0.03] border border-white/5">
                          <div className="grid grid-cols-3 gap-6">
                            <div>
                              <h4 className="text-white/40 text-xs uppercase tracking-wider mb-2">States</h4>
                              <div className="flex flex-wrap gap-1">
                                {territory.states.map(state => (
                                  <span key={state} className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-medium">
                                    {state}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-white/40 text-xs uppercase tracking-wider mb-2">Counties</h4>
                              <div className="flex flex-wrap gap-1">
                                {territory.counties.map(county => (
                                  <span key={county} className="px-2 py-1 rounded bg-white/5 text-white/60 text-xs">
                                    {county}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-white/40 text-xs uppercase tracking-wider mb-2">Center Coordinates</h4>
                              <p className="text-white/60 text-sm font-mono">
                                {territory.center_lat.toFixed(4)}, {territory.center_lng.toFixed(4)}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <h4 className="text-white/40 text-xs uppercase tracking-wider mb-2">
                              ZIP Codes ({territory.zip_codes.length})
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {territory.zip_codes.map(zip => (
                                <span key={zip} className="px-1.5 py-0.5 rounded bg-white/5 text-white/40 text-[10px] font-mono">
                                  {zip}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Map Placeholder */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Map size={18} className="text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Territory Map</h3>
        </div>
        <div className="h-64 rounded-lg bg-white/[0.03] border border-white/10 border-dashed flex flex-col items-center justify-center">
          <MapPin size={32} className="text-white/20 mb-3" />
          <p className="text-white/30 text-sm font-medium">Mapbox integration required</p>
          <p className="text-white/20 text-xs mt-1">
            {territories.length} territories | {totalZips} ZIP codes | {territories.reduce((s, t) => s + t.states.length, 0)} states
          </p>
          <div className="flex items-center gap-4 mt-4">
            {territories.map(t => (
              <div key={t.id} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-white/40 text-xs">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
