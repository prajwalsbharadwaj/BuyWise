import * as React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | BuyWise',
  description: 'How BuyWise collects, protects, and uses your data.',
};

export default function PrivacyPage() {
  return (
    <main className="container" style={{ padding: 'var(--space-12) 0', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-8)', textAlign: 'center' }}>
        Privacy Policy
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        
        <section>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Data We Collect</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
            We only collect data necessary to provide you with secure and accurate real estate verification:
          </p>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginLeft: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <li>Name, Email, and Phone Number (for account management and alerts).</li>
            <li>Uploaded Property Documents (Sale Deeds, ECs, Khatas).</li>
            <li>Property Information (Survey numbers, coordinates).</li>
            <li>Location Data (Only if explicitly permitted for routing/connectivity intelligence).</li>
            <li>Device & Usage Information (Cookies for basic session management).</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>How We Protect Your Data</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            All user-uploaded documents are stored in secure, encrypted cloud buckets (AES-256 encryption at rest). Data in transit is secured via TLS 1.3. Access to raw documents is strictly limited to authorized legal verifying personnel on a need-to-know basis.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Third Parties & Data Sharing</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            We do NOT sell your personal data to brokers, developers, or ad agencies. Your data may only be shared with verified third-party partners (e.g., banks for loan processing, on-ground engineers) ONLY when you explicitly request their specific services.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Your Rights (GDPR & DPDP Act Ready)</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            You have the right to request a full export of your personal data or request permanent deletion of your account and uploaded documents at any time. To exercise these rights, email privacy@buywise.in.
          </p>
        </section>

      </div>
    </main>
  );
}
