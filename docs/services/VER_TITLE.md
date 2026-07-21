# Title Verification 30-Year (VER_TITLE)

**Category:** Professional Expert Service  
**Partner Type:** Empaneled Real Estate Lawyer  
**Estimated SLA:** 5–7 Working Days  

## 1. Purpose

**Why is Title Verification required?**  
To establish a clear, marketable, and unencumbered title tracing back 30 years. It ensures nobody else has a legal claim to the property.

**When should it be executed?**  
Before drafting the Sale Agreement and paying the primary advance. Essential for securing bank loans.

**How is it different from Ownership Verification?**  
Ownership checks the *present*. Title checks the *history* (flow of title) and legality of the subdivision, conversion, and construction.

**What legal protection does it provide?**  
A formal Legal Opinion shields the buyer. Banks rely on it to issue loans. It uncovers hidden mortgages, family disputes, and illegal land conversions.

**When can disputes arise?**  
If a minor's share was ignored 20 years ago, if agricultural land wasn't properly converted, or if a previous mortgage was never formally discharged.

---

## 2. Eligibility

**Who can request it?**
- Buyers of resale properties, plots, or builder inventory.
- Sellers wanting a "Clean Title" badge on their listing.

**Unsupported scenarios:**
- Disputed properties with active High Court/Supreme Court stays.
- Properties lacking a traceable mother deed (unless adverse possession is being evaluated, which requires custom offline consulting).

---

## 3. Preconditions

Before drafting begins, the Admin/Platform must verify:
- [x] Ownership Verification (`VER_OWNERSHIP`) passed.
- [x] At least 15 years of EC is available (preferably 30).
- [x] Mother Deed is uploaded.

---

## 4. Required Documents

*(Dynamic based on earlier questionnaire answers)*

**Mandatory for all:**
- Primary Sale Deed
- Mother Deed (or chain of deeds for 30 years)
- Encumbrance Certificate (Form 15) for 30 years
- Latest Khata Certificate & Extract
- Property Tax Receipts (last 3 years)

**Conditional (based on property type):**
- **Apartments/Villas:** Approved Building Plan, Occupancy Certificate (OC), RERA Certificate, JDA (Joint Development Agreement), GPA.
- **Plots/Land:** Conversion Order (DC Conversion), Layout Approval (BMRDA/BDA/DTCP), RTC/Pahani.
- **Inherited:** Death Certificate, Family Tree, Relinquishment Deed, Will (Probated).

---

## 5. Questionnaire

The system must collect the following context:

**Property History**
- Is this a BDA/Housing Board allotted property? (Yes/No)
- Has the property changed hands in the last 5 years? (Yes/No)
- Is the property part of a Joint Development Agreement? (Yes/No)

**Buyer Intent**
- Are you taking a bank loan? (Yes/No) *If Yes, format opinion to bank standards.*
- Are there any known disputes informed by the seller? (Yes/No)

---

## 6. AI Processing

The AI Pipeline automatically extracts:
- Document dates and creates a chronological "Flow of Title" timeline.
- Names of parties across the 30-year chain.

*Action:* Flag gaps in the timeline (e.g., "Deed exists for 1995 and 2010. Gap of 15 years in possession evidence").

---

## 7. Human Partner Responsibilities

The assigned Lawyer must:
- Review the entire 30-year chain of title.
- Verify land conversion validity.
- Verify layout/building approvals against local bylaws.
- Check for family tree discrepancies (e.g., missing daughters' consent in ancestral property).
- Check for active mortgages or court attachments in the EC.
- Search local court registries (if requested/applicable) for active litigation.
- Draft a comprehensive Legal Opinion confirming marketable title.

---

## 8. Admin Responsibilities

- Ensure all documents in the 30-year chain are actually uploaded before assigning to a lawyer. If missing, pause SLA and request from customer.
- QA the final Legal Opinion for BuyWise formatting and clear conclusions (Avoid excessive legalese where a simple "Clear" or "Defective" works).

---

## 9. Customer Journey

1. Customer purchases Title Verification.
2. Platform requests massive document upload.
3. Admin triages and chases missing mother deeds.
4. Assigned to Senior Lawyer.
5. Lawyer generates flow of title and opinion.
6. Customer receives a detailed report and a conclusive "Safe to Buy" or "Risky" rating.

---

## 10. Deliverables

- ✔ **Detailed Flow of Title** (Chronological mapping)
- ✔ **Signed Legal Opinion** (PDF)
- ✔ **Risk Assessment Summary** (Plain English)
- ✔ **List of Missing Documents** (Required before registration)

---

## 11. Risks & Rejections

BuyWise should refuse or escalate this service if:
- The customer cannot provide a Mother Deed and refuses to procure certified copies.
- The property is known government/forest land (reject immediately).

---

## 12. Recommended Next Services

1. Property Readiness Score
2. Sale Agreement Drafting
3. Loan Assistance
