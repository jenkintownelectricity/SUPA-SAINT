import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    current_plan: {
      id: 'plan-enterprise',
      name: 'Enterprise',
      price_monthly: 499,
      price_annual: 4990,
      billing_cycle: 'annual',
      status: 'active',
      current_period_start: '2026-01-01',
      current_period_end: '2026-12-31',
    },
    plans: [
      { id: 'plan-starter', name: 'Starter', price_monthly: 49, seats: 2, entities: 3 },
      { id: 'plan-professional', name: 'Professional', price_monthly: 149, seats: 10, entities: 10 },
      { id: 'plan-enterprise', name: 'Enterprise', price_monthly: 499, seats: 50, entities: 'unlimited' },
    ],
    payment_method: {
      type: 'card',
      brand: 'visa',
      last4: '4242',
      exp_month: 12,
      exp_year: 2027,
    },
    invoices: [
      { id: 'inv-001', date: '2026-01-01', amount: 4990, status: 'paid' },
      { id: 'inv-002', date: '2025-01-01', amount: 4990, status: 'paid' },
    ],
  });
}
