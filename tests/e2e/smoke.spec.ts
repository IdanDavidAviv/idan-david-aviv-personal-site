import { test, expect } from '@playwright/test';

/**
 * E2E Smoke Test
 * Verifies that the home page loads and contains the expected title.
 */
test('Home Page Smoke Test', async ({ page }) => {
    await page.goto('/');

    // Basic check for title or main heading
    // Adjust selector based on actual app content
    await expect(page).toHaveTitle(/Idan David[- ]Aviv/i);
});
