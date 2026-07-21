# EMI Calculator (TOOL_EMI_CALC)

**Category:** AI Instant Tool  
**Partner Type:** Platform Tool  
**Estimated SLA:** Instant  

## 1. Purpose

**Why is an EMI Calculator required?**  
To help buyers instantly understand their monthly financial commitment based on different loan amounts, interest rates, and tenures.

**When should it be executed?**  
During the Discovery and Evaluation phases, before committing to a purchase.

**How is it different from Loan Assistance?**  
This is a free, instant mathematical tool. It does not pull CIBIL scores or guarantee bank approval.

**What legal protection does it provide?**  
None. It is for informational purposes only.

**When can disputes arise?**  
N/A

---

## 2. Eligibility

**Who can request it?**
- Open to all users (Buyers, Sellers, Guests).

**Unsupported scenarios:**
- N/A

---

## 3. Preconditions

- None.

---

## 4. Required Documents

- None.

---

## 5. Questionnaire

The system must collect the following context:

**Financial Inputs**
- Principal Loan Amount (₹)
- Annual Interest Rate (%)
- Loan Tenure (Years)

---

## 6. AI Processing

The Platform instantly executes the standard amortization formula:
`E = P x r x (1 + r)^n / ((1 + r)^n - 1)`
Where:
- P = Principal
- r = Monthly interest rate
- n = Total number of months

---

## 7. Human Partner Responsibilities

**N/A** - This is a purely automated tool.

---

## 8. Admin Responsibilities

**N/A** - Fully automated.

---

## 9. Customer Journey

1. Customer inputs amount, rate, and tenure.
2. Adjusts sliders to see real-time updates.
3. Views the generated amortization schedule graph.

---

## 10. Deliverables

- ✔ **Monthly EMI Amount**
- ✔ **Total Interest Payable**
- ✔ **Amortization Schedule** (JSON data for charting)

---

## 11. Risks & Rejections

**N/A**

---

## 12. Recommended Next Services

1. Loan Assistance (To get actual bank sanction)
2. Property Readiness Score
