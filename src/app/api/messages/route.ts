import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ServiceRequestStatus } from '@prisma/client';

/**
 * POST /api/messages
 * Send a message within a service request thread.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { serviceRequestId, message, type } = body;

    if (!serviceRequestId || !message) {
      return NextResponse.json(
        { error: 'serviceRequestId and message are required' },
        { status: 400 }
      );
    }

    // Verify service request exists
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: serviceRequestId },
    });

    if (!serviceRequest) {
      return NextResponse.json({ error: 'Service request not found' }, { status: 404 });
    }

    const newMessage = await prisma.serviceMessage.create({
      data: {
        serviceRequestId,
        senderId: session.user.id,
        message,
        type: type || 'GENERAL',
      },
      include: {
        sender: { select: { id: true, name: true, role: true } },
      },
    });

    // If a partner is requesting clarification, update the service request status
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (user?.role === 'SERVICE_PROVIDER' && type === 'CUSTOMER_CLARIFICATION') {
      await prisma.serviceRequest.update({
        where: { id: serviceRequestId },
        data: { status: ServiceRequestStatus.GATHERING_INFO },
      });
    }

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error: any) {
    console.error('Error creating message:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET /api/messages?serviceRequestId=xxx
 * Retrieves all messages for a service request.
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const serviceRequestId = searchParams.get('serviceRequestId');

    if (!serviceRequestId) {
      return NextResponse.json({ error: 'serviceRequestId is required' }, { status: 400 });
    }

    const messages = await prisma.serviceMessage.findMany({
      where: { serviceRequestId },
      include: {
        sender: { select: { id: true, name: true, role: true } },
      },
      orderBy: { createdAt: 'asc' },
    });

    // Mark messages as read for the current user
    await prisma.serviceMessage.updateMany({
      where: {
        serviceRequestId,
        senderId: { not: session.user.id },
        isRead: false,
      },
      data: { isRead: true },
    });

    return NextResponse.json(messages);
  } catch (error: any) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
