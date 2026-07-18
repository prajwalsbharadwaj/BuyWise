import * as React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Card, CardContent } from '@/components/ui/Card/Card';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/auth/login?callbackUrl=/admin/dashboard');
  }

  const role = (session.user as any).role;
  if (role !== 'ADMIN') {
    redirect('/dashboard');
  }

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 72px)' }}>
      {/* Admin Sidebar */}
      <aside style={{ width: '250px', borderRight: '1px solid var(--border-subtle)', padding: 'var(--space-6)', backgroundColor: 'var(--bg-secondary)' }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-semibold)', marginBottom: 'var(--space-6)', color: 'var(--text-secondary)' }}>
          Operational Portal
        </h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <Link href="/admin/dashboard" style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 'var(--weight-medium)', padding: 'var(--space-2) var(--space-4)', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
            Service Requests
          </Link>
          <div style={{ padding: 'var(--space-2) var(--space-4)', color: 'var(--text-tertiary)', cursor: 'not-allowed' }}>
            User Management (WIP)
          </div>
          <div style={{ padding: 'var(--space-2) var(--space-4)', color: 'var(--text-tertiary)', cursor: 'not-allowed' }}>
            Payments (WIP)
          </div>
        </nav>
      </aside>

      {/* Admin Content Area */}
      <main style={{ flex: 1, padding: 'var(--space-8)', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
}
