# Property Document Verification (VER_PROPERTY_DOCUMENT)

**Category:** Automated Verification  
**Partner Type:** AI Only  
**Estimated SLA:** Instant (Under 5 minutes)  

## 1. Purpose

**Why is Document Verification required?**  
It provides a fast, initial sanity check on the property documents before investing time or money in human lawyers.

**When should it be executed?**  
At the very beginning of the buyer's journey (Discovery phase) or immediately after a seller lists a property.

**How is it different from Title Verification?**  
This is purely an automated AI scan for completeness, legibility, and superficial matching. It does *not* provide a legal opinion or 30-year trace.

**What legal protection does it provide?**  
None. It is an operational safeguard to ensure that the downstream human experts receive a complete, legible packet of documents.

**When can disputes arise?**  
If the AI hallucinates data or misclassifies a document, causing a false positive/negative in readiness scoring.

---

## 2. Eligibility

**Who can request it?**
- Any user (Buyer or Seller) with digitized copies of property documents.
- Real estate agents doing a preliminary check for their clients.

**Unsupported scenarios:**
- Handwritten documents older than 50 years (due to OCR limitations).
- Documents in regional languages not supported by the AI model (though Kannada/Hindi are typically supported).
- Severely degraded or blurry scans.

---

## 3. Preconditions

Before drafting begins, the Admin/Platform must verify:
- [x] Files are uploaded in supported formats (PDF, JPG, PNG).
- [x] Files are not password protected.

---

## 4. Required Documents

*(Dynamic based on earlier questionnaire answers)*

**Mandatory for all:**
- Primary Deed (Sale Deed, Allotment Letter, etc.)
- ID Proof of the person requesting verification

**Conditional (based on property/seller type):**
- Previous Deeds (if available for upload)
- Property Tax Receipt (optional for MVP, but recommended)

---

## 5. Questionnaire

The system must collect the following context to calibrate the AI:

**Document Type**
- Sale Deed | Allotment Letter | Agreement to Sell | Gift Deed | Partition Deed

**Approximate Property Age**
- Less than 5 years | 5-15 years | 15+ years

**Property Type**
- Apartment | Villa | Plot | Agricultural

**Language**
- English | Kannada | Hindi | Bilingual

---

## 6. AI Processing

The AI Pipeline (`DocumentVerificationNode`) automatically extracts:
- Document Title / Classification
- Primary Parties (Buyer / Seller / Executant)
- Property Schedule (Measurements, Boundaries)
- Survey Number / PID
- Date of Execution / Registration

*Action:* Automatically detect inconsistencies:
- Missing signatures/stamps.
- Missing pages (e.g., page 3 of 10 is missing).
- Date mismatches between document text and stamp paper date.

---

## 7. Human Partner Responsibilities

**N/A** - This is a purely AI-driven service.

---

## 8. Admin Responsibilities

- Triage requests that fail the AI check (confidence score < 0.6).
- Manually classify documents if the AI fails completely.
- Override false-positive risk flags.

---

## 9. Customer Journey

1. Customer initiates request.
2. Uploads documents (drag and drop).
3. Completes short categorization questionnaire.
4. AI processes the documents in the background.
5. Instant report generated.
6. Customer views the Completeness Score.

---

## 10. Deliverables

- ✔ **Document Review Report** (JSON/UI Dashboard)
- ✔ **Completeness Score** (0-100%)
- ✔ **Extracted Entities List**
- ✔ **Missing Documents Alert**
- ✔ **Detected Superficial Risks**

---

## 11. Risks & Rejections

BuyWise should flag the request if:
- The uploaded file is completely illegible or password protected.
- The document is completely unrelated to real estate (e.g., a utility bill uploaded as a Sale Deed).

---

## 12. Recommended Next Services

1. Ownership Verification
2. Title Verification (30-Year)
3. Property Evaluation (Valuation)
