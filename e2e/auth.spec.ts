import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should allow mock developer login and route to dashboard', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Click Log In button in Header
    await page.getByRole('button', { name: 'Log In' }).click();
    
    // Ensure we are on the login page
    await expect(page).toHaveURL(/.*login/);
    
    // Click the Mock Developer Login button
    await page.getByRole('button', { name: 'Developer Mock Login' }).click();
    
    // Should be redirected to dashboard
    await expect(page).toHaveURL(/.*dashboard/);
    
    // Verify Dashboard heading is visible
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
    
    // Verify Admin link appears in header (since mock user is ADMIN)
    await expect(page.getByRole('button', { name: 'Admin' })).toBeVisible();
  });
});
