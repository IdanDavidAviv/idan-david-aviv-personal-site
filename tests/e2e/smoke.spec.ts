import { test, expect } from '@playwright/test';

/**
 * E2E Smoke Test
 * Verifies that the home page loads and contains the expected title.
 */
test('Home Page Smoke Test', async ({ page }) => {
    await page.goto('/');

    // Basic check for title or main heading (supports both Hebrew and English variants)
    await expect(page).toHaveTitle(/עידן דוד אביב|Idan David[- ]Aviv/i);
});

test('AI Brain Page Smoke & Semantic DOM Test', async ({ page }) => {
    await page.goto('/ai-brain');

    // Verify page title contains AI Brain and Idan
    await expect(page).toHaveTitle(/מוח AI לעסק|מוח AI לעסקים|AI Brain|עידן דוד אביב/i);

    // Verify that primary semantic heading exists and is visible
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/AI|מוח/i);
});
