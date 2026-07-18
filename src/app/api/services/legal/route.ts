import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ServiceCategory, ServiceRequestStatus } from '@prisma/client';

/**
 * POST /api/services/legal
 * Creates a new Legal ServiceRequest with questionnaire data and scenario tags.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { transactionId, packageId, questionnaireData, scenarioRules } = body;

    if (!transactionId) {
      return NextResponse.json({ error: 'transactionId is required' }, { status: 400 });
    }

    // Verify the transaction exists and belongs to the user
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    // Find or create the Legal service catalog entry
    let legalService = await prisma.serviceCatalog.findFirst({
      where: { code: 'LEGAL_TITLE_VERIFY' },
    });

    if (!legalService) {
      legalService = await prisma.serviceCatalog.create({
        data: {
          code: 'LEGAL_TITLE_VERIFY',
          name: 'Property Legal Verification',
          description: 'Complete legal due diligence for property transactions.',
          category: ServiceCategory.PROFESSIONAL_EXPERT,
          phase: 'MVP',
          applicableStages: ['EVALUATION', 'DEEP_VERIFY'],
          applicablePropertyTypes: [],
          applicableTransactionTypes: ['BUY', 'SELL'],
          estimatedDurationHours: 72,
          aiCapabilitiesUsed: ['DocumentAI', 'RiskAI'],
          isActive: true,
        },
      });
    }

    // Create the ServiceRequest with questionnaire data
    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        transactionId,
        serviceId: legalService.id,
        packageId: packageId || null,
        status: ServiceRequestStatus.INITIATED,
        priority: 'NORMAL',
        questionnaireData: questionnaireData || null,
        scenarioRules: scenarioRules || null,
      },
    });

    return NextResponse.json(serviceRequest, { status: 201 });
  } catch (error: any) {
    console.error('Error creating legal service request:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET /api/services/legal?transactionId=xxx
 * Retrieves the legal service request for a transaction.
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const transactionId = searchParams.get('transactionId');
    const serviceRequestId = searchParams.get('id');

    if (serviceRequestId) {
      const serviceRequest = await prisma.serviceRequest.findUnique({
        where: { id: serviceRequestId },
        include: {
          service: true,
          package: true,
          provider: true,
          documents: true,
          messages: {
            include: { sender: { select: { id: true, name: true, role: true } } },
            orderBy: { createdAt: 'asc' },
          },
        },
      });

      if (!serviceRequest) {
        return NextResponse.json({ error: 'Service request not found' }, { status: 404 });
      }

      return NextResponse.json(serviceRequest);
    }

    if (transactionId) {
      const serviceRequests = await prisma.serviceRequest.findMany({
        where: {
          transactionId,
          service: { category: ServiceCategory.PROFESSIONAL_EXPERT },
        },
        include: {
          service: true,
          package: true,
          provider: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json(serviceRequests);
    }

    return NextResponse.json({ error: 'Provide transactionId or id' }, { status: 400 });
  } catch (error: any) {
    console.error('Error fetching legal service request:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

/**
 * PATCH /api/services/legal
 * Updates the status of a legal service request (e.g., advancing through the workflow).
 */
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, status, deliverables, notes } = body;

    if (!id) {
      return NextResponse.json({ error: 'Service request id is required' }, { status: 400 });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (deliverables) updateData.deliverables = deliverables;
    if (notes) updateData.notes = notes;

    // Set lifecycle timestamps based on status
    if (status === ServiceRequestStatus.PARTNER_ASSIGNED) updateData.acceptedAt = new Date();
    if (status === ServiceRequestStatus.PARTNER_EXECUTION) updateData.startedAt = new Date();
    if (status === ServiceRequestStatus.COMPLETED) updateData.completedAt = new Date();

    const updated = await prisma.serviceRequest.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error updating legal service request:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
