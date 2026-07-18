import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ServiceRequestStatus } from '@prisma/client';

/**
 * POST /api/partners
 * Admin registers a new partner (lawyer, valuer, surveyor, etc.)
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (adminUser?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const {
      name, type, email, phone, barCouncilNumber,
      states, languages, specialization, description,
    } = body;

    if (!name || !type) {
      return NextResponse.json({ error: 'name and type are required' }, { status: 400 });
    }

    const partner = await prisma.serviceProvider.create({
      data: {
        name,
        type,
        description: description || null,
        specialization: specialization || [],
        languages: languages || [],
        barCouncilNumber: barCouncilNumber || null,
        practiceStates: states || [],
        contactEmail: email || null,
        contactPhone: phone || null,
        partnerStatus: 'ACTIVE',
        isActive: true,
      },
    });

    await prisma.auditEvent.create({
      data: {
        entityType: 'SERVICE_PROVIDER',
        entityId: partner.id,
        action: 'CREATED',
        actorId: session.user.id,
        actorType: 'ADMIN',
        afterState: { name, type },
      },
    });

    return NextResponse.json(partner, { status: 201 });
  } catch (error: any) {
    console.error('Error creating partner:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET /api/partners
 * List all active partners (for Admin assignment UI).
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    const where: any = { isActive: true };
    if (type) where.type = type;

    const partners = await prisma.serviceProvider.findMany({
      where,
      orderBy: { avgRating: 'desc' },
      select: {
        id: true,
        name: true,
        type: true,
        specialization: true,
        languages: true,
        barCouncilNumber: true,
        practiceStates: true,
        avgRating: true,
        totalReviews: true,
        completionRate: true,
        partnerStatus: true,
        _count: {
          select: {
            serviceRequests: {
              where: { status: { in: [ServiceRequestStatus.PARTNER_ASSIGNED, ServiceRequestStatus.PARTNER_EXECUTION] } },
            },
          },
        },
      },
    });

    return NextResponse.json(partners);
  } catch (error: any) {
    console.error('Error fetching partners:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
