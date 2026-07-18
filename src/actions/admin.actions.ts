'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { ServiceRequestStatus } from '@prisma/client';

export async function updateServiceRequest(
  requestId: string, 
  status: ServiceRequestStatus, 
  notes?: string,
  deliverables?: any
) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  // Verify Admin role
  const role = (session.user as any).role;
  if (role !== 'ADMIN') {
    throw new Error('Forbidden: Admins only');
  }

  // Update the ServiceRequest
  const serviceRequest = await prisma.serviceRequest.update({
    where: { id: requestId },
    data: {
      status,
      notes: notes !== undefined ? notes : undefined,
      deliverables: deliverables !== undefined ? deliverables : undefined,
      ...(status === 'COMPLETED' ? { completedAt: new Date() } : {}),
    }
  });

  revalidatePath('/admin/dashboard');
  revalidatePath(`/admin/requests/${requestId}`);
  revalidatePath(`/dashboard/transactions/${serviceRequest.transactionId}/services`);

  return serviceRequest;
}

export async function assignServiceRequest(requestId: string, partnerId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const role = (session.user as any).role;
  if (role !== 'ADMIN') {
    throw new Error('Forbidden: Admins only');
  }

  const serviceRequest = await prisma.serviceRequest.update({
    where: { id: requestId },
    data: {
      assignedToId: partnerId,
      status: ServiceRequestStatus.PARTNER_ASSIGNED,
      // Default SLA is 7 days from assignment
      targetCompletionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      slaStatus: 'ON_TRACK'
    }
  });

  revalidatePath('/admin/dashboard');
  revalidatePath(`/admin/requests/${requestId}`);
  revalidatePath(`/dashboard/partner`);
  
  return serviceRequest;
}
