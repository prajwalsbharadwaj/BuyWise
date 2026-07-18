/**
 * BuyWise AI Processing Pipeline
 * 
 * A node-based execution pipeline for AI processing on ServiceRequests.
 * This is the foundation for Phase 1 (Property Document Verification) and future AI features.
 */

export interface AIPipelineContext {
  serviceRequestId: string;
  documentIds: string[];
  serviceCode: string;
}

export interface AINodeResult {
  success: boolean;
  data?: any;
  error?: string;
}

export abstract class AIPipelineNode {
  abstract name: string;
  abstract execute(context: AIPipelineContext, previousResults: Record<string, AINodeResult>): Promise<AINodeResult>;
}

// ============================================================================
// STUBS FOR PHASE 1 IMPLEMENTATION
// ============================================================================

export class OCRNode extends AIPipelineNode {
  name = 'OCR';
  
  async execute(context: AIPipelineContext): Promise<AINodeResult> {
    console.log(`[AI Pipeline] Running OCR for request ${context.serviceRequestId}...`);
    // TODO: Implement Google Vision / AWS Textract integration here
    return {
      success: true,
      data: { text: "Mock extracted text from documents" }
    };
  }
}

export class EntityExtractionNode extends AIPipelineNode {
  name = 'EntityExtraction';
  
  async execute(context: AIPipelineContext, previousResults: Record<string, AINodeResult>): Promise<AINodeResult> {
    console.log(`[AI Pipeline] Extracting entities for request ${context.serviceRequestId}...`);
    const ocrData = previousResults['OCR']?.data?.text || '';
    
    // TODO: Implement Gemini / LLM extraction of key fields (Buyer, Seller, Property Address, etc.)
    return {
      success: true,
      data: { 
        buyerName: "John Doe", 
        sellerName: "Jane Smith", 
        propertyAddress: "123 Mock Street, Bengaluru" 
      }
    };
  }
}

export class RiskEngineNode extends AIPipelineNode {
  name = 'RiskEngine';
  
  async execute(context: AIPipelineContext, previousResults: Record<string, AINodeResult>): Promise<AINodeResult> {
    console.log(`[AI Pipeline] Running Risk Rules for request ${context.serviceRequestId}...`);
    const entities = previousResults['EntityExtraction']?.data || {};
    
    // TODO: Implement hardcoded rules and AI risk analysis (e.g., mismatching names)
    return {
      success: true,
      data: { 
        confidenceScore: 0.85,
        flags: ["Address format differs slightly from standard"]
      }
    };
  }
}

/**
 * Orchestrator that runs nodes in sequence.
 */
export class AIPipelineOrchestrator {
  private nodes: AIPipelineNode[] = [];

  constructor(nodes: AIPipelineNode[]) {
    this.nodes = nodes;
  }

  async run(context: AIPipelineContext): Promise<Record<string, AINodeResult>> {
    const results: Record<string, AINodeResult> = {};
    
    for (const node of this.nodes) {
      try {
        const result = await node.execute(context, results);
        results[node.name] = result;
        
        if (!result.success) {
          console.error(`[AI Pipeline] Node ${node.name} failed:`, result.error);
          break; // Stop pipeline on failure
        }
      } catch (error: any) {
        results[node.name] = { success: false, error: error.message };
        break;
      }
    }
    
    return results;
  }
}

/**
 * Main entry point for the backend to trigger AI processing for a service request.
 */
export async function triggerAIPipeline(context: AIPipelineContext) {
  // Select nodes based on serviceCode
  let nodes: AIPipelineNode[] = [];
  
  if (context.serviceCode === 'VER_PROPERTY_DOCUMENT') {
    nodes = [new OCRNode(), new EntityExtractionNode(), new RiskEngineNode()];
  } else {
    // Other pipelines to be defined in future phases
    console.warn(`[AI Pipeline] No defined pipeline for service ${context.serviceCode}`);
    return null;
  }

  const orchestrator = new AIPipelineOrchestrator(nodes);
  return await orchestrator.run(context);
}
