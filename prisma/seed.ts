const { PrismaClient } = require('@prisma/client');
const { serviceCatalog } = require('../src/config/services.ts');
const { karnatakaRegulations } = require('../src/config/locations/karnataka.ts');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Seed Locations (Bengaluru Hierarchy)
  console.log('Seeding locations...');
  
  const india = await prisma.location.upsert({
    where: { slug: 'india' },
    update: {},
    create: {
      name: 'India',
      slug: 'india',
      type: 'COUNTRY',
    },
  });

  const karnataka = await prisma.location.upsert({
    where: { slug: 'karnataka' },
    update: {},
    create: {
      name: 'Karnataka',
      slug: 'karnataka',
      type: 'STATE',
      parentId: india.id,
    },
  });

  const bengaluru = await prisma.location.upsert({
    where: { slug: 'bengaluru' },
    update: {},
    create: {
      name: 'Bengaluru',
      slug: 'bengaluru',
      type: 'CITY',
      parentId: karnataka.id,
    },
  });

  const indiranagar = await prisma.location.upsert({
    where: { slug: 'bengaluru-indiranagar' },
    update: {},
    create: {
      name: 'Indiranagar',
      slug: 'bengaluru-indiranagar',
      type: 'LOCALITY',
      parentId: bengaluru.id,
    },
  });

  const whitefield = await prisma.location.upsert({
    where: { slug: 'bengaluru-whitefield' },
    update: {},
    create: {
      name: 'Whitefield',
      slug: 'bengaluru-whitefield',
      type: 'LOCALITY',
      parentId: bengaluru.id,
    },
  });

  // 2. Seed Services
  console.log('Seeding service catalog...');
  for (const service of serviceCatalog) {
    await prisma.serviceCatalog.upsert({
      where: { code: service.code },
      update: {
        name: service.name,
        description: service.description,
        category: service.category,
        phase: service.phase,
        isAiSupported: service.isAiSupported,
        isHumanPartnerRequired: service.isHumanPartnerRequired,
        partnerType: service.partnerType,
        requiresGovernmentInteraction: service.requiresGovernmentInteraction,
        questionnaireSchema: service.questionnaireSchema as any,
        requiredDocuments: service.requiredDocuments,
        optionalDocuments: service.optionalDocuments,
        deliverablesSchema: service.deliverablesSchema as any,
        completionCriteria: service.completionCriteria,
        recommendedNextServices: service.recommendedNextServices,
        workflowOverrides: service.workflowOverrides as any,
        applicableStages: service.applicableStages,
        applicablePropertyTypes: service.applicablePropertyTypes,
        applicableTransactionTypes: service.applicableTransactionTypes,
        estimatedDurationHours: service.estimatedDurationHours,
        requiresPhysicalPresence: service.requiresPhysicalPresence,
        aiCapabilitiesUsed: service.aiCapabilitiesUsed,
        deliverables: service.deliverables as any,
        isActive: true,
      },
      create: {
        code: service.code,
        name: service.name,
        description: service.description,
        category: service.category,
        phase: service.phase,
        isAiSupported: service.isAiSupported,
        isHumanPartnerRequired: service.isHumanPartnerRequired,
        partnerType: service.partnerType,
        requiresGovernmentInteraction: service.requiresGovernmentInteraction,
        questionnaireSchema: service.questionnaireSchema as any,
        requiredDocuments: service.requiredDocuments,
        optionalDocuments: service.optionalDocuments,
        deliverablesSchema: service.deliverablesSchema as any,
        completionCriteria: service.completionCriteria,
        recommendedNextServices: service.recommendedNextServices,
        workflowOverrides: service.workflowOverrides as any,
        applicableStages: service.applicableStages,
        applicablePropertyTypes: service.applicablePropertyTypes,
        applicableTransactionTypes: service.applicableTransactionTypes,
        estimatedDurationHours: service.estimatedDurationHours,
        requiresPhysicalPresence: service.requiresPhysicalPresence,
        aiCapabilitiesUsed: service.aiCapabilitiesUsed,
        deliverables: service.deliverables as any,
        isActive: true,
      },
    });
  }

  // 3. Seed Regulations (Karnataka)
  console.log('Seeding location configs (Karnataka regulations)...');
  for (const config of karnatakaRegulations) {
    const validFrom = new Date(config.validFrom);
    
    // First try to find existing config
    const existing = await prisma.locationConfig.findFirst({
      where: {
        locationId: karnataka.id,
        configType: config.configType,
        validFrom: validFrom,
      }
    });

    if (existing) {
      await prisma.locationConfig.update({
        where: { id: existing.id },
        data: {
          configData: config.configData as any,
          source: config.source,
          lastVerified: new Date(),
        }
      });
    } else {
      await prisma.locationConfig.create({
        data: {
          locationId: karnataka.id,
          configType: config.configType,
          configData: config.configData as any,
          validFrom: validFrom,
          validUntil: config.validUntil ? new Date(config.validUntil) : null,
          source: config.source,
          lastVerified: new Date(),
        }
      });
    }
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
