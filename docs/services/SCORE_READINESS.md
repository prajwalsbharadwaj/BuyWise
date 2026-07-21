# Property Readiness Score (SCORE_READINESS)

**Category:** AI Instant Service  
**Partner Type:** AI Only  
**Estimated SLA:** Instant  

## 1. Purpose

**Why is a Readiness Score required?**  
It distills complex legal, technical, and documentary data into a single, easy-to-understand 0-100 score indicating how "ready" a property is for a safe transaction.

**When should it be executed?**  
Continuously updated as new verifications (Document, Ownership, Title) are completed.

**How is it different from Title Verification?**  
Title verification is a deep legal check. The Readiness Score is an aggregate metric that includes title safety, but also factors in document completeness, physical inspection status, and loan eligibility.

**What legal protection does it provide?**  
None directly. It is a decision-support tool.

**When can disputes arise?**  
If the scoring algorithm weighs a minor defect (like a misspelled name) too heavily, causing a buyer to back out, or weighs a major defect too lightly.

---

## 2. Eligibility

**Who can request it?**
- Automatically generated for any property tracked in a User's workspace.

**Unsupported scenarios:**
- Cannot be generated if no documents have been uploaded or no verifications have been run.

---

## 3. Preconditions

Before drafting begins, the Admin/Platform must verify:
- [x] At least one verification service has been completed (e.g., Document Verification).

---

## 4. Required Documents

*(No direct documents required; it aggregates data from other services)*

---

## 5. Questionnaire

*(No questionnaire required)*

---

## 6. AI Processing

The AI Pipeline (`ScoringEngine`) automatically calculates based on:
- **Completeness (30%):** Are all mandatory documents present?
- **Ownership Match (30%):** Did `VER_OWNERSHIP` return a 100% match?
- **Title Safety (40%):** Did `VER_TITLE` return a clean opinion?

*Action:* Generate a dynamic list of "Missing Critical Items" that are dragging the score down.

---

## 7. Human Partner Responsibilities

**N/A** - This is a purely AI-driven service.

---

## 8. Admin Responsibilities

- **N/A** - Fully automated.

---

## 9. Customer Journey

1. Customer views property in dashboard.
2. Dashboard shows Score (e.g., 65/100).
3. Customer clicks to see details.
4. Score breakdown shows: "Title Verification Missing (-40 points)".
5. Customer is prompted to purchase Title Verification to improve the score.

---

## 10. Deliverables

- ✔ **Readiness Dashboard** (UI Component)
- ✔ **Overall Score** (0-100)
- ✔ **Action Items List** (e.g., "Upload Khata", "Request Title Check")

---

## 11. Risks & Rejections

**N/A**

---

## 12. Recommended Next Services

1. Depends entirely on what is missing (e.g., Title Verification, Structural Inspection).
