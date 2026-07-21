import * as fs from 'fs';
import * as path from 'path';

// Need to import the service catalog dynamically since we are running via ts-node
import { serviceCatalog } from '../src/config/services';

const rootDir = path.join(__dirname, '..');
const docsDir = path.join(rootDir, 'docs', 'services');

if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

// 1. Create the architecture overview document
const archContent = `# Service Framework Architecture

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

A new service is added simply by defining a configuration object in \`src/config/services.ts\`. The configuration defines:
- The required **Questionnaire** fields.
- The **Required / Optional Documents** to be uploaded.
- The **Deliverables** produced.
- Whether it requires **AI Processing** or a **Human Partner**.

By standardizing this flow, we can rapidly scale to hundreds of services with zero additional architectural overhead.
`;

fs.writeFileSync(path.join(rootDir, 'docs', 'architecture.md'), archContent);

// 2. Create individual docs for each service
for (const service of serviceCatalog) {
  const mdContent = `# ${service.name} (${service.code})

**Phase:** ${service.phase}
**Category:** ${service.category}

## Description
${service.description}

## Architecture Flow
> [!IMPORTANT]
> This service follows the **Standard Lifecycle Flow**. It does not have a custom backend architecture. It runs through the universal state machine defined in the core framework.

## Configuration Details

### Processing
- **AI Supported:** ${service.isAiSupported ? 'Yes' : 'No'}
- **Human Partner Required:** ${service.isHumanPartnerRequired ? `Yes (${service.partnerType})` : 'No'}
- **Requires Government Interaction:** ${service.requiresGovernmentInteraction ? 'Yes' : 'No'}

### Inputs
**Required Documents:**
${service.requiredDocuments?.length ? service.requiredDocuments.map(d => `- ${d}`).join('\n') : 'None'}

**Optional Documents:**
${service.optionalDocuments?.length ? service.optionalDocuments.map(d => `- ${d}`).join('\n') : 'None'}

**Questionnaire Fields:**
${service.questionnaireSchema?.fields ? service.questionnaireSchema.fields.map(f => `- **${f.name}** (${f.type}): ${f.label}`).join('\n') : 'None'}

### Outputs
**Deliverables Expected:**
${service.deliverables?.items ? service.deliverables.items.map(d => `- **${d.name}** (${d.format}): ${d.description}`).join('\n') : 'None'}

**Completion Criteria:**
${service.completionCriteria}

---
*Document automatically generated from the central ServiceCatalog.*
`;

  const fileName = `${service.code}.md`;
  fs.writeFileSync(path.join(docsDir, fileName), mdContent);
  console.log(`Generated docs/services/${fileName}`);
}

console.log("Documentation generation complete.");
