'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { WorkflowEngine } from '@/lib/workflow-engine';
import { ServiceRequestStatus } from '@prisma/client';

export async function createServiceRequest(transactionId: string, serviceCode: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  // Find the service catalog entry by code
  const service = await prisma.serviceCatalog.findUnique({
    where: { code: serviceCode },
  });

  if (!service) {
    throw new Error(`Service "${serviceCode}" not found in the catalog.`);
  }

  // Validate the transaction exists — do NOT auto-create mock data
  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
  });

  if (!transaction) {
    throw new Error(`Transaction "${transactionId}" not found. Please create a transaction first.`);
  }

  // Create the ServiceRequest
  const serviceRequest = await prisma.serviceRequest.create({
    data: {
      transactionId,
      serviceId: service.id,
      status: ServiceRequestStatus.INITIATED,
      priority: 'NORMAL',
    },
  });

  revalidatePath(`/dashboard/transactions/${transactionId}/services`);
  revalidatePath('/admin/dashboard');

  return serviceRequest;
}

export async function completeServiceRequest(requestId: string, notes: string, documentUrl?: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  // Ensure this user is a partner assigned to the request
  const serviceRequest = await prisma.serviceRequest.findUnique({
    where: { id: requestId },
    include: { service: true }
  });

  if (!serviceRequest) {
    throw new Error('Service request not found');
  }

  if (serviceRequest.assignedToId !== session.user.id) {
    throw new Error('Forbidden: You are not assigned to this request');
  }

  // Optionally create a document if documentUrl is provided
  if (documentUrl) {
    await prisma.document.create({
      data: {
        transactionId: serviceRequest.transactionId,
        type: 'LEGAL_OPINION',
        name: 'Service Report ' + serviceRequest.id,
        storageUrl: documentUrl,
        mimeType: 'application/pdf',
        sizeBytes: 1024,
        uploadedById: session.user.id,
      }
    });
  }

  const nextStatus = WorkflowEngine.getNextStatus(
    ServiceRequestStatus.PARTNER_EXECUTION, 
    serviceRequest.service as any
  );

  const updatedRequest = await prisma.serviceRequest.update({
    where: { id: requestId },
    data: {
      status: nextStatus,
      notes,
      ...(nextStatus === ServiceRequestStatus.COMPLETED ? { completedAt: new Date() } : {})
    }
  });

  revalidatePath(`/dashboard/partner`);
  revalidatePath(`/dashboard/partner/requests/${requestId}`);
  revalidatePath(`/dashboard/transactions/${updatedRequest.transactionId}/services`);
  revalidatePath('/admin/dashboard');

  return updatedRequest;
}

export async function processServiceRequestAI(requestId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const serviceRequest = await prisma.serviceRequest.findUnique({
    where: { id: requestId },
    include: {
      service: true,
      documents: true
    }
  });

  if (!serviceRequest) {
    throw new Error('Service request not found');
  }

  // 1. Mark as AI Processing
  await prisma.serviceRequest.update({
    where: { id: requestId },
    data: { status: ServiceRequestStatus.AI_PROCESSING }
  });

  // 2. Trigger the AI Pipeline (In a real app, this might be sent to a queue)
  const { triggerAIPipeline } = await import('@/lib/ai-pipeline');
  
  const results = await triggerAIPipeline({
    serviceRequestId: requestId,
    serviceCode: serviceRequest.service.code,
    documentIds: serviceRequest.documents.map(d => d.id)
  });

  // 3. Update status based on results
  // For Phase 1, we always send to ADMIN_REVIEW after AI is done so human can verify
  const nextStatus = ServiceRequestStatus.ADMIN_REVIEW;

  await prisma.serviceRequest.update({
    where: { id: requestId },
    data: { 
      status: nextStatus,
      notes: results ? "AI Analysis Completed" : "AI Analysis Failed"
    }
  });

  revalidatePath('/admin/dashboard');
  revalidatePath(`/admin/requests/${requestId}`);

  return results;
}

