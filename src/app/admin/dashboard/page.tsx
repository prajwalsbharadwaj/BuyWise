import * as React from 'react';
import { prisma } from '@/lib/prisma';
import { Card, CardContent } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const requests = await prisma.serviceRequest.findMany({
    include: {
      service: true,
      transaction: {
        include: {
          buyer: true,
          property: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--weight-bold)' }}>Service Requests Queue</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {requests.map(req => (
          <Card key={req.id}>
            <CardContent style={{ padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                  <span style={{ fontWeight: 'var(--weight-bold)' }}>{req.service.name}</span>
                  <Badge variant={req.status === 'COMPLETED' ? 'success' : req.status === 'INITIATED' ? 'outline' : 'warning'}>
                    {req.status}
                  </Badge>
                  <Badge variant={req.priority === 'URGENT' ? 'danger' : 'outline'}>{req.priority}</Badge>
                  {req.slaStatus === 'BREACHED' && <Badge variant="danger">SLA BREACHED</Badge>}
                  {req.slaStatus === 'AT_RISK' && <Badge variant="warning">SLA AT RISK</Badge>}
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  Requested by: <strong>{req.transaction.buyer.name}</strong> • Property: {req.transaction.property.title}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)', display: 'flex', gap: 'var(--space-4)' }}>
                  <span>Created: {new Date(req.createdAt).toLocaleString()}</span>
                  {req.targetCompletionDate && (
                    <span style={{ color: req.slaStatus === 'BREACHED' ? 'var(--color-danger-600)' : 'inherit' }}>
                      Due: {new Date(req.targetCompletionDate).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <Link href={`/admin/requests/${req.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="primary">Manage Request</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
        {requests.length === 0 && (
          <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No service requests found.
          </div>
        )}
      </div>
    </div>
  );
}
