/**
 * BuyWise — Transaction Lifecycle Types
 * 
 * Defines the transaction state machine, valid transitions,
 * and stage-specific metadata. This is the central organizing
 * concept of the entire platform.
 */

// =============================================================================
// Transaction Status (Lifecycle Stages)
// =============================================================================

export const TRANSACTION_STAGES = [
  'DISCOVERY',
  'INTEREST',
  'EVALUATION',
  'NEGOTIATION',
  'AGREEMENT',
  'DEEP_VERIFY',
  'FINANCING',
  'REGISTRATION',
  'POST_REGISTRATION',
  'COMPLETED',
  'ABANDONED',
] as const;

export type TransactionStage = typeof TRANSACTION_STAGES[number];

// =============================================================================
// Stage Metadata
// =============================================================================

export interface StageMetadata {
  /** Stage identifier */
  stage: TransactionStage;
  
  /** Human-readable name */
  name: string;
  
  /** Brief description */
  description: string;
  
  /** Typical duration range */
  typicalDuration: {
    min: string;
    max: string;
  };
  
  /** Which stages can this transition to? */
  validTransitions: TransactionStage[];
  
  /** Service categories relevant at this stage */
  relevantServiceCategories: string[];
  
  /** Completion percentage for progress display */
  progressPercent: number;
  
  /** Color for UI display */
  color: string;
  
  /** Icon name for UI */
  icon: string;
}

/**
 * Complete stage metadata for the transaction lifecycle.
 */
export const STAGE_METADATA: Record<TransactionStage, StageMetadata> = {
  DISCOVERY: {
    stage: 'DISCOVERY',
    name: 'Discovery',
    description: 'Exploring areas, understanding the market, identifying what you want.',
    typicalDuration: { min: '1 week', max: '6 months' },
    validTransitions: ['INTEREST', 'ABANDONED'],
    relevantServiceCategories: ['DISCOVERY', 'FINANCE'],
    progressPercent: 5,
    color: '#94a3b8',
    icon: 'search',
  },
  INTEREST: {
    stage: 'INTEREST',
    name: 'Interest',
    description: 'You\'ve found a property you\'re interested in. Time to learn more.',
    typicalDuration: { min: '1 day', max: '2 weeks' },
    validTransitions: ['EVALUATION', 'DISCOVERY', 'ABANDONED'],
    relevantServiceCategories: ['DISCOVERY', 'VALUATION', 'VERIFICATION'],
    progressPercent: 15,
    color: '#3b5ef8',
    icon: 'heart',
  },
  EVALUATION: {
    stage: 'EVALUATION',
    name: 'Evaluation',
    description: 'Due diligence: reviewing documents, visiting the site, checking value and risks.',
    typicalDuration: { min: '1 week', max: '4 weeks' },
    validTransitions: ['NEGOTIATION', 'INTEREST', 'DISCOVERY', 'ABANDONED'],
    relevantServiceCategories: ['VALUATION', 'VERIFICATION', 'LEGAL', 'DOCUMENTATION', 'ENGINEERING'],
    progressPercent: 30,
    color: '#f59e0b',
    icon: 'clipboard-check',
  },
  NEGOTIATION: {
    stage: 'NEGOTIATION',
    name: 'Negotiation',
    description: 'Discussing price and terms with the seller.',
    typicalDuration: { min: '1 week', max: '4 weeks' },
    validTransitions: ['AGREEMENT', 'EVALUATION', 'ABANDONED'],
    relevantServiceCategories: ['NEGOTIATION', 'VALUATION'],
    progressPercent: 45,
    color: '#8b5cf6',
    icon: 'scale',
  },
  AGREEMENT: {
    stage: 'AGREEMENT',
    name: 'Agreement',
    description: 'Sale agreement signed. Token/advance paid.',
    typicalDuration: { min: '3 days', max: '2 weeks' },
    validTransitions: ['DEEP_VERIFY', 'ABANDONED'],
    relevantServiceCategories: ['LEGAL', 'DOCUMENTATION'],
    progressPercent: 55,
    color: '#6366f1',
    icon: 'file-signature',
  },
  DEEP_VERIFY: {
    stage: 'DEEP_VERIFY',
    name: 'Deep Verification',
    description: 'Comprehensive legal and physical verification after agreement.',
    typicalDuration: { min: '2 weeks', max: '6 weeks' },
    validTransitions: ['FINANCING', 'REGISTRATION', 'ABANDONED'],
    relevantServiceCategories: ['LEGAL', 'VERIFICATION', 'ENGINEERING', 'DOCUMENTATION'],
    progressPercent: 65,
    color: '#ec4899',
    icon: 'shield-check',
  },
  FINANCING: {
    stage: 'FINANCING',
    name: 'Financing',
    description: 'Home loan application, sanction, and disbursement.',
    typicalDuration: { min: '4 weeks', max: '12 weeks' },
    validTransitions: ['REGISTRATION', 'ABANDONED'],
    relevantServiceCategories: ['FINANCE', 'DOCUMENTATION'],
    progressPercent: 75,
    color: '#14b8a6',
    icon: 'banknotes',
  },
  REGISTRATION: {
    stage: 'REGISTRATION',
    name: 'Registration',
    description: 'Stamp duty, sub-registrar visit, document execution.',
    typicalDuration: { min: '1 week', max: '2 weeks' },
    validTransitions: ['POST_REGISTRATION', 'ABANDONED'],
    relevantServiceCategories: ['GOVERNMENT', 'LEGAL', 'FINANCE'],
    progressPercent: 85,
    color: '#10b981',
    icon: 'building-columns',
  },
  POST_REGISTRATION: {
    stage: 'POST_REGISTRATION',
    name: 'Post-Registration',
    description: 'Khata transfer, property tax, utility transfers, possession.',
    typicalDuration: { min: '2 weeks', max: '8 weeks' },
    validTransitions: ['COMPLETED'],
    relevantServiceCategories: ['GOVERNMENT', 'LEGAL'],
    progressPercent: 95,
    color: '#22c55e',
    icon: 'key',
  },
  COMPLETED: {
    stage: 'COMPLETED',
    name: 'Completed',
    description: 'Transaction complete. Property is yours!',
    typicalDuration: { min: '-', max: '-' },
    validTransitions: [],
    relevantServiceCategories: [],
    progressPercent: 100,
    color: '#10b981',
    icon: 'check-circle',
  },
  ABANDONED: {
    stage: 'ABANDONED',
    name: 'Abandoned',
    description: 'Transaction was discontinued.',
    typicalDuration: { min: '-', max: '-' },
    validTransitions: ['INTEREST'], // Can resume if user reconsiders
    relevantServiceCategories: [],
    progressPercent: 0,
    color: '#ef4444',
    icon: 'x-circle',
  },
};

// =============================================================================
// Transition Validation
// =============================================================================

/**
 * Check if a transition from one stage to another is valid.
 */
export function isValidTransition(
  from: TransactionStage,
  to: TransactionStage
): boolean {
  return STAGE_METADATA[from].validTransitions.includes(to);
}

/**
 * Get available next stages for a given current stage.
 */
export function getNextStages(current: TransactionStage): TransactionStage[] {
  return STAGE_METADATA[current].validTransitions;
}

/**
 * Get the progress percentage for a transaction stage.
 */
export function getStageProgress(stage: TransactionStage): number {
  return STAGE_METADATA[stage].progressPercent;
}

/**
 * Get service categories relevant to a transaction stage.
 */
export function getRelevantServices(stage: TransactionStage): string[] {
  return STAGE_METADATA[stage].relevantServiceCategories;
}

// =============================================================================
// Transaction Types
// =============================================================================

export const TRANSACTION_TYPES = ['BUY', 'SELL', 'RENT', 'LEASE'] as const;
export type TransactionType = typeof TRANSACTION_TYPES[number];

/**
 * Transaction type configuration.
 * Different transaction types may skip certain stages.
 */
export const TRANSACTION_TYPE_CONFIG: Record<TransactionType, {
  name: string;
  description: string;
  applicableStages: TransactionStage[];
}> = {
  BUY: {
    name: 'Buy',
    description: 'Purchase a property',
    applicableStages: [
      'DISCOVERY', 'INTEREST', 'EVALUATION', 'NEGOTIATION',
      'AGREEMENT', 'DEEP_VERIFY', 'FINANCING', 'REGISTRATION',
      'POST_REGISTRATION', 'COMPLETED', 'ABANDONED',
    ],
  },
  SELL: {
    name: 'Sell',
    description: 'Sell a property',
    applicableStages: [
      'DISCOVERY', 'INTEREST', 'EVALUATION', 'NEGOTIATION',
      'AGREEMENT', 'DEEP_VERIFY', 'REGISTRATION',
      'POST_REGISTRATION', 'COMPLETED', 'ABANDONED',
    ],
  },
  RENT: {
    name: 'Rent',
    description: 'Rent a property',
    applicableStages: [
      'DISCOVERY', 'INTEREST', 'EVALUATION', 'NEGOTIATION',
      'AGREEMENT', 'COMPLETED', 'ABANDONED',
    ],
  },
  LEASE: {
    name: 'Lease',
    description: 'Lease a property',
    applicableStages: [
      'DISCOVERY', 'INTEREST', 'EVALUATION', 'NEGOTIATION',
      'AGREEMENT', 'DEEP_VERIFY', 'REGISTRATION',
      'COMPLETED', 'ABANDONED',
    ],
  },
};
