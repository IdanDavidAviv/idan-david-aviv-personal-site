import cv from '@data/cv_parsed.json'
import { CVSchema, type CVData } from '@/schemas/cv.schema'
import type { CVHookResult, PersonalInfo } from '@/types/cv'

/**
 * Custom hook to access and process CV data.
 * Decouples the UI from the raw JSON structure and provides
 * high-integrity validation via Zod.
 */
export default function useCVData(): CVHookResult {
    // Validate data at runtime - Phase 5 protection
    const result = CVSchema.safeParse(cv)

    if (!result.success) {
        console.error('CV Data Validation Failed:', result.error.format())
        // Fallback or handle gracefully
    }

    const cvData = result.success ? result.data : (cv as unknown as CVData)

    const rankedWork = cvData?.ranked || []

    // Personal info sourced from validated data or hardcoded fallback
    const personalInfo: PersonalInfo = {
        name: "Idan David-Aviv",
        title: "AI Innovator · CTO · LLM Architect",
        summary: cvData?.summary || "Building AI systems that feel alive."
    }

    return {
        rankedWork,
        personalInfo,
        isValid: result.success
    }
}
