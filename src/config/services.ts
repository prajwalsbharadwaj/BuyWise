/**
 * BuyWise — Service Catalog Configuration
 * 
 * Reorganized Service Framework Configuration
 * Drives the generic execution pipeline.
 */

export const serviceCatalog = [
  // =====================================================================
  // PHASE 1: AUTOMATED VERIFICATION
  // =====================================================================
  {
    code: 'VER_PROPERTY_DOCUMENT',
    name: 'Property Document Verification',
    description: 'AI-powered scan of uploaded property documents for completeness, consistency, and known red flags. Not a legal opinion.',
    category: 'AUTOMATED_VERIFICATION',
    phase: 'MVP',
    isAiSupported: true,
    isHumanPartnerRequired: false,
    partnerType: null,
    requiresGovernmentInteraction: false,
    
    questionnaireSchema: {
      title: "Property Document Setup",
      fields: [
        { name: "documentType", label: "Primary Document Type", type: "select", options: ["Sale Deed", "Allotment Letter", "Agreement to Sell"] },
        { name: "propertyAgeYears", label: "Approximate Property Age (Years)", type: "number" }
      ]
    },
    requiredDocuments: ["PRIMARY_DEED", "ID_PROOF"],
    optionalDocuments: ["PREVIOUS_DEEDS"],
    deliverablesSchema: {
      type: "AI_DOCUMENT_REPORT",
      sections: ["Completeness Score", "Extracted Entities", "Missing Documents", "Detected Risks"]
    },
    completionCriteria: "AI pipeline completes OCR and Risk Engine execution with confidence score > 0.8.",
    recommendedNextServices: ['VER_OWNERSHIP', 'VAL_PROPERTY_EVALUATION'],
    workflowOverrides: { skipAdmin: true, skipPartner: true },
    
    applicableStages: ['DISCOVERY', 'INTEREST', 'EVALUATION'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: 1,
    requiresPhysicalPresence: false,
    aiCapabilitiesUsed: ['DocumentAI', 'OCR', 'EntityExtraction'],
    deliverables: {
      items: [
        { name: 'Document Review Report', description: 'Completeness check, field extraction, risk flags', format: 'JSON' },
      ],
    },
  },

  // =====================================================================
  // PHASE 2: PROFESSIONAL EXPERT
  // =====================================================================
  {
    code: 'VER_OWNERSHIP',
    name: 'Ownership Verification',
    description: 'Uses extracted document info from Phase 1 and validates against government records to confirm current legal ownership.',
    category: 'PROFESSIONAL_EXPERT',
    phase: 'PHASE_2',
    isAiSupported: true,
    isHumanPartnerRequired: true,
    partnerType: 'LAWYER',
    requiresGovernmentInteraction: true,
    
    questionnaireSchema: {
      title: "Ownership Details",
      fields: [
        { name: "surveyNumber", label: "Survey/Khata Number", type: "text" },
        { name: "village", label: "Village/Hobli", type: "text" }
      ]
    },
    requiredDocuments: ["PRIMARY_DEED", "LATEST_TAX_RECEIPT"],
    optionalDocuments: ["ENCUMBRANCE_CERTIFICATE"],
    deliverablesSchema: {
      type: "EXPERT_REPORT",
      sections: ["Government Record Match", "Ownership Chain", "Discrepancies", "Lawyer Conclusion"]
    },
    completionCriteria: "Partner uploads verified Ownership Report.",
    recommendedNextServices: ['VER_TITLE', 'DRAFT_SALE_AGREEMENT'],
    workflowOverrides: {},
    
    applicableStages: ['EVALUATION', 'NEGOTIATION'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: 48,
    requiresPhysicalPresence: false,
    aiCapabilitiesUsed: ['RecordMatchAI'],
    deliverables: {
      items: [
        { name: 'Ownership Report', description: 'Validation against state registries', format: 'PDF' },
      ],
    },
  },

  // =====================================================================
  // PHASE 3: PROFESSIONAL EXPERT
  // =====================================================================
  {
    code: 'VER_TITLE',
    name: 'Title Verification (30-Year)',
    description: 'Comprehensive 30-year title chain analysis by a verified real estate lawyer, including encumbrance verification and legal opinion.',
    category: 'PROFESSIONAL_EXPERT',
    phase: 'PHASE_3',
    isAiSupported: false,
    isHumanPartnerRequired: true,
    partnerType: 'LAWYER',
    requiresGovernmentInteraction: true,
    
    questionnaireSchema: {
      title: "Title Verification Context",
      fields: [
        { name: "knownDisputes", label: "Are there any known disputes?", type: "boolean" },
        { name: "loanIntended", label: "Are you planning to take a bank loan?", type: "boolean" }
      ]
    },
    requiredDocuments: ["PRIMARY_DEED", "MOTHER_DEED", "ENCUMBRANCE_CERTIFICATE_15_YEARS"],
    optionalDocuments: ["KHATA_EXTRACT", "APPROVED_PLAN"],
    deliverablesSchema: {
      type: "LEGAL_OPINION",
      sections: ["Flow of Title", "Encumbrances", "Litigation Check", "Final Legal Opinion"]
    },
    completionCriteria: "Lawyer uploads digitally signed Legal Opinion.",
    recommendedNextServices: ['SCORE_READINESS', 'DRAFT_SALE_AGREEMENT'],
    workflowOverrides: {},
    
    applicableStages: ['EVALUATION', 'FINANCING'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: 120,
    requiresPhysicalPresence: false,
    aiCapabilitiesUsed: [],
    deliverables: {
      items: [
        { name: 'Title Search Report', description: '30-year flow of title', format: 'PDF' },
        { name: 'Legal Opinion', description: 'Signed opinion from empanelled lawyer', format: 'PDF' },
      ],
    },
  },

  // =====================================================================
  // PHASE 4: AI INSTANT
  // =====================================================================
  {
    code: 'SCORE_READINESS',
    name: 'Property Readiness Score',
    description: 'Aggregates outputs from Document, Ownership, and Title verifications to generate a dynamic 0-100 confidence score.',
    category: 'AI_INSTANT',
    phase: 'PHASE_4',
    isAiSupported: true,
    isHumanPartnerRequired: false,
    partnerType: null,
    requiresGovernmentInteraction: false,
    
    questionnaireSchema: null,
    requiredDocuments: [],
    optionalDocuments: [],
    deliverablesSchema: {
      type: "READINESS_SCORE",
      sections: ["Overall Score", "Missing Critical Services", "Action Items"]
    },
    completionCriteria: "Rule engine calculates score instantly.",
    recommendedNextServices: ['DRAFT_SALE_AGREEMENT'],
    workflowOverrides: { skipPayment: true, skipAdmin: true, skipPartner: true },
    
    applicableStages: ['EVALUATION', 'NEGOTIATION'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY', 'SELL'],
    estimatedDurationHours: 0,
    requiresPhysicalPresence: false,
    aiCapabilitiesUsed: ['ScoringEngine'],
    deliverables: {
      items: [
        { name: 'Readiness Dashboard', description: 'Dynamic score and missing items', format: 'UI' },
      ],
    },
  },

  // =====================================================================
  // PHASE 5: PROFESSIONAL EXPERT
  // =====================================================================
  {
    code: 'DRAFT_SALE_AGREEMENT',
    name: 'Sale Agreement Drafting',
    description: 'Uses verified ownership data to auto-fill agreement templates, reviewed and finalized by a lawyer.',
    category: 'PROFESSIONAL_EXPERT',
    phase: 'PHASE_5',
    isAiSupported: true,
    isHumanPartnerRequired: true,
    partnerType: 'LAWYER',
    requiresGovernmentInteraction: false,
    
    questionnaireSchema: {
      title: "Agreement Terms",
      fields: [
        { name: "saleConsideration", label: "Total Sale Value", type: "number" },
        { name: "tokenAmount", label: "Token/Advance Paid", type: "number" },
        { name: "timeForRegistration", label: "Time for Registration (Days)", type: "number" }
      ]
    },
    requiredDocuments: ["BUYER_ID", "SELLER_ID"],
    optionalDocuments: [],
    deliverablesSchema: {
      type: "DOCUMENT_DRAFT",
      sections: ["Draft Agreement", "Review Comments"]
    },
    completionCriteria: "Lawyer uploads final draft.",
    recommendedNextServices: ['GOV_REGISTRATION_SUPPORT'],
    workflowOverrides: {},
    
    applicableStages: ['NEGOTIATION', 'AGREEMENT'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY', 'SELL'],
    estimatedDurationHours: 48,
    requiresPhysicalPresence: false,
    aiCapabilitiesUsed: ['DraftingAI'],
    deliverables: {
      items: [
        { name: 'Draft Agreement to Sell', description: 'Ready to sign draft', format: 'PDF' },
      ],
    },
  },

  // =====================================================================
  // PHASE 6: GOVERNMENT ASSISTANCE
  // =====================================================================
  {
    code: 'GOV_REGISTRATION_SUPPORT',
    name: 'Registration Support',
    description: 'Guided physical registration workflow at the Sub-Registrar office.',
    category: 'GOVERNMENT_ASSISTANCE',
    phase: 'PHASE_6',
    isAiSupported: false,
    isHumanPartnerRequired: true,
    partnerType: 'FIELD_AGENT',
    requiresGovernmentInteraction: true,
    
    questionnaireSchema: {
      title: "Registration Setup",
      fields: [
        { name: "preferredDate", label: "Preferred Registration Date", type: "date" },
        { name: "sroOffice", label: "Sub-Registrar Office", type: "text" }
      ]
    },
    requiredDocuments: ["SIGNED_SALE_AGREEMENT", "DD_FOR_STAMP_DUTY"],
    optionalDocuments: [],
    deliverablesSchema: {
      type: "REGISTRATION_CONFIRMATION",
      sections: ["Receipt Number", "Registration Number", "Registered Document Copy"]
    },
    completionCriteria: "Agent uploads scanned copy of Registered Sale Deed.",
    recommendedNextServices: ['GOV_KHATA_TRANSFER'],
    workflowOverrides: {},
    
    applicableStages: ['REGISTRATION'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: 24,
    requiresPhysicalPresence: true,
    aiCapabilitiesUsed: [],
    deliverables: {
      items: [
        { name: 'Registered Sale Deed', description: 'Scanned registered document', format: 'PDF' },
      ],
    },
  },

  // =====================================================================
  // PHASE 7: GOVERNMENT ASSISTANCE
  // =====================================================================
  {
    code: 'GOV_KHATA_TRANSFER',
    name: 'Khata Transfer',
    description: 'Post-registration bureaucratic workflow to transfer municipal records to the new buyer.',
    category: 'GOVERNMENT_ASSISTANCE',
    phase: 'PHASE_7',
    isAiSupported: false,
    isHumanPartnerRequired: true,
    partnerType: 'FIELD_AGENT',
    requiresGovernmentInteraction: true,
    
    questionnaireSchema: {
      title: "Khata Transfer Request",
      fields: [
        { name: "sakalaNumber", label: "Sakala/Application Reference (if any)", type: "text" }
      ]
    },
    requiredDocuments: ["REGISTERED_SALE_DEED", "ENCUMBRANCE_CERTIFICATE_POST_REGISTRATION", "TAX_RECEIPT"],
    optionalDocuments: [],
    deliverablesSchema: {
      type: "KHATA_CERTIFICATE",
      sections: ["Khata Extract", "Khata Certificate", "PID Number"]
    },
    completionCriteria: "Agent uploads new Khata Certificate.",
    recommendedNextServices: [],
    workflowOverrides: {},
    
    applicableStages: ['POST_REGISTRATION'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: 720, // 30 days
    requiresPhysicalPresence: false,
    aiCapabilitiesUsed: [],
    deliverables: {
      items: [
        { name: 'Khata Certificate', description: 'Updated municipal record', format: 'PDF' },
      ],
    },
  },

  // =====================================================================
  // PHASE 8: PROFESSIONAL EXPERT / AI
  // =====================================================================
  {
    code: 'FIN_LOAN_ASSISTANCE',
    name: 'Loan Assistance',
    description: 'Routes verified property data to banking partners for pre-approval and processing.',
    category: 'PROFESSIONAL_EXPERT',
    phase: 'PHASE_8',
    isAiSupported: true,
    isHumanPartnerRequired: true,
    partnerType: 'FINANCIAL_ADVISOR',
    requiresGovernmentInteraction: false,
    
    questionnaireSchema: {
      title: "Loan Requirements",
      fields: [
        { name: "loanAmount", label: "Required Loan Amount", type: "number" },
        { name: "employmentType", label: "Employment Type", type: "select", options: ["Salaried", "Self-Employed"] }
      ]
    },
    requiredDocuments: ["INCOME_PROOF", "BANK_STATEMENTS", "ITR"],
    optionalDocuments: [],
    deliverablesSchema: {
      type: "LOAN_SANCTION",
      sections: ["Sanction Letter", "Bank Name", "Interest Rate"]
    },
    completionCriteria: "Advisor uploads Sanction Letter.",
    recommendedNextServices: [],
    workflowOverrides: {},
    
    applicableStages: ['FINANCING'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: 168, // 7 days
    requiresPhysicalPresence: false,
    aiCapabilitiesUsed: ['EligibilityEngine'],
    deliverables: {
      items: [
        { name: 'Sanction Letter', description: 'Bank approval document', format: 'PDF' },
      ],
    },
  },

  // =====================================================================
  // PHASE 9: PROFESSIONAL EXPERT
  // =====================================================================
  {
    code: 'INSP_STRUCTURAL',
    name: 'Structural Inspection',
    description: 'Physical inspection by a civil engineer to assess construction quality and structural integrity.',
    category: 'PROFESSIONAL_EXPERT',
    phase: 'PHASE_9',
    isAiSupported: false,
    isHumanPartnerRequired: true,
    partnerType: 'SURVEYOR',
    requiresGovernmentInteraction: false,
    
    questionnaireSchema: {
      title: "Inspection Details",
      fields: [
        { name: "contactPersonName", label: "Site Contact Person", type: "text" },
        { name: "contactPersonPhone", label: "Site Contact Phone", type: "text" }
      ]
    },
    requiredDocuments: [],
    optionalDocuments: ["APPROVED_PLAN"],
    deliverablesSchema: {
      type: "INSPECTION_REPORT",
      sections: ["Structural Health", "Seepage Issues", "Deviation from Plan", "Remediation Cost Estimate"]
    },
    completionCriteria: "Surveyor uploads completed inspection report.",
    recommendedNextServices: ['VAL_PROPERTY_EVALUATION'],
    workflowOverrides: {},
    
    applicableStages: ['EVALUATION'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: 48,
    requiresPhysicalPresence: true,
    aiCapabilitiesUsed: [],
    deliverables: {
      items: [
        { name: 'Inspection Report', description: 'Detailed civil engineering report', format: 'PDF' },
      ],
    },
  },

  // =====================================================================
  // PHASE 10: AI INSTANT
  // =====================================================================
  {
    code: 'TOOL_EMI_CALC',
    name: 'EMI Calculator',
    description: 'Instant AI calculator for loan EMIs.',
    category: 'AI_INSTANT',
    phase: 'MVP',
    isAiSupported: true,
    isHumanPartnerRequired: false,
    partnerType: null,
    requiresGovernmentInteraction: false,
    
    questionnaireSchema: {
      title: "EMI Input",
      fields: [
        { name: "principal", label: "Loan Amount", type: "number" },
        { name: "interest", label: "Interest Rate (%)", type: "number" },
        { name: "tenure", label: "Tenure (Years)", type: "number" }
      ]
    },
    requiredDocuments: [],
    optionalDocuments: [],
    deliverablesSchema: {
      type: "CALCULATOR_RESULT",
      sections: ["Monthly EMI", "Total Interest", "Total Payment"]
    },
    completionCriteria: "Instant.",
    recommendedNextServices: ['FIN_LOAN_ASSISTANCE'],
    workflowOverrides: { skipPayment: true, skipAdmin: true, skipPartner: true },
    
    applicableStages: ['DISCOVERY', 'FINANCING'],
    applicablePropertyTypes: [],
    applicableTransactionTypes: ['BUY'],
    estimatedDurationHours: 0,
    requiresPhysicalPresence: false,
    aiCapabilitiesUsed: [],
    deliverables: {
      items: [
        { name: 'EMI Schedule', description: 'Amortization schedule', format: 'JSON' },
      ],
    },
  }
];
