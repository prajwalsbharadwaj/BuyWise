import { AICapability } from './ai.types';
import { ExtractedDataPoint } from '../risk/types';

/**
 * AI Service for extracting structured data from raw property documents (PDFs/Images).
 * Uses Google Gemini 1.5 Pro via Vercel AI SDK or Google AI SDK.
 */
export class DocumentIntelligence {
  public capabilityId = 'DOC_INTELLIGENCE_V1';
  public description = 'Extracts structured data points from raw Sale Deeds, Khatas, and ECs using Gemini 1.5 Pro.';
  public model = 'gemini-1.5-pro';

  /**
   * Executes the OCR and intelligence extraction
   * @param input Array of uploaded File objects
   */
  public async execute(input: File[]): Promise<ExtractedDataPoint[]> {
    // In production, this would convert files to base64 or upload them to a temporary bucket
    // and send them to the Gemini API with a strict JSON schema prompt for extraction.
    
    // const prompt = `Analyze these real estate documents (Sale Deed, Khata, Encumbrance Certificate).
    // Extract the following details: Property ID, Seller Name (Sale Deed), Seller Name (Khata), 
    // Zoning Type, Built-up Area, RERA Number, Construction Status, EC Years Covered.
    // Return output in strictly formatted JSON matching our schema.`;

    // Mocking the actual LLM network call for MVP
    // Delay removed for stabilization phase

    // Mock output matching the Risk Engine expectations
    return [
      { label: 'Property ID', value: 'PID-12948-BLR', verified: true },
      { label: 'Seller Name Sale Deed', value: 'Rajesh K.', verified: false },
      { label: 'Seller Name Khata', value: 'Rajesh Kumar', verified: false },
      { label: 'Zoning Type', value: 'Residential (Yellow Board)', verified: true },
      { label: 'Built-up Area', value: '1,240 sqft', verified: true },
      { label: 'EC Years Covered', value: '12', verified: true },
      { label: 'Property Type', value: 'Apartment', verified: true },
      { label: 'Construction Status', value: 'Under Construction', verified: true },
      { label: 'RERA Number', value: '', verified: false }
    ];
  }
}
