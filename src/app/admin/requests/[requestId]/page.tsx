import * as React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { updateServiceRequest } from '@/actions/admin.actions';

export default async function AdminRequestDetails({
  params
}: {
  params: Promise<{ requestId: string }>
}) {
  const { requestId } = await params;
  
  const req = await prisma.serviceRequest.findUnique({
    where: { id: requestId },
    include: {
      service: true,
      assignedTo: true,
      transaction: {
        include: {
          buyer: true,
          property: true,
          documents: true
        }
      }
    }
  });

  if (!req) {
    notFound();
  }

  const partners = await prisma.user.findMany({
    where: { role: 'SERVICE_PROVIDER' },
    select: { id: true, name: true, email: true }
  });

  return (
    <div>
      <Link href="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: 'var(--space-6)' }}>
        <ArrowLeft size={16} /> Back to Queue
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Main Details */}
          <Card>
            <CardHeader>
              <CardTitle>Request Details: {req.service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>Status</p>
                  <Badge variant={req.status === 'COMPLETED' ? 'success' : req.status === 'INITIATED' ? 'outline' : 'warning'}>{req.status}</Badge>
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>Requested On</p>
                  <p style={{ fontWeight: 'var(--weight-medium)' }}>{new Date(req.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>Buyer</p>
                  <p style={{ fontWeight: 'var(--weight-medium)' }}>{req.transaction.buyer.name} ({req.transaction.buyer.email})</p>
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>Property</p>
                  <p style={{ fontWeight: 'var(--weight-medium)' }}>{req.transaction.property.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Provided Documents</CardTitle>
            </CardHeader>
            <CardContent>
              {req.transaction.documents.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)' }}>No documents attached to this transaction.</p>
              ) : (
                <ul style={{ paddingLeft: 'var(--space-4)' }}>
                  {req.transaction.documents.map(doc => (
                    <li key={doc.id} style={{ marginBottom: 'var(--space-2)' }}>
                      <a href={doc.storageUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-600)', textDecoration: 'underline' }}>
                        {doc.name || doc.type}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Fulfillment Action Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <Card>
            <CardHeader>
              <CardTitle>Partner Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              {req.assignedToId ? (
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>Currently Assigned To:</p>
                  <p style={{ fontWeight: 'var(--weight-bold)' }}>{req.assignedTo?.name || req.assignedToId}</p>
                </div>
              ) : (
                <form action={async (formData) => {
                  'use server';
                  const partnerId = formData.get('partnerId') as string;
                  const { assignServiceRequest } = await import('@/actions/admin.actions');
                  await assignServiceRequest(req.id, partnerId);
                }} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', marginBottom: 'var(--space-2)' }}>Assign to Service Provider</label>
                    <select name="partnerId" required style={{ width: '100%', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)' }}>
                      <option value="">Select a Partner...</option>
                      {partners.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.email})</option>
                      ))}
                    </select>
                  </div>
                  <Button type="submit" variant="primary" style={{ width: '100%' }}>
                    Assign Request
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admin Manual Override</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={async (formData) => {
                'use server';
                const status = formData.get('status') as any;
                const notes = formData.get('notes') as string;
                await updateServiceRequest(req.id, status, notes);
              }} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', marginBottom: 'var(--space-2)' }}>Update Status</label>
                  <select name="status" key={req.status} defaultValue={req.status} style={{ width: '100%', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)' }}>
                    <option value="INITIATED">INITIATED</option>
                    <option value="GATHERING_INFO">GATHERING_INFO</option>
                    <option value="AWAITING_PAYMENT">AWAITING_PAYMENT</option>
                    <option value="IN_QUEUE">IN_QUEUE</option>
                    <option value="AI_PROCESSING">AI_PROCESSING</option>
                    <option value="ADMIN_REVIEW">ADMIN_REVIEW</option>
                    <option value="PARTNER_ASSIGNED">PARTNER_ASSIGNED</option>
                    <option value="PARTNER_EXECUTION">PARTNER_EXECUTION</option>
                    <option value="QA_REVIEW">QA_REVIEW</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                    <option value="FAILED">FAILED</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', marginBottom: 'var(--space-2)' }}>Admin Notes / Report Link</label>
                  <textarea 
                    name="notes" 
                    defaultValue={req.notes || ''} 
                    placeholder="E.g., Legal Verification completed. No encumbrances found. Link to PDF report: ..."
                    style={{ width: '100%', minHeight: '120px', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)', fontFamily: 'inherit' }}
                  />
                </div>

                <Button type="submit" variant="outline" style={{ width: '100%' }}>
                  Force Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
