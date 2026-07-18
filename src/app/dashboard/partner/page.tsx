import * as React from 'react';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import Link from 'next/link';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function PartnerDashboard() {
  const session = await auth();
  if (!session?.user?.id || (session.user as any).role !== 'SERVICE_PROVIDER') {
    redirect('/login');
  }

  const requests = await prisma.serviceRequest.findMany({
    where: { assignedToId: session.user.id },
    include: {
      service: true,
      transaction: {
        include: {
          property: true,
          buyer: true
        }
      }
    },
    orderBy: { updatedAt: 'desc' }
  });

  const inProgress = requests.filter(r => r.status === 'PARTNER_ASSIGNED' || r.status === 'PARTNER_EXECUTION');
  const completed = requests.filter(r => r.status === 'QA_REVIEW' || r.status === 'COMPLETED');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-semibold)', marginBottom: 'var(--space-2)' }}>My Assignments</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your assigned verification and legal tasks.</p>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
        <div style={{ flex: 1, backgroundColor: 'white', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>Active Tasks</p>
          <h3 style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--weight-bold)' }}>{inProgress.length}</h3>
        </div>
        <div style={{ flex: 1, backgroundColor: 'white', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>Completed</p>
          <h3 style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--weight-bold)' }}>{completed.length}</h3>
        </div>
      </div>

      <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-semibold)', marginTop: 'var(--space-4)' }}>Assigned Requests</h3>
      
      {requests.length === 0 ? (
        <Card>
          <CardContent style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No tasks assigned to you yet.
          </CardContent>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {requests.map(req => (
            <Card key={req.id}>
              <CardContent style={{ padding: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                    <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-semibold)' }}>{req.service.name}</h3>
                    <Badge variant={req.status === 'COMPLETED' ? 'success' : 'warning'}>{req.status}</Badge>
                    <Badge variant={req.priority === 'URGENT' ? 'danger' : 'outline'}>{req.priority}</Badge>
                    {req.slaStatus === 'BREACHED' && <Badge variant="danger">SLA BREACHED</Badge>}
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    Property: <strong>{req.transaction.property.title}</strong> • Client: {req.transaction.buyer.name}
                  </div>
                  {req.targetCompletionDate && (
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                      <Clock size={12} /> Due: {new Date(req.targetCompletionDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
                
                <Link href={`/dashboard/partner/requests/${req.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant={req.status === 'COMPLETED' ? 'outline' : 'primary'}>
                    {req.status === 'COMPLETED' ? 'View Details' : 'Execute Task'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
