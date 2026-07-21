import { GoogleGenAI } from '@google/genai';
import { serviceCatalog } from '@/config/services';

// Initialize the client. This will automatically use process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({});

export interface VerificationExtraction {
  ownerName: string | null;
  propertyAddress: string | null;
  khataNumber: string | null;
  surveyNumber: string | null;
  documentType: string | null;
  khataType: string | null;
  isDCConverted: boolean | null;
  hasPTCLRestrictions: boolean | null;
}

export interface RiskAnalysis {
  confidenceScore: number;
  flags: string[];
  isComplete: boolean;
  recommendedServiceCodes: string[];
}

export interface GeminiAnalysisResult {
  extractedFields: VerificationExtraction;
  riskFlags: RiskAnalysis;
  summary: string;
}

export async function analyzePropertyDocument(fileUrl: string, mimeType: string): Promise<GeminiAnalysisResult> {
  try {
    // 1. Download the file from the public URL
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch document from ${fileUrl}: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString('base64');

    // 2. Define the schema we want Gemini to return
    // Note: GoogleGenAI expects the standard JSON Schema structure for responseSchema
    const schema = {
      type: "OBJECT",
      properties: {
        extractedFields: {
          type: "OBJECT",
          properties: {
            ownerName: { type: "STRING", description: "Name of the property owner" },
            propertyAddress: { type: "STRING", description: "Full address of the property" },
            khataNumber: { type: "STRING", description: "Khata number if present" },
            surveyNumber: { type: "STRING", description: "Survey number if present" },
            documentType: { type: "STRING", description: "Type of the document (e.g., Sale Deed, Encumbrance Certificate, Tax Receipt)" },
            khataType: { type: "STRING", description: "Identify if it mentions A-Khata, B-Khata, e-Khata (e-Aasthi), or E-Swathu. Return 'Unknown' if not present." },
            isDCConverted: { type: "BOOLEAN", description: "True if the document mentions land conversion by the Deputy Commissioner (DC) for non-agricultural use" },
            hasPTCLRestrictions: { type: "BOOLEAN", description: "True if the document mentions land granted to SC/ST under the PTCL Act or lists non-alienation conditions" }
          }
        },
        riskFlags: {
          type: "OBJECT",
          properties: {
            confidenceScore: { type: "NUMBER", description: "Confidence score between 0.0 and 1.0" },
            flags: { 
              type: "ARRAY", 
              items: { type: "STRING" },
              description: "List of any anomalies, missing critical fields, or suspicious details"
            },
            isComplete: { type: "BOOLEAN", description: "True if the document seems complete and legible, false otherwise" },
            recommendedServiceCodes: {
              type: "ARRAY",
              items: { type: "STRING" },
              description: "Array of service codes from the BuyWise Service Catalog that the user should purchase next based on the document's risks or status."
            }
          }
        },
        summary: { type: "STRING", description: "A brief 2-3 sentence summary of the document contents" }
      },
      required: ["extractedFields", "riskFlags", "summary"]
    };

    // 3. Prepare the catalog context
    const availableServices = serviceCatalog.map(s => `- ${s.code}: ${s.name} (${s.description})`).join('\n');

    // 4. Call Gemini
    const prompt = `You are a highly experienced Bangalore Real Estate Legal Expert. Analyze this document and extract the requested fields. 
Pay extremely close attention to Bangalore-specific nuances:
- Look for A-Khata vs B-Khata vs e-Khata (e-Aasthi).
- For land/plots, check if there is a DC Conversion order for residential/commercial use.
- Check for PTCL Act (Prevention of Transfer of Certain Lands) restrictions for granted lands.

Identify any risks, inconsistencies, or missing information.

Based on your findings, strongly recommend the next logical services the user should purchase from our catalog. 
For example, if you see a paper Khata or B-Khata, recommend Khata Transfer (GOV_KHATA_TRANSFER). If you see a high-risk property, recommend Title Verification (VER_TITLE).
Here are the available services in our catalog:
${availableServices}`;
    
    // We use gemini-2.5-flash as the default for multimodal fast analysis
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.2
      }
    });

    const responseText = aiResponse.text;
    if (!responseText) {
      throw new Error("No text returned from Gemini");
    }

    return JSON.parse(responseText) as GeminiAnalysisResult;
  } catch (error) {
    console.error("[Gemini API Error]", error);
    throw error;
  }
}
