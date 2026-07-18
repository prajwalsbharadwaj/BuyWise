import { describe, it, expect } from 'vitest';
import { RiskEngine } from '@/modules/risk/RiskEngine';
import { ExtractedDataPoint } from '@/modules/risk/types';

describe('RiskEngine', () => {
  it('should return a high score and 0 anomalies for perfect documents', () => {
    const engine = new RiskEngine();
    const mockData: ExtractedDataPoint[] = [
      { label: 'propertyType', value: 'Apartment', verified: true },
      { label: 'constructionStatus', value: 'Ready to Move', verified: true },
      { label: 'sellerNameSaleDeed', value: 'John Doe', verified: true },
      { label: 'sellerNameKhata', value: 'John Doe', verified: true },
      { label: 'ecYearsCovered', value: 15, verified: true }
    ];

    const result = engine.evaluate('TXN-123', mockData);
    
    expect(result.score).toBe(100);
    expect(result.anomalies.length).toBe(0);
  });

  it('should detect name mismatch and lower score', () => {
    const engine = new RiskEngine();
    const mockData: ExtractedDataPoint[] = [
      { label: 'sellerNameSaleDeed', value: 'John Doe', verified: true },
      { label: 'sellerNameKhata', value: 'John D.', verified: true }
    ];

    const result = engine.evaluate('TXN-123', mockData);
    
    expect(result.anomalies.length).toBe(1);
    expect(result.anomalies[0].title).toBe('Name Mismatch');
    expect(result.anomalies[0].type).toBe('HIGH');
    expect(result.score).toBeLessThan(100);
  });

  it('should flag under-construction apartments missing RERA', () => {
    const engine = new RiskEngine();
    const mockData: ExtractedDataPoint[] = [
      { label: 'propertyType', value: 'Apartment', verified: true },
      { label: 'constructionStatus', value: 'Under Construction', verified: true },
      // Missing reraNumber
    ];

    const result = engine.evaluate('TXN-123', mockData);
    
    expect(result.anomalies.length).toBe(1);
    expect(result.anomalies[0].title).toBe('Missing RERA Registration');
    expect(result.anomalies[0].type).toBe('HIGH');
  });

  it('should deduct points properly based on severity', () => {
    const engine = new RiskEngine();
    const mockData: ExtractedDataPoint[] = [
      { label: 'ecYearsCovered', value: 5, verified: true } // Missing EC Years (MEDIUM severity = -10 pts)
    ];

    const result = engine.evaluate('TXN-123', mockData);
    
    expect(result.anomalies[0].title).toBe('Missing EC Year');
    expect(result.anomalies[0].type).toBe('MEDIUM');
    expect(result.score).toBe(90); // 100 - 10
  });
});
