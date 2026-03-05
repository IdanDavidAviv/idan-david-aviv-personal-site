import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Configuration
 * Optimized for CI/CD and localized testing.
 */
export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined, // Using 1 worker for stability on Windows/CI
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:5173',
        trace: 'on-first-retry',
        actionTimeout: 15000,
        navigationTimeout: 30000,
    },
    timeout: 60000,
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: process.env.CI ? 'npm run build && npx vite preview --port 5173' : 'npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
    },
});
