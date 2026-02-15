'use client';
// ═══════════════════════════════════════════════════════════════════════
// SAINT Submittals — Entity Component
// Manages submittal packages with spec sections, review stamps,
// and completeness tracking. Role-aware CRUD enforcement.
// ═══════════════════════════════════════════════════════════════════════

import React from 'react';
import type { Role } from '@/lib/types';
import { useSAINTKernel } from '@/kernel/SAINTKernel';
import { formatDate, getStatusColor } from '@/lib/utils';
import { getSubmittals } from '@/data/store';
import {
  ClipboardCheck,
  FileCheck,
  FileX,
  Plus,
  Eye,
} from 'lucide-react';

// ─── Helpers ─────────────────────────────────────────────────────────

function getStampBadge(stamp: string | undefined): { label: string; color: string; bg: string } {
  if (!stamp) return { label: 'Pending', color: 'text-white/40', bg: 'bg-white/5 border-white/10' };
  const map: Record<string, { label: string; color: string; bg: string }> = {
    APPROVED: { label: 'APPROVED', color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20' },
    'APPROVED AS NOTED': { label: 'APPROVED AS NOTED', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20' },
    'REVISE AND RESUBMIT': { label: 'REVISE & RESUBMIT', color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/20' },
    REJECTED: { label: 'REJECTED', color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20' },
    ACKNOWLEDGED: { label: 'ACKNOWLEDGED', color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20' },
  };
  return map[stamp] || { label: stamp, color: 'text-gray-400', bg: 'bg-gray-400/10 border-gray-400/20' };
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    draft: 'Draft',
    submitted: 'Submitted',
    under_review: 'Under Review',
    approved: 'Approved',
    approved_as_noted: 'Approved as Noted',
    acknowledged: 'Acknowledged',
    revise_and_resubmit: 'Revise & Resubmit',
    rejected: 'Rejected',
  };
  return labels[status] || status;
}

// ─── Denied Access View ──────────────────────────────────────────────

function DeniedView({ reason }: { reason: string | undefined }) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="glass-card max-w-md text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-400/10 border border-red-400/20 flex items-center justify-center">
          <FileX size={28} className="text-red-400" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Access Restricted</h2>
        <p className="text-white/60 mb-2">
          {reason || 'Your role does not have access to the Submittals module.'}
        </p>
        <p className="text-xs text-white/30">
          Contact your GCP administrator to request access.
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────

export function SAINTSubmittals({ role }: { role: Role }) {
  const { validate } = useSAINTKernel();
  const submittals = getSubmittals();

  // Validate module access — sales_rep is denied
  const accessCheck = validate({ action: 'view_submittals', role });
  if (role === 'sales_rep') {
    return <DeniedView reason="Sales representatives do not have access to submittal management. This module is restricted to engineering and contractor roles." />;
  }

  // Compute KPIs
  const totalPackages = submittals.length;
  const approvedCount = submittals.filter((s) => s.status === 'approved' || s.status === 'approved_as_noted').length;
  const underReviewCount = submittals.filter((s) => s.status === 'under_review' || s.status === 'submitted').length;
  const draftCount = submittals.filter((s) => s.status === 'draft').length;

  // Role permissions
  const canCreate = validate({ action: 'create_submittal', role });
  const canReview = validate({ action: 'review_submittal', role });

  // Role context
  const roleContext = role === 'gcp_engineer'
    ? 'Full submittal management. Create, review, and stamp packages.'
    : role === 'contractor'
    ? 'View submittals and request review for your projects.'
    : 'Full administrative oversight of all submittal packages.';

  // Project name lookup
  const projectNames: Record<string, string> = {
    'proj-001': 'One Liberty Place',
    'proj-002': 'Comcast Tech Center',
    'proj-003': '30th Street Station',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Submittal Management</h1>
          <p className="text-white/50 text-sm">{roleContext}</p>
        </div>
        {canCreate.result === 'ALLOWED' && (
          <button className="glass-button flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-all">
            <Plus size={16} />
            <span>New Package</span>
          </button>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Packages', value: totalPackages, icon: ClipboardCheck, color: 'text-blue-400' },
          { label: 'Approved', value: approvedCount, icon: FileCheck, color: 'text-emerald-400' },
          { label: 'Under Review', value: underReviewCount, icon: Eye, color: 'text-yellow-400' },
          { label: 'Draft', value: draftCount, icon: FileX, color: 'text-gray-400' },
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

      {/* Submittals Table */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Submittal Packages</h2>
        <div className="glass-card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Package #</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Project</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Title</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Spec Sections</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Status</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Rev</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Docs</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Reviewer</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Stamp</th>
              </tr>
            </thead>
            <tbody>
              {submittals.map((pkg) => {
                const stamp = getStampBadge(pkg.reviewer_stamp);
                const isDraft = pkg.status === 'draft';
                const isIncomplete = pkg.completeness_status === 'incomplete_with_gaps';

                return (
                  <tr key={pkg.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <span className="text-sm text-blue-400 font-mono font-medium">{pkg.package_number}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-white/80">
                      {projectNames[pkg.project_id] || pkg.project_id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-white font-medium max-w-[220px] truncate">{pkg.title}</div>
                      {isDraft && isIncomplete && (
                        <div className="flex items-center gap-1.5 mt-1">
                          <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full w-3/5 rounded-full bg-orange-400" />
                          </div>
                          <span className="text-xs text-orange-400">Incomplete</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {pkg.spec_sections.map((sec) => (
                          <span key={sec} className="text-xs bg-white/5 text-white/50 px-1.5 py-0.5 rounded font-mono">
                            {sec}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`status-badge text-xs px-2 py-0.5 rounded-full border ${getStatusColor(pkg.status)} ${
                        pkg.status === 'approved' ? 'bg-emerald-400/10 border-emerald-400/20' :
                        pkg.status === 'under_review' ? 'bg-blue-400/10 border-blue-400/20' :
                        pkg.status === 'draft' ? 'bg-gray-400/10 border-gray-400/20' :
                        pkg.status === 'rejected' ? 'bg-red-400/10 border-red-400/20' :
                        'bg-white/5 border-white/10'
                      }`}>
                        {getStatusLabel(pkg.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-white/60">
                      {pkg.revision_number}
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-white/60">
                      {pkg.documents_count}
                    </td>
                    <td className="py-3 px-4">
                      {pkg.reviewer_name ? (
                        <div>
                          <div className="text-sm text-white/80">{pkg.reviewer_name}</div>
                          <div className="text-xs text-white/40">{pkg.reviewer_firm}</div>
                        </div>
                      ) : (
                        <span className="text-xs text-white/30 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${stamp.color} ${stamp.bg}`}>
                        {stamp.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reviewer Comments for reviewed packages */}
      {submittals.filter((s) => s.reviewer_comments).length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Reviewer Comments</h2>
          <div className="space-y-3">
            {submittals
              .filter((s) => s.reviewer_comments)
              .map((pkg) => (
                <div key={pkg.id} className="glass-card">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-blue-400 font-mono">{pkg.package_number}</span>
                      <span className="text-xs text-white/40">Rev {pkg.revision_number}</span>
                    </div>
                    {pkg.actual_response_date && (
                      <span className="text-xs text-white/30">{formatDate(pkg.actual_response_date)}</span>
                    )}
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm text-white/70 leading-relaxed">{pkg.reviewer_comments}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-white/40">
                    <span>{pkg.reviewer_name}</span>
                    <span className="text-white/20">|</span>
                    <span>{pkg.reviewer_firm}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Role-specific action bar */}
      <div className="flex items-center justify-between glass-card">
        <div className="text-xs text-white/30">
          {totalPackages} packages across {new Set(submittals.map((s) => s.project_id)).size} projects
        </div>
        <div className="flex items-center gap-3">
          {role === 'contractor' && (
            <button className="glass-button text-xs px-3 py-1.5 rounded-lg text-blue-400 hover:bg-blue-400/10 transition-all flex items-center gap-1.5">
              <Eye size={14} />
              Request Review
            </button>
          )}
          {(role === 'gcp_engineer' || role === 'gcp_admin') && (
            <button className="glass-button text-xs px-3 py-1.5 rounded-lg text-emerald-400 hover:bg-emerald-400/10 transition-all flex items-center gap-1.5">
              <FileCheck size={14} />
              Batch Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
