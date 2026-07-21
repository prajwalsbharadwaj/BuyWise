# Khata Transfer (GOV_KHATA_TRANSFER)

**Category:** Government Assistance  
**Partner Type:** Field Agent / Liaison  
**Estimated SLA:** 30–45 Working Days (Highly dependent on Govt SLAs)  

## 1. Purpose

**Why is Khata Transfer required?**  
Khata is a municipal record used for property tax assessment. Transferring it ensures the new buyer is recognized by the local municipal corporation (e.g., BBMP) as the person liable to pay property tax.

**When should it be executed?**  
Immediately after the Sale Deed is registered.

**How is it different from Registration?**  
Registration confirms legal ownership. Khata confirms municipal tax liability. You need Khata to get building plan approvals or utility connections.

**What legal protection does it provide?**  
It prevents the previous owner from illegally selling the property again, as Khata is often requested by buyers as proof of current possession.

**When can disputes arise?**  
If there are unpaid property tax dues from the previous owner, or if the property has building bylaw violations (B-Khata issues).

---

## 2. Eligibility

**Who can request it?**
- The new buyer holding a Registered Sale Deed.

**Unsupported scenarios:**
- Properties lacking a Registered Sale Deed.
- Properties with massive unpaid tax arrears (unless the buyer agrees to pay them).
- Converting a B-Khata to A-Khata (this is a separate, complex regularization process).

---

## 3. Preconditions

Before drafting begins, the Admin/Platform must verify:
- [x] Registered Sale Deed is available.
- [x] Post-registration Encumbrance Certificate (EC) is available.
- [x] Up-to-date Property Tax receipt (in previous owner's name) is available.

---

## 4. Required Documents

*(Dynamic based on earlier questionnaire answers)*

**Mandatory for all:**
- Registered Sale Deed (Copy)
- EC (Form 15) reflecting the recent sale
- Latest Property Tax Paid Receipt
- Buyer's Aadhaar and PAN
- Passport-size Photo
- Previous Khata Certificate/Extract

**Conditional:**
- Sakala Application Number (if already applied).
- Death Certificate/Family Tree (if transfer is due to inheritance).

---

## 5. Questionnaire

The system must collect the following context:

**Application Status**
- Have you already submitted an application? (Yes/No)
- If yes, provide Sakala/Reference Number.

**Property Details**
- Is this an A-Khata or B-Khata property?
- Zone/Ward Number (if known).

---

## 6. AI Processing

The AI Pipeline automatically extracts:
- PID number from previous tax receipts.
- Automatically generates the Khata Transfer application form pre-filled with Buyer details.

---

## 7. Human Partner Responsibilities

The assigned Field Agent must:
- Submit the physical/online application to the municipal office (e.g., BBMP/BDA).
- Follow up with the Revenue Inspector / Assistant Revenue Officer (ARO).
- Ensure physical inspection of the property is coordinated if requested by the ARO.
- Pay the requisite statutory fee (2% of stamp duty in Karnataka).
- Collect the final Khata Certificate and Extract and upload to BuyWise.

---

## 8. Admin Responsibilities

- Track the Sakala/Govt SLA and escalate if the application breaches the guaranteed timeline.
- Verify the fee challan before asking the customer to reimburse.

---

## 9. Customer Journey

1. Customer books Khata Transfer.
2. Uploads Registered Sale Deed.
3. Agent files application.
4. Customer waits (Dashboard shows "Pending with ARO").
5. Agent pays fee challan.
6. Certificate is issued and uploaded to dashboard.

---

## 10. Deliverables

- ✔ **New Khata Certificate** (PDF)
- ✔ **New Khata Extract** (PDF)
- ✔ **Updated PID Number**

---

## 11. Risks & Rejections

BuyWise should refuse or escalate this service if:
- Property has massive structural deviations preventing Khata issuance.
- Previous owner never paid property tax for 10 years.

---

## 12. Recommended Next Services

1. BESCOM (Electricity) Name Transfer
2. BWSSB (Water) Name Transfer
