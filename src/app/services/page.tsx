import * as React from 'react';
import { prisma } from '@/lib/prisma';
import { ServiceSearch } from '@/components/services/ServiceSearch';

export default async function ServicesPage() {
  const services = await prisma.serviceCatalog.findMany({
    where: { isActive: true },
    orderBy: { category: 'asc' }
  });

  return (
    <main className="container" style={{ padding: 'var(--space-12) 0', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
        <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>
          Real Estate Services
        </h1>
        <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Explore our catalog of verified legal, technical, and compliance services designed to protect your property transaction.
        </p>
      </div>

      <ServiceSearch initialServices={services} />
    </main>
  );
}
