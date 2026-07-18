import * as React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import { MapPin, ShieldCheck, CheckCircle2, ChevronRight, MessageSquare, Mic, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Property Details | BuyWise',
  description: 'View property details and AI-verified intelligence.',
};

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // Mock property data based on the ID (we use the first mock from the listing page)
  const prop = {
    id: resolvedParams.id,
    title: 'Modern 3BHK in Prestige Shantiniketan',
    locality: 'Whitefield, Bengaluru',
    price: '2.1 Cr',
    bhk: '3 BHK',
    sqft: '1,850',
    type: 'Apartment',
    buywiseScore: 92,
    isCertified: true,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200',
    tags: ['Pre-verified Khata', 'Clear Title'],
    sellerScenario: "I am looking to sell my 3 BHK apartment in Whitefield because I am moving to the US next month. The Khata is currently in my father's name, so I need to know if that will be an issue for the sale.",
    amenities: ['Power Backup', 'Swimming Pool', 'Gymnasium', '24x7 Security', 'Club House'],
    aiVerification: [
      { check: 'Khata Status', status: 'verified', note: 'A-Khata verified via BBMP portal' },
      { check: 'RERA Compliance', status: 'verified', note: 'Project is RERA registered' },
      { check: 'Encumbrance', status: 'warning', note: 'Active loan with HDFC Bank (Requires NOC)' },
    ]
  };

  return (
    <main style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh', paddingBottom: 'var(--space-12)' }}>
      {/* Hero Image */}
      <div style={{ width: '100%', height: '400px', position: 'relative', overflow: 'hidden' }}>
        <img 
          src={prop.image} 
          alt={prop.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
        
        <div className="container" style={{ position: 'absolute', bottom: 'var(--space-8)', left: 0, right: 0 }}>
          {prop.isCertified && (
            <Badge variant="primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', marginBottom: 'var(--space-4)', boxShadow: 'var(--shadow-md)' }}>
              <ShieldCheck size={16} /> BuyWise Certified Property
            </Badge>
          )}
          <h1 style={{ color: 'white', fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>
            {prop.title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'var(--text-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <MapPin size={18} /> {prop.locality}
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'var(--space-8)', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-8)' }}>
        
        {/* Left Column - Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
          
          <div style={{ display: 'flex', gap: 'var(--space-8)', padding: 'var(--space-6)', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', textTransform: 'uppercase' }}>Asking Price</p>
              <p style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)' }}>₹{prop.price}</p>
            </div>
            <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }} />
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', textTransform: 'uppercase' }}>Configuration</p>
              <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)' }}>{prop.bhk}</p>
            </div>
            <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }} />
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', textTransform: 'uppercase' }}>Built-up Area</p>
              <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)' }}>{prop.sqft} sqft</p>
            </div>
          </div>

          <Card glass>
            <CardHeader>
              <CardTitle style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Mic size={20} color="var(--primary-color)" />
                Seller's Voice Note Scenario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-color)' }}>
                <p style={{ color: 'var(--text-primary)', fontStyle: 'italic', lineHeight: 1.6 }}>"{prop.sellerScenario}"</p>
              </div>
              <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                This allows you as a buyer to understand the context of the sale. BuyWise AI has already analyzed this scenario to generate the verification checks below.
              </p>
            </CardContent>
          </Card>

          <Card glass>
            <CardHeader>
              <CardTitle>AI Verification Summary</CardTitle>
            </CardHeader>
            <CardContent style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {prop.aiVerification.map((v, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', paddingBottom: 'var(--space-4)', borderBottom: i !== prop.aiVerification.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                  {v.status === 'verified' ? <CheckCircle2 size={24} color="var(--color-success-500)" /> : <AlertTriangle size={24} color="var(--color-warning-500)" />}
                  <div>
                    <h4 style={{ fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)', marginBottom: 'var(--space-1)' }}>{v.check}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>{v.note}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div>
            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-semibold)', marginBottom: 'var(--space-4)' }}>Amenities</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              {prop.amenities.map(a => (
                <Badge key={a} variant="outline" style={{ padding: 'var(--space-2) var(--space-4)' }}>{a}</Badge>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column - Action Card */}
        <div>
          <Card style={{ position: 'sticky', top: 'var(--space-8)' }}>
            <CardHeader style={{ backgroundColor: 'var(--color-primary-50)', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'var(--weight-bold)', color: 'var(--color-primary-700)' }}>BuyWise Score</span>
                <span style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', color: 'var(--color-success-600)', fontWeight: 'var(--weight-bold)' }}>{prop.buywiseScore}/100</span>
              </div>
            </CardHeader>
            <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                This property has excellent legal standing, but there is an active loan that requires bank clearance during the sale.
              </p>
              
              <Button size="lg" variant="primary" style={{ width: '100%' }}>
                Contact Owner
              </Button>
              
              <form action={async () => {
                'use server';
                const { redirect } = await import('next/navigation');
                const { initiateTransactionFromProperty } = await import('@/actions/transaction.actions');
                const tx = await initiateTransactionFromProperty(prop.id);
                redirect(`/dashboard/transactions/${tx.id}/documents`);
              }}>
                <Button type="submit" size="lg" variant="outline" style={{ width: '100%' }} rightIcon={<ChevronRight size={16} />}>
                  Start Transaction
                </Button>
              </form>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-4)', color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)' }}>
                <MessageSquare size={14} /> Zero brokerage. 100% transparent.
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </main>
  );
}
