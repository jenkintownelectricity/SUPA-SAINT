'use client';
// ═══════════════════════════════════════════════════════════════════════
// SAINT Kernel — L1 Stateless CHECK-THEN-ACT Validation Engine
// Extracted from SAINT_KERNEL.lds.json
//
// Every user action passes through validate() before execution.
// Authority flows DOWN only. Sub-millisecond target (<0.3ms).
// ═══════════════════════════════════════════════════════════════════════

import React, { createContext, useContext, useCallback, useMemo } from 'react';
import type { Role, ValidationRequest, ValidationResponse, AuditEntry } from '@/lib/types';
import { ROLE_BOUNDARIES } from './boundaries';
import { appendAuditEntry, getAuditLog, getRecentAuditEntries } from './audit';

interface SAINTKernelContextValue {
  validate: (request: ValidationRequest) => ValidationResponse;
  getAuditLog: () => ReadonlyArray<AuditEntry>;
  getRecentAuditEntries: (count: number) => ReadonlyArray<AuditEntry>;
}

const SAINTKernelContext = createContext<SAINTKernelContextValue | null>(null);

/**
 * Pure validation function. No side effects except audit log append.
 * Implements the CHECK-THEN-ACT pattern from SAINT_KERNEL.lds.json.
 *
 * Validation logic:
 * 1. Check role exists in SAINT_BOUNDARIES → if not: DENIED "Unknown role"
 * 2. Check action in role.denied[] → if yes: DENIED with reason
 * 3. Check action in role.allowed[] → if yes: ALLOWED
 * 4. Check escalation rules → if triggered: ESCALATE
 * 5. Default: DENIED "Action not explicitly allowed" (IV.02 FAIL-CLOSED)
 * 6. Log audit entry (IV.06 NON-REPUDIATION)
 * 7. Return result with latencyMs
 */
function validateAction(request: ValidationRequest): ValidationResponse {
  const start = performance.now();

  const { action, role, context } = request;

  // Step 1: Check role exists
  const boundary = ROLE_BOUNDARIES[role];
  if (!boundary) {
    const latencyMs = performance.now() - start;
    const auditId = appendAuditEntry(request, 'DENIED', 'Unknown role', latencyMs);
    return { result: 'DENIED', action, role, reason: 'Unknown role', auditId, latencyMs };
  }

  // Step 2: Check if action is explicitly denied
  const deniedEntry = boundary.denied.find(d => d.action === action);
  if (deniedEntry) {
    const latencyMs = performance.now() - start;
    const auditId = appendAuditEntry(request, 'DENIED', deniedEntry.reason, latencyMs);
    return { result: 'DENIED', action, role, reason: deniedEntry.reason, auditId, latencyMs };
  }

  // Step 3: Check if action is explicitly allowed
  if (boundary.allowed.includes(action)) {
    const latencyMs = performance.now() - start;
    const auditId = appendAuditEntry(request, 'ALLOWED', undefined, latencyMs);
    return { result: 'ALLOWED', action, role, auditId, latencyMs };
  }

  // Step 4: Check escalation rules
  for (const rule of boundary.escalation) {
    if (context && context.escalation_condition === rule.condition) {
      const latencyMs = performance.now() - start;
      const auditId = appendAuditEntry(request, 'ESCALATE', rule.reason, latencyMs);
      return {
        result: 'ESCALATE',
        action,
        role,
        reason: rule.reason,
        escalateTo: rule.escalate_to,
        auditId,
        latencyMs,
      };
    }
  }

  // Step 5: Default DENIED (IV.02 FAIL-CLOSED)
  const reason = 'Action not explicitly allowed for this role';
  const latencyMs = performance.now() - start;
  const auditId = appendAuditEntry(request, 'DENIED', reason, latencyMs);
  return { result: 'DENIED', action, role, reason, auditId, latencyMs };
}

interface SAINTKernelProviderProps {
  children: React.ReactNode;
}

export function SAINTKernelProvider({ children }: SAINTKernelProviderProps) {
  const validate = useCallback((request: ValidationRequest): ValidationResponse => {
    return validateAction(request);
  }, []);

  const value = useMemo<SAINTKernelContextValue>(() => ({
    validate,
    getAuditLog,
    getRecentAuditEntries,
  }), [validate]);

  return (
    <SAINTKernelContext.Provider value={value}>
      {children}
    </SAINTKernelContext.Provider>
  );
}

export function useSAINTKernel(): SAINTKernelContextValue {
  const context = useContext(SAINTKernelContext);
  if (!context) {
    throw new Error('useSAINTKernel must be used within SAINTKernelProvider');
  }
  return context;
}

export { SAINTKernelContext };
