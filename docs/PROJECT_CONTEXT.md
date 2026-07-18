# BuyWise — Project Context & Founder Directive

This document is the definitive single source of truth and Founder Directive for the BuyWise platform. It contains the architectural, business, and design context necessary to understand the project. 

**Whenever future implementation decisions are made, these principles take precedence unless explicitly overridden by the Founder.**

---

## 1. Project Overview & Long-Term Vision
- **Vision:** BuyWise exists to become India's most trusted real estate transaction platform. We are NOT building another property listing website. We are building the operating system for property transactions where users can Discover, Compare, Verify, Finance, Negotiate, Purchase, Register, Maintain, and Sell their property.
- **Mission:** Empower property buyers with deep intelligence, risk assessment, and professional verification services to prevent bad real estate investments.
- **Current Working Name:** BuyWise (Company: Prajwal Tech Solution Limited)
- **Short-term Goals:** Build a scalable MVP targeting Bengaluru property buyers with a strict bootstrap budget (₹10,000).
- **Think Beyond Bengaluru (Location Agnostic):** Bengaluru is ONLY our initial validation market. The architecture must always remain location agnostic. Every city, district, and state should eventually be pluggable. Government rules, document requirements, taxes, khata systems, and approval processes should all be configurable per state. Never hardcode Karnataka-specific assumptions into the core architecture.

## 2. Product Philosophy & Core Tenets
- **Trust Over Marketing:** Never exaggerate. Always explain. Always cite evidence where available. Users should trust BuyWise because the platform is transparent. Listings attract users. Trust retains users. Services generate revenue. Knowledge builds the brand.
- **Buyer Philosophy (Explain Everything):** Buying property is usually the biggest financial decision of someone's life. The platform should never assume the user understands real estate. Every confusing topic (Khata, EC, Sale Deed, RERA, Stamp Duty, PID) should be explained (What is it? Why is it required? Who issues it? Risks if ignored?). Never just say "High Risk" or "Loan Rejected"—always explain WHY and teach the user.
- **Build a Knowledge Platform:** BuyWise should become India's best educational platform for property buyers and sellers. Users should feel smarter after using BuyWise.
- **Build Around Transactions:** Every module should support the lifecycle of a property transaction (Property, Transaction, Documents, Verification, Payments, Government Workflow, Audit Trail). Avoid isolated modules.
- **Revenue Philosophy:** Revenue should come from helping users successfully complete transactions. Listings should remain accessible. The platform becomes more valuable as users engage with our services. Think long term.

## 3. Target Users & Strategic Markets
We serve multiple users throughout the same transaction. Primary users include:
- First-time home buyers
- Software engineers relocating to a new city
- Buyers unfamiliar with local real estate laws
- Families selling inherited property
- Independent sellers & Small builders
- Local professionals (lawyers, engineers, surveyors)

**EXTREMELY IMPORTANT - Individual Plot Owners:**
Do NOT optimize only for apartment buyers. One of our biggest markets will be individual plot owners (e.g., a family owning a 25–50 plot layout). Today they depend on local brokers. BuyWise must become their digital sales platform to generate ads, upload documents, verify ownership, manage enquiries, and complete transactions.

## 4. Services Ecosystem (Core Business)
The marketplace exists to generate users. **The services ecosystem is our primary business.** Every feature should naturally connect users to services.
- **Examples:** Legal Verification, Document Verification, Valuation, Loan Assistance, Registration Assistance, Khata Guidance, Engineering Inspection, Survey Verification.
- Whenever possible, every recommendation should lead to one or more relevant services.

## 5. Personal Location Intelligence Engine (Core USP)
BuyWise's primary differentiator is answering: *"Where should I buy property based on MY life?"* instead of just "What property is available?".

### A. Hybrid Location Intelligence
To manage computational costs while maximizing insight, intelligence is split into two layers:
- **Layer 1: Static Intelligence (Precomputed):** City-wide metrics that change slowly (Airport/Metro accessibility, Flood history, Distance to CBD, Road hierarchy, Redundancy against major hubs). These are pre-cached for all localities.
- **Layer 2: Personal Intelligence (Dynamic):** User-specific metrics (Workplace, Parents' home). Routes are computed dynamically on-demand. The routing provider interface must remain abstract to allow swapping Google Maps for a free OSM/OSRM/Valhalla stack in the future.

### B. AI-Based User Profiling (Conversational Onboarding)
We eliminate high-friction forms. Users describe their life naturally (e.g., *"I work in Bellandur, wife in MG Road, budget 2Cr, need metro"*). Gemini AI extracts this into a structured BuyWise Profile. Gemini then acts as a progressive profiler, identifying missing data and asking only the highest-value follow-up questions over time.

### C. Recommendation Strategy (Locality First)
The flagship experience is recommending **Localities first, Properties second**. The engine calculates the optimal geographical zones for the user's Mobility Graph, then surfaces properties within those zones. Traditional search remains available, but the lifestyle-driven recommendation engine is the primary journey.

- **Modular Scoring Framework:** The architecture uses a Strategy Pattern (`ScoreProvider`) to independently process various scores (Connectivity, Route Redundancy, Flood Risk, etc.) so new metrics can be added without altering core architecture.

## 6. Technology & AI Philosophy
- **AI Philosophy:** AI is NOT just a chatbot. It must exist throughout the platform (Document OCR, Image verification, Listing quality improvement, Fraud detection, Negotiation assistance, Risk explanation). AI should reduce uncertainty, not create it.
- **Government Processes:** Government workflows are complicated. BuyWise should guide users through these processes (which office to visit, expected fees, common rejection reasons). Do not remove government-dependent features simply because APIs are unavailable today. Design extensible interfaces that can integrate with official systems in the future.

## 7. Implementation Philosophy
Do not sacrifice architecture for short-term speed. Build modularly. Deliver incrementally. Think in decades. Implement in phases.
Whenever proposing an implementation, clearly classify features as:
- MVP
- Phase 2
- Phase 3
- Future
- Experimental

**Final Decision Filter (For all new features):**
1. Does this reduce uncertainty?
2. Does this increase trust?
3. Does this educate the user?
4. Does this improve the transaction?
5. Does this strengthen the services ecosystem?
6. Does this make BuyWise more valuable than a traditional listing website?
*If YES, proceed. If NO, challenge the feature.*

## 8. Current Architecture & Progress
- **Completed work:** 
  - Sprint 1 (Foundation): Next.js 15 App Router setup, NextAuth (Google OAuth) integration.
  - Database schema: 17+ transaction-centric tables pushed to Neon Postgres via Prisma v5.
  - UI Foundation: Custom CSS-module based design system.
  - Sprint 2 (Property Intelligence & Risk Matrix): Built Document Capture UI and Intelligence Dashboard UI with deterministic risk gauges. Document Intelligence (AI) and Risk Engine (Rules) backend models architected and implemented.
- **In-progress work:** 
  - Planning Phase 3 (Admin Back-Office Portal / Razorpay Integration).
- **Blockers:** None currently.
- **Technology stack:** Next.js 15, React 19, TypeScript, Neon Serverless Postgres + Prisma ORM.

## 9. UI / UX Design Language
- **Theme:** Dark/Light mode capable. Premium, Trust-inspiring, Modern Glassmorphism.
- **Brand Identity:** "BuyWise — BUY SMART. LIVE BETTER."
- **Color Palette:** Primary Deep Trust Navy (`#0B2D53`), Secondary Emerald Green (`#169C64`).
- **Logo:** Stacked lockup (Header `72px`, Footer `80px`).
- **Design Language:** Pure Vanilla CSS Modules utilizing custom CSS variables. Heavy use of `backdrop-filter: blur()`.

## 10. Changelog
- **July 2026:** Approved CTO proposal for Graph Theory/GIS Locality Resilience Engine.
- **July 2026:** Infused Founder Directive & Product Constitution into PROJECT_CONTEXT.md.
- **July 2026:** Completed Sprint 2 UI (Document Upload & Intelligence Dashboards).
- **July 2026:** Completed Sprint 1 (Next.js 15, Neon DB, Prisma setup, UI components, NextAuth, Logo integration).
