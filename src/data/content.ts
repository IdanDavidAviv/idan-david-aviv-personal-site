export interface RankedProject {
    section: string;
    text: string;
    year: number;
    rank: 'strong' | 'medium' | 'light';
}

export interface CVData {
    summary: string;
    ranked: RankedProject[];
    raw_lines?: string[];
}

export const contentData: CVData = {
    summary: "Specializing in LLM agent stable flow optimization, through AI knowledge base architecture, and intelligent referencing systems.",
    ranked: [
        {
            section: "LLM Agents & AI Systems",
            text: "Leading development of advanced LLM agent architectures. Building systems that combine reasoning, memory, and human interaction.",
            year: 2024,
            rank: "strong"
        },
        {
            section: "System Architecture",
            text: "Designing scalable, robust system architectures for AI applications. Focus on distributed systems and microservices.",
            year: 2023,
            rank: "strong"
        },
        {
            section: "Neuroscience Research",
            text: "Background in computational neuroscience and signal processing. Applying insights from brain research to AI systems.",
            year: 2020,
            rank: "medium"
        },
        {
            section: "Teaching & Education",
            text: "Teaching AI and machine learning. Developing educational content and workshops.",
            year: 2019,
            rank: "medium"
        },
        {
            section: "Early Projects",
            text: "Various early-stage projects and research initiatives.",
            year: 2015,
            rank: "light"
        }
    ],
    raw_lines: [
        "Idan David-Aviv",
        "AI Innovator · CTO · LLM Architect",
        "Building AI systems that feel alive",
        "Experience",
        "LLM Agents & AI Systems (2024)",
        "System Architecture (2023)",
        "Neuroscience Research (2020)",
        "Teaching & Education (2019)"
    ]
}

export const personalInfo = {
    name: "Idan David-Aviv",
    title: "AI Innovator · CTO · LLM Architect",
    summary: contentData.summary || "Building AI systems that feel alive."
}
