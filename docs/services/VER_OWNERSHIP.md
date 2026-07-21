# Ownership Verification (VER_OWNERSHIP)

**Category:** Professional Expert Service  
**Partner Type:** Empaneled Lawyer / Paralegal  
**Estimated SLA:** 24–48 Working Hours  

## 1. Purpose

**Why is Ownership Verification required?**  
To confirm that the person claiming to sell the property is the actual, current legal owner according to government records, free of immediate red flags.

**When should it be executed?**  
Before paying any significant token advance.

**How is it different from Title Verification?**  
Ownership Verification is a narrow, present-day check. It confirms "Who owns it today?" Title Verification is a deep, 30-year historical trace of "How did they get it, and is the chain unbroken?"

**What legal protection does it provide?**  
Protects against impersonation fraud and double-sales.

**When can disputes arise?**  
If the government portal is outdated, or if a recent transaction hasn't been updated in the Khata/Revenue records.

---

## 2. Eligibility

**Who can request it?**
- Buyers verifying a seller.
- Sellers verifying their own property before listing.

**Unsupported scenarios:**
- Properties in rural/panchayat areas where digital land records (Bhoomi/Kaveri) are unavailable and require manual physical visits (this escalates to a custom offline service).

---

## 3. Preconditions

Before drafting begins, the Admin/Platform must verify:
- [x] `VER_PROPERTY_DOCUMENT` completed successfully.
- [x] Primary Deed is readable.
- [x] Seller/Owner Name is clearly identified.

---

## 4. Required Documents

*(Dynamic based on earlier questionnaire answers)*

**Mandatory for all:**
- Primary Deed (Sale Deed)
- Latest Tax Receipt (to prove active possession/maintenance)
- Seller's ID Proof (Masked Aadhaar/PAN)

**Conditional (based on property/seller type):**
- Encumbrance Certificate (EC) Form 15
- Khata Certificate & Extract (for urban properties)
- RTC/Pahani (for agricultural/rural land)

---

## 5. Questionnaire

The system must collect the following context:

**Property Location**
- Urban (BBMP/BMRDA) | Rural (Panchayat) | Tier-2 City

**Record Identifiers**
- Survey Number / Property ID (PID)
- Village / Hobli / Taluk
- Khata Number

**Owner Type**
- Individual | Joint | Company | Trust

---

## 6. AI Processing

The AI Pipeline (`RecordMatchAI`) automatically extracts:
- Name from Uploaded Deed vs Name on Uploaded ID vs Name from Government DB.
- PID/Survey numbers.

*Action:* Provide an instant "Match Percentage" to the lawyer. Flag spelling discrepancies (e.g., "Srinivas" vs "Srinivasa").

---

## 7. Human Partner Responsibilities

The assigned Paralegal/Lawyer must:
- Login to the state portal (e.g., Kaveri Online / Bhoomi).
- Query the property using the provided PID/Survey number.
- Verify the current owner name on the portal matches the uploaded documents.
- Verify the EC for the last 3-5 years to ensure no recent un-notified sale.
- Draft a concise Ownership Report concluding YES/NO on current ownership.

---

## 8. Admin Responsibilities

- Triage requests and assign to a paralegal familiar with the specific state/district portal.
- QA the final report for clarity. Do not allow ambiguous "maybe" conclusions without specific caveats.

---

## 9. Customer Journey

1. Customer requests Ownership Check.
2. AI pre-fills PID and Survey Numbers from previously uploaded docs.
3. Paralegal verifies against state portals.
4. Paralegal generates report.
5. Customer receives a simple "Verified" or "Discrepancy Found" notification.

---

## 10. Deliverables

- ✔ **Ownership Report** (PDF format)
- ✔ **Government Record Screenshots** (Appended as proof)
- ✔ **Match Status** (Verified, Partial Match, Mismatch)
- ✔ **Actionable Next Steps** (e.g., "Request updated Khata")

---

## 11. Risks & Rejections

BuyWise should refuse or escalate this service if:
- The property is in a state/region where online verification is impossible and physical verification was not paid for.
- The Survey Number/PID provided is invalid and cannot be found in any record.

---

## 12. Recommended Next Services

1. Title Verification (30-Year)
2. Sale Agreement Drafting
