'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';

export default function AdminPartnerRegistration() {
  const [formData, setFormData] = React.useState({
    name: '',
    firm: '',
    email: '',
    phone: '',
    type: 'INDIVIDUAL',
    barCouncilNumber: '',
    experienceYears: '',
    states: '',
    languages: '',
    pricingModel: '',
    bankAccount: '',
    ifsc: '',
    gst: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Partner Onboarded Successfully!');
    // Redirect or reset form
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-8) 0' }}>
      
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>Partner Onboarding</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manually register a new legal partner, surveyor, or valuer into the BuyWise platform.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          <Card>
            <CardHeader>
              <CardTitle>Basic Details</CardTitle>
            </CardHeader>
            <CardContent style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>Partner Type</label>
                <select 
                  className="buywise-input"
                  style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                >
                  <option value="INDIVIDUAL">Individual Lawyer</option>
                  <option value="FIRM">Law Firm</option>
                  <option value="VALUER">Property Valuer</option>
                  <option value="SURVEYOR">Land Surveyor</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>Full Name / Firm Name</label>
                <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>Contact Email</label>
                <Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>Contact Phone</label>
                <Input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Credentials</CardTitle>
            </CardHeader>
            <CardContent style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>Bar Council Number (Lawyers)</label>
                <Input value={formData.barCouncilNumber} onChange={e => setFormData({...formData, barCouncilNumber: e.target.value})} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>Years of Experience</label>
                <Input type="number" value={formData.experienceYears} onChange={e => setFormData({...formData, experienceYears: e.target.value})} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>Licensed States (Comma separated)</label>
                <Input placeholder="Karnataka, Maharashtra" value={formData.states} onChange={e => setFormData({...formData, states: e.target.value})} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>Languages Spoken</label>
                <Input placeholder="English, Kannada, Hindi" value={formData.languages} onChange={e => setFormData({...formData, languages: e.target.value})} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial & Settlement</CardTitle>
            </CardHeader>
            <CardContent style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>Bank Account Number</label>
                <Input value={formData.bankAccount} onChange={e => setFormData({...formData, bankAccount: e.target.value})} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>IFSC Code</label>
                <Input value={formData.ifsc} onChange={e => setFormData({...formData, ifsc: e.target.value})} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>GST Number (Optional)</label>
                <Input value={formData.gst} onChange={e => setFormData({...formData, gst: e.target.value})} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>Pricing Tier</label>
                <select 
                  className="buywise-input"
                  style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                  value={formData.pricingModel}
                  onChange={e => setFormData({...formData, pricingModel: e.target.value})}
                >
                  <option value="STANDARD">Standard Tier (₹3000 / case)</option>
                  <option value="PREMIUM">Premium Tier (₹6000 / case)</option>
                  <option value="HOURLY">Hourly Consultation</option>
                </select>
              </div>
            </CardContent>
            <CardFooter style={{ justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-4)' }}>
              <Button type="button" variant="ghost" style={{ marginRight: 'var(--space-2)' }}>Cancel</Button>
              <Button type="submit" variant="primary">Register Partner</Button>
            </CardFooter>
          </Card>

        </div>
      </form>
    </div>
  );
}
