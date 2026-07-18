import * as React from 'react';
import { prisma } from '@/lib/prisma';
import { ServiceSearch } from '@/components/services/ServiceSearch';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function PurchaseServicePage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  
  const services = await prisma.serviceCatalog.findMany({
    where: { isActive: true },
    orderBy: { category: 'asc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <Link href={`/dashboard/transactions/${id}/services`} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: 'var(--space-4)' }}>
        <ArrowLeft size={16} />
        <span>Back to My Services</span>
      </Link>

      <div>
        <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-semibold)', marginBottom: 'var(--space-2)' }}>Purchase a Service</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Browse and request verified legal, technical, and compliance services for this transaction.</p>
      </div>

      <div style={{ marginTop: 'var(--space-8)' }}>
        <ServiceSearch initialServices={services} transactionId={id} />
      </div>
    </div>
  );
}
