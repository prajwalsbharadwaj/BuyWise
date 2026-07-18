# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: service-fulfillment.spec.ts >> Service Fulfillment Flow >> should allow user to request a service and admin to fulfill it
- Location: e2e\service-fulfillment.spec.ts:10:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Request Service' })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "BuyWise Logo" [ref=e4] [cursor=pointer]:
        - /url: /
        - img "BuyWise Logo" [ref=e5]
      - navigation [ref=e6]:
        - link "Services" [ref=e7] [cursor=pointer]:
          - /url: /services
        - link "Localities" [ref=e8] [cursor=pointer]:
          - /url: /localities
        - link "Pricing" [ref=e9] [cursor=pointer]:
          - /url: /pricing
      - generic [ref=e10]:
        - link "Admin" [ref=e11] [cursor=pointer]:
          - /url: /admin/dashboard
          - button "Admin" [ref=e12]:
            - img [ref=e14]
            - generic [ref=e16]: Admin
        - link "Dashboard" [ref=e17] [cursor=pointer]:
          - /url: /dashboard
          - button "Dashboard" [ref=e18]:
            - generic [ref=e19]: Dashboard
        - link "Get Started" [ref=e20] [cursor=pointer]:
          - /url: /transaction/new
          - button "Get Started" [ref=e21]:
            - generic [ref=e22]: Get Started
  - generic [ref=e25]:
    - heading "404" [level=1] [ref=e26]
    - heading "This page could not be found." [level=2] [ref=e28]
  - contentinfo [ref=e29]:
    - generic [ref=e30]:
      - generic [ref=e31]:
        - generic [ref=e32]:
          - link "BuyWise Logo" [ref=e33] [cursor=pointer]:
            - /url: /
            - img "BuyWise Logo" [ref=e34]
          - paragraph [ref=e35]: India's most trusted real estate transaction platform. We bring intelligence and verification to your property journey.
        - generic [ref=e36]:
          - generic [ref=e37]:
            - heading "Platform" [level=4] [ref=e38]
            - link "Services" [ref=e39] [cursor=pointer]:
              - /url: /services
            - link "Localities" [ref=e40] [cursor=pointer]:
              - /url: /localities
            - link "Pricing" [ref=e41] [cursor=pointer]:
              - /url: /pricing
            - link "Verification" [ref=e42] [cursor=pointer]:
              - /url: /verification
          - generic [ref=e43]:
            - heading "Company" [level=4] [ref=e44]
            - link "About Us" [ref=e45] [cursor=pointer]:
              - /url: /about
            - link "Contact" [ref=e46] [cursor=pointer]:
              - /url: /contact
            - link "Careers" [ref=e47] [cursor=pointer]:
              - /url: /careers
            - link "Blog" [ref=e48] [cursor=pointer]:
              - /url: /blog
          - generic [ref=e49]:
            - heading "Trust" [level=4] [ref=e50]
            - link "Trust Center" [ref=e51] [cursor=pointer]:
              - /url: /trust
            - link "How It Works" [ref=e52] [cursor=pointer]:
              - /url: /how-it-works
            - link "Methodology" [ref=e53] [cursor=pointer]:
              - /url: /methodology
            - link "Data Sources" [ref=e54] [cursor=pointer]:
              - /url: /data-sources
          - generic [ref=e55]:
            - heading "Legal" [level=4] [ref=e56]
            - link "Terms of Service" [ref=e57] [cursor=pointer]:
              - /url: /legal/terms
            - link "Privacy Policy" [ref=e58] [cursor=pointer]:
              - /url: /legal/privacy
            - link "Refund Policy" [ref=e59] [cursor=pointer]:
              - /url: /legal/refunds
      - generic [ref=e60]:
        - paragraph [ref=e61]: © 2026 Prajwal Tech Solution Limited. All rights reserved.
        - generic [ref=e62]: BuyWise provides facilitation services. We are not a legal firm or real estate broker.
  - button "Open Next.js Dev Tools" [ref=e68] [cursor=pointer]:
    - img [ref=e69]
  - alert [ref=e72]: "404: This page could not be found."
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Service Fulfillment Flow', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/login');
  6  |     await page.getByRole('button', { name: 'Developer Mock Login' }).click();
  7  |     await page.waitForURL('**/dashboard');
  8  |   });
  9  | 
  10 |   test('should allow user to request a service and admin to fulfill it', async ({ page }) => {
  11 |     // 1. User views intelligence dashboard for a mock transaction
  12 |     const txId = 'TXN-' + Math.floor(Math.random() * 10000);
  13 |     await page.goto(`/dashboard/transactions/${txId}/intelligence`);
  14 |     
  15 |     // 2. User clicks "View Service" for a specific anomaly (Name Mismatch links to VER_OWNERSHIP which exists in DB)
  16 |     await page.locator('div', { hasText: 'Name Mismatch' }).getByRole('button', { name: 'View Service' }).first().click();
  17 |     
  18 |     // 3. User requests the service
> 19 |     await page.getByRole('button', { name: 'Request Service' }).click();
     |                                                                 ^ Error: locator.click: Test timeout of 30000ms exceeded.
  20 |     
  21 |     // 4. Assert user is on the "My Services" page
  22 |     await expect(page).toHaveURL(/.*services/);
  23 |     await expect(page.getByText('Awaiting Admin')).toBeVisible();
  24 | 
  25 |     // 5. Admin goes to fulfillment portal
  26 |     await page.getByRole('button', { name: 'Admin' }).click();
  27 |     await expect(page).toHaveURL(/.*admin\/dashboard/);
  28 | 
  29 |     // 6. Admin clicks "Manage Request" on the most recent request
  30 |     await page.getByRole('button', { name: 'Manage Request' }).first().click();
  31 |     
  32 |     // 7. Admin fulfills the request
  33 |     await page.locator('select[name="status"]').selectOption('COMPLETED');
  34 |     await page.locator('textarea[name="notes"]').fill('Legal review completely finished. No issues.');
  35 |     await page.getByRole('button', { name: 'Save Changes' }).click();
  36 | 
  37 |     // 8. Go back to User Dashboard to check if it's fulfilled
  38 |     await page.goto(`/dashboard/transactions/${txId}/services`);
  39 |     
  40 |     // Assert the status updated in the UI
  41 |     await expect(page.getByText('Fulfilled')).toBeVisible();
  42 |     await expect(page.getByText('Legal review completely finished. No issues.')).toBeVisible();
  43 |   });
  44 | });
  45 | 
```