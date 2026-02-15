// ═══════════════════════════════════════════════════════════════════════
// SAINT Kernel — Invariant Enforcement
// Extracted from SAINT_KERNEL.lds.json
// All 8 invariants MUST be enforced in the running application.
// ═══════════════════════════════════════════════════════════════════════

export interface Invariant {
  code: string;
  rule: string;
  enforcement: string;
  status: 'ENFORCED';
}

export const INVARIANTS: Record<string, Invariant> = {
  IV01_DETERMINISM: {
    code: 'IV.01',
    rule: 'Same input MUST produce same output',
    enforcement: 'Pure functions only, no side effects in validation',
    status: 'ENFORCED',
  },
  IV02_FAIL_CLOSED: {
    code: 'IV.02',
    rule: 'Unknown actions are DENIED by default',
    enforcement: 'Whitelist architecture — only explicitly allowed actions pass',
    status: 'ENFORCED',
  },
  IV03_SEPARATION_OF_POWERS: {
    code: 'IV.03',
    rule: 'Roles cannot grant themselves higher permissions',
    enforcement: 'Role boundaries defined at L0, immutable at runtime',
    status: 'ENFORCED',
  },
  IV04_NO_IMPLICIT_AUTHORITY: {
    code: 'IV.04',
    rule: 'Every action requires explicit authorization',
    enforcement: 'No inheritance, no escalation without L0 approval',
    status: 'ENFORCED',
  },
  IV05_TEMPORAL_CONTAINMENT: {
    code: 'IV.05',
    rule: 'All tokens have hard expiration',
    enforcement: 'Session tokens expire, auth tokens expire, command tokens expire',
    status: 'ENFORCED',
  },
  IV06_NON_REPUDIATION: {
    code: 'IV.06',
    rule: 'Every decision produces an immutable audit log entry',
    enforcement: 'Audit log append-only, includes actor, action, result, timestamp, audit_id',
    status: 'ENFORCED',
  },
  IV07_MONOTONIC_STATE: {
    code: 'IV.07',
    rule: 'State transitions are append-only, no rollback',
    enforcement: 'No delete operations on audit, no state reversal',
    status: 'ENFORCED',
  },
  IV08_FULL_TRACEABILITY: {
    code: 'IV.08',
    rule: 'Logs reproduce any decision deterministically',
    enforcement: 'Audit log contains all inputs needed to replay decision',
    status: 'ENFORCED',
  },
};

export function getInvariant(code: string): Invariant | undefined {
  return Object.values(INVARIANTS).find(i => i.code === code);
}

export function getAllInvariants(): Invariant[] {
  return Object.values(INVARIANTS);
}
