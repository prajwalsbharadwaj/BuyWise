import * as React from 'react';
import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/Card/Card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | BuyWise',
  description: 'Get in touch with the BuyWise support team for any real estate verification assistance.',
};

export default function ContactPage() {
  return (
    <main className="container" style={{ padding: 'var(--space-12) 0', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)', textAlign: 'center' }}>
        Contact BuyWise
      </h1>
      <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', marginBottom: 'var(--space-12)', textAlign: 'center' }}>
        Whether you have a question about a Risk Report or need emergency legal support, our team is here to help.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
        
        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
            <div style={{ background: 'var(--primary-color)', padding: 'var(--space-3)', borderRadius: '50%', color: 'white' }}>
              <Mail size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>Email Support</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>General: support@buywise.in</p>
              <p style={{ color: 'var(--text-secondary)' }}>Business: business@buywise.in</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
            <div style={{ background: 'var(--primary-color)', padding: 'var(--space-3)', borderRadius: '50%', color: 'white' }}>
              <Phone size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>Phone</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>+91 80 4XXX XXXX</p>
              <p style={{ color: 'var(--error-color)', fontSize: 'var(--text-sm)' }}>Emergency Legal Support available 24/7</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
            <div style={{ background: 'var(--primary-color)', padding: 'var(--space-3)', borderRadius: '50%', color: 'white' }}>
              <MapPin size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>Headquarters</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                123, 100 Ft Road, Indiranagar<br/>
                Bengaluru, Karnataka 560038
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: 'var(--space-6)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
            <div style={{ background: 'var(--primary-color)', padding: 'var(--space-3)', borderRadius: '50%', color: 'white' }}>
              <Clock size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>Working Hours</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Monday - Friday: 9:00 AM to 7:00 PM<br/>
                Saturday: 10:00 AM to 4:00 PM
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </main>
  );
}
