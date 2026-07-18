import { describe, it, expect } from 'vitest';
import { DocumentIntelligence } from '@/modules/ai/DocumentIntelligence';
import { ExtractedDataPoint } from '@/modules/risk/types';

describe('DocumentIntelligence', () => {
  it('should extract structured data points from mock documents', async () => {
    const ai = new DocumentIntelligence();
    const result = await ai.execute(['mock_file_path']);
    
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);

    const propertyId = result.find((item: ExtractedDataPoint) => item.label === 'Property ID');
    expect(propertyId).toBeDefined();
    expect(propertyId?.value).toBe('PID-12948-BLR');
  });

  it('should correctly format missing or low confidence fields', async () => {
    const ai = new DocumentIntelligence();
    const result = await ai.execute([]);

    const sellerName = result.find((item: ExtractedDataPoint) => item.label === 'Seller Name Sale Deed');
    expect(sellerName).toBeDefined();
    expect(sellerName?.verified).toBe(false);
  });
});
