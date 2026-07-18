import * as React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BuyWise Methodology | BuyWise',
  description: 'Understand how the BuyWise Score works, our Risk Matrix, and how we measure Confidence Levels.',
};

export default function MethodologyPage() {
  return (
    <main className="container" style={{ padding: 'var(--space-12) 0', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-8)', textAlign: 'center' }}>
        The BuyWise Methodology
      </h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        
        <section>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>1. How the BuyWise Score Works</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
            The BuyWise Score is a proprietary metric ranging from 0 to 100 that represents the overall health, legality, and safety of a property transaction. Every property starts at 100. Points are deducted based on anomalies detected by our Intelligence Engine.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>2. The Risk Matrix</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
            Anomalies are categorized into four severity levels:
          </p>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginLeft: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <li><strong style={{ color: 'var(--error-color)' }}>CRITICAL (-50 pts):</strong> Deal-breakers. Examples include missing Sale Deeds, non-existent Khata, or severe lake buffer zone encroachments.</li>
            <li><strong style={{ color: '#EAB308' }}>HIGH (-25 pts):</strong> Severe issues that require immediate legal resolution before proceeding, such as mismatched owner names across documents.</li>
            <li><strong>MEDIUM (-10 pts):</strong> Correctable issues like missing recent tax receipts or incomplete EC years.</li>
            <li><strong>LOW (-5 pts):</strong> Minor clerical errors or missing non-essential supplementary documents.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>3. Legal & Investment Confidence</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
            Our Confidence Level (High, Medium, Low) dictates how heavily you should rely on the automated AI output. If documents are blurry, torn, or non-standard, the Confidence Level drops, and we will explicitly require a manual human legal verification step before you can proceed.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>4. Location Intelligence</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
            BuyWise evaluates properties not just in isolation, but geographically. We calculate route redundancies, proximity to active metro lines, historical flood data, and connectivity to anchor nodes (e.g., IT corridors, CBD) to give you a holistic understanding of where you are buying.
          </p>
        </section>

      </div>
    </main>
  );
}
