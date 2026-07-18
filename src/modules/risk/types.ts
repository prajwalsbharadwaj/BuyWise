export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface RecommendedService {
  name: string;
  link: string;
}

export interface Anomaly {
  type: Severity;
  title: string;
  desc: string;
  recommendedService?: RecommendedService;
}

export interface ExtractedDataPoint {
  label: string;
  value: string;
  verified: boolean;
}

export interface RiskReport {
  transactionId: string;
  score: number; // 0-100
  anomalies: Anomaly[];
  extractedData: ExtractedDataPoint[];
}

export interface RiskRule {
  id: string;
  name: string;
  evaluate: (data: Record<string, any>) => Anomaly | null;
}
