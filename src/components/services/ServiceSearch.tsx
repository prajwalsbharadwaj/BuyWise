'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import { Search, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/Input/Input';

interface ServiceSearchProps {
  initialServices: any[];
  transactionId?: string;
}

export function ServiceSearch({ initialServices, transactionId }: ServiceSearchProps) {
  const [query, setQuery] = React.useState('');

  const filteredServices = React.useMemo(() => {
    if (!query) return initialServices;
    const lowerQuery = query.toLowerCase();
    return initialServices.filter(service => 
      service.name.toLowerCase().includes(lowerQuery) || 
      service.description.toLowerCase().includes(lowerQuery) ||
      service.category.toLowerCase().includes(lowerQuery)
    );
  }, [initialServices, query]);

  return (
    <>
      <div style={{ maxWidth: '600px', margin: '0 auto var(--space-12)' }}>
        <Input 
          type="text" 
          placeholder="Search for a service... (e.g. Legal, Valuation)" 
          leftIcon={<Search size={20} />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filteredServices.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-12) 0', color: 'var(--text-secondary)' }}>
          <p>No services found matching "{query}"</p>
          <Button variant="outline" style={{ marginTop: 'var(--space-4)' }} onClick={() => setQuery('')}>
            Clear Search
          </Button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
          {filteredServices.map((service) => (
            <Card key={service.id} hoverable style={{ display: 'flex', flexDirection: 'column' }}>
              <CardHeader style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>

                  {service.requiresPhysicalPresence && (
                    <Badge variant="outline" size="sm" style={{ display: 'flex', gap: '4px' }}>
                      <MapPin size={12} /> Field Visit
                    </Badge>
                  )}
                </div>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription style={{ marginTop: 'var(--space-2)' }}>
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  <Clock size={16} />
                  <span>Est. Duration: {service.estimatedDurationHours} hours</span>
                </div>
              </CardContent>
              <CardFooter style={{ padding: 'var(--space-4) var(--space-6)' }}>
                <Link href={`/services/${service.code}${transactionId ? `?transactionId=${transactionId}` : ''}`} style={{ textDecoration: 'none', width: '100%' }}>
                  <Button variant="outline" style={{ width: '100%', justifyContent: 'space-between' }} rightIcon={<ArrowRight size={18} />}>
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
