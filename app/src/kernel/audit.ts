// ═══════════════════════════════════════════════════════════════════════
// SAINT Kernel — Audit Log (IV.06, IV.07, IV.08)
// Append-only audit log. No delete. No modify. Full traceability.
// ═══════════════════════════════════════════════════════════════════════

import type { AuditEntry, ValidationRequest, ActionResult, Role } from '@/lib/types';
import { generateId } from '@/lib/utils';

// Append-only array — enforces IV.07 MONOTONIC_STATE
const auditLog: AuditEntry[] = [];

export function appendAuditEntry(
  request: ValidationRequest,
  result: ActionResult,
  reason: string | undefined,
  latencyMs: number
): string {
  const id = generateId();
  const entry: AuditEntry = {
    id,
    timestamp: new Date().toISOString(),
    request: { ...request },
    response: {
      result,
      action: request.action,
      role: request.role,
      reason,
    },
    latencyMs,
  };

  // IV.07: Append-only — push only, never splice/pop/shift
  auditLog.push(entry);
  return id;
}

export function getAuditLog(): ReadonlyArray<AuditEntry> {
  // Return a shallow copy to prevent external modification (IV.07)
  return [...auditLog];
}

export function getAuditLogLength(): number {
  return auditLog.length;
}

export function getRecentAuditEntries(count: number): ReadonlyArray<AuditEntry> {
  return auditLog.slice(-count);
}

export function getAuditEntriesByRole(role: Role): ReadonlyArray<AuditEntry> {
  return auditLog.filter(e => e.request.role === role);
}

export function getAuditEntriesByResult(result: ActionResult): ReadonlyArray<AuditEntry> {
  return auditLog.filter(e => e.response.result === result);
}
