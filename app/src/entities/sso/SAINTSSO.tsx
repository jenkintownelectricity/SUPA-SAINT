'use client';
// ═══════════════════════════════════════════════════════════════════════
// SAINT SSO — Single Sign-On Configuration
// Manage SAML 2.0 / OIDC identity provider settings and role mappings
// ═══════════════════════════════════════════════════════════════════════

import { useState } from 'react';
import { Key, Shield, Link, Settings } from 'lucide-react';
import { useSAINTKernel } from '@/kernel/SAINTKernel';
import { formatDate, getStatusColor } from '@/lib/utils';
import type { Role } from '@/lib/types';

const SSO_PROTOCOLS = [
  {
    id: 'saml',
    name: 'SAML 2.0',
    description: 'Security Assertion Markup Language — enterprise federation standard',
    status: 'not_configured',
    icon: Shield,
  },
  {
    id: 'oidc',
    name: 'OpenID Connect',
    description: 'OAuth 2.0 identity layer — modern authentication protocol',
    status: 'not_configured',
    icon: Key,
  },
];

const IDP_FIELDS = [
  { key: 'entity_id', label: 'Entity ID (Issuer)', placeholder: 'https://idp.example.com/saml/metadata', value: '' },
  { key: 'acs_url', label: 'ACS URL (Reply URL)', placeholder: 'https://saint.validkernel.com/auth/saml/callback', value: 'https://saint.validkernel.com/auth/saml/callback' },
  { key: 'metadata_url', label: 'Metadata URL', placeholder: 'https://idp.example.com/.well-known/saml-metadata.xml', value: '' },
  { key: 'certificate', label: 'X.509 Certificate', placeholder: 'Paste IDP signing certificate...', value: '' },
  { key: 'slo_url', label: 'SLO Endpoint (Optional)', placeholder: 'https://idp.example.com/saml/logout', value: '' },
];

const GROUP_MAPPINGS = [
  { idpGroup: 'saint-admins', saintRole: 'gcp_admin', members: 1, lastSync: '2026-02-15T08:00:00Z', status: 'pending' },
  { idpGroup: 'saint-engineers', saintRole: 'gcp_engineer', members: 0, lastSync: null, status: 'not_configured' },
  { idpGroup: 'saint-sales', saintRole: 'sales_rep', members: 0, lastSync: null, status: 'not_configured' },
  { idpGroup: 'saint-contractors', saintRole: 'contractor', members: 0, lastSync: null, status: 'not_configured' },
];

export function SAINTSSO({ role }: { role: Role }) {
  const { validate } = useSAINTKernel();
  const [activeProtocol, setActiveProtocol] = useState<string>('saml');

  const canManage = validate({
    action: 'manage_sso',
    role,
    context: { entity: 'sso' },
  }).result === 'ALLOWED';

  if (!canManage) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="glass-card max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-400/10 border border-red-400/20 flex items-center justify-center">
            <Shield size={28} className="text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Access Denied</h2>
          <p className="text-white/60">SSO configuration requires gcp_admin privileges.</p>
          <p className="text-xs text-white/30 mt-3">Current role: {role}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <Shield size={20} className="text-blue-400" />
          </div>
          SSO Configuration
        </h1>
        <p className="text-white/50 mt-1">Configure identity provider integration and role mappings</p>
      </div>

      {/* Protocol Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SSO_PROTOCOLS.map((proto) => {
          const Icon = proto.icon;
          const isActive = activeProtocol === proto.id;
          return (
            <button
              key={proto.id}
              onClick={() => setActiveProtocol(proto.id)}
              className={`glass-card text-left transition-all ${isActive ? 'ring-1 ring-blue-400/50' : 'opacity-70 hover:opacity-100'}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-white/5 border border-white/10'}`}>
                  <Icon size={18} className={isActive ? 'text-blue-400' : 'text-white/40'} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{proto.name}</span>
                    <span className={`status-badge ${getStatusColor(proto.status)}`}>
                      {proto.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 mt-1">{proto.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* IDP Configuration Form */}
      <div className="glass-card">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Settings size={18} className="text-white/60" />
          IDP Settings — {activeProtocol === 'saml' ? 'SAML 2.0' : 'OpenID Connect'}
        </h2>
        <div className="space-y-4">
          {IDP_FIELDS.map((field) => (
            <div key={field.key}>
              <label className="block text-sm text-white/60 mb-1">{field.label}</label>
              {field.key === 'certificate' ? (
                <textarea
                  placeholder={field.placeholder}
                  defaultValue={field.value}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/80 font-mono placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-blue-400/50 resize-none"
                />
              ) : (
                <input
                  type="text"
                  placeholder={field.placeholder}
                  defaultValue={field.value}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/80 font-mono placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-blue-400/50"
                />
              )}
            </div>
          ))}
          <div className="flex items-center gap-2 pt-2">
            <span className="flex items-center gap-1 text-xs text-yellow-400/60">
              <Link size={12} />
              Status: Not Configured — save settings and test connection to activate
            </span>
          </div>
        </div>
      </div>

      {/* IDP Group-to-Role Mapping Table */}
      <div className="glass-card">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Key size={18} className="text-blue-400" />
          IDP Group-to-Role Mapping
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">IDP Group</th>
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">SAINT Role</th>
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Members</th>
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Last Sync</th>
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {GROUP_MAPPINGS.map((mapping) => (
                <tr key={mapping.idpGroup} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 text-sm text-white/80 font-mono">{mapping.idpGroup}</td>
                  <td className="py-3">
                    <span className="status-badge text-blue-400">{mapping.saintRole}</span>
                  </td>
                  <td className="py-3 text-sm text-white/60">{mapping.members}</td>
                  <td className="py-3 text-sm text-white/40">
                    {mapping.lastSync ? formatDate(mapping.lastSync) : '—'}
                  </td>
                  <td className="py-3">
                    <span className={`text-sm ${getStatusColor(mapping.status)}`}>
                      {mapping.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
