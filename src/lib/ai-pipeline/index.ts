/**
 * BuyWise AI Processing Pipeline
 * 
 * A node-based execution pipeline for AI processing on ServiceRequests.
 * This is the foundation for Phase 1 (Property Document Verification) and future AI features.
 */

import { prisma } from '../prisma';
import { analyzePropertyDocument } from './gemini';

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

export class DocumentVerificationNode extends AIPipelineNode {
  name = 'DocumentVerification';
  
  async execute(context: AIPipelineContext): Promise<AINodeResult> {
    console.log(`[AI Pipeline] Running Document Verification for request ${context.serviceRequestId}...`);
    
    try {
      // 1. Fetch the documents from the database
      const documents = await prisma.document.findMany({
        where: {
          id: { in: context.documentIds }
        }
      });

      if (documents.length === 0) {
        return { success: false, error: "No documents found to process" };
      }

      const results = [];
      let overallConfidence = 1.0;
      let allFlags: string[] = [];

      // 2. Process each document using Gemini
      for (const doc of documents) {
        console.log(`[AI Pipeline] Analyzing document ${doc.name} (${doc.id})...`);
        
        const analysis = await analyzePropertyDocument(doc.storageUrl, doc.mimeType);
        
        // 3. Save the results back to the Document
        await prisma.document.update({
          where: { id: doc.id },
          data: {
            aiAnalysis: analysis as any,
            verificationStatus: 'AI_REVIEWED'
          }
        });

        results.push({ documentId: doc.id, analysis });
        
        // Accumulate risk profile
        overallConfidence = Math.min(overallConfidence, analysis.riskFlags.confidenceScore);
        allFlags = [...allFlags, ...analysis.riskFlags.flags];
      }

      return {
        success: true,
        data: { 
          processedCount: documents.length,
          overallConfidence,
          flags: allFlags,
          documentResults: results
        }
      };
    } catch (error: any) {
      console.error(`[AI Pipeline] Error in DocumentVerificationNode:`, error);
      return { success: false, error: error.message || "Failed to verify documents" };
    }
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
    nodes = [new DocumentVerificationNode()];
  } else {
    // For other services, we can also use DocumentVerificationNode if it's generic enough
    nodes = [new DocumentVerificationNode()];
  }

  const orchestrator = new AIPipelineOrchestrator(nodes);
  return await orchestrator.run(context);
}
