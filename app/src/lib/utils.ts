import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(dateStr);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'text-emerald-400',
    approved: 'text-emerald-400',
    closed_won: 'text-emerald-400',
    resolved: 'text-emerald-400',
    complete: 'text-emerald-400',
    delivered: 'text-emerald-400',
    in_progress: 'text-blue-400',
    under_review: 'text-blue-400',
    in_review: 'text-blue-400',
    submitted: 'text-blue-400',
    qualified: 'text-blue-400',
    contacted: 'text-blue-400',
    draft: 'text-gray-400',
    new: 'text-gray-400',
    lead: 'text-gray-400',
    pending: 'text-yellow-400',
    expiring_soon: 'text-yellow-400',
    negotiation: 'text-yellow-400',
    proposal: 'text-yellow-400',
    proposal_sent: 'text-yellow-400',
    denied: 'text-red-400',
    rejected: 'text-red-400',
    closed_lost: 'text-red-400',
    expired: 'text-red-400',
    voided: 'text-red-400',
    claim_in_progress: 'text-orange-400',
    revision_requested: 'text-orange-400',
    revise_and_resubmit: 'text-orange-400',
  };
  return colors[status] || 'text-gray-400';
}

export function getStatusBgColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'bg-emerald-400/10 border-emerald-400/20',
    approved: 'bg-emerald-400/10 border-emerald-400/20',
    delivered: 'bg-emerald-400/10 border-emerald-400/20',
    in_progress: 'bg-blue-400/10 border-blue-400/20',
    under_review: 'bg-blue-400/10 border-blue-400/20',
    draft: 'bg-gray-400/10 border-gray-400/20',
    new: 'bg-gray-400/10 border-gray-400/20',
    pending: 'bg-yellow-400/10 border-yellow-400/20',
    denied: 'bg-red-400/10 border-red-400/20',
    rejected: 'bg-red-400/10 border-red-400/20',
  };
  return colors[status] || 'bg-gray-400/10 border-gray-400/20';
}
