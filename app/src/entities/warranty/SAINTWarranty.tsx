'use client';
// ═══════════════════════════════════════════════════════════════════════
// SAINT Warranty Management — Entity Component
// Manages warranty records, active claims, and claim lifecycle.
// Role-aware: contractor submits, engineer manages, admin oversees.
// ═══════════════════════════════════════════════════════════════════════

import React from 'react';
import type { Role } from '@/lib/types';
import { useSAINTKernel } from '@/kernel/SAINTKernel';
import { formatCurrency, formatDate, getStatusColor, formatNumber } from '@/lib/utils';
import { getWarrantyRecords, getWarrantyClaims } from '@/data/store';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
} from 'lucide-react';

// ─── Helpers ─────────────────────────────────────────────────────────

function getWarrantyStatusBadge(status: string): { label: string; textColor: string; bgColor: string } {
  const map: Record<string, { label: string; textColor: string; bgColor: string }> = {
    active: { label: 'Active', textColor: 'text-emerald-400', bgColor: 'bg-emerald-400/10 border-emerald-400/20' },
    claim_in_progress: { label: 'Claim in Progress', textColor: 'text-orange-400', bgColor: 'bg-orange-400/10 border-orange-400/20' },
    expiring_soon: { label: 'Expiring Soon', textColor: 'text-yellow-400', bgColor: 'bg-yellow-400/10 border-yellow-400/20' },
    expired: { label: 'Expired', textColor: 'text-red-400', bgColor: 'bg-red-400/10 border-red-400/20' },
    voided: { label: 'Voided', textColor: 'text-red-400', bgColor: 'bg-red-400/10 border-red-400/20' },
  };
  return map[status] || { label: status, textColor: 'text-gray-400', bgColor: 'bg-gray-400/10 border-gray-400/20' };
}

function getWarrantyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    product_warranty: 'Product',
    system_warranty: 'System',
    labor_warranty: 'Labor',
  };
  return labels[type] || type;
}

function getClaimSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    critical: 'text-red-400 bg-red-400/10 border-red-400/20',
    major: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    minor: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    cosmetic: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  };
  return colors[severity] || 'text-gray-400 bg-gray-400/10 border-gray-400/20';
}

// ─── Main Component ──────────────────────────────────────────────────

export function SAINTWarranty({ role }: { role: Role }) {
  const { validate } = useSAINTKernel();
  const records = getWarrantyRecords();
  const claims = getWarrantyClaims();

  // Compute KPIs
  const activeCount = records.filter((r) => r.status === 'active').length;
  const systemCount = records.filter((r) => r.warranty_type === 'system_warranty').length;
  const openClaimsCount = claims.filter((c) => c.status !== 'resolved' && c.status !== 'denied_final').length;
  const expiringSoonCount = records.filter((r) => r.status === 'expiring_soon').length;

  // Role-based permissions
  const canSubmitClaim = validate({ action: 'submit_warranty_claim', role });
  const canManageClaims = validate({ action: 'create_warranty_claim', role });
  const canCreateWarranty = validate({ action: 'create_warranty_claim', role });

  // Role context labels
  const roleContext = role === 'contractor'
    ? 'Viewing your warranty records. You may submit new claims.'
    : role === 'gcp_engineer'
    ? 'Managing warranty claims and reviewing submissions.'
    : role === 'gcp_admin'
    ? 'Full warranty oversight across all contractors.'
    : 'View-only access to warranty information.';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Warranty Management</h1>
          <p className="text-white/50 text-sm">{roleContext}</p>
        </div>
        {(canSubmitClaim.result === 'ALLOWED' || canCreateWarranty.result === 'ALLOWED') && (
          <button className="glass-button flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-all">
            <Plus size={16} />
            <span>{role === 'contractor' ? 'Submit Claim' : 'New Warranty'}</span>
          </button>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: 'Active Warranties', value: activeCount + 1, icon: Shield, color: 'text-emerald-400' },
          { label: 'System Warranties', value: systemCount, icon: CheckCircle, color: 'text-blue-400' },
          { label: 'Open Claims', value: openClaimsCount, icon: AlertTriangle, color: 'text-orange-400' },
          { label: 'Expiring Soon', value: expiringSoonCount, icon: Clock, color: 'text-yellow-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="kpi-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/50 uppercase tracking-wider">{kpi.label}</span>
              <kpi.icon size={16} className={kpi.color} />
            </div>
            <div className="text-2xl font-bold text-white">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Warranty Records Table */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Warranty Records</h2>
        <div className="glass-card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Project</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Assembly</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Type</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Products</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Start Date</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">End Date</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => {
                const badge = getWarrantyStatusBadge(record.status);
                return (
                  <tr key={record.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <div className="text-sm text-white font-medium">{record.assembly_location.split(' — ')[0]}</div>
                      <div className="text-xs text-white/40">{record.assembly_location.split(' — ')[1]}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-white/80">{record.assembly_type}</td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-white/70">{getWarrantyTypeLabel(record.warranty_type)}</span>
                      <div className="text-xs text-white/30">{record.warranty_years} year</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-xs text-white/60 max-w-[200px]">
                        {record.products_covered.join(', ')}
                      </div>
                      {record.all_gcp_products && (
                        <span className="text-xs text-blue-400/60 mt-0.5 inline-block">100% GCP</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-white/60">{formatDate(record.warranty_start_date)}</td>
                    <td className="py-3 px-4 text-sm text-white/60">{formatDate(record.warranty_end_date)}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`status-badge text-xs px-2 py-0.5 rounded-full border ${badge.textColor} ${badge.bgColor}`}>
                        {badge.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-white/30 mt-2 px-1">
          Total covered area: {formatNumber(records.reduce((s, r) => s + r.covered_area_sqft, 0))} sqft
          {' '} | Estimated value: {formatCurrency(records.reduce((s, r) => s + r.estimated_value, 0))}
        </div>
      </div>

      {/* Active Claims Section */}
      {claims.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Active Claims</h2>
          {claims.map((claim) => {
            const severityClass = getClaimSeverityColor(claim.severity);
            return (
              <div key={claim.id} className="glass-card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-base font-semibold text-white">{claim.claim_number}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${severityClass}`}>
                        {claim.severity.toUpperCase()}
                      </span>
                      <span className={`status-badge text-xs px-2 py-0.5 rounded-full border ${getStatusColor(claim.status)} bg-blue-400/10 border-blue-400/20`}>
                        {claim.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-white/40">
                      Submitted by {claim.submitted_by} on {formatDate(claim.created_at)}
                    </p>
                  </div>
                  {claim.assigned_reviewer && (
                    <div className="text-right">
                      <p className="text-xs text-white/40">Assigned Reviewer</p>
                      <p className="text-sm text-white/80">{claim.assigned_reviewer}</p>
                    </div>
                  )}
                </div>

                <div className="bg-white/5 rounded-lg p-4 mb-4">
                  <p className="text-sm text-white/70 leading-relaxed">{claim.description}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-white/40 block mb-0.5">Claim Type</span>
                    <span className="text-white/80">{claim.claim_type.replace(/_/g, ' ')}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block mb-0.5">Discovery Date</span>
                    <span className="text-white/80">{formatDate(claim.discovery_date)}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block mb-0.5">Last Updated</span>
                    <span className="text-white/80">{formatDate(claim.updated_at)}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block mb-0.5">Warranty Record</span>
                    <span className="text-white/80">{claim.warranty_record_id}</span>
                  </div>
                </div>

                {/* Action buttons based on role */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                  {canManageClaims.result === 'ALLOWED' && (
                    <>
                      <button className="glass-button text-xs px-3 py-1.5 rounded-lg text-emerald-400 hover:bg-emerald-400/10 transition-all">
                        Approve Claim
                      </button>
                      <button className="glass-button text-xs px-3 py-1.5 rounded-lg text-orange-400 hover:bg-orange-400/10 transition-all">
                        Request Info
                      </button>
                      <button className="glass-button text-xs px-3 py-1.5 rounded-lg text-blue-400 hover:bg-blue-400/10 transition-all">
                        Schedule Inspection
                      </button>
                    </>
                  )}
                  {canSubmitClaim.result === 'ALLOWED' && role === 'contractor' && (
                    <button className="glass-button text-xs px-3 py-1.5 rounded-lg text-white/70 hover:bg-white/10 transition-all">
                      Add Documentation
                    </button>
                  )}
                  <button className="glass-button text-xs px-3 py-1.5 rounded-lg text-white/50 hover:bg-white/10 transition-all ml-auto">
                    View Full History
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
