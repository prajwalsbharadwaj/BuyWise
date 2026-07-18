import * as React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card/Card';

export const metadata: Metadata = {
  title: 'Blog & Property Insights | BuyWise',
  description: 'Expert guides on Khata transfers, RERA, property frauds, and real estate investing in India.',
};

const POSTS = [
  { slug: 'khata-guide', title: 'The Ultimate Guide to Khata Transfer in Bangalore', category: 'Guides', date: 'Oct 12, 2026' },
  { slug: 'property-frauds', title: '5 Common Property Frauds and How BuyWise Prevents Them', category: 'Security', date: 'Oct 05, 2026' },
  { slug: 'rera-explained', title: 'Understanding RERA: What Builders Don\'t Tell You', category: 'Legal', date: 'Sep 28, 2026' },
  { slug: 'metro-expansion', title: 'How Namma Metro Phase 3 Will Impact Real Estate Prices', category: 'Investment', date: 'Sep 15, 2026' }
];

export default function BlogIndexPage() {
  return (
    <main className="container" style={{ padding: 'var(--space-12) 0', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)', textAlign: 'center' }}>
        BuyWise Insights
      </h1>
      <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', marginBottom: 'var(--space-12)', textAlign: 'center' }}>
        Educational guides, investment analysis, and market updates from our legal and engineering experts.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {POSTS.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card hoverable style={{ border: '1px solid var(--border-color)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}>
              <CardContent style={{ padding: 'var(--space-6)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--primary-color)', fontWeight: 'var(--weight-bold)' }}>{post.category}</span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{post.date}</span>
                </div>
                <h2 style={{ fontSize: 'var(--text-2xl)' }}>{post.title}</h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
