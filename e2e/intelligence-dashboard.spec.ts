import { test, expect } from '@playwright/test';

test.describe('Intelligence Dashboard Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: 'Developer Mock Login' }).click();
    await page.waitForURL('**/dashboard');
  });

  test('should render dynamic Risk Engine score and anomalies', async ({ page }) => {
    // Generate a random transaction ID like the wizard does
    const txId = 'TXN-' + Math.floor(Math.random() * 10000);
    
    // Go directly to the intelligence dashboard for this mock transaction
    await page.goto(`/dashboard/transactions/${txId}/intelligence`);
    
    // Check if the Risk Score is visible (our RiskEngine calculates it)
    await expect(page.getByText('Risk Score')).toBeVisible();
    
    // Look for a specific anomaly title we know the Risk Engine returns
    // The Risk Engine simulates a Name Mismatch anomaly based on mock AI data
    await expect(page.getByText('Name Mismatch')).toBeVisible();
    
    // Verify AI Extracted Data renders
    await expect(page.getByText('AI Extracted Data')).toBeVisible();
    await expect(page.getByText('PID-12948-BLR')).toBeVisible();
  });
});
