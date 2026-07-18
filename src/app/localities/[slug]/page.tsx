import * as React from 'react';
import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/Card/Card';
import { MapPin, Train, Droplets, Car, TrendingUp } from 'lucide-react';
import Link from 'next/link';

type Props = {
  params: { slug: string };
};

// In a real app, this would fetch from a database or CMS.
// This mock object demonstrates the SEO page structure the user requested.
const LOCALITY_DB: Record<string, any> = {
  'jayanagar': {
    name: 'Jayanagar',
    city: 'Bangalore',
    overview: 'One of Bangalore\'s oldest, most planned, and affluent residential neighborhoods. Known for its wide tree-lined boulevards, extensive park network, and strong community feel.',
    avgPrice: '₹12,000 - ₹20,000 per sqft',
    buywiseScore: 88,
    connectivity: 'Excellent connectivity via Outer Ring Road, Bannerghatta Road, and Kanakapura Road.',
    metro: 'Green Line (Jayanagar Metro Station)',
    schools: 'Carmel Convent, Sudarshan Vidya Mandir, National Public School (NPS)',
    hospitals: 'Apollo Cradle, Manipal Hospital, Ramakrishna Super Speciality',
    water: 'Highly reliable Cauvery water supply. Minimal reliance on private tankers.',
    traffic: 'Moderate to High during peak hours (especially around 4th Block).',
    pros: ['Excellent greenery and parks', 'Top-tier schools and hospitals', 'Strong Cauvery water supply'],
    cons: ['Very high property prices', 'Limited new apartment projects', 'Traffic congestion in commercial blocks'],
    futureDevelopments: 'Proposed grade-separated interchanges on Bannerghatta Road to ease traffic flow.',
    nearbyIT: 'Kalyani Magnum (JP Nagar), Global Village Tech Park (15km)'
  }
};

export function generateMetadata({ params }: Props): Metadata {
  const locality = LOCALITY_DB[params.slug];
  if (!locality) return { title: 'Locality Not Found' };
  
  return {
    title: `Property in ${locality.name}, ${locality.city} | BuyWise Insights`,
    description: `Complete real estate guide for ${locality.name}. View average prices, water situation, metro connectivity, and the BuyWise Score.`,
  };
}

export default function LocalityPage({ params }: Props) {
  const data = LOCALITY_DB[params.slug];

  if (!data) {
    return (
      <div className="container" style={{ padding: 'var(--space-12) 0', textAlign: 'center' }}>
        <h1>Locality not found</h1>
        <Link href="/localities" style={{ color: 'var(--primary-color)' }}>Browse all localities</Link>
      </div>
    );
  }

  return (
    <main className="container" style={{ padding: 'var(--space-12) 0' }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-12)' }}>
        <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)' }}>
          {data.name} Real Estate Guide
        </h1>
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--surface-color)', padding: '4px 12px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <MapPin size={16} /> {data.city}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--primary-color)', color: 'white', padding: '4px 12px', borderRadius: '16px' }}>
            <TrendingUp size={16} /> BuyWise Score: {data.buywiseScore}/100
          </span>
        </div>
        <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
          {data.overview}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-12)' }}>
        <Card>
          <CardContent style={{ padding: 'var(--space-6)' }}>
            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <TrendingUp size={20} color="var(--primary-color)"/> Market Data
            </h3>
            <p><strong>Average Price:</strong> {data.avgPrice}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ padding: 'var(--space-6)' }}>
            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Droplets size={20} color="#0EA5E9"/> Utilities
            </h3>
            <p><strong>Water Situation:</strong> {data.water}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ padding: 'var(--space-6)' }}>
            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Train size={20} color="#10B981"/> Transit
            </h3>
            <p><strong>Metro:</strong> {data.metro}</p>
            <p><strong>Traffic:</strong> {data.traffic}</p>
          </CardContent>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', marginBottom: 'var(--space-12)' }}>
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ color: '#047857', marginBottom: 'var(--space-4)' }}>Pros</h3>
          <ul style={{ color: '#065F46', paddingLeft: 'var(--space-4)' }}>
            {data.pros.map((p: string) => <li key={p}>{p}</li>)}
          </ul>
        </div>
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ color: '#B91C1C', marginBottom: 'var(--space-4)' }}>Cons</h3>
          <ul style={{ color: '#991B1B', paddingLeft: 'var(--space-4)' }}>
            {data.cons.map((c: string) => <li key={c}>{c}</li>)}
          </ul>
        </div>
      </div>

      <div style={{ background: 'var(--surface-color)', padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>Buying in {data.name}?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>Don't sign anything until you run a BuyWise Risk Report.</p>
        <Link href="/transaction/new" style={{ background: 'var(--primary-color)', color: 'white', padding: '12px 24px', borderRadius: 'var(--radius-md)', textDecoration: 'none', fontWeight: 'bold' }}>
          Verify a Property Here
        </Link>
      </div>

    </main>
  );
}
