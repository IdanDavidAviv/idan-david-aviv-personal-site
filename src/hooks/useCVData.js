import cv from '@data/cv_parsed.json'

/**
 * Custom hook to access and process CV data.
 * Decouples the UI from the raw JSON structure.
 */
export default function useCVData() {
    const rankedWork = cv?.ranked || []
    const personalInfo = {
        name: "Idan David-Aviv",
        title: "AI Innovator · CTO · LLM Architect",
        summary: "Building AI systems that feel alive — system architecture, LLM agents, & human-centered AI."
    }

    return {
        rankedWork,
        personalInfo
    }
}
