/**
 * BuyWise — AI Capability Layer Types
 * 
 * Standardized interfaces for all AI capabilities.
 * Every AI feature in the platform consumes these interfaces,
 * whether it's the chat advisor, document review, or valuation engine.
 */

// =============================================================================
// Core AI Interface
// =============================================================================

/**
 * Every AI capability implements this interface.
 * This ensures consistent input/output contracts across all AI features.
 */
export interface AICapability<TInput, TOutput> {
  /** Unique identifier for this capability */
  readonly name: string;
  
  /** Human-readable description */
  readonly description: string;
  
  /** Process input and return AI result */
  analyze(input: TInput, context: AIContext): Promise<AIResult<TOutput>>;
}

/**
 * Context passed to every AI call.
 * Provides location awareness, user context, and transaction context.
 */
export interface AIContext {
  /** Location context — affects regulations, market data, language */
  location?: {
    id: string;
    name: string;
    type: string;
    state?: string;
    city?: string;
  };

  /** Transaction context — if AI is being called within a transaction */
  transaction?: {
    id: string;
    type: string;
    status: string;
    propertyType?: string;
  };

  /** User context — for personalization */
  user?: {
    id: string;
    name?: string;
    preferredLocations?: string[];
    budgetRange?: { min: number; max: number };
  };

  /** Minimum confidence threshold — results below this are flagged */
  confidenceThreshold?: number;

  /** Maximum tokens for LLM calls */
  maxTokens?: number;
}

/**
 * Standardized result from any AI capability.
 */
export interface AIResult<T> {
  /** The actual output */
  result: T;
  
  /** Confidence score (0-1) */
  confidence: number;
  
  /** What data supported this result */
  evidence: AIEvidence[];
  
  /** Warnings, risks, anomalies */
  flags: AIFlag[];
  
  /** Which model produced this */
  modelVersion: string;
  
  /** Processing time in milliseconds */
  latencyMs: number;
  
  /** Estimated API cost for this call (INR) */
  costINR: number;
}

export interface AIEvidence {
  /** What type of evidence */
  type: 'DATA_POINT' | 'DOCUMENT' | 'COMPARABLE' | 'REGULATION' | 'EXPERT_RULE';
  
  /** Brief description */
  description: string;
  
  /** Source of evidence */
  source: string;
  
  /** How reliable is this evidence (0-1) */
  reliability: number;
}

export interface AIFlag {
  /** Severity level */
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  
  /** What category */
  category: 'RISK' | 'ANOMALY' | 'MISSING_DATA' | 'LOW_CONFIDENCE' | 'LEGAL' | 'FRAUD';
  
  /** Human-readable message */
  message: string;
  
  /** Suggested action */
  suggestion?: string;
}

// =============================================================================
// Capability-Specific Types
// =============================================================================

/** ContentAI — Generates human-readable content */
export interface ContentAIInput {
  type: 'LOCALITY_SUMMARY' | 'PROPERTY_DESCRIPTION' | 'REPORT_NARRATIVE' | 'EMAIL_CONTENT' | 'GUIDANCE_TEXT';
  subject: Record<string, unknown>; // Data about what to generate content for
  tone?: 'PROFESSIONAL' | 'FRIENDLY' | 'CONCISE';
  maxLength?: number;
}

export interface ContentAIOutput {
  content: string;
  format: 'TEXT' | 'HTML' | 'MARKDOWN';
  wordCount: number;
}

/** NaturalLanguageAI — Powers the conversational interface */
export interface NLAIInput {
  message: string;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
  knowledgeContext?: Record<string, unknown>; // Injected locality/property data
}

export interface NLAIOutput {
  response: string;
  suggestedFollowUps?: string[];
  referencedEntities?: Array<{ type: string; id: string; name: string }>;
  intent?: string; // Detected user intent: EXPLORE_LOCALITY, EVALUATE_PROPERTY, etc.
}

/** ValuationAI — Estimates property value */
export interface ValuationAIInput {
  property: {
    type: string;
    locationId: string;
    area?: number;
    bedrooms?: number;
    floorNumber?: number;
    ageYears?: number;
    facing?: string;
    furnishing?: string;
    amenities?: string[];
  };
  comparables?: Array<{
    price: number;
    pricePerSqft: number;
    area: number;
    distance: number; // km from subject property
    daysAgo: number; // how recent is this data point
  }>;
  marketData?: {
    localityAvgPricePerSqft: number;
    localityPriceTrend: number; // percentage YoY
    cityAvgPricePerSqft: number;
  };
}

export interface ValuationAIOutput {
  estimatedValue: {
    min: number;
    max: number;
    median: number;
    confidence: number;
    currency: string;
  };
  pricePerSqft: {
    min: number;
    max: number;
    median: number;
  };
  factors: {
    positive: string[];
    negative: string[];
    neutral: string[];
  };
  methodology: string;
  recommendation: 'GOOD_VALUE' | 'FAIR_PRICE' | 'OVERPRICED' | 'UNDERPRICED' | 'INSUFFICIENT_DATA';
}

/** DocumentAI — Analyzes property documents */
export interface DocumentAIInput {
  documentType: string;
  documentUrl: string;
  extractFields?: string[]; // Specific fields to extract
  checkFor?: string[]; // Specific issues to check
}

export interface DocumentAIOutput {
  extractedFields: Record<string, { value: string; confidence: number }>;
  completenessScore: number; // 0-1
  missingFields: string[];
  riskFlags: Array<{ field: string; issue: string; severity: string }>;
  summary: string;
}

/** RiskAI — Assesses transaction risk */
export interface RiskAIInput {
  property: Record<string, unknown>;
  location: Record<string, unknown>;
  documents?: Array<{ type: string; aiAnalysis?: Record<string, unknown> }>;
  priceData?: Record<string, unknown>;
}

export interface RiskAIOutput {
  overallRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  riskScore: number; // 0-100
  categories: Array<{
    name: string;
    risk: 'LOW' | 'MEDIUM' | 'HIGH';
    score: number;
    details: string;
  }>;
  recommendations: string[];
}

// =============================================================================
// AI Service Registry
// =============================================================================

/**
 * Registry of available AI capabilities.
 * Used to discover and invoke capabilities dynamically.
 */
export type AICapabilityName =
  | 'ContentAI'
  | 'NaturalLanguageAI'
  | 'ValuationAI'
  | 'DocumentAI'
  | 'RiskAI'
  | 'ImageAI'
  | 'FraudAI'
  | 'NegotiationAI'
  | 'WorkflowAI'
  | 'ServiceMatchAI'
  | 'AnomalyAI'
  | 'DataExtractionAI';

/**
 * Phases when each AI capability is available.
 */
export const AI_CAPABILITY_PHASES: Record<AICapabilityName, string> = {
  ContentAI: 'MVP',
  NaturalLanguageAI: 'MVP',
  ValuationAI: 'MVP',
  DocumentAI: 'MVP',
  RiskAI: 'PHASE_2',
  ImageAI: 'PHASE_2',
  FraudAI: 'PHASE_2',
  NegotiationAI: 'PHASE_3',
  WorkflowAI: 'PHASE_2',
  ServiceMatchAI: 'PHASE_2',
  AnomalyAI: 'PHASE_3',
  DataExtractionAI: 'PHASE_2',
};
