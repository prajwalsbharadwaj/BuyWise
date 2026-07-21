# Service Framework Architecture

As per the CTO's directive, **every service in BuyWise follows the exact same architectural flow**. We do not build custom architectures for individual services. Instead, we use a single, unified framework where only the configuration changes.

## The Standard Lifecycle

Every service request transitions through the following identical states, defined in our central Workflow Engine:

1. **INITIATED**: The user has requested the service and submitted the dynamic questionnaire.
2. **AI_PROCESSING**: (Optional based on config). The documents and data are sent to the AI Pipeline for automated extraction and risk analysis.
3. **IN_QUEUE / ADMIN_REVIEW**: The request is waiting to be assigned to a verified partner, or an Admin needs to review the AI's output.
4. **PARTNER_EXECUTION**: A specialized partner (Lawyer, Surveyor, Field Agent) is actively working on the request.
5. **QUALITY_REVIEW**: The partner has uploaded the final deliverables, and an Admin must verify the quality.
6. **COMPLETED**: The deliverable is accepted and available to the user.
7. **CANCELLED**: The request was terminated.

## How it Works

A new service is added simply by defining a configuration object in `src/config/services.ts`. The configuration defines:
- The required **Questionnaire** fields.
- The **Required / Optional Documents** to be uploaded.
- The **Deliverables** produced.
- Whether it requires **AI Processing** or a **Human Partner**.

By standardizing this flow, we can rapidly scale to hundreds of services with zero additional architectural overhead.
