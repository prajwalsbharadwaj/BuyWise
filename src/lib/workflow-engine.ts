import { ServiceRequestStatus } from '@prisma/client';

export interface ServiceConfig {
  isAiSupported: boolean;
  isHumanPartnerRequired: boolean;
  workflowOverrides?: {
    skipPayment?: boolean;
    skipAdmin?: boolean;
    skipPartner?: boolean;
    skipQA?: boolean;
  } | null;
}

/**
 * BuyWise Generic Service Workflow Engine
 * Determines the next state in the lifecycle based on the configuration of the service.
 */
export class WorkflowEngine {
  
  /**
   * Calculates the next status based on the current status and the service configuration.
   * @param currentStatus The current status of the service request
   * @param config The ServiceCatalog configuration for this service
   */
  static getNextStatus(currentStatus: ServiceRequestStatus, config: ServiceConfig): ServiceRequestStatus {
    const overrides = (config.workflowOverrides as any) || {};

    switch (currentStatus) {
      case ServiceRequestStatus.INITIATED:
        return ServiceRequestStatus.GATHERING_INFO;
        
      case ServiceRequestStatus.GATHERING_INFO:
        if (overrides.skipPayment) {
          return ServiceRequestStatus.IN_QUEUE;
        }
        return ServiceRequestStatus.AWAITING_PAYMENT;
        
      case ServiceRequestStatus.AWAITING_PAYMENT:
        return ServiceRequestStatus.IN_QUEUE;
        
      case ServiceRequestStatus.IN_QUEUE:
        if (config.isAiSupported) {
          return ServiceRequestStatus.AI_PROCESSING;
        }
        if (!overrides.skipAdmin) {
          return ServiceRequestStatus.ADMIN_REVIEW;
        }
        if (config.isHumanPartnerRequired && !overrides.skipPartner) {
          return ServiceRequestStatus.PARTNER_ASSIGNED;
        }
        return ServiceRequestStatus.COMPLETED;
        
      case ServiceRequestStatus.AI_PROCESSING:
        if (!overrides.skipAdmin) {
          return ServiceRequestStatus.ADMIN_REVIEW;
        }
        if (config.isHumanPartnerRequired && !overrides.skipPartner) {
          return ServiceRequestStatus.PARTNER_ASSIGNED;
        }
        return ServiceRequestStatus.COMPLETED;
        
      case ServiceRequestStatus.ADMIN_REVIEW:
        if (config.isHumanPartnerRequired && !overrides.skipPartner) {
          return ServiceRequestStatus.PARTNER_ASSIGNED;
        }
        return ServiceRequestStatus.COMPLETED;
        
      case ServiceRequestStatus.PARTNER_ASSIGNED:
        return ServiceRequestStatus.PARTNER_EXECUTION;
        
      case ServiceRequestStatus.PARTNER_EXECUTION:
        if (!overrides.skipQA) {
          return ServiceRequestStatus.QA_REVIEW;
        }
        return ServiceRequestStatus.COMPLETED;
        
      case ServiceRequestStatus.QA_REVIEW:
        return ServiceRequestStatus.COMPLETED;
        
      default:
        // If it's COMPLETED, CANCELLED, FAILED, it stays there.
        return currentStatus;
    }
  }

  /**
   * Determines if the request is in a state that requires user input.
   */
  static requiresCustomerAction(status: ServiceRequestStatus): boolean {
    return ([
      ServiceRequestStatus.INITIATED,
      ServiceRequestStatus.GATHERING_INFO,
      ServiceRequestStatus.AWAITING_PAYMENT
    ] as ServiceRequestStatus[]).includes(status);
  }

  /**
   * Determines if the request is active but being handled by the platform.
   */
  static isProcessing(status: ServiceRequestStatus): boolean {
    return ([
      ServiceRequestStatus.IN_QUEUE,
      ServiceRequestStatus.AI_PROCESSING,
      ServiceRequestStatus.ADMIN_REVIEW,
      ServiceRequestStatus.PARTNER_ASSIGNED,
      ServiceRequestStatus.PARTNER_EXECUTION,
      ServiceRequestStatus.QA_REVIEW
    ] as ServiceRequestStatus[]).includes(status);
  }
}
