import * as React from 'react';
import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Data Sources | BuyWise',
  description: 'Learn where BuyWise aggregates its property intelligence and market data from.',
};

export default function DataSourcesPage() {
  return (
    <main className="container" style={{ padding: 'var(--space-12) 0', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-8)', textAlign: 'center' }}>
        Our Data Sources
      </h1>
      
      <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', marginBottom: 'var(--space-8)' }}>
        BuyWise aggregates intelligence from multiple verified public, private, and proprietary sources. Transparency is key to our Trust Center. Below is a list of data streams we utilize to calculate the BuyWise Score and Risk Matrix:
      </p>

      <ul style={{ fontSize: 'var(--text-lg)', lineHeight: 1.8, marginBottom: 'var(--space-12)', marginLeft: 'var(--space-6)' }}>
        <li>Government land and registration records (where publicly available)</li>
        <li>User-submitted primary documents (Sale Deeds, ECs, Khatas)</li>
        <li>Public mapping and geospatial data (Google Maps API, ISRO Bhuvan)</li>
        <li>Historical market transaction data and trends</li>
        <li>Infrastructure announcements (BMRCL, BDA master plans)</li>
        <li>RERA (Real Estate Regulatory Authority) public databases</li>
        <li>BuyWise proprietary risk analysis algorithms</li>
      </ul>

      <div style={{ 
        background: 'rgba(234, 179, 8, 0.1)', 
        border: '1px solid rgba(234, 179, 8, 0.2)', 
        padding: 'var(--space-6)', 
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        gap: 'var(--space-4)'
      }}>
        <AlertTriangle color="#EAB308" size={24} style={{ flexShrink: 0 }} />
        <div>
          <h3 style={{ fontSize: 'var(--text-lg)', color: '#CA8A04', marginBottom: 'var(--space-2)' }}>
            Disclaimer
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            BuyWise aggregates information from multiple public and private sources. While reasonable efforts are made to ensure absolute accuracy through our AI and human legal teams, users should independently verify critical information before making irrevocable financial or legal decisions. BuyWise is a decision-support tool, not a substitute for statutory due diligence.
          </p>
        </div>
      </div>
    </main>
  );
}
