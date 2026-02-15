'use client';
// ═══════════════════════════════════════════════════════════════════════
// SAINT Entity — Shop Drawing Management
// Role-gated CRUD interface for building envelope shop drawings
// ═══════════════════════════════════════════════════════════════════════

import { useState, useMemo } from 'react';
import { FileText, Download, Eye, Plus, Filter } from 'lucide-react';
import { useSAINTKernel } from '@/kernel/SAINTKernel';
import { getShopDrawings } from '@/data/store';
import { formatDate, getStatusColor } from '@/lib/utils';
import type { Role, ShopDrawing, DrawingStatus } from '@/lib/types';

// ─── Status badge background mapping ─────────────────────────────────
const statusBadgeBg: Record<DrawingStatus, string> = {
  approved: 'bg-emerald-400/15 border-emerald-400/30 text-emerald-400',
  in_review: 'bg-blue-400/15 border-blue-400/30 text-blue-400',
  draft: 'bg-gray-400/15 border-gray-400/30 text-gray-400',
  revision_requested: 'bg-orange-400/15 border-orange-400/30 text-orange-400',
  delivered: 'bg-emerald-400/15 border-emerald-400/30 text-emerald-300',
};

export function SAINTShopDrawings({ role }: { role: Role }) {
  const kernel = useSAINTKernel();
  const [statusFilter, setStatusFilter] = useState<DrawingStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // ─── Kernel validation ─────────────────────────────────────────────
  const canCreate = kernel.validate({ action: 'create_shop_drawing', role }).result === 'ALLOWED';
  const canEdit = kernel.validate({ action: 'edit_shop_drawing', role }).result === 'ALLOWED';
  const canDownload = kernel.validate({ action: 'download_shop_drawings', role }).result === 'ALLOWED';

  // ─── Check base access — sales_rep is denied viewing shop drawings ─
  const accessCheck = kernel.validate({ action: 'create_shop_drawing', role });
  const downloadCheck = kernel.validate({ action: 'download_shop_drawings', role });
  const hasAnyAccess = accessCheck.result === 'ALLOWED' || downloadCheck.result === 'ALLOWED';

  if (!hasAnyAccess) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="glass-card p-8 text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-400/10 border border-red-400/20 flex items-center justify-center">
            <FileText className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Access Denied</h3>
          <p className="text-white/50 text-sm">
            {accessCheck.reason || 'Shop drawing management is not available for your role.'}
          </p>
          <p className="text-white/30 text-xs mt-3">
            Role: <span className="text-white/50">{role}</span> | Audit: <span className="text-white/50">{accessCheck.auditId}</span>
          </p>
        </div>
      </div>
    );
  }

  // ─── Load demo data ────────────────────────────────────────────────
  const drawings: ShopDrawing[] = getShopDrawings();

  // ─── Compute KPIs ──────────────────────────────────────────────────
  const totalDrawings = drawings.length;
  const approvedCount = drawings.filter(d => d.status === 'approved').length;
  const inReviewCount = drawings.filter(d => d.status === 'in_review').length;
  const draftCount = drawings.filter(d => d.status === 'draft').length;

  // ─── Filtering ─────────────────────────────────────────────────────
  const filteredDrawings = drawings.filter(d => {
    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    const matchesSearch = searchQuery === '' ||
      d.drawing_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.assembly_type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const kpis = [
    { label: 'Total Drawings', value: totalDrawings, color: 'text-white', icon: <FileText className="w-5 h-5" /> },
    { label: 'Approved', value: approvedCount, color: 'text-emerald-400', icon: <Eye className="w-5 h-5" /> },
    { label: 'In Review', value: inReviewCount, color: 'text-blue-400', icon: <Filter className="w-5 h-5" /> },
    { label: 'Draft', value: draftCount, color: 'text-gray-400', icon: <FileText className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-6">
      {/* ─── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Shop Drawings</h2>
          <p className="text-white/50 text-sm mt-1">
            Manage building envelope assembly shop drawings
          </p>
        </div>
        {canCreate && (
          <button className="glass-button flex items-center gap-2 px-4 py-2 text-sm font-medium">
            <Plus className="w-4 h-4" />
            New Drawing
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
              placeholder="Search by drawing #, title, or assembly type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'approved', 'in_review', 'draft', 'revision_requested', 'delivered'] as const).map((status) => (
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

      {/* ─── Drawings Table ─────────────────────────────────────────── */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Drawing #</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Project</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Assembly Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Revision</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Created</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filteredDrawings.map((drawing) => (
                <tr
                  key={drawing.id}
                  className="hover:bg-white/[0.03] transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-white/30" />
                      <span className="text-sm font-mono font-medium text-white">
                        {drawing.drawing_number}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-white/70">{drawing.title}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 text-xs font-mono font-medium rounded bg-white/[0.06] border border-white/10 text-white/60">
                      {drawing.assembly_type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`status-badge px-2.5 py-1 text-xs font-medium rounded-full border ${statusBadgeBg[drawing.status] || 'bg-gray-400/15 border-gray-400/30 text-gray-400'}`}>
                      {drawing.status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-white/50">Rev {drawing.revision}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-white/40">{formatDate(drawing.created_at)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                        title="View drawing"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {canDownload && (
                        <button
                          className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                          title="Download drawing"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                      {canEdit && (
                        <button
                          className="p-1.5 rounded-lg hover:bg-blue-400/10 text-blue-400/50 hover:text-blue-400 transition-colors"
                          title="Edit drawing"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredDrawings.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <FileText className="w-8 h-8 text-white/20 mx-auto mb-3" />
                    <p className="text-white/40 text-sm">No drawings match the current filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ─── Table Footer ────────────────────────────────────────── */}
        <div className="border-t border-white/[0.06] px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-white/30">
            Showing {filteredDrawings.length} of {totalDrawings} drawings
          </span>
          <div className="flex items-center gap-2 text-xs text-white/30">
            <span>Role: <span className="text-white/50">{role}</span></span>
            <span className="text-white/10">|</span>
            <span>Access: <span className={canEdit ? 'text-emerald-400' : 'text-blue-400'}>{canEdit ? 'Full CRUD' : 'Read-only'}</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
