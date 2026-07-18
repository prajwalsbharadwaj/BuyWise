import * as React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | BuyWise',
  description: 'Join BuyWise to build the future of secure real estate transactions.',
};

export default function CareersPage() {
  return (
    <main className="container" style={{ padding: 'var(--space-12) 0', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>
        Join the BuyWise Team
      </h1>
      
      <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', marginBottom: 'var(--space-12)' }}>
        We are on a mission to eliminate fraud from Indian real estate.
      </p>

      <div style={{ background: 'var(--surface-color)', padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', marginBottom: 'var(--space-12)' }}>
        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Open Positions</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          We don't have any open roles at the exact moment, but BuyWise is always looking for driven <strong>Engineers, Real Estate Lawyers, Civil Surveyors, and Data Scientists</strong>.
        </p>
        <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-4)' }}>
          If you are passionate about cleaning up the prop-tech space, send your resume and a brief intro to <a href="mailto:careers@buywise.in" style={{ color: 'var(--primary-color)' }}>careers@buywise.in</a>.
        </p>
      </div>

    </main>
  );
}
