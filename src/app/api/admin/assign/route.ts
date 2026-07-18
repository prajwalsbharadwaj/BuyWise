import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ServiceRequestStatus } from '@prisma/client';

/**
 * POST /api/admin/assign
 * Admin manually assigns a service request to a partner (lawyer).
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the user is an Admin
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { serviceRequestId, providerId } = body;

    if (!serviceRequestId || !providerId) {
      return NextResponse.json(
        { error: 'serviceRequestId and providerId are required' },
        { status: 400 }
      );
    }

    // Verify both exist
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: serviceRequestId },
    });
    if (!serviceRequest) {
      return NextResponse.json({ error: 'Service request not found' }, { status: 404 });
    }

    const provider = await prisma.serviceProvider.findUnique({
      where: { id: providerId },
    });
    if (!provider) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    // Assign the partner and advance status
    const updated = await prisma.serviceRequest.update({
      where: { id: serviceRequestId },
      data: {
        providerId,
        status: ServiceRequestStatus.PARTNER_ASSIGNED,
        acceptedAt: new Date(),
      },
      include: {
        provider: true,
        service: true,
      },
    });

    // Create an audit event
    await prisma.auditEvent.create({
      data: {
        entityType: 'SERVICE_REQUEST',
        entityId: serviceRequestId,
        action: 'PARTNER_ASSIGNED',
        actorId: session.user.id,
        actorType: 'ADMIN',
        afterState: { providerId, providerName: provider.name },
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error assigning partner:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
