import * as React from 'react';
import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | BuyWise',
  description: 'Terms of Service and usage conditions for the BuyWise platform.',
};

export default function TermsPage() {
  return (
    <main className="container" style={{ padding: 'var(--space-12) 0', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-8)', textAlign: 'center' }}>
        Terms of Service
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)', textAlign: 'center' }}>
        Last updated: October 2026
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.1)', 
          border: '1px solid rgba(239, 68, 68, 0.2)', 
          padding: 'var(--space-6)', 
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          gap: 'var(--space-4)'
        }}>
          <AlertTriangle color="#EF4444" size={24} style={{ flexShrink: 0 }} />
          <div>
            <h3 style={{ fontSize: 'var(--text-lg)', color: '#B91C1C', marginBottom: 'var(--space-2)' }}>
              Important Disclaimer
            </h3>
            <p style={{ color: '#991B1B', lineHeight: 1.6 }}>
              BuyWise provides decision support tools and professional service coordination. BuyWise does not guarantee investment returns, property appreciation, loan approval, or absolute legal outcomes. You remain solely responsible for your financial decisions.
            </p>
          </div>
        </div>

        <section>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>1. Platform Usage & Responsibilities</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Users must provide accurate and lawful documents for AI extraction and human verification. Uploading forged, tampered, or stolen documents will result in immediate account termination.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>2. AI Limitations</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Our Risk Engine utilizes advanced Large Language Models (LLMs) to scan text. Due to the inherent nature of generative AI and OCR on low-quality municipal documents, false positives/negatives may occur. Always rely on the final human-verified Risk Report for critical decisions.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>3. Payments & Third-Party Services</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Payments made for third-party services (e.g., external engineers, government fees) facilitated through BuyWise are subject to the specific cancellation terms outlined in our Refund Policy.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>4. Intellectual Property</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            The BuyWise Score algorithm, Risk Matrix, and user interface are proprietary intellectual property. Reverse engineering or scraping our data sources is strictly prohibited.
          </p>
        </section>

      </div>
    </main>
  );
}
