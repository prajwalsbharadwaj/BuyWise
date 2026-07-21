import * as React from 'react';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import { Card, CardContent } from '@/components/ui/Card/Card';
import { CheckCircle2, Clock, MapPin, Building, ArrowLeft } from 'lucide-react';

export default async function ServiceDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ serviceCode: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { serviceCode } = await params;

  const resolvedSearchParams = await searchParams;
  const transactionId = resolvedSearchParams.transactionId as string | undefined;
  const service = await prisma.serviceCatalog.findUnique({
    where: { code: serviceCode }
  });

  if (!service) {
    notFound();
  }

  const session = await auth();
  const role = (session?.user as any)?.role || 'GUEST';

  // Parse JSON deliverables safely
  let deliverables: string[] = [];
  if (Array.isArray(service.deliverables)) {
    deliverables = service.deliverables as string[];
  } else if (typeof service.deliverables === 'string') {
    try {
      const parsed = JSON.parse(service.deliverables);
      if (Array.isArray(parsed)) deliverables = parsed;
    } catch (e) {
      // fallback to empty array
    }
  }

  return (
    <main className="container" style={{ padding: 'var(--space-8) 0 var(--space-16)', maxWidth: '800px' }}>
      <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: 'var(--space-8)' }}>
        <ArrowLeft size={16} />
        <span>Back to Services</span>
      </Link>

      <div style={{ marginBottom: 'var(--space-8)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
          <Badge variant="primary">{service.category}</Badge>
          <Badge variant="outline">{service.phase.replace('_', ' ')}</Badge>
        </div>
        
        <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>
          {service.name}
        </h1>
        
        <p style={{ fontSize: 'var(--text-xl)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
          {service.description}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-12)' }}>
        <Card>
          <CardContent style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary-600)', borderRadius: 'var(--radius-md)' }}>
              <Clock size={24} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Estimated Time</p>
              <p style={{ margin: 0, fontWeight: 'var(--weight-semibold)' }}>{service.estimatedDurationHours} Hours</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-secondary-50)', color: 'var(--color-secondary-600)', borderRadius: 'var(--radius-md)' }}>
              <MapPin size={24} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Physical Presence</p>
              <p style={{ margin: 0, fontWeight: 'var(--weight-semibold)' }}>
                {service.requiresPhysicalPresence ? 'Required' : 'Not Required'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div style={{ marginBottom: 'var(--space-12)' }}>
        <h2 style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-6)' }}>
          What you get
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {deliverables.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
              <CheckCircle2 style={{ color: 'var(--color-secondary-500)', flexShrink: 0, marginTop: '2px' }} size={20} />
              <span style={{ fontSize: 'var(--text-base)', color: 'var(--text-primary)' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <Card glass style={{ padding: 'var(--space-8)', textAlign: 'center', backgroundColor: 'var(--bg-tertiary)' }}>
        <h3 style={{ fontSize: 'var(--text-xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>How to purchase</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
          To ensure we have all the correct context, services can only be purchased from within an active transaction or property listing. 
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
          {role === 'SELLER' ? (
            <Link href="/dashboard/seller/listings" style={{ textDecoration: 'none', width: '100%', maxWidth: '300px' }}>
              <Button size="lg" variant="primary" style={{ width: '100%' }}>
                Manage My Listings
              </Button>
            </Link>
          ) : (
            <Link href="/properties" style={{ textDecoration: 'none', width: '100%', maxWidth: '300px' }}>
              <Button size="lg" variant="primary" style={{ width: '100%' }}>
                Browse Properties
              </Button>
            </Link>
          )}
          
          <Link href="/dashboard" style={{ textDecoration: 'none', width: '100%', maxWidth: '300px' }}>
            <Button size="lg" variant="outline" style={{ width: '100%' }}>
              Go to My Dashboard
            </Button>
          </Link>
        </div>
      </Card>
    </main>
  );
}
