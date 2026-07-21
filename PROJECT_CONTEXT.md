# BuyWise Project Context (Current State)

## Core Identity
BuyWise is an "operating system for real estate transactions." It is not a property discovery portal (like 99acres or MagicBricks). It is a platform that takes over *after* a buyer finds a property, acting as a verifiable, secure intermediary to facilitate the closing process. It solves the massive trust deficit in Indian real estate by providing AI-driven risk assessment, verified legal services, and secure escrow workflows.

## Current Architecture (As Built Today)
- **Framework**: Next.js 15 App Router
- **Database**: PostgreSQL (Neon) via Prisma ORM
- **Styling**: Vanilla CSS modules & global CSS variables (Design System)
- **Auth**: NextAuth.js (Currently using a Mock Credentials Provider for testing Roles)
- **State**: Server Actions for mutations, Server Components for data fetching.

## Core Modules & Their State
1. **Transaction Engine**: 
   - *Concept*: A state machine tracking a property deal from interest to registration.
   - *Reality*: Partially implemented. Prisma schema is robust, but the UI flow is brittle. Transactions are created via a basic wizard, but state transitions are mostly manual/unenforced.
2. **Service Request Architecture**: 
   - *Concept*: Users can request specialized services (Legal Verification, Valuation) for a specific transaction.
   - *Reality*: Partially implemented. The database relations are correct, but the routing is currently split between generic dynamic routes (`/services/[serviceCode]`) and bespoke landing pages (`/services/legal`), causing routing hacks.
3. **Risk Engine & AI Layer**:
   - *Concept*: Automated OCR extraction of Indian property docs + rules engine for risk flagging.
   - *Reality*: Purely mocked. The `DocumentIntelligence` and `RiskEngine` classes exist but return hardcoded JSON arrays and static rules.
4. **Role-Based Portals**:
   - *Concept*: Distinct interfaces for Customers, Partners (Lawyers/Valuers), and Admins.
   - *Reality*: UI is built. RBAC middleware exists but relies on the mocked Auth provider.

## Architectural Tension & Tech Debt
- **The "Generic vs. Bespoke" Service Dilemma**: We started building a generic system where any service acts the same. Then we began designing bespoke marketing and workflow pages for specific high-value services (like Legal). This has led to fragmented routing and duplicated logic.
- **Mock vs. DB Drift**: The project transitioned from a purely frontend mock to a Prisma-backed app, but several UI components (like the new transaction wizard) were left generating fake IDs instead of writing to the DB, causing severe runtime crashes.
- **Over-engineered Schema**: The Prisma schema contains dozens of models (Locality Scores, Infrastructure Projects) that the application does not yet have the UI or data to support.

## Immutable Principles (What we must not change)
- **The Transaction is the Sun**: Every service, document, message, and payment MUST belong to a `Transaction`. We do not offer standalone services disconnected from a property transaction.
- **Data Integrity Over Speed**: Because this handles real estate, server actions must be strict. (We currently lack validation).
- **Vanilla CSS**: We are intentionally avoiding Tailwind in favor of a bespoke, premium CSS token system to ensure a highly customized "wow" factor
