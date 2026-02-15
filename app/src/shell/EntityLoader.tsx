'use client';
// ═══════════════════════════════════════════════════════════════════════
// Entity Loader — Dynamic entity component loader
// From SAINT_SHELL.lds.json entity_loader block
// Pattern: navigate → kernel.validate → load → render
// ═══════════════════════════════════════════════════════════════════════

import React from 'react';
import { useSAINTKernel } from '@/kernel/SAINTKernel';
import type { Role } from '@/lib/types';
import { ShieldX } from 'lucide-react';

// Entity component imports
import { SAINTShopDrawings } from '@/entities/shop-drawings/SAINTShopDrawings';
import { SAINTOppScraper } from '@/entities/opp-scraper/SAINTOppScraper';
import { SAINTProductConfig } from '@/entities/product-config/SAINTProductConfig';
import { SAINTContractorDash } from '@/entities/contractor-dash/SAINTContractorDash';
import { SAINTWarranty } from '@/entities/warranty/SAINTWarranty';
import { SAINTSubmittals } from '@/entities/submittals/SAINTSubmittals';
import { SAINTPipeline } from '@/entities/pipeline/SAINTPipeline';
import { SAINTTerritories } from '@/entities/territories/SAINTTerritories';
import { SAINTReporting } from '@/entities/reporting/SAINTReporting';
import { SAINTWhiteLabel } from '@/entities/white-label/SAINTWhiteLabel';
import { SAINTSSO } from '@/entities/sso/SAINTSSO';
import { SAINTAPI } from '@/entities/api/SAINTAPI';
import { SAINTAdmin } from '@/entities/admin/SAINTAdmin';
import { SAINTBilling } from '@/entities/billing/SAINTBilling';
import { SAINTIntegrations } from '@/entities/integrations/SAINTIntegrations';

const ENTITY_COMPONENTS: Record<string, React.ComponentType<{ role: Role }>> = {
  'shop-drawings': SAINTShopDrawings,
  'opp-scraper': SAINTOppScraper,
  'product-config': SAINTProductConfig,
  'contractor-dash': SAINTContractorDash,
  'warranty': SAINTWarranty,
  'submittals': SAINTSubmittals,
  'pipeline': SAINTPipeline,
  'territories': SAINTTerritories,
  'reporting': SAINTReporting,
  'white-label': SAINTWhiteLabel,
  'sso': SAINTSSO,
  'api': SAINTAPI,
  'admin': SAINTAdmin,
  'billing': SAINTBilling,
  'integrations': SAINTIntegrations,
};

interface EntityLoaderProps {
  entityId: string;
  role: Role;
}

export function EntityLoader({ entityId, role }: EntityLoaderProps) {
  const { validate } = useSAINTKernel();

  // Validate entity access through kernel
  const validationResult = validate({
    action: 'load_entity',
    role,
    context: { entity: entityId },
  });

  // If DENIED, show denial reason
  if (validationResult.result === 'DENIED') {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="glass-card max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-400/10 border border-red-400/20 flex items-center justify-center">
            <ShieldX size={28} className="text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Access Denied</h2>
          <p className="text-white/60 mb-4">{validationResult.reason || 'You do not have permission to access this module.'}</p>
          <div className="text-xs text-white/30">
            Audit ID: {validationResult.auditId} · {validationResult.latencyMs.toFixed(2)}ms
          </div>
        </div>
      </div>
    );
  }

  // If ESCALATE, show escalation message
  if (validationResult.result === 'ESCALATE') {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="glass-card max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
            <ShieldX size={28} className="text-yellow-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Escalation Required</h2>
          <p className="text-white/60 mb-2">{validationResult.reason}</p>
          <p className="text-sm text-yellow-400">Escalate to: {validationResult.escalateTo}</p>
        </div>
      </div>
    );
  }

  // Load entity component
  const EntityComponent = ENTITY_COMPONENTS[entityId];

  if (!EntityComponent) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="glass-card max-w-md text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Module Not Found</h2>
          <p className="text-white/60">The module &quot;{entityId}&quot; is not available.</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary entityId={entityId}>
      <EntityComponent role={role} />
    </ErrorBoundary>
  );
}

// ── Error Boundary ────────────────────────────────────────────────────

interface ErrorBoundaryProps {
  children: React.ReactNode;
  entityId: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="glass-card max-w-md text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Module Error</h2>
            <p className="text-white/60 mb-4">
              An error occurred in the {this.props.entityId} module. This has been logged.
            </p>
            <p className="text-xs text-red-400/60 font-mono">{this.state.error?.message}</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
