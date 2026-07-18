import { test, expect } from '@playwright/test';

test.describe('Transaction Wizard Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: 'Developer Mock Login' }).click();
    await page.waitForURL('**/dashboard');
  });

  test('should allow creating a transaction and uploading a document', async ({ page }) => {
    // Navigate to Get Started
    await page.goto('/transaction/new');
    
    // Step 1: Location
    await page.getByPlaceholder('e.g., Indiranagar, Bengaluru').fill('Bengaluru');
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Step 2: Property Type & Budget
    await page.locator('select').selectOption('apartment');
    await page.getByPlaceholder('e.g., 1.5 Cr').fill('1 Cr');
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Step 3: Confirm
    await page.getByRole('button', { name: 'Confirm & Start' }).click();
    
    // Check redirection to document upload
    await expect(page).toHaveURL(/.*documents/);
    
    // Upload a mock document
    await page.setInputFiles('input[type="file"]', {
      name: 'sale_deed.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('mock pdf content')
    });
    
    // Click Upload Document
    await page.getByRole('button', { name: 'Upload Document' }).click();
    
    // Wait for the document card to appear in the list (mock upload resolves)
    await expect(page.getByText('sale_deed.pdf')).toBeVisible();
  });
});
