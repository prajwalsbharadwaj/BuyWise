import * as React from 'react';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import Link from 'next/link';
import { ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import { completeServiceRequest } from '@/actions/service.actions';

export default async function PartnerRequestWorkspace({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth();
  if (!session?.user?.id || (session.user as any).role !== 'SERVICE_PROVIDER') {
    redirect('/login');
  }

  const { id } = await params;
  
  const req = await prisma.serviceRequest.findUnique({
    where: { id },
    include: {
      service: true,
      transaction: {
        include: {
          buyer: true,
          property: true,
          documents: true
        }
      }
    }
  });

  if (!req || req.assignedToId !== session.user.id) {
    notFound();
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <Link href="/dashboard/partner" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--text-secondary)', textDecoration: 'none' }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-semibold)', marginBottom: 'var(--space-2)' }}>
            Execute: {req.service.name}
          </h2>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Badge variant={req.status === 'COMPLETED' ? 'success' : 'warning'}>{req.status}</Badge>
            <Badge variant="outline">{req.priority} Priority</Badge>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 'var(--space-6)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Details */}
          <Card>
            <CardHeader>
              <CardTitle>Case Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>Property</p>
                  <p style={{ fontWeight: 'var(--weight-medium)' }}>{req.transaction.property.title}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>Client Name</p>
                  <p style={{ fontWeight: 'var(--weight-medium)' }}>{req.transaction.buyer.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Documents</CardTitle>
            </CardHeader>
            <CardContent>
              {req.transaction.documents.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)' }}>No documents uploaded by the customer.</p>
              ) : (
                <ul style={{ paddingLeft: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {req.transaction.documents.map(doc => (
                    <li key={doc.id}>
                      <a href={doc.storageUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-primary-600)', textDecoration: 'underline' }}>
                        <FileText size={16} />
                        {doc.name || doc.type}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Panel */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Submit Deliverable</CardTitle>
            </CardHeader>
            <CardContent>
              {req.status === 'COMPLETED' ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-4)', textAlign: 'center' }}>
                  <CheckCircle2 size={48} color="var(--color-success-500)" />
                  <div>
                    <h4 style={{ fontWeight: 'var(--weight-semibold)' }}>Task Completed</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
                      You marked this task as completed on {req.completedAt ? new Date(req.completedAt).toLocaleDateString() : 'N/A'}.
                    </p>
                  </div>
                </div>
              ) : (
                <form action={async (formData) => {
                  'use server';
                  const notes = formData.get('notes') as string;
                  const documentUrl = formData.get('documentUrl') as string;
                  await completeServiceRequest(req.id, notes, documentUrl);
                }} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', marginBottom: 'var(--space-2)' }}>Verification Notes / Summary</label>
                    <textarea 
                      name="notes" 
                      required
                      placeholder="Summarize your findings..."
                      style={{ width: '100%', minHeight: '120px', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)', fontFamily: 'inherit' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', marginBottom: 'var(--space-2)' }}>Report Document URL (Optional)</label>
                    <input 
                      type="url"
                      name="documentUrl" 
                      placeholder="https://..."
                      style={{ width: '100%', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)', fontFamily: 'inherit' }}
                    />
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>Provide a link to the generated PDF report.</p>
                  </div>

                  <Button type="submit" variant="primary" style={{ width: '100%' }}>
                    Mark as Completed
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
