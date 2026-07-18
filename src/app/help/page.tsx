import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card/Card';
import { ShieldCheck, UserCheck, Settings, HelpCircle, ChevronRight, BookOpen, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function HelpPage() {
  return (
    <main style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh', padding: 'var(--space-12) 0' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-primary-100)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)'
          }}>
            <HelpCircle size={32} color="var(--color-primary-600)" />
          </div>
          <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>
            BuyWise Help Center
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}>
            Everything you need to know about navigating the platform.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-8)' }}>
          
          {/* Customer Guide */}
          <Card glass style={{ borderTop: '4px solid var(--color-primary-500)' }}>
            <CardHeader style={{ paddingBottom: 'var(--space-2)' }}>
              <CardTitle style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <UserCheck size={24} color="var(--color-primary-500)" />
                Customer Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
                Welcome to BuyWise! As a customer, you can initiate property verifications and track their progress entirely online.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                <div>
                  <h4 style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <BookOpen size={16} color="var(--color-primary-500)" /> Starting a Transaction
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)' }}>
                    Use the <strong>Get Started</strong> button or the <strong>Services</strong> page to select a verification package (e.g., Legal Ownership Verification). You will fill out a short wizard regarding your location and property type, which instantly provisions a secure transaction workspace for you.
                  </p>
                </div>
                
                <div>
                  <h4 style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <ShieldCheck size={16} color="var(--color-primary-500)" /> Document Intelligence & Risk Engine
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)' }}>
                    Once you upload property documents (Sale Deeds, ECs, etc.), our proprietary AI Document Intelligence will automatically scan them. It extracts critical data points (like RERA numbers and Built-up Areas) and feeds them into the Risk Engine to generate an initial <strong>Risk Score</strong> before human lawyers even see it.
                  </p>
                </div>

                <div>
                  <h4 style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <AlertTriangle size={16} color="var(--color-warning-500)" /> Tracking Progress
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)' }}>
                    Your Dashboard (<strong>Overview</strong>) shows your active transactions. Once the AI analysis is complete, a human Legal Expert will be assigned to provide a final, certified legal opinion.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Partner Guide */}
          <Card glass style={{ borderTop: '4px solid var(--color-success-500)' }}>
            <CardHeader style={{ paddingBottom: 'var(--space-2)' }}>
              <CardTitle style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <ShieldCheck size={24} color="var(--color-success-500)" />
                Legal Partner / Advocate Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
                As an empaneled legal expert, the Partner Portal is your workspace to review AI risk reports and issue final legal certifications.
              </p>
              
              <ul style={{ paddingLeft: 'var(--space-4)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <li>
                  <strong>Claiming Tasks:</strong> When a customer requests a verification, it appears in your Partner Queue. You can claim open service requests to begin work.
                </li>
                <li>
                  <strong>Reviewing AI Extractions:</strong> Before diving into the raw PDFs, review the Extracted Data and Anomalies flagged by the AI. This significantly speeds up your verification process.
                </li>
                <li>
                  <strong>Issuing Certifications:</strong> Once you complete your due diligence, you can mark the case as "HUMAN_VERIFIED", which will update the customer's dashboard and allow them to proceed with their property purchase safely.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Admin Guide */}
          <Card glass style={{ borderTop: '4px solid var(--color-danger-500)' }}>
            <CardHeader style={{ paddingBottom: 'var(--space-2)' }}>
              <CardTitle style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <Settings size={24} color="var(--color-danger-500)" />
                Administrator Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
                The Admin Dashboard provides a bird's-eye view of all platform operations, transactions, and partner performance.
              </p>

              <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>Admin Responsibilities:</h4>
                <ul style={{ paddingLeft: 'var(--space-4)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <li>Monitor the global Service Requests Queue to ensure SLAs are being met.</li>
                  <li>Assign high-priority or escalated tasks to specific Legal Partners manually if required.</li>
                  <li>Review system-wide AI anomalies and override false positives to train the model.</li>
                  <li>Manage service catalog pricing and location-based rules (coming in v2.0).</li>
                </ul>
              </div>
            </CardContent>
          </Card>

        </div>
        
        <div style={{ marginTop: 'var(--space-8)', textAlign: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ color: 'var(--color-primary-600)', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              Back to Home <ChevronRight size={16} />
            </span>
          </Link>
        </div>
        
      </div>
    </main>
  );
}
