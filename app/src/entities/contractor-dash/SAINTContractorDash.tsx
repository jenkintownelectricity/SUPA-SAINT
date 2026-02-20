'use client';
// ═══════════════════════════════════════════════════════════════════════
// SAINT Contractor Dashboard — Entity Component
// Primary portal for contractor users to view projects, drawings,
// claims, and submittals. Admin role sees contractor management table.
// ═══════════════════════════════════════════════════════════════════════

import React from 'react';
import type { Role } from '@/lib/types';
import { useSAINTKernel } from '@/kernel/SAINTKernel';
import { formatDate, getStatusColor } from '@/lib/utils';
import { getProjects, getNotifications } from '@/data/store';
import {
  FolderOpen,
  FileText,
  Shield,
  ClipboardCheck,
  Download,
  Camera,
  MessageCircle,
} from 'lucide-react';

// ─── Progress Bar Color Mapping ──────────────────────────────────────

function getProgressColor(percent: number): string {
  if (percent === 100) return 'bg-emerald-400';
  if (percent >= 60) return 'bg-blue-400';
  if (percent >= 30) return 'bg-yellow-400';
  return 'bg-orange-400';
}

function getProjectStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pre_construction: 'Pre-Construction',
    in_progress: 'In Progress',
    punch_list: 'Punch List',
    closeout: 'Closeout',
    warranty_period: 'Warranty Period',
    complete: 'Complete',
  };
  return labels[status] || status;
}

// ─── Contractor Management Table (Admin Only) ────────────────────────

const DEMO_CONTRACTORS = [
  { id: 'ctr-trinity', name: 'Trinity Building Envelope', projects: 3, drawings: 36, status: 'active', territory: 'Mid-Atlantic' },
  { id: 'ctr-apex', name: 'Apex Waterproofing LLC', projects: 2, drawings: 14, status: 'active', territory: 'Northeast' },
  { id: 'ctr-summit', name: 'Summit Facade Systems', projects: 1, drawings: 8, status: 'active', territory: 'Southeast' },
  { id: 'ctr-horizon', name: 'Horizon Restoration Corp', projects: 0, drawings: 0, status: 'inactive', territory: 'Mid-Atlantic' },
];

function AdminContractorTable() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Contractor Management</h2>
        <span className="text-sm text-white/40">
          {DEMO_CONTRACTORS.length} registered contractors
        </span>
      </div>
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Contractor</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Territory</th>
              <th className="text-center py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Projects</th>
              <th className="text-center py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Drawings</th>
              <th className="text-center py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {DEMO_CONTRACTORS.map((c) => (
              <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 text-sm text-white font-medium">{c.name}</td>
                <td className="py-3 px-4 text-sm text-white/60">{c.territory}</td>
                <td className="py-3 px-4 text-sm text-white/80 text-center">{c.projects}</td>
                <td className="py-3 px-4 text-sm text-white/80 text-center">{c.drawings}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`status-badge ${c.status === 'active' ? 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20' : 'text-gray-400 bg-gray-400/10 border border-gray-400/20'} px-2 py-0.5 rounded-full text-xs`}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────

export function SAINTContractorDash({ role }: { role: Role }) {
  const { validate } = useSAINTKernel();
  const projects = getProjects();
  const notifications = getNotifications();

  // Admin sees contractor management instead of contractor portal
  if (role === 'gcp_admin') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Contractor Overview</h1>
          <p className="text-white/50 text-sm">System-wide contractor management and oversight</p>
        </div>

        {/* Admin KPI row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Contractors', value: '4', icon: FolderOpen, color: 'text-blue-400' },
            { label: 'Active Projects', value: '6', icon: FileText, color: 'text-emerald-400' },
            { label: 'Total Drawings', value: '58', icon: ClipboardCheck, color: 'text-purple-400' },
            { label: 'Open Claims', value: '1', icon: Shield, color: 'text-orange-400' },
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

        <AdminContractorTable />
      </div>
    );
  }

  // ── Contractor Portal ────────────────────────────────────────────

  const activeProjects = projects.filter((p) => p.status !== 'complete');
  const drawingsReady = projects.reduce((sum, p) => sum + (p.status === 'in_progress' ? Math.floor(p.total_drawings * p.progress_percent / 100) : 0), 0);
  const openClaims = projects.reduce((sum, p) => sum + p.active_warranty_claims, 0);
  const submittalsPending = projects.filter((p) => p.total_submittals > 0 && p.status === 'pre_construction').length;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">
          Welcome back, <span className="text-blue-400">Trinity Building Envelope</span>
        </h1>
        <p className="text-white/50 text-sm">
          Here is your project overview for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: 'Active Projects', value: activeProjects.length, icon: FolderOpen, color: 'text-blue-400' },
          { label: 'Drawings Ready', value: drawingsReady || 4, icon: FileText, color: 'text-emerald-400' },
          { label: 'Open Claims', value: openClaims || 1, icon: Shield, color: 'text-orange-400' },
          { label: 'Submittals Pending', value: submittalsPending || 1, icon: ClipboardCheck, color: 'text-yellow-400' },
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

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column — Project Cards */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Your Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="glass-card">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-white">{project.project_name}</h3>
                  <p className="text-xs text-white/40">
                    {project.project_city}, {project.project_state}
                  </p>
                </div>
                <span className={`status-badge text-xs px-2 py-0.5 rounded-full border ${getStatusColor(project.status)} ${
                  project.status === 'in_progress' ? 'bg-blue-400/10 border-blue-400/20' :
                  project.status === 'pre_construction' ? 'bg-yellow-400/10 border-yellow-400/20' :
                  project.status === 'warranty_period' ? 'bg-emerald-400/10 border-emerald-400/20' :
                  'bg-gray-400/10 border-gray-400/20'
                }`}>
                  {getProjectStatusLabel(project.status)}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white/50">Progress</span>
                  <span className="text-xs font-medium text-white">{project.progress_percent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getProgressColor(project.progress_percent)}`}
                    style={{ width: `${project.progress_percent}%` }}
                  />
                </div>
              </div>

              {/* Project metadata */}
              <div className="flex items-center gap-4 text-xs text-white/40 mt-3">
                <span>{project.assembly_types.join(', ')}</span>
                <span>{project.total_drawings} drawings</span>
                <span>Target: {formatDate(project.target_completion)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column — Activity Feed + Quick Actions */}
        <div className="space-y-6">
          {/* Activity Feed */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {notifications.map((notif) => {
                return (
                  <div
                    key={notif.id}
                    className={`glass-card flex items-start gap-3 ${!notif.read ? 'border-l-2 border-l-blue-400' : ''}`}
                  >
                    <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                      notif.priority === 'high' ? 'bg-red-400' :
                      notif.priority === 'medium' ? 'bg-yellow-400' :
                      'bg-white/30'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/80 leading-snug">{notif.message}</p>
                      <p className="text-xs text-white/30 mt-1">
                        {formatDate(notif.created_at)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Download Drawings', icon: Download, action: 'download_shop_drawings' },
                { label: 'Upload Photos', icon: Camera, action: 'upload_field_photos' },
                { label: 'View Submittals', icon: ClipboardCheck, action: 'view_own_submittals' },
                { label: 'Contact Engineer', icon: MessageCircle, action: 'contact_gcp_engineer' },
              ].map((btn) => {
                const result = validate({ action: btn.action, role });
                const isAllowed = result.result === 'ALLOWED';
                return (
                  <button
                    key={btn.action}
                    disabled={!isAllowed}
                    className={`glass-button flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isAllowed
                        ? 'text-white hover:bg-white/10 cursor-pointer'
                        : 'text-white/30 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <btn.icon size={16} />
                    <span>{btn.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
