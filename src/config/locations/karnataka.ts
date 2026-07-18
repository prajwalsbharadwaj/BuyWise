/**
 * BuyWise — Karnataka Regulations Configuration
 * 
 * State-specific rules for stamp duty, registration fees, and other
 * property transaction regulations. This is the reference implementation
 * for location-specific configuration.
 * 
 * Source: Karnataka Stamp Act & Registration Act (as of 2026)
 * Note: Verify rates before production use — regulations change.
 */


export const karnatakaRegulations: LocationConfig[] = [
  {
    configType: 'STAMP_DUTY',
    validFrom: '2024-04-01',
    source: 'Karnataka Stamp Act, Section 45A',
    configData: {
      description: 'Stamp duty rates for property registration in Karnataka',
      rules: [
        {
          description: 'Standard rate for male buyers',
          conditions: { buyerGender: 'MALE' },
          ratePercentage: 5.0,
          appliedOn: 'PROPERTY_VALUE_OR_GUIDANCE_VALUE_WHICHEVER_HIGHER',
        },
        {
          description: 'Reduced rate for female buyers (property value ≤ ₹35 lakhs)',
          conditions: { buyerGender: 'FEMALE', propertyValueMax: 3500000 },
          ratePercentage: 3.5,
          appliedOn: 'PROPERTY_VALUE_OR_GUIDANCE_VALUE_WHICHEVER_HIGHER',
        },
        {
          description: 'Reduced rate for female buyers (property value > ₹35 lakhs)',
          conditions: { buyerGender: 'FEMALE', propertyValueMin: 3500001 },
          ratePercentage: 4.0,
          appliedOn: 'PROPERTY_VALUE_OR_GUIDANCE_VALUE_WHICHEVER_HIGHER',
        },
        {
          description: 'SC/ST buyers (may have additional concessions)',
          conditions: { buyerCategory: 'SC_ST' },
          ratePercentage: 3.0,
          appliedOn: 'PROPERTY_VALUE_OR_GUIDANCE_VALUE_WHICHEVER_HIGHER',
          notes: 'Subject to income limits and other conditions. Verify current rules.',
        },
      ],
      surcharges: [
        {
          name: 'Cess',
          ratePercentage: 10,
          appliedOn: 'STAMP_DUTY_AMOUNT',
          description: 'Additional cess on stamp duty',
        },
      ],
    },
  },
  {
    configType: 'REGISTRATION_FEE',
    validFrom: '2024-04-01',
    source: 'Karnataka Registration Act',
    configData: {
      description: 'Registration fee for property registration in Karnataka',
      rules: [
        {
          description: 'Standard registration fee',
          ratePercentage: 1.0,
          appliedOn: 'PROPERTY_VALUE_OR_GUIDANCE_VALUE_WHICHEVER_HIGHER',
          maxAmount: null,
        },
      ],
    },
  },
  {
    configType: 'RERA_RULES',
    validFrom: '2017-07-01',
    source: 'Karnataka RERA (K-RERA)',
    configData: {
      description: 'Real Estate Regulatory Authority rules for Karnataka',
      portalUrl: 'https://rera.karnataka.gov.in',
      applicability: {
        minUnits: 8,
        minArea: 500, // sq meters
        excludes: ['RENOVATION', 'REPAIR'],
      },
      requirements: {
        registrationRequired: true,
        quarterlyUpdates: true,
        escrowAccountRequired: true,
        escrowPercentage: 70,
      },
      penalties: {
        nonRegistration: 'Up to 10% of project cost',
        noncompliance: 'Up to 5% of project cost',
      },
    },
  },
  {
    configType: 'TAX_RULES',
    validFrom: '2024-04-01',
    source: 'BBMP Property Tax Rules',
    configData: {
      description: 'Property tax rules for BBMP (Bengaluru) areas',
      zones: ['A', 'B', 'C', 'D', 'E', 'F'],
      paymentPortal: 'https://bbmptax.karnataka.gov.in',
      dueDate: 'April 30 (full year) or June 30 (first half)',
      rebate: {
        earlyPaymentPercentage: 5,
        deadline: 'April 30',
      },
      penalty: {
        latePaymentPercentage: 2,
        perMonth: true,
      },
    },
  },
  {
    configType: 'PROCESS_TEMPLATE',
    validFrom: '2024-01-01',
    source: 'Karnataka Sub-Registrar Office Process',
    configData: {
      processType: 'PROPERTY_REGISTRATION',
      description: 'Steps for registering a property in Karnataka',
      steps: [
        {
          order: 1,
          name: 'Document Preparation',
          description: 'Prepare sale deed, ID proofs, photographs, and other required documents',
          estimatedDays: 3,
          documentsRequired: [
            'Sale deed (2 original copies)',
            'ID proof of buyer and seller (Aadhaar/PAN)',
            'Passport-size photographs (2 each)',
            'Previous title deeds',
            'Encumbrance certificate (last 30 years)',
            'Khata certificate and extract',
            'Latest property tax receipt',
            'NOC from builder/society (if applicable)',
          ],
        },
        {
          order: 2,
          name: 'Stamp Duty Payment',
          description: 'Pay stamp duty online via Kaveri portal or at designated bank',
          estimatedDays: 1,
          portal: 'https://kaverionline.karnataka.gov.in',
          notes: 'E-stamping available at authorized centers',
        },
        {
          order: 3,
          name: 'Slot Booking',
          description: 'Book appointment at Sub-Registrar Office via Kaveri Online',
          estimatedDays: 1,
          portal: 'https://kaverionline.karnataka.gov.in',
          notes: 'Slots fill up quickly. Book 3-5 days in advance.',
        },
        {
          order: 4,
          name: 'Sub-Registrar Visit',
          description: 'Both buyer and seller visit Sub-Registrar Office with witnesses',
          estimatedDays: 1,
          requirements: [
            'Buyer and seller must be present in person',
            '2 witnesses with ID proof',
            'All original documents',
            'Stamp duty payment receipt',
            'Registration fee (1% of property value)',
          ],
          notes: 'Biometric verification is done at the office.',
        },
        {
          order: 5,
          name: 'Document Collection',
          description: 'Collect registered sale deed from Sub-Registrar Office',
          estimatedDays: 7,
          notes: 'Document usually ready in 3-7 working days after registration.',
        },
      ],
      estimatedTotalDays: 13,
      governmentOffice: 'Sub-Registrar Office',
      onlinePortal: 'https://kaverionline.karnataka.gov.in',
    },
  },
];

/**
 * Type definition for location configuration.
 * This matches the LocationConfig Prisma model's configData structure.
 */
export interface LocationConfig {
  configType: string;
  validFrom: string;
  validUntil?: string;
  source?: string;
  configData: Record<string, unknown>;
}
