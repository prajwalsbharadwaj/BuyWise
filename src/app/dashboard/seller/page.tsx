import * as React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { Badge } from '@/components/ui/Badge/Badge';
import { PlusCircle, Building2, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { auth } from '@/lib/auth';

export default async function SellerDashboardPage() {
  const session = await auth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0 0 var(--space-2)', fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            Seller Dashboard
          </h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}>
            Manage your properties, leads, and offers.
          </p>
        </div>
        <Button variant="primary" leftIcon={<PlusCircle size={18} />}>
          Create New Listing
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-6)' }}>
        {/* Quick Stats */}
        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Active Listings</span>
              <Building2 size={20} />
            </div>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold' }}>2</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Total Leads</span>
              <Users size={20} />
            </div>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold' }}>14</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Active Offers</span>
              <TrendingUp size={20} />
            </div>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold' }}>3</div>
          </CardContent>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--space-6)' }}>
        {/* My Properties */}
        <Card style={{ gridColumn: '1 / -1' }}>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>My Properties</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <th style={{ padding: 'var(--space-3) 0', color: 'var(--text-secondary)', fontWeight: 'normal' }}>Property</th>
                    <th style={{ padding: 'var(--space-3) 0', color: 'var(--text-secondary)', fontWeight: 'normal' }}>Status</th>
                    <th style={{ padding: 'var(--space-3) 0', color: 'var(--text-secondary)', fontWeight: 'normal' }}>Views</th>
                    <th style={{ padding: 'var(--space-3) 0', color: 'var(--text-secondary)', fontWeight: 'normal' }}>Leads</th>
                    <th style={{ padding: 'var(--space-3) 0', color: 'var(--text-secondary)', fontWeight: 'normal' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: 'var(--space-4) 0' }}>
                      <div style={{ fontWeight: 'var(--weight-medium)' }}>3BHK Penthouse in Jayanagar</div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>₹3.2 Cr</div>
                    </td>
                    <td style={{ padding: 'var(--space-4) 0' }}><Badge variant="success">Active</Badge></td>
                    <td style={{ padding: 'var(--space-4) 0' }}>420</td>
                    <td style={{ padding: 'var(--space-4) 0' }}>8</td>
                    <td style={{ padding: 'var(--space-4) 0' }}>
                      <Button variant="ghost" size="sm">Manage <ArrowRight size={14} style={{ marginLeft: 4 }} /></Button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: 'var(--space-4) 0' }}>
                      <div style={{ fontWeight: 'var(--weight-medium)' }}>Commercial Shop in Koramangala</div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>₹1.1 Cr</div>
                    </td>
                    <td style={{ padding: 'var(--space-4) 0' }}><Badge variant="primary">Under Negotiation</Badge></td>
                    <td style={{ padding: 'var(--space-4) 0' }}>215</td>
                    <td style={{ padding: 'var(--space-4) 0' }}>6</td>
                    <td style={{ padding: 'var(--space-4) 0' }}>
                      <Button variant="ghost" size="sm">Manage <ArrowRight size={14} style={{ marginLeft: 4 }} /></Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
