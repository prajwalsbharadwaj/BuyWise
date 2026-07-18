import { test, expect } from '@playwright/test';

test.describe('Service Fulfillment Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: 'Developer Mock Login' }).click();
    await page.waitForURL('**/dashboard');
  });

  test('should allow user to request a service and admin to fulfill it', async ({ page }) => {
    // 1. User views intelligence dashboard for a mock transaction
    const txId = 'TXN-' + Math.floor(Math.random() * 10000);
    await page.goto(`/dashboard/transactions/${txId}/intelligence`);
    
    // 2. User clicks "View Service" for a specific anomaly (Name Mismatch links to VER_OWNERSHIP which exists in DB)
    await page.locator('div', { hasText: 'Name Mismatch' }).getByRole('button', { name: 'View Service' }).first().click();
    
    // 3. User requests the service
    await page.getByRole('button', { name: 'Request Service' }).click();
    
    // 4. Assert user is on the "My Services" page
    await expect(page).toHaveURL(/.*services/);
    await expect(page.getByText('Awaiting Admin')).toBeVisible();

    // 5. Admin goes to fulfillment portal
    await page.getByRole('button', { name: 'Admin' }).click();
    await expect(page).toHaveURL(/.*admin\/dashboard/);

    // 6. Admin clicks "Manage Request" on the most recent request
    await page.getByRole('button', { name: 'Manage Request' }).first().click();
    
    // 7. Admin fulfills the request
    await page.locator('select[name="status"]').selectOption('COMPLETED');
    await page.locator('textarea[name="notes"]').fill('Legal review completely finished. No issues.');
    await page.getByRole('button', { name: 'Save Changes' }).click();

    // 8. Go back to User Dashboard to check if it's fulfilled
    await page.goto(`/dashboard/transactions/${txId}/services`);
    
    // Assert the status updated in the UI
    await expect(page.getByText('Fulfilled')).toBeVisible();
    await expect(page.getByText('Legal review completely finished. No issues.')).toBeVisible();
  });
});
