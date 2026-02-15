'use client';
// ═══════════════════════════════════════════════════════════════════════
// SAINT Billing — Subscription & Usage Management
// Pricing plans, current subscription, usage meters, and invoices
// ═══════════════════════════════════════════════════════════════════════

import { CreditCard, DollarSign, FileText, TrendingUp } from 'lucide-react';
import { useSAINTKernel } from '@/kernel/SAINTKernel';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils';
import type { Role } from '@/lib/types';

const PRICING_PLANS = [
  {
    id: 'contractor',
    name: 'Contractor',
    price: 500,
    period: '/mo',
    description: 'For certified installers and sub-contractors',
    features: [
      'Shop drawing viewer',
      'Warranty claim submission',
      'Project dashboard',
      'Basic product catalog',
      '1 user seat',
    ],
    highlighted: false,
    color: 'purple',
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 2000,
    period: '/mo',
    description: 'For sales teams and engineering groups',
    features: [
      'Everything in Contractor',
      'Opportunity scraper',
      'Pipeline management',
      'Territory mapping',
      'Product configurator',
      'Up to 10 user seats',
    ],
    highlighted: true,
    color: 'blue',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 5000,
    period: '/mo',
    description: 'Full platform with admin and integration suite',
    features: [
      'Everything in Professional',
      'SSO / SAML integration',
      'API access (10K req/day)',
      'White-label branding',
      'Admin console',
      'Custom integrations',
      'Unlimited seats',
    ],
    highlighted: false,
    color: 'amber',
  },
];

const CURRENT_SUBSCRIPTION = {
  plan: 'Enterprise',
  status: 'active',
  billingCycle: 'Monthly',
  nextBillingDate: '2026-03-01T00:00:00Z',
  currentPeriodStart: '2026-02-01T00:00:00Z',
  paymentMethod: 'Visa ending in 4242',
};

const USAGE_METERS = [
  { label: 'API Requests', used: 42500, limit: 300000, unit: 'requests' },
  { label: 'Storage', used: 2.4, limit: 50, unit: 'GB' },
  { label: 'User Seats', used: 4, limit: 999, unit: 'seats' },
  { label: 'Shop Drawings', used: 156, limit: 999, unit: 'drawings' },
];

const INVOICES = [
  { id: 'inv-006', date: '2026-02-01T00:00:00Z', amount: 5000, status: 'paid' },
  { id: 'inv-005', date: '2026-01-01T00:00:00Z', amount: 5000, status: 'paid' },
  { id: 'inv-004', date: '2025-12-01T00:00:00Z', amount: 5000, status: 'paid' },
  { id: 'inv-003', date: '2025-11-01T00:00:00Z', amount: 2000, status: 'paid' },
];

export function SAINTBilling({ role }: { role: Role }) {
  const { validate } = useSAINTKernel();

  const canManage = validate({
    action: 'manage_billing',
    role,
    context: { entity: 'billing' },
  }).result === 'ALLOWED';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <CreditCard size={20} className="text-emerald-400" />
          </div>
          Billing & Subscription
        </h1>
        <p className="text-white/50 mt-1">Manage your plan, track usage, and view invoices</p>
      </div>

      {/* Current Subscription */}
      <div className="glass-card border border-blue-400/20">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-sm text-white/50 mb-1">Current Plan</div>
            <div className="text-2xl font-bold text-white">{CURRENT_SUBSCRIPTION.plan}</div>
            <div className="flex items-center gap-3 mt-2 text-sm">
              <span className={`${getStatusColor(CURRENT_SUBSCRIPTION.status)} font-medium`}>Active</span>
              <span className="text-white/30">|</span>
              <span className="text-white/40">{CURRENT_SUBSCRIPTION.billingCycle}</span>
              <span className="text-white/30">|</span>
              <span className="text-white/40">{CURRENT_SUBSCRIPTION.paymentMethod}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">{formatCurrency(5000)}<span className="text-sm text-white/40 font-normal">/mo</span></div>
            <div className="text-xs text-white/30 mt-1">Next billing: {formatDate(CURRENT_SUBSCRIPTION.nextBillingDate)}</div>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <DollarSign size={18} className="text-emerald-400" />
          Available Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`glass-card relative ${plan.highlighted ? 'ring-1 ring-blue-400/40' : ''}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                  Current Plan
                </div>
              )}
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <p className="text-xs text-white/40 mt-1">{plan.description}</p>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-white">{formatCurrency(plan.price)}</span>
                  <span className="text-white/40 text-sm">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                    <TrendingUp size={12} className="text-emerald-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              {canManage && !plan.highlighted && (
                <button className="glass-button w-full text-center text-sm text-blue-400">
                  {plan.price > 2000 ? 'Current Plan' : 'Switch Plan'}
                </button>
              )}
              {plan.highlighted && (
                <div className="text-center text-xs text-emerald-400 py-2">Active subscription</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Usage Meters */}
      <div className="glass-card">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-blue-400" />
          Usage This Period
          <span className="text-xs text-white/30 font-normal ml-2">
            {formatDate(CURRENT_SUBSCRIPTION.currentPeriodStart)} — present
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {USAGE_METERS.map((meter) => {
            const percentage = meter.limit === 999 ? null : Math.min((meter.used / meter.limit) * 100, 100);
            return (
              <div key={meter.label} className="bg-white/5 rounded-lg p-4 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/60">{meter.label}</span>
                  <span className="text-sm text-white/80 font-mono">
                    {typeof meter.used === 'number' && meter.used % 1 !== 0 ? meter.used.toFixed(1) : meter.used}
                    {percentage !== null ? ` / ${meter.limit}` : ''} {meter.unit}
                  </span>
                </div>
                {percentage !== null ? (
                  <div className="w-full bg-white/5 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${percentage > 80 ? 'bg-amber-400' : 'bg-blue-400'}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                ) : (
                  <div className="text-xs text-white/30">Unlimited</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Invoice History */}
      <div className="glass-card">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FileText size={18} className="text-white/60" />
          Invoice History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Invoice</th>
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Date</th>
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Amount</th>
                <th className="text-left text-xs text-white/40 font-medium pb-3 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {INVOICES.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 text-sm text-white/60 font-mono">{invoice.id}</td>
                  <td className="py-3 text-sm text-white/40">{formatDate(invoice.date)}</td>
                  <td className="py-3 text-sm text-white/80 font-medium">{formatCurrency(invoice.amount)}</td>
                  <td className="py-3">
                    <span className="text-sm text-emerald-400 font-medium capitalize">{invoice.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!canManage && (
          <div className="mt-4 pt-3 border-t border-white/5 text-xs text-yellow-400/60">
            DENIED — Only gcp_admin can manage billing and subscriptions
          </div>
        )}
      </div>
    </div>
  );
}
