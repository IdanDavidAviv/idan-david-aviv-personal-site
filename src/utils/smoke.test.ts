import { describe, it, expect } from 'vitest';

/**
 * CI Smoke Test
 * Ensures that the testing infrastructure is correctly configured.
 */
describe('Smoke Test', () => {
    it('should pass if 1 + 1 is 2', () => {
        expect(1 + 1).toBe(2);
    });
});
