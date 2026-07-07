# ADR 001: Transaction-Centric Architecture

## Status
Accepted

## Date
2026-07-08

## Context
We are building BuyWise, a real estate transaction platform for India. The initial decision was whether to organize the domain model around **properties** (the traditional approach used by listing platforms) or around **transactions** (the lifecycle of buying/selling property).

## Decision
We will use a **transaction-centric domain model**. The Transaction entity is the central organizing concept. All other entities — Property, Document, Service, Verification, Payment — exist as participants in a transaction lifecycle.

## Rationale
1. **Services are contextual.** A service recommendation depends on where the user is in their transaction journey, not just which property they're looking at.
2. **Revenue tracking is natural.** Every paid service is linked to a transaction. Revenue attribution is automatic.
3. **Progress tracking is built-in.** The transaction state machine (DISCOVERY → COMPLETED) provides a natural progress indicator.
4. **Extensibility.** Adding new property types (commercial, agricultural) doesn't require new features — just new configuration. The transaction lifecycle stays the same.
5. **User journey alignment.** Users think in terms of "I'm buying a property" (a transaction), not "I'm looking at a property" (an entity).

## Consequences
- Every major feature must be designed in the context of a transaction stage.
- The Transaction table becomes a high-write table and must be indexed carefully.
- Analytics and reporting are organized around transactions, not properties.
- The API design groups endpoints by transaction lifecycle, not by entity type.

## Alternatives Considered
- **Property-centric:** Traditional listing platform model. Rejected because it doesn't naturally support the services-as-business model.
- **User-centric:** Organize around user journeys. Rejected because a single user can have multiple concurrent transactions, making the transaction the more natural unit.
