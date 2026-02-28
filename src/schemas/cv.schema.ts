import { z } from 'zod';

/**
 * CV Schema - The Trinity of Truth for personal data.
 * This schema ensures that the data sourced from cv_parsed.json
 * matches the expectations of the 'Premium' UI components.
 */

export const RankedProjectSchema = z.object({
    section: z.string().describe('The project or focus area name'),
    text: z.string().describe('Detailed description of the role/project'),
    year: z.number().int().describe('Year of the activity'),
    rank: z.enum(['strong', 'medium', 'light']).describe('Visual weight for ranking'),
});

export const CVSchema = z.object({
    summary: z.string().describe('Elevator pitch / summary for the Hero section'),
    ranked: z.array(RankedProjectSchema).describe('Work history and projects'),
    raw_lines: z.array(z.string()).optional().describe('Original CV lines for fallback'),
});

/**
 * Type inference - Exporting for use across the app
 */
export type CVData = z.infer<typeof CVSchema>;
export type RankedProject = z.infer<typeof RankedProjectSchema>;
