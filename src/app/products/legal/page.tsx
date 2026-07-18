import * as React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { Badge } from '@/components/ui/Badge/Badge';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileSearch, Scale, Clock, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Property Legal Services | BuyWise',
  description: 'Complete end-to-end legal verification and documentation services for property transactions in India.',
};

const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Legal Review',
    price: '₹2,999',
    duration: '3-4 Days',
    suitableFor: 'Early stage evaluation. Just want to know if there are major red flags before negotiating.',
    includes: [
      '30-Year Title Search',
      'Encumbrance Certificate (EC) Verification',
      'Khata Status Check',
      'RERA Registration Check',
      'High-Level Risk Report'
    ],
    excludes: ['Physical Document Verification', 'Detailed Legal Opinion', 'Lawyer Consultation']
  },
  {
    id: 'buyer',
    name: 'Buyer Legal Package',
    price: '₹7,499',
    duration: '7-10 Days',
    suitableFor: 'You are ready to pay the advance. Need complete peace of mind and bank-ready documents.',
    popular: true,
    includes: [
      'Everything in Starter Review',
      'Detailed Legal Opinion by RERA-certified Lawyer',
      'Physical Document Verification (Optional add-on)',
      'Sale Agreement Drafting',
      '1x 30-min Lawyer Video Consultation',
      'Bank Loan NOC Coordination'
    ],
    excludes: ['Sub-Registrar Office Support']
  },
  {
    id: 'seller',
    name: 'Seller Legal Package',
    price: '₹5,999',
    duration: '5-7 Days',
    suitableFor: 'You want to sell faster. Get your property "BuyWise Certified" to attract more buyers.',
    includes: [
      'Title Chain Verification',
      'BuyWise Certified Badge on Listings',
      'Tax & Khata Clearance Review',
      'Custom Sale Agreement Drafting',
      'Legal response handling for Buyer queries'
    ],
    excludes: ['Capital Gains Tax Advisory']
  },
  {
    id: 'concierge',
    name: 'Premium Concierge',
    price: '₹14,999',
    duration: '15-20 Days',
    suitableFor: 'End-to-end support for busy professionals or NRIs.',
    includes: [
      'Everything in Buyer/Seller Package',
      'Dedicated Legal Relationship Manager',
      'Unlimited Lawyer Consultations',
      'In-person Sub-Registrar Support',
      'Khata Transfer Assistance Post-Registration'
    ],
    excludes: []
  }
];

export default function LegalServicesPage() {
  return (
    <main style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh', paddingBottom: 'var(--space-16)' }}>
      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--color-primary-900)', color: 'white', padding: 'var(--space-16) 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '800px' }}>
            <Badge style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--color-primary-100)', marginBottom: 'var(--space-6)' }}>BuyWise Legal</Badge>
            <h1 style={{ fontSize: 'var(--text-5xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-6)', lineHeight: 1.1 }}>
              Don't lose your life savings to a bad property title.
            </h1>
            <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-primary-100)', marginBottom: 'var(--space-8)', lineHeight: 1.6 }}>
              Our technology-enabled legal platform combines AI-powered document extraction with top-tier real estate lawyers to give you bulletproof property verification.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <Link href="#packages" style={{ textDecoration: 'none' }}>
                <Button size="lg" variant="secondary">
                  View Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Legal Verification */}
      <section className="container" style={{ paddingTop: 'var(--space-16)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>Why 100% Legal Verification is Non-Negotiable</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            A single missing signature from 20 years ago can render your property unsellable today.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
          <Card glass>
            <CardContent style={{ paddingTop: 'var(--space-6)' }}>
              <AlertTriangle size={32} color="var(--color-error-500)" style={{ marginBottom: 'var(--space-4)' }} />
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>Hidden Legal Heirs</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Inherited properties often have unnamed sisters or children who can claim ownership years after you buy the property.</p>
            </CardContent>
          </Card>
          
          <Card glass>
            <CardContent style={{ paddingTop: 'var(--space-6)' }}>
              <Scale size={32} color="var(--color-warning-500)" style={{ marginBottom: 'var(--space-4)' }} />
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>Double Registration Fraud</h3>
              <p style={{ color: 'var(--text-secondary)' }}>The same plot is sold to multiple buyers using fake documents. Our 30-year EC check prevents this.</p>
            </CardContent>
          </Card>

          <Card glass>
            <CardContent style={{ paddingTop: 'var(--space-6)' }}>
              <FileSearch size={32} color="var(--color-primary-500)" style={{ marginBottom: 'var(--space-4)' }} />
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>B-Khata & Deviations</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Builders often violate approved plans. We verify if the built structure actually matches the BBMP sanctioned plan.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it Works */}
      <section className="container" style={{ paddingTop: 'var(--space-16)' }}>
        <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-8)', textAlign: 'center' }}>How BuyWise Works</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-8)', position: 'relative' }}>
          {[
            { step: '1', title: 'Choose Package', desc: 'Select the legal service that matches your stage in the transaction.' },
            { step: '2', title: 'Dynamic Questionnaire', desc: 'Tell us about the property. Our AI determines exactly which documents are mandatory.' },
            { step: '3', title: 'AI Initial Review', desc: 'Our Document AI instantly extracts data and highlights inconsistencies.' },
            { step: '4', title: 'Expert Lawyer Opinion', desc: 'A Bar Council certified lawyer reviews the AI report and generates the final legal opinion.' }
          ].map((item) => (
            <div key={item.step} style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '64px', height: '64px', borderRadius: '50%', 
                backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-700)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontSize: 'var(--text-2xl)', fontWeight: 'bold', margin: '0 auto var(--space-4)'
              }}>
                {item.step}
              </div>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="container" style={{ paddingTop: 'var(--space-16)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>Select Your Package</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Transparent pricing. No hidden fees. Select what you need right now.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
          {PACKAGES.map((pkg) => (
            <Card key={pkg.id} style={{ 
              display: 'flex', flexDirection: 'column', 
              border: pkg.popular ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
              position: 'relative'
            }}>
              {pkg.popular && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)' }}>
                  <Badge variant="primary" style={{ padding: '4px 12px' }}>Most Popular</Badge>
                </div>
              )}
              <CardHeader style={{ textAlign: 'center', paddingBottom: 0 }}>
                <CardTitle style={{ fontSize: 'var(--text-xl)' }}>{pkg.name}</CardTitle>
                <p style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: 'var(--space-2)' }}>{pkg.price}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-1)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
                  <Clock size={14} /> {pkg.duration}
                </div>
              </CardHeader>
              
              <CardContent style={{ flex: 1, paddingTop: 'var(--space-6)' }}>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border-color)' }}>
                  {pkg.suitableFor}
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {pkg.includes.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                      <CheckCircle2 size={16} color="var(--color-success-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{item}</span>
                    </div>
                  ))}
                  {pkg.excludes.map((item, i) => (
                    <div key={`ex-${i}`} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', opacity: 0.5 }}>
                      <span style={{ fontSize: '16px', flexShrink: 0, lineHeight: 1 }}>✕</span>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', textDecoration: 'line-through' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter>
                <Link href={`/transaction/new?service=LEGAL&package=${pkg.id}`} style={{ width: '100%', textDecoration: 'none' }}>
                  <Button variant={pkg.popular ? 'primary' : 'outline'} style={{ width: '100%' }} rightIcon={<ChevronRight size={16} />}>
                    Select {pkg.name}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="container" style={{ paddingTop: 'var(--space-16)' }}>
        <Card style={{ backgroundColor: 'var(--color-primary-50)', border: 'none' }}>
          <CardContent style={{ padding: 'var(--space-8)' }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-6)' }}>What You Get</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)' }}>
              <div>
                <ShieldCheck size={24} color="var(--primary-color)" style={{ marginBottom: 'var(--space-2)' }} />
                <h4 style={{ fontWeight: 'bold' }}>Signed Legal Opinion</h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>A formal PDF opinion signed by a Bar Council registered lawyer.</p>
              </div>
              <div>
                <AlertTriangle size={24} color="var(--primary-color)" style={{ marginBottom: 'var(--space-2)' }} />
                <h4 style={{ fontWeight: 'bold' }}>Risk Summary Matrix</h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Clear RED, YELLOW, GREEN flags for every aspect of the transaction.</p>
              </div>
              <div>
                <FileSearch size={24} color="var(--primary-color)" style={{ marginBottom: 'var(--space-2)' }} />
                <h4 style={{ fontWeight: 'bold' }}>Missing Documents List</h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>An exact checklist of documents the seller still needs to provide.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
    </main>
  );
}
