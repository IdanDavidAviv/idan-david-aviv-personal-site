import { z } from 'zod';
import { CVSchema, RankedProjectSchema } from '@/schemas/cv.schema';

export type RankedProject = z.infer<typeof RankedProjectSchema>;
export type CV = z.infer<typeof CVSchema>;

export interface PersonalInfo {
    name: string;
    title: string;
    summary: string;
}

export interface CVHookResult {
    rankedWork: RankedProject[];
    personalInfo: PersonalInfo;
    isValid: boolean;
}
