import * as React from 'react';
import { prisma } from '@/lib/prisma';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default async function UserServicesDashboard({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  
  const requests = await prisma.serviceRequest.findMany({
    where: { transactionId: id },
    include: { service: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-semibold)', marginBottom: 'var(--space-2)' }}>My Services</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Track the status of your requested services and verifications.</p>
        </div>
        <a href={`/dashboard/transactions/${id}/services/new`} style={{ textDecoration: 'none' }}>
          <button style={{ 
            backgroundColor: 'var(--color-primary-600)', 
            color: 'white', 
            padding: 'var(--space-2) var(--space-4)', 
            borderRadius: 'var(--radius-md)',
            border: 'none',
            fontWeight: 'var(--weight-medium)',
            cursor: 'pointer'
          }}>
            Purchase New Service
          </button>
        </a>
      </div>

      {requests.length === 0 ? (
        <Card>
          <CardContent style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No services requested for this transaction yet.
          </CardContent>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {requests.map(request => (
            <Card key={request.id}>
              <CardContent style={{ padding: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                    <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-semibold)' }}>
                      {request.service.name}
                    </h3>
                    <Badge variant={
                      request.status === 'COMPLETED' ? 'success' :
                      request.status === 'INITIATED' ? 'outline' : 'warning'
                    }>
                      {request.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
                    Requested on: {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                  
                  {request.status === 'COMPLETED' && request.notes && (
                    <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-4)' }}>
                      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', marginBottom: 'var(--space-1)' }}>Completion Notes:</p>
                      <p style={{ fontSize: 'var(--text-sm)' }}>{request.notes}</p>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--space-2)' }}>
                  {request.status === 'COMPLETED' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-secondary-600)' }}>
                      <CheckCircle2 size={20} />
                      <span style={{ fontWeight: 'var(--weight-medium)' }}>Fulfilled</span>
                    </div>
                  ) : request.status === 'INITIATED' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--text-secondary)' }}>
                      <Clock size={20} />
                      <span style={{ fontWeight: 'var(--weight-medium)' }}>Awaiting Admin</span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-warning-600)' }}>
                      <AlertCircle size={20} />
                      <span style={{ fontWeight: 'var(--weight-medium)' }}>In Progress</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
