import * as React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | BuyWise',
  description: 'The story behind BuyWise. Why we exist, our mission, and our values.',
};

export default function AboutPage() {
  return (
    <main className="container" style={{ padding: 'var(--space-12) 0', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-12)', textAlign: 'center' }}>
        About BuyWise
      </h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        
        <section>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Our Story</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
            BuyWise was created because buying property in India is often confusing, opaque, and dependent on fragmented information. We realized that even after paying exorbitant fees to brokers and lawyers, buyers were still left with a lingering sense of doubt: <em>"Did I miss something?"</em>
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            We built BuyWise to eliminate that doubt. By combining cutting-edge AI Document Intelligence with strict human legal verification, we've created a platform that protects buyers from fraudulent transactions, hidden legal disputes, and bad investments.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Mission</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            To bring absolute transparency, speed, and security to every real estate transaction in India through the power of artificial intelligence and expert human oversight.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Vision</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            To become the indisputable gold standard for property verification in India, ensuring that no family ever loses their life savings to a fraudulent real estate deal.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Values</h2>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginLeft: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <li><strong>Radical Transparency:</strong> We never hide risks to push a sale. If a property is bad, we will tell you not to buy it.</li>
            <li><strong>Accuracy Above All:</strong> Real estate mistakes are irreversible. We verify everything twice.</li>
            <li><strong>Customer Empathy:</strong> We understand the anxiety of buying a home. We act as your shield.</li>
          </ul>
        </section>

      </div>
    </main>
  );
}
