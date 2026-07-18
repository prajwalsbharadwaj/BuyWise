export interface LocationConfig {
  configType: string;
  validFrom: string;
  validUntil?: string;
  source: string;
  configData: Record<string, any>;
}
