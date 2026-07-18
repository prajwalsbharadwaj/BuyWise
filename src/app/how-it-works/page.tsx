import * as React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works | BuyWise',
  description: 'The end-to-end property buying journey on BuyWise.',
};

const TIMELINE = [
  { step: 'Search', desc: 'Find properties that match your lifestyle and route redundancies.' },
  { step: 'Analyze', desc: 'Upload documents. Our AI extracts data instantly.' },
  { step: 'Verify', desc: 'Human experts perform deep legal and technical checks.' },
  { step: 'Finance', desc: 'Secure the best mortgage rates through our banking partners.' },
  { step: 'Negotiate', desc: 'Leverage our Risk Report to negotiate a fair price.' },
  { step: 'Register', desc: 'We handle the sub-registrar office coordination.' },
  { step: 'Own', desc: 'Move in with complete peace of mind.' }
];

export default function HowItWorksPage() {
  return (
    <main className="container" style={{ padding: 'var(--space-12) 0', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-12)', textAlign: 'center' }}>
        How BuyWise Works
      </h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {TIMELINE.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 'var(--space-6)', position: 'relative' }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: 'var(--primary-color)', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {i + 1}
              </div>
              {i < TIMELINE.length - 1 && (
                <div style={{
                  width: '2px',
                  height: '100%',
                  background: 'var(--border-color)',
                  position: 'absolute',
                  top: '40px'
                }} />
              )}
            </div>
            <div style={{ paddingBottom: 'var(--space-8)' }}>
              <h3 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>{item.step}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
