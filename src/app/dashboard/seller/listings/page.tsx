import * as React from 'react';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { Badge } from '@/components/ui/Badge/Badge';
import { PlusCircle, MapPin, Building2, Eye, Users } from 'lucide-react';
import Link from 'next/link';

export default async function SellerListingsPage() {
  const session = await auth();
  if (!session?.user?.id || (session.user as any).role !== 'SELLER') {
    redirect('/login');
  }

  const listings = await prisma.property.findMany({
    where: { listedById: session.user.id },
    include: {
      location: true,
      transactions: {
        where: { status: { notIn: ['COMPLETED', 'ABANDONED'] } }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0 0 var(--space-2)', fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            My Listings
          </h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}>
            Manage your listed properties and track their performance.
          </p>
        </div>
        <Link href="/seller/list" style={{ textDecoration: 'none' }}>
          <Button variant="primary" leftIcon={<PlusCircle size={18} />}>
            Create New Listing
          </Button>
        </Link>
      </div>

      {listings.length === 0 ? (
        <Card>
          <CardContent style={{ padding: 'var(--space-12)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
            <Building2 size={48} color="var(--text-tertiary)" />
            <div>
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-semibold)', marginBottom: 'var(--space-2)' }}>No Listings Yet</h3>
              <p style={{ color: 'var(--text-secondary)' }}>You haven't added any properties to the platform yet.</p>
            </div>
            <Link href="/seller/list" style={{ textDecoration: 'none' }}>
              <Button variant="primary" style={{ marginTop: 'var(--space-2)' }}>Add Your First Property</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
          {listings.map(property => (
            <Card key={property.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '160px', backgroundColor: 'var(--bg-secondary)', position: 'relative', borderTopLeftRadius: 'var(--radius-lg)', borderTopRightRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 'var(--space-3)', right: 'var(--space-3)' }}>
                  <Badge variant={property.status === 'ACTIVE' ? 'success' : 'warning'}>{property.status}</Badge>
                </div>
                {/* Placeholder for property image */}
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>
                  <Building2 size={32} opacity={0.2} />
                </div>
              </div>
              <CardContent style={{ padding: 'var(--space-4)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-semibold)', marginBottom: 'var(--space-1)' }}>
                  {property.title}
                </h3>
                <p style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
                  <MapPin size={14} /> {property.location.name}
                </p>
                
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 'var(--weight-bold)', fontSize: 'var(--text-lg)' }}>
                    ₹{(property.askingPrice / 100000).toFixed(2)} L
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-xs)' }}>
                      <Eye size={14} /> --
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-xs)' }}>
                      <Users size={14} /> {property.transactions.length}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
