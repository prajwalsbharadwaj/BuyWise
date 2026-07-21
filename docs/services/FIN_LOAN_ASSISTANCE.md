# Loan Assistance (FIN_LOAN_ASSISTANCE)

**Category:** Professional Expert Service  
**Partner Type:** Financial Advisor / DSA (Direct Selling Agent)  
**Estimated SLA:** 7–14 Working Days (Depends on Bank)  

## 1. Purpose

**Why is Loan Assistance required?**  
Navigating multiple banks for the best interest rates, managing the massive documentation required for a home loan, and handling the bank's independent legal/technical verification can be overwhelming. This service acts as a concierge.

**When should it be executed?**  
Immediately after the Sale Agreement is drafted and signed, and the initial advance is paid.

**How is it different from the EMI Calculator?**  
The EMI calculator is a free, instant AI tool. Loan Assistance is a managed service where a human partner actively processes your loan application with a bank until disbursement.

**What legal protection does it provide?**  
Bank approvals add an extra layer of safety, as banks perform their own independent legal and technical checks before lending.

**When can disputes arise?**  
If the buyer's CIBIL score is lower than declared, causing a rejection, or if the property's Title Verification fails the bank's internal legal check.

---

## 2. Eligibility

**Who can request it?**
- Buyers seeking a Home Loan.
- Owners seeking a Loan Against Property (LAP).

**Unsupported scenarios:**
- Buyers with severe CIBIL defaults/bankruptcy.
- Properties without BDA/BMRDA/DTCP approvals (most nationalized banks reject B-Khata or unapproved layouts).

---

## 3. Preconditions

Before drafting begins, the Admin/Platform must verify:
- [x] Title Verification (`VER_TITLE`) completed (recommended).
- [x] Signed Sale Agreement is available.

---

## 4. Required Documents

*(Dynamic based on earlier questionnaire answers)*

**Mandatory for all (Property):**
- Signed Sale Agreement
- Entire 30-year chain of title documents
- Approved Building Plan / RERA docs

**Mandatory for all (Applicant):**
- Aadhaar / PAN
- Last 6 months Bank Statements
- Passport-size photos

**Conditional (Salaried):**
- Last 3 months Salary Slips
- Last 2 years Form 16 / ITR
- Employment ID / Offer Letter

**Conditional (Self-Employed):**
- Last 3 years ITR with Computation of Income
- Business Proof (GST Registration, Trade License)
- Audited Balance Sheet and P&L

---

## 5. Questionnaire

The system must collect the following context:

**Requirements**
- Required Loan Amount?
- Preferred Tenure (Years)?

**Applicant Profile**
- Employment Type (Salaried / Self-Employed Professional / Self-Employed Non-Professional)
- Monthly Net Take-Home Salary / Annual Profit?
- Existing EMI Obligations per month?

**Co-Applicant**
- Will there be a co-applicant? (Yes/No)

---

## 6. AI Processing

The AI Pipeline (`EligibilityEngine`) automatically extracts:
- Total income vs Total obligations to calculate a preliminary **FOIR (Fixed Obligation to Income Ratio)**.
- Pre-checks if the requested loan amount is within the 80% LTV (Loan-To-Value) threshold of the Sale Agreement value.

---

## 7. Human Partner Responsibilities

The assigned Financial Advisor must:
- Review the AI eligibility score.
- Consult with the buyer on preferred banks (e.g., SBI, HDFC, ICICI).
- Submit the physical/digital file to the chosen bank.
- Coordinate the bank's internal Legal and Technical (Valuation) visits.
- Negotiate the lowest possible interest rate and processing fee.
- Secure the Sanction Letter.
- Coordinate the final disbursement (handing over the DD to the seller).

---

## 8. Admin Responsibilities

- Ensure the partner is an authorized DSA for the requested banks.
- Track SLA to ensure the partner doesn't delay submission.

---

## 9. Customer Journey

1. Customer books Loan Assistance.
2. Uploads KYC and Income docs.
3. AI calculates eligibility.
4. Advisor calls to select the bank.
5. Bank processes application.
6. Bank executes internal checks.
7. Sanction Letter issued and uploaded.
8. Loan disbursed on Registration day.

---

## 10. Deliverables

- ✔ **Sanction Letter** (PDF from Bank)
- ✔ **Disbursement Advice** (Details of DDs drawn)
- ✔ **Amortization Schedule**

---

## 11. Risks & Rejections

BuyWise should refuse or escalate this service if:
- The property is known to be a B-Khata or unapproved layout, making bank funding impossible.

---

## 12. Recommended Next Services

1. Registration Support (Disbursement usually happens here)
