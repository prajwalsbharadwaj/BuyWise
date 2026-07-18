import * as React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { Search, MapPin, Filter, ShieldCheck, IndianRupee } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Search Properties | BuyWise',
  description: 'Find BuyWise certified properties with pre-verified titles and transparent pricing.',
};

// Mock property data for MVP
const MOCK_PROPERTIES = [
  {
    id: 'prop-101',
    title: 'Modern 3BHK in Prestige Shantiniketan',
    locality: 'Whitefield, Bengaluru',
    price: '2.1 Cr',
    bhk: '3 BHK',
    sqft: '1,850',
    type: 'Apartment',
    buywiseScore: 92,
    isCertified: true,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    tags: ['Pre-verified Khata', 'Clear Title']
  },
  {
    id: 'prop-102',
    title: 'Spacious Independent Villa',
    locality: 'HSR Layout Sector 2, Bengaluru',
    price: '4.5 Cr',
    bhk: '4 BHK',
    sqft: '3,200',
    type: 'Villa',
    buywiseScore: 88,
    isCertified: true,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    tags: ['A-Khata', 'Premium Location']
  },
  {
    id: 'prop-103',
    title: 'Compact 2BHK Near Metro',
    locality: 'Indiranagar, Bengaluru',
    price: '1.2 Cr',
    bhk: '2 BHK',
    sqft: '1,100',
    type: 'Apartment',
    buywiseScore: 75,
    isCertified: false,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    tags: ['Close to Metro']
  },
  {
    id: 'prop-104',
    title: 'Luxury Penthouse with City View',
    locality: 'Koramangala 3rd Block, Bengaluru',
    price: '3.8 Cr',
    bhk: '4 BHK',
    sqft: '2,800',
    type: 'Apartment',
    buywiseScore: 95,
    isCertified: true,
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800',
    tags: ['Zero Encumbrance', 'Immediate Possession']
  }
];

export default function PropertiesSearchPage() {
  return (
    <main style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh', paddingBottom: 'var(--space-12)' }}>
      {/* Search Header */}
      <div style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)', padding: 'var(--space-8) 0' }}>
        <div className="container">
          <h1 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-6)' }}>
            Discover Verified Properties
          </h1>
          
          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 300px' }}>
              <Input 
                placeholder="Search by Locality, Project or Landmark..."
                leftIcon={<Search size={18} />}
              />
            </div>
            <select style={{ padding: '0 var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
              <option>Property Type</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Plot</option>
            </select>
            <select style={{ padding: '0 var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
              <option>Budget</option>
              <option>Under 1 Cr</option>
              <option>1 Cr - 2 Cr</option>
              <option>Above 2 Cr</option>
            </select>
            <Button variant="outline" leftIcon={<Filter size={16} />}>More Filters</Button>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="container" style={{ paddingTop: 'var(--space-8)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Showing {MOCK_PROPERTIES.length} properties in Bengaluru</p>
          <select style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
            <option>Sort by: BuyWise Score (High to Low)</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
          {MOCK_PROPERTIES.map((prop) => (
            <Link href={`/properties/${prop.id}`} key={prop.id} style={{ textDecoration: 'none' }}>
              <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', cursor: 'pointer' }} className="hover-lift">
                <div style={{ position: 'relative', height: '200px', width: '100%', overflow: 'hidden' }}>
                  <img 
                    src={prop.image} 
                    alt={prop.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {prop.isCertified && (
                    <div style={{ position: 'absolute', top: 'var(--space-3)', left: 'var(--space-3)' }}>
                      <Badge variant="primary" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', boxShadow: 'var(--shadow-md)' }}>
                        <ShieldCheck size={14} /> BuyWise Certified
                      </Badge>
                    </div>
                  )}
                  <div style={{ position: 'absolute', bottom: 'var(--space-3)', right: 'var(--space-3)' }}>
                    <Badge variant={prop.buywiseScore >= 90 ? 'success' : 'warning'}>
                      Score: {prop.buywiseScore}
                    </Badge>
                  </div>
                </div>
                
                <CardContent style={{ padding: 'var(--space-4)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
                    <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)', lineHeight: 1.3 }}>{prop.title}</h3>
                  </div>
                  
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', display: 'flex', alignItems: 'center', gap: 'var(--space-1)', marginBottom: 'var(--space-4)' }}>
                    <MapPin size={14} /> {prop.locality}
                  </p>
                  
                  <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border-color)' }}>
                    <div>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>BHK</p>
                      <p style={{ fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}>{prop.bhk}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Area</p>
                      <p style={{ fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}>{prop.sqft} sqft</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-primary)', fontWeight: 'var(--weight-bold)', fontSize: 'var(--text-xl)' }}>
                      <IndianRupee size={20} style={{ marginRight: '-2px' }} /> {prop.price}
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Add a global style for the hover-lift class */}
      <style dangerouslySetInnerHTML={{__html: `
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
      `}} />
    </main>
  );
}
