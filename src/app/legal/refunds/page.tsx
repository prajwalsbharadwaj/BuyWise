import * as React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy | BuyWise',
  description: 'Cancellation and refund policies for BuyWise professional services.',
};

export default function RefundsPage() {
  return (
    <main className="container" style={{ padding: 'var(--space-12) 0', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-8)', textAlign: 'center' }}>
        Refund & Cancellation Policy
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        
        <section>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Digital Reports & Platform Services</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Automated AI Risk Reports, Locality Comparisons, and BuyWise Score Generation are delivered instantly. Therefore, <strong>no refunds are provided</strong> after these digital reports have been successfully generated and delivered to your dashboard.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Legal Consultations & Verifications</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            You may cancel a requested legal service for a <strong>100% refund</strong> provided the cancellation is made <em>before</em> our legal team begins the manual verification process (usually within 12 hours of request). Once verification begins, fees are non-refundable.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Physical Engineer Visits</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            On-site engineer visits can be cancelled for a full refund up to <strong>24 hours</strong> before the scheduled visit time. Cancellations made within 24 hours of the scheduled time are subject to a ₹1,000 cancellation fee, with the remainder refunded.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Government & Processing Fees</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Any fees paid towards government challans, stamp duty, or registration department processing (e.g., during Khata transfers) are strictly <strong>non-refundable</strong> under any circumstances. Platform service fees associated with these tasks follow standard cancellation rules prior to application submission.
          </p>
        </section>

      </div>
    </main>
  );
}
