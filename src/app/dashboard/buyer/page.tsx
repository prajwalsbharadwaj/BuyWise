import * as React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { Badge } from '@/components/ui/Badge/Badge';
import { Search, MapPin, Building, ChevronRight, Home, Star } from 'lucide-react';
import { auth } from '@/lib/auth';

export default async function BuyerDashboardPage() {
  const session = await auth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <div>
        <h1 style={{ margin: '0 0 var(--space-2)', fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
          Welcome back, {session?.user?.name?.split(' ')[0] || 'Buyer'}
        </h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}>
          Let's find your dream property.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
        
        {/* Quick Actions / AI Discovery */}
        <Card glass style={{ gridColumn: '1 / -1' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 'var(--space-8)' }}>
            <div style={{ 
              width: '64px', height: '64px', borderRadius: '50%', 
              backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary-500)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)'
            }}>
              <Search size={32} />
            </div>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>Start a New Discovery Journey</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', marginBottom: 'var(--space-6)' }}>
              Answer a few questions about your lifestyle, family, and workplace, and our AI will recommend the perfect localities and properties for you.
            </p>
            <Link href="/localities">
              <Button variant="primary" rightIcon={<ChevronRight size={16} />}>
                Explore Localities
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recommended Properties */}
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Recommended For You</CardTitle>
              <Link href="/properties" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary-600)', textDecoration: 'none', fontWeight: 'var(--weight-medium)' }}>
                View All
              </Link>
            </div>
            <CardDescription>Based on your preferred locations and budget</CardDescription>
          </CardHeader>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {/* Mock Property 1 */}
            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Home size={24} color="var(--text-secondary)" />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 4px', fontSize: 'var(--text-md)' }}>Luxury 3BHK Apartment</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  <MapPin size={12} /> Indiranagar, Bengaluru
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold', fontSize: 'var(--text-md)' }}>₹2.5 Cr</div>
                <Badge variant="success" size="sm">98% Match</Badge>
              </div>
            </div>

            {/* Mock Property 2 */}
            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building size={24} color="var(--text-secondary)" />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 4px', fontSize: 'var(--text-md)' }}>Premium Villa Plot</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  <MapPin size={12} /> Whitefield, Bengaluru
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold', fontSize: 'var(--text-md)' }}>₹1.8 Cr</div>
                <Badge variant="success" size="sm">95% Match</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Saved Searches */}
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Saved Searches</CardTitle>
            </div>
          </CardHeader>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 'var(--weight-medium)' }}>"Near Tech Parks"</span>
                <Badge variant="primary" size="sm">3 New Matches</Badge>
              </div>
              <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                Apartments in Bellandur, Marathahalli under ₹1.5 Cr
              </p>
            </div>
            <div style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 'var(--weight-medium)' }}>"Investment Plots"</span>
              </div>
              <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                Plots in North Bengaluru, 1500+ sqft
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" style={{ width: '100%' }}>View All Saved Searches</Button>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}
