# Registration Support (GOV_REGISTRATION_SUPPORT)

**Category:** Government Assistance  
**Partner Type:** Field Agent / Liaison  
**Estimated SLA:** 1–3 Working Days  

## 1. Purpose

**Why is Registration Support required?**  
To legally transfer property ownership, the Sale Deed must be registered at the Sub-Registrar Office (SRO). This service provides on-ground assistance to navigate the bureaucratic process, queue management, and official fee payments.

**When should it be executed?**  
After the Sale Agreement is signed, full payment (or loan disbursement) is ready, and the final Sale Deed is drafted.

**How is it different from Khata Transfer?**  
Registration registers the *deed* under the Registration Act. Khata transfer updates the *municipal tax records* based on that registered deed.

**What legal protection does it provide?**  
Registration is the only legally recognized method of transferring immovable property over ₹100 in India.

**When can disputes arise?**  
If TDS is not paid correctly, if stamp duty calculation is challenged by the sub-registrar, or if biometric verification of parties fails on the day of registration.

---

## 2. Eligibility

**Who can request it?**
- Buyers and Sellers ready to execute the final transaction.

**Unsupported scenarios:**
- Properties lacking a clear Sale Deed draft.
- Transactions where the buyer/seller cannot be physically present (unless represented by a legally valid registered GPA).

---

## 3. Preconditions

Before drafting begins, the Admin/Platform must verify:
- [x] Sale Agreement is signed.
- [x] Stamp Duty & Registration Fees are calculated and paid (or Demand Drafts are ready).
- [x] Final Sale Deed is drafted and approved by both parties.
- [x] TDS (if property > ₹50L) is paid and Challan 26QB is available.

---

## 4. Required Documents

*(Dynamic based on earlier questionnaire answers)*

**Mandatory for all:**
- Printed Sale Deed on appropriate Stamp Paper
- Original IDs (Aadhaar/PAN) of Buyer, Seller, and 2 Witnesses
- Passport Photos of all parties
- Stamp Duty Payment Proof / Demand Drafts
- TDS Challan (if applicable)
- Previous Original Deeds (to be handed over to buyer)

**Conditional:**
- GPA (if representing a party)
- Bank Representative Authorization (if loan is involved)

---

## 5. Questionnaire

The system must collect the following context:

**Logistics**
- Preferred Registration Date?
- Sub-Registrar Office (SRO) Name/Location?
- Will a bank representative be present to hand over the DD? (Yes/No)

**Parties**
- Are both Buyer and Seller physically available? (Yes/No)
- Do you have 2 witnesses with original Aadhaar cards? (Yes/No)

---

## 6. AI Processing

The AI Pipeline automatically extracts:
- Appointment slots from the state portal (if integration exists).
- Verifies TDS challan matches the sale consideration amount.

---

## 7. Human Partner Responsibilities

The assigned Field Agent must:
- Verify all original documents physically before entering the SRO.
- Pre-book the token/appointment on the state portal (e.g., Kaveri 2.0).
- Assist in biometric data capture (thumbprint/photo) at the SRO.
- Ensure the DDs are handed over to the seller securely.
- Ensure the bank rep receives the original registered deed (if mortgaged) or the buyer receives it.
- Upload a scanned copy of the Registered Sale Deed and Receipt to BuyWise.

---

## 8. Admin Responsibilities

- Coordinate the schedule between Buyer, Seller, Field Agent, and Bank Rep.
- Verify stamp duty calculations before the day of registration.

---

## 9. Customer Journey

1. Customer books Registration Support.
2. Chooses date and SRO.
3. Uploads draft deed and TDS challan.
4. Admin confirms appointment.
5. All parties meet at SRO. Field agent manages the queue.
6. Biometrics taken, deed registered.
7. Scanned copy uploaded to dashboard.

---

## 10. Deliverables

- ✔ **Registered Sale Deed** (Scanned PDF)
- ✔ **Registration Fee Receipt** (PDF)
- ✔ **Encumbrance Certificate** (Post-registration EC showing the new transaction, usually generated 2 days later)

---

## 11. Risks & Rejections

BuyWise should refuse or escalate this service if:
- The property is undervalued compared to government guidance value (illegal).
- Biometrics of the seller do not match the Aadhaar database.
- The seller refuses to hand over previous original documents.

---

## 12. Recommended Next Services

1. Khata Transfer
2. BESCOM/BWSSB Transfer
