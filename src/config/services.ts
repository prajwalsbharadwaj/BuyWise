/**
 * BuyWise — Service Catalog Configuration
 * 
 * Master list of all platform services with phase classification,
 * dependencies, and metadata. This seeds the ServiceCatalog table.
 */

export interface ServiceCatalogSeed {
  code: string;
  name: string;
  description: string;
  category: string;
  phase: string;
  applicableStages: string[];
  applicablePropertyTypes: string[];
  applicableTransactionTypes: string[];
  estimatedDurationHours: number | null;
  requiresPhysicalPresence: boolean;
  requiresGovernmentInteraction: boolean;
  aiCapabilitiesUsed: string[];
  deliverables: { items: { name: string; description: string; format: string }[] };
  defaultPriceINR: number | null;
  priceType: string;
}

export const serviceCatalog: ServiceCatalogSeed[] = [
  // =====================================================================
  // DISCOVERY SERVICES
  // =====================================================================
  {
    code: 'DISC_LOCALITY_ANALYSIS',
    name: 'Locality Analysis',
    description: 'AI-powered analysis of a Bengaluru locality covering growth potential, livability, connectivity, and investment outlook.',
    category: 'DISCOVERY',
    phase: 'MVP',
    applicableStages: ['DISCOVERY', 'INTEREST', 'EVALUATION'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: null,
    requiresPhysicalPresence: false,
    requiresGovernmentInteraction: false,
    aiCapabilitiesUsed: ['ContentAI', 'ValuationAI'],
    deliverables: {
      items: [
        { name: 'Locality Score Card', description: 'Growth, livability, connectivity, affordability, infrastructure scores', format: 'JSON' },
        { name: 'AI Insight Summary', description: 'AI-generated narrative about the locality', format: 'TEXT' },
      ],
    },
    defaultPriceINR: 0,
    priceType: 'FIXED',
  },
  {
    code: 'DISC_COMMUTE_ANALYSIS',
    name: 'Commute Analysis',
    description: 'Calculate commute time and distance from a property or locality to your workplace and key destinations.',
    category: 'DISCOVERY',
    phase: 'MVP',
    applicableStages: ['DISCOVERY', 'INTEREST', 'EVALUATION'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: [],
    estimatedDurationHours: null,
    requiresPhysicalPresence: false,
    requiresGovernmentInteraction: false,
    aiCapabilitiesUsed: [],
    deliverables: {
      items: [
        { name: 'Commute Report', description: 'Drive and transit times to specified destinations', format: 'JSON' },
      ],
    },
    defaultPriceINR: 0,
    priceType: 'FIXED',
  },

  // =====================================================================
  // VALUATION SERVICES
  // =====================================================================
  {
    code: 'VAL_PROPERTY_EVALUATION',
    name: 'Property Evaluation Report',
    description: 'Comprehensive AI-generated property evaluation including fair market value estimate, locality deep-dive, commute analysis, price trends, and risk flags.',
    category: 'VALUATION',
    phase: 'MVP',
    applicableStages: ['INTEREST', 'EVALUATION'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: 1,
    requiresPhysicalPresence: false,
    requiresGovernmentInteraction: false,
    aiCapabilitiesUsed: ['ValuationAI', 'ContentAI', 'RiskAI'],
    deliverables: {
      items: [
        { name: 'Evaluation Report', description: 'Full property evaluation with AI insights', format: 'PDF' },
        { name: 'Valuation Estimate', description: 'Fair market value range with confidence interval', format: 'JSON' },
        { name: 'Risk Assessment', description: 'Identified risk flags and recommendations', format: 'JSON' },
      ],
    },
    defaultPriceINR: 499,
    priceType: 'FIXED',
  },
  {
    code: 'VAL_MARKET_COMPARISON',
    name: 'Market Comparison Report',
    description: 'Compare property pricing against recent sales and listings in the same locality. Includes price per sq ft analysis and trend data.',
    category: 'VALUATION',
    phase: 'MVP',
    applicableStages: ['INTEREST', 'EVALUATION', 'NEGOTIATION'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY', 'SELL'],
    estimatedDurationHours: null,
    requiresPhysicalPresence: false,
    requiresGovernmentInteraction: false,
    aiCapabilitiesUsed: ['ValuationAI'],
    deliverables: {
      items: [
        { name: 'Market Comparison', description: 'Comparable properties with pricing analysis', format: 'JSON' },
      ],
    },
    defaultPriceINR: 0,
    priceType: 'FIXED',
  },
  {
    code: 'VAL_DETAILED_REPORT',
    name: 'Detailed Valuation Report',
    description: 'In-depth property valuation combining AI analysis, market data, and expert methodology. Includes comparables, adjustments, and confidence scoring.',
    category: 'VALUATION',
    phase: 'PHASE_2',
    applicableStages: ['EVALUATION', 'NEGOTIATION', 'FINANCING'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY', 'SELL'],
    estimatedDurationHours: 24,
    requiresPhysicalPresence: false,
    requiresGovernmentInteraction: false,
    aiCapabilitiesUsed: ['ValuationAI', 'ContentAI', 'DataExtractionAI'],
    deliverables: {
      items: [
        { name: 'Detailed Valuation', description: 'Comprehensive valuation with methodology', format: 'PDF' },
      ],
    },
    defaultPriceINR: 1999,
    priceType: 'FIXED',
  },
  {
    code: 'VAL_INDEPENDENT',
    name: 'Independent Property Valuation',
    description: 'Valuation by a RICS/IBBI-registered professional valuer. Official valuation report accepted by banks and courts.',
    category: 'VALUATION',
    phase: 'PHASE_3',
    applicableStages: ['EVALUATION', 'FINANCING'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY', 'SELL'],
    estimatedDurationHours: 72,
    requiresPhysicalPresence: true,
    requiresGovernmentInteraction: false,
    aiCapabilitiesUsed: [],
    deliverables: {
      items: [
        { name: 'Official Valuation Report', description: 'Certified valuation from registered valuer', format: 'PDF' },
      ],
    },
    defaultPriceINR: 5000,
    priceType: 'RANGE',
  },

  // =====================================================================
  // VERIFICATION SERVICES
  // =====================================================================
  {
    code: 'VER_LISTING_BASIC',
    name: 'Basic Listing Verification',
    description: 'Admin-level review of listing details for obvious red flags such as impossible pricing, stolen images, or inconsistent information.',
    category: 'VERIFICATION',
    phase: 'MVP',
    applicableStages: ['INTEREST'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: [],
    estimatedDurationHours: 2,
    requiresPhysicalPresence: false,
    requiresGovernmentInteraction: false,
    aiCapabilitiesUsed: ['FraudAI'],
    deliverables: {
      items: [
        { name: 'Verification Badge', description: 'Basic verified status on listing', format: 'STATUS' },
      ],
    },
    defaultPriceINR: 0,
    priceType: 'FIXED',
  },
  {
    code: 'VER_DOCUMENT',
    name: 'Property Document Verification',
    description: 'AI-powered scan of uploaded property documents for completeness, consistency, and known red flags. Not a legal opinion.',
    category: 'VERIFICATION',
    phase: 'MVP',
    applicableStages: ['EVALUATION', 'DEEP_VERIFY'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: 1,
    requiresPhysicalPresence: false,
    requiresGovernmentInteraction: false,
    aiCapabilitiesUsed: ['DocumentAI'],
    deliverables: {
      items: [
        { name: 'Document Review Report', description: 'Completeness check, field extraction, risk flags', format: 'JSON' },
      ],
    },
    defaultPriceINR: 299,
    priceType: 'FIXED',
  },
  {
    code: 'VER_GPS_LOCATION',
    name: 'GPS Location Verification',
    description: 'Verify that property images were captured at the claimed location by analyzing EXIF data or live GPS coordinates.',
    category: 'VERIFICATION',
    phase: 'PHASE_2',
    applicableStages: ['EVALUATION'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: null,
    requiresPhysicalPresence: false,
    requiresGovernmentInteraction: false,
    aiCapabilitiesUsed: ['ImageAI'],
    deliverables: {
      items: [
        { name: 'Location Match Report', description: 'GPS coordinates vs claimed location analysis', format: 'JSON' },
      ],
    },
    defaultPriceINR: 99,
    priceType: 'FIXED',
  },
  {
    code: 'VER_IMAGE_AUTH',
    name: 'Image Authenticity Verification',
    description: 'AI analysis to detect manipulated images, stock photos, or images stolen from other listings.',
    category: 'VERIFICATION',
    phase: 'PHASE_2',
    applicableStages: ['INTEREST', 'EVALUATION'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: null,
    requiresPhysicalPresence: false,
    requiresGovernmentInteraction: false,
    aiCapabilitiesUsed: ['ImageAI', 'FraudAI'],
    deliverables: {
      items: [
        { name: 'Image Authenticity Report', description: 'Manipulation detection and reverse image search results', format: 'JSON' },
      ],
    },
    defaultPriceINR: 199,
    priceType: 'FIXED',
  },
  {
    code: 'VER_OWNERSHIP',
    name: 'Ownership Verification',
    description: 'Verify property ownership using available government land records. Subject to data availability per state.',
    category: 'VERIFICATION',
    phase: 'PHASE_2',
    applicableStages: ['EVALUATION', 'DEEP_VERIFY'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: 48,
    requiresPhysicalPresence: false,
    requiresGovernmentInteraction: true,
    aiCapabilitiesUsed: ['DocumentAI', 'DataExtractionAI'],
    deliverables: {
      items: [
        { name: 'Ownership Verification Report', description: 'Name match, survey number, extent verification', format: 'PDF' },
      ],
    },
    defaultPriceINR: 999,
    priceType: 'FIXED',
  },

  // =====================================================================
  // LEGAL SERVICES
  // =====================================================================
  {
    code: 'LEGAL_TITLE_VERIFY',
    name: 'Title Verification',
    description: 'Professional title search and verification by a partner lawyer. Covers 30-year title chain, encumbrances, and legal opinion.',
    category: 'LEGAL',
    phase: 'MVP',
    applicableStages: ['EVALUATION', 'DEEP_VERIFY'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: 120,
    requiresPhysicalPresence: false,
    requiresGovernmentInteraction: true,
    aiCapabilitiesUsed: ['DocumentAI'],
    deliverables: {
      items: [
        { name: 'Title Search Report', description: 'Chain of title for last 30 years', format: 'PDF' },
        { name: 'Legal Opinion', description: "Lawyer's opinion on title validity", format: 'PDF' },
        { name: 'Encumbrance Summary', description: 'Existing encumbrances, mortgages, liens', format: 'PDF' },
      ],
    },
    defaultPriceINR: 4999,
    priceType: 'RANGE',
  },
  {
    code: 'LEGAL_CONSULTATION',
    name: 'Legal Consultation',
    description: 'One-on-one consultation with a property lawyer. Video call or in-person. 30 minutes.',
    category: 'LEGAL',
    phase: 'PHASE_2',
    applicableStages: ['EVALUATION', 'NEGOTIATION', 'AGREEMENT', 'DEEP_VERIFY', 'REGISTRATION'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: [],
    estimatedDurationHours: 1,
    requiresPhysicalPresence: false,
    requiresGovernmentInteraction: false,
    aiCapabilitiesUsed: [],
    deliverables: {
      items: [
        { name: 'Consultation Summary', description: 'Notes and recommendations from the lawyer', format: 'TEXT' },
      ],
    },
    defaultPriceINR: 999,
    priceType: 'FIXED',
  },
  {
    code: 'LEGAL_AGREEMENT_DRAFT',
    name: 'Sale Agreement Drafting',
    description: 'Professional drafting of sale agreement with standard clauses and customization for your transaction.',
    category: 'LEGAL',
    phase: 'PHASE_2',
    applicableStages: ['AGREEMENT'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY', 'SELL'],
    estimatedDurationHours: 48,
    requiresPhysicalPresence: false,
    requiresGovernmentInteraction: false,
    aiCapabilitiesUsed: ['ContentAI'],
    deliverables: {
      items: [
        { name: 'Sale Agreement Draft', description: 'Customized sale agreement document', format: 'PDF' },
      ],
    },
    defaultPriceINR: 2999,
    priceType: 'FIXED',
  },
  {
    code: 'LEGAL_REG_SUPPORT',
    name: 'Registration Support',
    description: 'Lawyer accompanies buyer and seller to the Sub-Registrar office for document execution and registration.',
    category: 'LEGAL',
    phase: 'PHASE_2',
    applicableStages: ['REGISTRATION'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY', 'SELL'],
    estimatedDurationHours: 8,
    requiresPhysicalPresence: true,
    requiresGovernmentInteraction: true,
    aiCapabilitiesUsed: [],
    deliverables: {
      items: [
        { name: 'Registration Confirmation', description: 'Confirmation that registration is completed', format: 'STATUS' },
      ],
    },
    defaultPriceINR: 3999,
    priceType: 'FIXED',
  },

  // =====================================================================
  // DOCUMENTATION SERVICES
  // =====================================================================
  {
    code: 'DOC_CHECKLIST',
    name: 'Document Checklist',
    description: 'Auto-generated checklist of required documents based on your property type, transaction type, and location.',
    category: 'DOCUMENTATION',
    phase: 'MVP',
    applicableStages: ['EVALUATION', 'AGREEMENT', 'DEEP_VERIFY', 'REGISTRATION'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: [],
    estimatedDurationHours: null,
    requiresPhysicalPresence: false,
    requiresGovernmentInteraction: false,
    aiCapabilitiesUsed: [],
    deliverables: {
      items: [
        { name: 'Document Checklist', description: 'Required and optional documents with descriptions', format: 'JSON' },
      ],
    },
    defaultPriceINR: 0,
    priceType: 'FIXED',
  },
  {
    code: 'DOC_AI_REVIEW',
    name: 'AI Document Review',
    description: 'Upload a property document and get an instant AI review for completeness, consistency, and potential red flags.',
    category: 'DOCUMENTATION',
    phase: 'MVP',
    applicableStages: ['EVALUATION', 'DEEP_VERIFY'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: null,
    requiresPhysicalPresence: false,
    requiresGovernmentInteraction: false,
    aiCapabilitiesUsed: ['DocumentAI'],
    deliverables: {
      items: [
        { name: 'AI Review Report', description: 'Completeness score, extracted fields, risk flags', format: 'JSON' },
      ],
    },
    defaultPriceINR: 0,
    priceType: 'FIXED',
  },

  // =====================================================================
  // FINANCE SERVICES
  // =====================================================================
  {
    code: 'FIN_EMI_CALC',
    name: 'EMI Calculator',
    description: 'Calculate monthly EMI for a home loan based on loan amount, interest rate, and tenure.',
    category: 'FINANCE',
    phase: 'MVP',
    applicableStages: ['DISCOVERY', 'INTEREST', 'EVALUATION', 'FINANCING'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: null,
    requiresPhysicalPresence: false,
    requiresGovernmentInteraction: false,
    aiCapabilitiesUsed: [],
    deliverables: {
      items: [
        { name: 'EMI Breakdown', description: 'Monthly EMI, total interest, amortization schedule', format: 'JSON' },
      ],
    },
    defaultPriceINR: 0,
    priceType: 'FIXED',
  },
  {
    code: 'FIN_LOAN_ELIGIBILITY',
    name: 'Loan Eligibility Estimator',
    description: 'Estimate your home loan eligibility based on income, existing obligations, and age.',
    category: 'FINANCE',
    phase: 'MVP',
    applicableStages: ['DISCOVERY', 'INTEREST', 'EVALUATION', 'FINANCING'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: null,
    requiresPhysicalPresence: false,
    requiresGovernmentInteraction: false,
    aiCapabilitiesUsed: [],
    deliverables: {
      items: [
        { name: 'Eligibility Report', description: 'Estimated loan amount, suggested tenure, income requirements', format: 'JSON' },
      ],
    },
    defaultPriceINR: 0,
    priceType: 'FIXED',
  },
  {
    code: 'FIN_STAMP_DUTY_CALC',
    name: 'Stamp Duty Calculator',
    description: 'Calculate stamp duty and registration fees based on property value, location, and buyer details.',
    category: 'FINANCE',
    phase: 'MVP',
    applicableStages: ['EVALUATION', 'AGREEMENT', 'REGISTRATION'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: null,
    requiresPhysicalPresence: false,
    requiresGovernmentInteraction: false,
    aiCapabilitiesUsed: [],
    deliverables: {
      items: [
        { name: 'Fee Breakdown', description: 'Stamp duty, registration fee, cess, total', format: 'JSON' },
      ],
    },
    defaultPriceINR: 0,
    priceType: 'FIXED',
  },

  // =====================================================================
  // GOVERNMENT SERVICES (Phase 2+)
  // =====================================================================
  {
    code: 'GOV_REG_GUIDE',
    name: 'Registration Process Guide',
    description: 'Step-by-step guide for registering your property at the Sub-Registrar office. Location-specific.',
    category: 'GOVERNMENT',
    phase: 'PHASE_2',
    applicableStages: ['REGISTRATION'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY', 'SELL'],
    estimatedDurationHours: null,
    requiresPhysicalPresence: false,
    requiresGovernmentInteraction: false,
    aiCapabilitiesUsed: ['ContentAI'],
    deliverables: {
      items: [
        { name: 'Registration Guide', description: 'Steps, documents, fees, office details', format: 'JSON' },
      ],
    },
    defaultPriceINR: 0,
    priceType: 'FIXED',
  },
  {
    code: 'GOV_KHATA_TRANSFER',
    name: 'Khata Transfer Workflow',
    description: 'Guided workflow for transferring Khata to your name after property registration. Includes document templates and checklists.',
    category: 'GOVERNMENT',
    phase: 'PHASE_3',
    applicableStages: ['POST_REGISTRATION'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: 168,
    requiresPhysicalPresence: true,
    requiresGovernmentInteraction: true,
    aiCapabilitiesUsed: ['ContentAI'],
    deliverables: {
      items: [
        { name: 'Khata Transfer Guide', description: 'Step-by-step process with templates', format: 'PDF' },
      ],
    },
    defaultPriceINR: 1999,
    priceType: 'FIXED',
  },

  // =====================================================================
  // NEGOTIATION SERVICES (Phase 2+)
  // =====================================================================
  {
    code: 'NEG_AI_OFFER',
    name: 'AI Offer Recommendation',
    description: 'AI analyzes market data, property condition, and comparable sales to suggest an optimal offer price and negotiation strategy.',
    category: 'NEGOTIATION',
    phase: 'PHASE_2',
    applicableStages: ['NEGOTIATION'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: null,
    requiresPhysicalPresence: false,
    requiresGovernmentInteraction: false,
    aiCapabilitiesUsed: ['NegotiationAI', 'ValuationAI'],
    deliverables: {
      items: [
        { name: 'Offer Strategy', description: 'Recommended offer amount, range, and reasoning', format: 'JSON' },
      ],
    },
    defaultPriceINR: 299,
    priceType: 'FIXED',
  },

  // =====================================================================
  // ENGINEERING SERVICES (Phase 3+)
  // =====================================================================
  {
    code: 'ENG_STRUCTURAL',
    name: 'Structural Inspection',
    description: 'Licensed structural engineer inspects the property for structural integrity, construction quality, and safety issues.',
    category: 'ENGINEERING',
    phase: 'PHASE_3',
    applicableStages: ['EVALUATION', 'DEEP_VERIFY'],
    applicablePropertyTypes: ['APARTMENT', 'VILLA', 'INDEPENDENT_HOUSE', 'COMMERCIAL_SHOP', 'COMMERCIAL_OFFICE'],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: 48,
    requiresPhysicalPresence: true,
    requiresGovernmentInteraction: false,
    aiCapabilitiesUsed: [],
    deliverables: {
      items: [
        { name: 'Structural Inspection Report', description: 'Detailed assessment of structural condition', format: 'PDF' },
      ],
    },
    defaultPriceINR: 5000,
    priceType: 'RANGE',
  },
  {
    code: 'ENG_SOIL_TEST',
    name: 'Soil Testing',
    description: 'Certified soil testing for plot purchases. Evaluates soil bearing capacity, water table, and suitability for construction.',
    category: 'ENGINEERING',
    phase: 'PHASE_3',
    applicableStages: ['EVALUATION', 'DEEP_VERIFY'],
    applicablePropertyTypes: ['PLOT', 'AGRICULTURAL_LAND'],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: 168,
    requiresPhysicalPresence: true,
    requiresGovernmentInteraction: false,
    aiCapabilitiesUsed: [],
    deliverables: {
      items: [
        { name: 'Soil Test Report', description: 'Soil composition, bearing capacity, recommendations', format: 'PDF' },
      ],
    },
    defaultPriceINR: 8000,
    priceType: 'RANGE',
  },
];
