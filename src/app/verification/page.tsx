import * as React from 'react';
import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/Card/Card';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'What We Verify | BuyWise',
  description: 'Learn about BuyWise\'s comprehensive 10-point property verification process including legal, technical, and compliance checks.',
};

const VERIFICATION_POINTS = [
  'Ownership & Title clear history (Sale Deeds)',
  'Encumbrance Certificate (EC) consistency',
  'Khata Transfer & Registration validity',
  'Survey Number & Zoning Type',
  'Encroachments (Lake buffer, Rajakaluve)',
  'BBMP / BDA / BMRDA layout approvals',
  'RERA Registration (for new projects)',
  'Building Plan Sanction & Deviations',
  'Property Tax Payment History',
  'Bank Loan Eligibility'
];

export default function VerificationPage() {
  return (
    <main className="container" style={{ padding: 'var(--space-12) 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
        <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>
          What BuyWise Verifies
        </h1>
        <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Our multi-layered approach combines AI intelligence with human legal expertise to scrutinize every aspect of your property.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', maxWidth: '800px', margin: '0 auto' }}>
        
        <Card>
          <CardContent style={{ padding: 'var(--space-8)' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-2xl)' }}>
              <ShieldCheck size={28} color="var(--success-color)" />
              The 10-Point BuyWise Verification
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
              {VERIFICATION_POINTS.map((point, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                  <div style={{ 
                    background: 'var(--primary-color)', 
                    color: 'white', 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: 'var(--text-sm)',
                    flexShrink: 0
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontWeight: 'var(--weight-medium)', lineHeight: 1.4 }}>{point}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
              Important Disclaimer
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              BuyWise provides professional assistance, advanced decision support tools, and service coordination. We do everything in our power to uncover hidden risks, but the <strong>final responsibility always remains with the buyer</strong>. Real estate markets carry inherent risks, and no platform can guarantee absolute immunity from future legal or financial disputes.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
