import * as React from 'react';
import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/Card/Card';
import { ShieldCheck, Lock, Database, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';

export const metadata: Metadata = {
  title: 'Trust Center | BuyWise',
  description: 'How BuyWise protects your data and ensures the highest level of accuracy in property transactions.',
};

export default function TrustCenterPage() {
  return (
    <main className="container" style={{ padding: 'var(--space-12) 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
        <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>
          BuyWise Trust Center 
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: 'var(--space-4)' }}>
          {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#EAB308', fontSize: '1.5rem' }}>★</span>)}
        </div>
        <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Security, privacy, and accuracy are the foundation of our platform. Discover how we protect your real estate journey.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-12)' }}>
        
        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Database size={32} color="var(--primary-color)" />
            <h3 style={{ fontSize: 'var(--text-xl)' }}>Data Sources</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Our algorithms pull from official government land records, public mapping data, and RERA databases to ensure our insights are based on ground truth.
            </p>
            <Link href="/data-sources" style={{ color: 'var(--primary-color)', fontWeight: 'var(--weight-medium)', textDecoration: 'none' }}>
              View all sources &rarr;
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Users size={32} color="var(--primary-color)" />
            <h3 style={{ fontSize: 'var(--text-xl)' }}>Human + AI Verification</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              While our proprietary AI scans for hundreds of hidden risks instantly, every critical red flag is verified by human legal experts before you make a decision.
            </p>
            <Link href="/methodology" style={{ color: 'var(--primary-color)', fontWeight: 'var(--weight-medium)', textDecoration: 'none' }}>
              Read our methodology &rarr;
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Lock size={32} color="var(--primary-color)" />
            <h3 style={{ fontSize: 'var(--text-xl)' }}>Bank-Grade Security</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Your highly sensitive property documents (Sale Deeds, Aadhaar, PAN) are encrypted at rest (AES-256) and in transit. We never sell your data to third parties.
            </p>
            <Link href="/legal/privacy" style={{ color: 'var(--primary-color)', fontWeight: 'var(--weight-medium)', textDecoration: 'none' }}>
              Read Privacy Policy &rarr;
            </Link>
          </CardContent>
        </Card>

      </div>

      <div style={{ textAlign: 'center', background: 'var(--surface-color)', padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Ready to buy with confidence?</h2>
        <Link href="/login">
          <Button size="lg">Start Your Transaction</Button>
        </Link>
      </div>
    </main>
  );
}
