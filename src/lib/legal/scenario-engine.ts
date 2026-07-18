import { DocumentType } from '@prisma/client';

export type PropertyScenario = 
  | 'APARTMENT_NEW' 
  | 'APARTMENT_RESALE' 
  | 'PLOT_GATED' 
  | 'PLOT_INDEPENDENT' 
  | 'VILLA'
  | 'COMMERCIAL';

export type SellerType = 
  | 'INDIVIDUAL' 
  | 'JOINT' 
  | 'NRI' 
  | 'BUILDER' 
  | 'COMPANY';

export interface LegalQuestionnaire {
  propertyType: PropertyScenario;
  sellerType: SellerType;
  isInherited: boolean;
  hasActiveLoan: boolean;
  khataType: 'A_KHATA' | 'B_KHATA' | 'E_KHATA' | 'UNKNOWN';
  isUnderConstruction: boolean;
}

export interface RequiredDocumentDef {
  type: DocumentType;
  label: string;
  isMandatory: boolean;
  reason: string;
}

export interface ScenarioAnalysis {
  tags: string[];
  documents: RequiredDocumentDef[];
  potentialRisks: string[];
}

export function analyzeLegalScenario(data: LegalQuestionnaire): ScenarioAnalysis {
  const tags: string[] = [data.propertyType, data.sellerType];
  const docs: RequiredDocumentDef[] = [];
  const risks: string[] = [];

  // 1. Base Documents required for almost everything
  docs.push({
    type: 'SALE_DEED',
    label: 'Current Sale Deed',
    isMandatory: data.sellerType !== 'BUILDER',
    reason: 'Proof of current ownership'
  });
  
  docs.push({
    type: 'ENCUMBRANCE_CERT',
    label: 'Encumbrance Certificate (EC)',
    isMandatory: true,
    reason: 'To verify if the property is free from legal dues or mortgages'
  });

  docs.push({
    type: 'TAX_RECEIPT',
    label: 'Latest Property Tax Receipt',
    isMandatory: true,
    reason: 'Proof of up-to-date tax payments'
  });

  // 2. Khata Logic
  if (data.khataType === 'A_KHATA' || data.khataType === 'E_KHATA') {
    docs.push({
      type: 'KHATA_CERT',
      label: 'Khata Certificate & Extract',
      isMandatory: true,
      reason: 'Official BBMP property account'
    });
  } else if (data.khataType === 'B_KHATA') {
    tags.push('B_KHATA');
    risks.push('B-Khata property: May have deviation from approved plan. Bank loans might be difficult to secure.');
    docs.push({
      type: 'KHATA_CERT',
      label: 'B-Khata Extract (Form B Register)',
      isMandatory: true,
      reason: 'Record of tax payment for unapproved layouts'
    });
  } else {
    risks.push('Unknown Khata status: High risk of illegal construction or missing property tax records.');
  }

  // 3. Inheritance Logic
  if (data.isInherited) {
    tags.push('INHERITED');
    risks.push('Inherited property: High risk of undisclosed legal heirs. Requires thorough family tree verification.');
    docs.push({
      type: 'DEATH_CERTIFICATE',
      label: 'Death Certificate of previous owner',
      isMandatory: true,
      reason: 'Proof of demise for inheritance transfer'
    });
    docs.push({
      type: 'WILL',
      label: 'Registered Will / Succession Certificate',
      isMandatory: true,
      reason: 'Proof of legal inheritance rights'
    });
    docs.push({
      type: 'OTHER',
      label: 'Family Tree / Affidavit',
      isMandatory: true,
      reason: 'To ensure no other legal heirs have a claim'
    });
  }

  // 4. Loan Logic
  if (data.hasActiveLoan) {
    tags.push('ACTIVE_LOAN');
    risks.push('Active loan exists: Original documents are likely with the bank. Ensure NOC and foreclosure letter are obtained before final payment.');
    docs.push({
      type: 'BANK_STATEMENT',
      label: 'Bank Loan Foreclosure Letter',
      isMandatory: false,
      reason: 'To know the exact outstanding amount to clear the loan'
    });
    docs.push({
      type: 'NOC',
      label: 'Bank NOC',
      isMandatory: false,
      reason: 'Required before registration'
    });
  }

  // 5. Property Type specific
  if (data.isUnderConstruction || data.propertyType === 'APARTMENT_NEW') {
    tags.push('UNDER_CONSTRUCTION');
    docs.push({
      type: 'RERA_CERT',
      label: 'RERA Registration Certificate',
      isMandatory: true,
      reason: 'Mandatory for under-construction projects'
    });
    docs.push({
      type: 'APPROVAL_PLAN',
      label: 'Sanctioned Building Plan',
      isMandatory: true,
      reason: 'To verify construction matches approved design'
    });
    docs.push({
      type: 'SALE_AGREEMENT',
      label: 'Builder Construction Agreement',
      isMandatory: true,
      reason: 'Terms of construction and handover'
    });
  } else if (data.propertyType === 'APARTMENT_RESALE') {
    docs.push({
      type: 'OCCUPANCY_CERT',
      label: 'Occupancy Certificate (OC)',
      isMandatory: false,
      reason: 'Proof that building is fit for occupation'
    });
    docs.push({
      type: 'BUILDER_NOC',
      label: 'Society / Builder NOC',
      isMandatory: false,
      reason: 'No objection for resale'
    });
  }

  // 6. Seller Type specific
  if (data.sellerType === 'NRI') {
    tags.push('NRI_SELLER');
    risks.push('NRI Seller: Ensure TDS is deducted at 20%+ surcharge under section 195. Verify if SPA (Specific Power of Attorney) is used.');
    docs.push({
      type: 'PASSPORT',
      label: 'Seller Passport / OCI',
      isMandatory: true,
      reason: 'Identity and residential status proof'
    });
    docs.push({
      type: 'GPA', // Using GPA as proxy for POA
      label: 'Power of Attorney (if applicable)',
      isMandatory: false,
      reason: 'If seller is not traveling to India for registration'
    });
  }

  return {
    tags,
    documents: docs,
    potentialRisks: risks
  };
}
