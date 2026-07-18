'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function createTransaction(data: {
  locality: string;
  propertyType: string;
  budget: string;
  notes: string;
  serviceCode?: string | null;
}) {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error('Must be logged in to create a transaction.');
  }

  const userId = session.user.id;

  // Generate a realistic mock ID like TXN-XXXX
  const customId = 'TXN-' + Math.floor(1000 + Math.random() * 9000);

  // Use a Prisma transaction to ensure the property, location, and transaction are all created together
  const newTransaction = await prisma.$transaction(async (tx) => {
    // 1. Create a dummy location or find existing
    // We will just create a generic one for testing
    const locationName = data.locality || 'Unknown Locality';
    const locationSlug = locationName.toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).substring(7);
    const location = await tx.location.create({
      data: {
        name: locationName,
        slug: locationSlug,
        type: 'LOCALITY',
      }
    });

    let mappedPropertyType = data.propertyType.toUpperCase();
    if (mappedPropertyType === 'COMMERCIAL') {
      mappedPropertyType = 'COMMERCIAL_OFFICE';
    }

    // 2. Create the property
    const property = await tx.property.create({
      data: {
        type: mappedPropertyType as any,
        locationId: location.id,
        title: 'Draft Property',
        description: 'Auto-generated draft for transaction',
        askingPrice: parseInt(data.budget.replace(/\D/g, '')) || 0,
        listedById: userId,
        listingType: 'OWNER',
      }
    });

    // 3. Create the Transaction itself
    const transaction = await tx.transaction.create({
      data: {
        id: customId,
        type: 'BUY',
        buyerId: userId,
        propertyId: property.id,
        locationId: location.id,
        status: 'INTEREST',
      }
    });

    // 4. Create ServiceRequest if serviceCode was provided
    if (data.serviceCode) {
      const service = await tx.serviceCatalog.findUnique({
        where: { code: data.serviceCode }
      });
      
      if (service) {
        await tx.serviceRequest.create({
          data: {
            transactionId: transaction.id,
            serviceId: service.id,
            status: 'INITIATED',
            priority: 'NORMAL',
          }
        });
      }
    }

    return transaction;
  });

  return newTransaction;
}

export async function uploadDocumentPlaceholder(transactionId: string, documentType: string, fileUrl: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Must be logged in.');
  }

  // Create a Document record linked to the transaction
  const document = await prisma.document.create({
    data: {
      transactionId,
      type: documentType as any,
      name: fileUrl,
      storageUrl: fileUrl,
      mimeType: 'application/pdf',
      sizeBytes: 1024,
      uploadedById: session.user.id,
    }
  });

  return document;
}

export async function initiateTransactionFromProperty(propertyId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Must be logged in to create a transaction.');
  }

  const userId = session.user.id;
  const customId = 'TXN-' + Math.floor(1000 + Math.random() * 9000);

  // For MVP/mocking, we fetch the first location in DB since property details page uses a mock property
  const location = await prisma.location.findFirst();

  // Create a dummy property so FK constraint passes
  const property = await prisma.property.create({
    data: {
      type: 'APARTMENT',
      locationId: location?.id || 'cmrcjrdsj0003xtuod2j79a3p',
      title: 'Mock Property ' + propertyId,
      description: 'Auto-generated for UI Flow',
      askingPrice: 21000000,
      listedById: userId,
      listingType: 'OWNER'
    }
  });

  const transaction = await prisma.transaction.create({
    data: {
      id: customId,
      type: 'BUY',
      buyerId: userId,
      propertyId: property.id,
      locationId: property.locationId,
      status: 'INTEREST',
    }
  });

  return transaction;
}
