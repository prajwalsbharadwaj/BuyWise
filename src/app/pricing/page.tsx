import * as React from 'react';
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { Check } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing & Transparent Fees | BuyWise',
  description: 'Understand the BuyWise pricing model. Access our free intelligence platform, and only pay for human verifications when you need them.',
};

export default function PricingPage() {
  return (
    <main className="container" style={{ padding: 'var(--space-12) 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
        <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>
          Transparent, predictable pricing
        </h1>
        <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          We believe property intelligence should be accessible to everyone. Our platform is free to use. You only pay when you request dedicated professional services.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: 'var(--space-6)',
        marginBottom: 'var(--space-12)'
      }}>
        {/* Free Tier */}
        <Card style={{ border: '1px solid var(--border-color)', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardHeader>
            <CardTitle>Platform Intelligence</CardTitle>
            <CardDescription>Always Free</CardDescription>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--weight-bold)', marginTop: 'var(--space-4)' }}>
              ₹0
            </div>
          </CardHeader>
          <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-6) 0', flex: 1 }}>
              {['Property Search', 'AI Recommendation Engine', 'Locality Comparison', 'Automated Risk Report', 'BuyWise Score Generation'].map(feature => (
                <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                  <Check size={18} color="var(--success-color)" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/login" style={{ width: '100%' }}>
              <Button style={{ width: '100%' }} variant="outline">Sign Up Free</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Paid Services */}
        <Card style={{ border: '2px solid var(--primary-color)', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--primary-color)',
            color: 'white',
            padding: '2px 12px',
            borderRadius: '12px',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--weight-bold)'
          }}>
            PAY PER SERVICE
          </div>
          <CardHeader>
            <CardTitle>Professional Services</CardTitle>
            <CardDescription>Verified by Experts</CardDescription>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--weight-bold)', marginTop: 'var(--space-4)' }}>
              A la carte
            </div>
          </CardHeader>
          <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-6) 0', flex: 1 }}>
              {[
                { name: 'Legal Verification', price: '₹4,999' },
                { name: 'Engineer Visit', price: '₹3,499' },
                { name: 'Khata Assistance', price: '₹1,999' },
                { name: 'Premium Property Report', price: '₹999' },
                { name: 'Loan Assistance', price: 'Free*' },
              ].map(feature => (
                <li key={feature.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)', borderBottom: '1px dashed var(--border-color)', paddingBottom: 'var(--space-2)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <Check size={18} color="var(--primary-color)" />
                    {feature.name}
                  </span>
                  <span style={{ fontWeight: 'var(--weight-bold)' }}>{feature.price}</span>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)', textAlign: 'center' }}>
              * Prices may vary depending on state, locality, and complexity.
            </p>
            <Link href="/services" style={{ width: '100%' }}>
              <Button style={{ width: '100%' }}>View All Services</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

    </main>
  );
}
