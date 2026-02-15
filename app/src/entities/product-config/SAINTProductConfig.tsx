'use client';
// ═══════════════════════════════════════════════════════════════════════
// SAINT Entity — Product Catalog & Configurator
// Role-gated product browsing, configuration, and management
// ═══════════════════════════════════════════════════════════════════════

import { useState, useMemo } from 'react';
import { Package, Layers, Settings, CheckCircle } from 'lucide-react';
import { useSAINTKernel } from '@/kernel/SAINTKernel';
import { getProducts, getConfigurations } from '@/data/store';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils';
import type { Role, Product, ProductCategory, Configuration, ConfigurationStatus } from '@/lib/types';

// ─── Category definitions ────────────────────────────────────────────
const CATEGORIES = [
  { id: 'eifs', label: 'EIFS', description: 'Exterior Insulation and Finish Systems' },
  { id: 'awb', label: 'Air & Water Barriers', description: 'Weather-resistive barrier systems' },
  { id: 'fp', label: 'Fireproofing', description: 'Spray-applied fire resistive materials' },
  { id: 'wp', label: 'Waterproofing', description: 'Below-grade and plaza waterproofing' },
] as const;

type CategoryId = typeof CATEGORIES[number]['id'];

// ─── Config status badge colors ──────────────────────────────────────
const configStatusBadge: Record<ConfigurationStatus, string> = {
  draft: 'bg-gray-400/15 border-gray-400/30 text-gray-400',
  validated: 'bg-emerald-400/15 border-emerald-400/30 text-emerald-400',
  submitted_to_shop_drawings: 'bg-blue-400/15 border-blue-400/30 text-blue-400',
  archived: 'bg-white/[0.06] border-white/10 text-white/40',
};

export function SAINTProductConfig({ role }: { role: Role }) {
  const kernel = useSAINTKernel();
  const [activeCategory, setActiveCategory] = useState<CategoryId>('eifs');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // ─── Kernel validation ─────────────────────────────────────────────
  const canConfigure = kernel.validate({ action: 'configure_product', role }).result === 'ALLOWED';
  const canViewCatalog = kernel.validate({ action: 'view_product_catalog', role }).result === 'ALLOWED';

  // ─── Determine access level label ──────────────────────────────────
  const accessLevel = useMemo(() => {
    if (role === 'gcp_admin') return 'manage';
    if (role === 'gcp_engineer') return 'configure';
    return 'read-only';
  }, [role]);

  if (!canViewCatalog) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="glass-card p-8 text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-400/10 border border-red-400/20 flex items-center justify-center">
            <Package className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Access Denied</h3>
          <p className="text-white/50 text-sm">
            Product configuration is not available for your role.
          </p>
          <p className="text-white/30 text-xs mt-3">
            Role: <span className="text-white/50">{role}</span>
          </p>
        </div>
      </div>
    );
  }

  // ─── Load demo data ────────────────────────────────────────────────
  const categories: ProductCategory[] = getProducts();
  const configurations: Configuration[] = getConfigurations();
  const allProducts: Product[] = categories.flatMap(c => c.products);

  // ─── Filter products by active category ────────────────────────────
  const categoryMap: Record<string, string> = { eifs: 'cat-eifs', awb: 'cat-awb', fp: 'cat-fp', wp: 'cat-wp' };
  const categoryProducts = allProducts.filter(p => p.category_id === categoryMap[activeCategory]);
  const selectedProduct = selectedProductId
    ? allProducts.find(p => p.id === selectedProductId) || null
    : null;

  return (
    <div className="space-y-6">
      {/* ─── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Product Configurator</h2>
          <p className="text-white/50 text-sm mt-1">
            Browse GCP product catalog and build assembly configurations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1.5 text-xs font-medium rounded-lg border ${
            accessLevel === 'manage'
              ? 'bg-emerald-400/10 border-emerald-400/20 text-emerald-400'
              : accessLevel === 'configure'
                ? 'bg-blue-400/10 border-blue-400/20 text-blue-400'
                : 'bg-gray-400/10 border-gray-400/20 text-gray-400'
          }`}>
            {accessLevel === 'manage' ? 'Full Management' : accessLevel === 'configure' ? 'Configure Access' : 'Read Only'}
          </span>
          {canConfigure && (
            <button className="glass-button flex items-center gap-2 px-4 py-2 text-sm font-medium">
              <Settings className="w-4 h-4" />
              New Configuration
            </button>
          )}
        </div>
      </div>

      {/* ─── Category Tabs ──────────────────────────────────────────── */}
      <div className="glass-card p-1.5">
        <div className="flex gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setSelectedProductId(null); }}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-white/10 border border-white/15 text-white shadow-lg shadow-white/[0.02]'
                  : 'text-white/40 hover:text-white/60 hover:bg-white/[0.03] border border-transparent'
              }`}
            >
              <span className="block font-semibold">{cat.label}</span>
              <span className={`block text-xs mt-0.5 ${activeCategory === cat.id ? 'text-white/50' : 'text-white/25'}`}>
                {cat.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ─── Product Grid + Detail Panel ────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ─── Product Cards Grid ───────────────────────────────────── */}
        <div className={`${selectedProduct ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <div className={`grid ${selectedProduct ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} gap-4`}>
            {categoryProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => setSelectedProductId(product.id === selectedProductId ? null : product.id)}
                className={`glass-card p-5 text-left transition-all hover:border-white/20 ${
                  selectedProductId === product.id
                    ? 'border-blue-400/40 bg-blue-400/[0.04]'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-white/50" />
                  </div>
                  {product.discontinued && (
                    <span className="px-2 py-0.5 text-xs rounded bg-red-400/10 border border-red-400/20 text-red-400">
                      Discontinued
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-semibold text-white mb-1 line-clamp-1">{product.name}</h4>
                <p className="text-xs text-white/40 mb-4 line-clamp-2">{product.type}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/30">Spec Section</span>
                    <span className="text-xs font-mono text-white/60">{product.spec_section}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/30">Warranty</span>
                    <span className="text-xs text-white/60">{product.warranty.years} years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/30">Compatibility</span>
                    <span className="text-xs text-white/60">{product.compatible_with.length} products</span>
                  </div>
                </div>
              </button>
            ))}
            {categoryProducts.length === 0 && (
              <div className="col-span-full glass-card p-12 text-center">
                <Package className="w-8 h-8 text-white/20 mx-auto mb-3" />
                <p className="text-white/40 text-sm">No products in this category.</p>
              </div>
            )}
          </div>
        </div>

        {/* ─── Selected Product Detail Panel ────────────────────────── */}
        {selectedProduct && (
          <div className="lg:col-span-1">
            <div className="glass-card p-5 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Product Details</h3>
                <button
                  onClick={() => setSelectedProductId(null)}
                  className="text-white/30 hover:text-white/60 text-xs"
                >
                  Close
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">{selectedProduct.name}</h4>
                  <p className="text-xs text-white/50">{selectedProduct.description}</p>
                </div>

                <div className="h-px bg-white/[0.06]" />

                {/* ─── Specifications ──────────────────────────────── */}
                <div>
                  <h5 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Specifications</h5>
                  <div className="space-y-1.5">
                    {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between py-1 px-2 rounded bg-white/[0.02]">
                        <span className="text-xs text-white/40">{key.replace(/_/g, ' ')}</span>
                        <span className="text-xs font-medium text-white/70">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-white/[0.06]" />

                {/* ─── Warranty Info ───────────────────────────────── */}
                <div>
                  <h5 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Warranty</h5>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/40">Duration</span>
                      <span className="text-xs font-medium text-white/70">{selectedProduct.warranty.years} years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/40">Type</span>
                      <span className="text-xs font-medium text-white/70">{selectedProduct.warranty.type}</span>
                    </div>
                    <div>
                      <span className="text-xs text-white/40">Covers:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedProduct.warranty.covers.map((item) => (
                          <span key={item} className="px-2 py-0.5 text-xs rounded bg-emerald-400/10 border border-emerald-400/20 text-emerald-400/70">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-white/[0.06]" />

                {/* ─── Compatible Products ─────────────────────────── */}
                <div>
                  <h5 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                    Compatible Products ({selectedProduct.compatible_with.length})
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {selectedProduct.compatible_with.map((compat) => (
                      <span key={compat} className="px-2 py-0.5 text-xs rounded bg-white/[0.06] border border-white/10 text-white/50">
                        {compat}
                      </span>
                    ))}
                  </div>
                </div>

                {canConfigure && (
                  <>
                    <div className="h-px bg-white/[0.06]" />
                    <button className="glass-button w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium">
                      <Layers className="w-4 h-4" />
                      Add to Configuration
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── Saved Configurations ────────────────────────────────────── */}
      <div className="glass-card overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-white/40" />
              <h3 className="text-sm font-semibold text-white">Saved Configurations</h3>
            </div>
            <span className="text-xs text-white/30">{configurations.length} configurations</span>
          </div>
        </div>
        <div className="divide-y divide-white/[0.06]">
          {configurations.map((config) => (
            <div key={config.id} className="px-5 py-4 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center">
                      <Layers className="w-4 h-4 text-white/40" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-white truncate">
                          Project {config.project_id}
                        </h4>
                        <span className="px-2 py-0.5 text-xs font-mono rounded bg-white/[0.06] border border-white/10 text-white/50">
                          {config.assembly_type}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-white/30">
                          {config.layers.length} layers
                        </span>
                        <span className="text-white/10">|</span>
                        <span className="text-xs text-white/30">
                          {config.substrate_type}
                        </span>
                        {config.coverage_area && (
                          <>
                            <span className="text-white/10">|</span>
                            <span className="text-xs text-white/30">
                              {config.coverage_area.toLocaleString()} sq ft
                            </span>
                          </>
                        )}
                        {config.estimated_cost && (
                          <>
                            <span className="text-white/10">|</span>
                            <span className="text-xs text-white/30">
                              {formatCurrency(config.estimated_cost)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <div className="flex items-center gap-1.5">
                    {config.warranty_eligible && (
                      <CheckCircle className="w-4 h-4 text-emerald-400/60" />
                    )}
                    <span className={`status-badge px-2.5 py-1 text-xs font-medium rounded-full border ${configStatusBadge[config.status]}`}>
                      {config.status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </span>
                  </div>
                  <span className="text-xs text-white/30">{formatDate(config.created_at)}</span>
                </div>
              </div>
            </div>
          ))}
          {configurations.length === 0 && (
            <div className="px-5 py-12 text-center">
              <Settings className="w-8 h-8 text-white/20 mx-auto mb-3" />
              <p className="text-white/40 text-sm">No saved configurations yet.</p>
            </div>
          )}
        </div>

        {/* ─── Footer ──────────────────────────────────────────────── */}
        <div className="border-t border-white/[0.06] px-5 py-3 flex items-center justify-between">
          <span className="text-xs text-white/30">
            {configurations.filter(c => c.warranty_eligible).length} of {configurations.length} warranty eligible
          </span>
          <span className="text-xs text-white/30">
            Access: <span className={
              accessLevel === 'manage' ? 'text-emerald-400' :
              accessLevel === 'configure' ? 'text-blue-400' : 'text-gray-400'
            }>{accessLevel}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
