# Sale Agreement Drafting (DRAFT_SALE_AGREEMENT)

**Category:** Professional Legal Service  
**Partner Type:** Advocate (Property Law)  
**Estimated SLA:** 2–5 Working Days  

## 1. Purpose

**Why is a Sale Agreement required?**  
It is the foundational legal contract that dictates the terms of the property sale between the buyer and seller before the final transaction takes place.

**When should it be executed?**  
After price negotiation and payment of the token/advance amount, but before the final registration.

**How is it different from the Sale Deed?**  
The Sale Agreement is a promise to sell under certain conditions in the future. The Sale Deed is the actual document that transfers ownership.

**What legal protection does it provide?**  
It locks in the price, protects the buyer's advance payment, and binds the seller to hand over the property on the agreed date.

**When can disputes arise?**  
If the buyer fails to arrange funds, if the seller delays vacating, or if unexpected legal issues (like a stay order) appear before registration.

---

## 2. Eligibility

**Who can request it?**
- Buyer purchasing a resale property
- Buyer purchasing a plot
- Builder selling directly
- Joint ownership
- GPA transactions
- NRI seller
- Inherited property

**Unsupported scenarios:**
- Properties currently under active court litigation.
- Properties without clear title deeds or missing mother deeds.

---

## 3. Preconditions

Before drafting begins, the Admin/Platform must verify:
- [x] Property identified
- [x] Buyer identified
- [x] Seller identified
- [x] Ownership verified
- [x] Basic document verification completed

*(Recommend completing `VER_PROPERTY_DOCUMENT` and `VER_TITLE` first if missing).*

---

## 4. Required Documents

*(Dynamic based on earlier questionnaire answers)*

**Mandatory for all:**
- Draft Sale Deed / Previous Sale Deed
- Latest Khata Certificate & Extract
- Encumbrance Certificate
- Property Tax Paid Receipt
- Aadhaar/PAN of Buyer & Seller
- Passport-size Photos
- Property Schedule
- Payment Terms

**Conditional (based on property/seller type):**
- GPA (if transacting via Power of Attorney)
- Release Deed / Partition Deed / Will / Death Certificate (if inherited)
- Occupancy / Completion Certificate (if apartment/builder)
- RERA details (if new project)
- NOC from Society
- Loan Closure Letter / Bank NOC (if existing loan)
- Conversion Order (for converted land)

---

## 5. Questionnaire

The system must collect the following context to generate the correct clauses:

**Property**
- Apartment | Villa | Independent House | Plot | Commercial | Agricultural

**Ownership**
- Single Owner | Joint Owners | Inherited | Gifted | Company Owned | Trust | Power of Attorney

**Payment**
- Cash | Loan | Part Loan | Builder Linked

**Possession**
- Vacant | Occupied | Tenant Present | Builder Possession Pending

**Registration Timeline**
- Within 15 Days | 30 Days | 45 Days | 60 Days | Custom

**Existing Loan?**
- Yes | No

**Any Litigation?**
- Yes | No | Unknown

**Advance Paid?**
- Yes | No

**GST Applicable?**
- Yes | No

---

## 6. AI Processing

The AI Pipeline (`DocumentVerificationNode`) automatically extracts:
- Buyer names
- Seller names
- Schedule (Measurements, Boundaries)
- Survey Number
- PID / Khata Number
- Property Address
- EC Years

*Action:* Automatically detect inconsistencies (e.g., Seller name on ID does not match Khata).

---

## 7. Human Lawyer Responsibilities

The assigned Advocate must NOT simply upload a PDF. They must:
- Review ownership and title chain
- Review custom clauses based on questionnaire
- Insert special conditions (e.g., eviction of tenant)
- Review indemnity clauses
- Review payment schedule and defaults
- Review possession clause
- Review arbitration and jurisdiction clauses
- Generate and digitally sign the final draft

---

## 8. Admin Responsibilities

- Receive request and verify payment
- Triage and assign to an empaneled property lawyer
- Monitor SLA (2-5 Days)
- QA review the lawyer's draft for BuyWise formatting standards
- Deliver report to the customer

---

## 9. Customer Journey

1. Customer pays
2. Uploads dynamic documents
3. Completes rich questionnaire
4. AI extracts information
5. Admin verifies completeness
6. Lawyer reviews and drafts
7. Clarification requests (if needed)
8. Draft generated
9. Customer reviews
10. One revision included
11. Final PDF delivered
12. Feedback collected

---

## 10. Deliverables

- ✔ **Draft Agreement** (PDF/Docx)
- ✔ **Clause Summary** (Plain English explanation)
- ✔ **Missing Information** (If any)
- ✔ **Lawyer Notes**
- ✔ **Recommended Changes**
- ✔ **Next Steps**

---

## 11. Risks & Rejections

BuyWise should refuse or escalate this service if:
- Missing primary ownership documents
- Active litigation or Court stay
- Pending mutation (Khata not in seller's name)
- Forgery suspected by AI or Admin
- Government acquisition notified

---

## 12. Recommended Next Services

1. Stamp Duty Calculator
2. Registration Support
3. Property Registration
4. Khata Transfer
5. BESCOM (Electricity) Transfer
6. BWSSB (Water) Transfer
