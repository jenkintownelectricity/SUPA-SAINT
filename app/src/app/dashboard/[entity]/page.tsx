'use client';

import { EntityLoader } from '@/shell/EntityLoader';
import { useSAINTAuth } from '@/auth/SAINTAuth';
import { useParams } from 'next/navigation';
import type { Role } from '@/lib/types';

export default function EntityPage() {
  const params = useParams();
  const { currentRole } = useSAINTAuth();
  const entityId = params?.entity as string;

  if (!currentRole) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="glass-card text-center">
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  return <EntityLoader entityId={entityId} role={currentRole as Role} />;
}
