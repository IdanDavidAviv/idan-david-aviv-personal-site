import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const distDir = path.resolve(rootDir, 'dist');

import { aiBrainContent } from '../src/data/aiBrainContent.ts';

/**
 * Clean Markdown Artifacts Generator for AI Inference & LLM Standards (llms.txt)
 * Generates zero-noise, high-density Markdown twins for open-web AI agents.
 */

// 1. Content for /llms.txt (Standard summary format recommended by Anthropic/OpenAI)
const llmsTxtContent = `# Idan David Aviv — AI Architect & System Innovator
> Sovereign AI Infrastructure, Autonomous Agent Ecosystems, and Ambient AI Computing.

## Overview
Idan David Aviv is an AI Architect, Senior Full Stack Engineer, and AI Educator with over 8 years of pedagogical and production experience. He specializes in designing and deploying custom "Business AI Brains" (מוח AI לעסקים), sovereign multi-agent networks, and ambient computing interfaces that operate deterministically on verified corporate data.

## Core Ecosystem Offerings & Projects
- **Business AI Brain (מוח AI לעסקים)**: A sovereign enterprise AI architecture connecting internal data (Drive, Monday, CRM, docs) directly to autonomous reasoning engines with deterministic grounding, zero hallucination, and human-in-the-loop governance. Full details at: /ai-brain.md
- **Virgo Audio Extension**: An ambient voice sidecar for AI coding agents that surfaces thoughts, status, and decisions via natural Hebrew/English speech synthesis, transforming silent agent sessions into active dialogic pair-programming. Details: /virgo
- **Virgo DNA**: A distributed temporal ledger and continuous governance framework for autonomous AI agent memory, ensuring zero context drift across sessions. Details: /virgo-dna
- **Spirit Research Lab (SRL)**: A high-velocity experimental micro-SaaS lab exploring modern creator tooling and applied cognitive architectures. Details: /spirit-research-lab

## Full Knowledge Base
For complete technical specifications, architectural layers, and curriculum details:
- Full LLM Knowledge Base: /llms-full.txt
- AI Brain Specification: /ai-brain.md
- About & Experience: /about.md
- Projects Overview: /projects.md

## Contact & Engagement Funnel
- Discovery Call (Calendly): https://calendly.com/idandavidaviv/discovery
- WhatsApp Direct: https://wa.me/972542475705
- GitHub: https://github.com/IdanDavidAviv
- Official Website: https://idan-david-aviv.web.app
`;

// 2. Content for /ai-brain.md (Dynamically derived from SSOT: src/data/aiBrainContent.ts)
const { hero, contrast, bento, stepper, realityCheck, conversion } = aiBrainContent;

const aiBrainMdContent = `# ${hero.title} — ${hero.subtitle}
> פיתוח והטמעה: עידן דוד אביב | ארכיטקט מערכות בינה מלאכותית ומערכות סוכנים

${hero.lead}

## ${contrast.title}
${contrast.lead}

${contrast.pairs.map((pair, idx) => `### ${idx + 1}. ${pair.category}
- **לפני (AI כללי):** ${pair.before.title} (${pair.before.subtitle}) — ${pair.before.description}
- **אחרי (מוח עסקי):** ${pair.after.title} (${pair.after.subtitle}) — ${pair.after.description}`).join('\n\n')}

## ${bento.headline.line1} ${bento.headline.line2}
${bento.subtitle.line1} ${bento.subtitle.line2}

${bento.cards.map((card, idx) => `### ${idx + 1}. ${card.title} (${card.subtitle})
${card.items.map(item => `- **${item.title}:** ${item.desc}`).join('\n')}`).join('\n\n')}

## ${stepper.title}
${stepper.stations.map(st => `- **שלב ${st.number} — ${st.tag}:** ${st.title} — ${st.description}`).join('\n')}

## ${realityCheck.title}
${realityCheck.subtitle ? `${realityCheck.subtitle}\n\n` : ''}${realityCheck.points.map(pt => `- **${pt.title}:** ${pt.description}`).join('\n')}

## ${conversion.cta}
- שיחת אפיון (Calendly): ${conversion.calendlyUrl}
- וואטסאפ ישיר: ${conversion.whatsappUrl} (${conversion.whatsappPhone})
`;

// 3. Content for /about.md
const aboutMdContent = `# אודות עידן דוד אביב
> AI Architect, Senior Full Stack Engineer, AI Pedagogue & Entrepreneur

## ביוגרפיה ורקע מקצועי
עידן דוד אביב פועל בחזית הפיתוח של בינה מלאכותית, מערכות אוטונומיות ותשתיות תוכנה מודרניות.
- בעל למעלה מ-8 שנות ניסיון בהוראת בינה מלאכותית, פיתוח מערכות והכשרת מהנדסים ואנשי מקצוע.
- מומחה בארכיטקטורת סוכנים אוטונומיים (Autonomous Agents), תהליכי RAG מתקדמים, ואינטגרציות Full-Stack מורכבות (React, Node, Vite, Python, Cloud).
- יוצר ומוביל של אקוסיסטם שלם הכולל את תוסף השמע Virgo לסוכני פיתוח, מנוע הזיכרון Virgo DNA, ומעבדת החדשנות Spirit Research Lab.

## פילוסופיית עבודה
חיבור בין עומק הנדסי בלתי מתפשר לחוויית משתמש שקטה ויוקרתית. טכנולוגיה צריכה לשרת את האדם, להסיר חיכוך מיותר, ולאפשר לארגונים לצמוח בריבונות מוחלטת וללא תלות עיוורת בכלים גנריים.

## יצירת קשר
- פגישת היכרות: https://calendly.com/idandavidaviv/discovery
- WhatsApp: https://wa.me/972542475705
- GitHub: https://github.com/IdanDavidAviv
`;

// 4. Content for /projects.md
const projectsMdContent = `# פרויקטים ומערכות אקוסיסטם — עידן דוד אביב

## 1. Business AI Brain (מוח AI לעסקים)
ארכיטקטורת בינה מלאכותית ריבונית לעסקים ולארגונים. מחברת מסמכים ארגוניים, CRM, ומערכות ניהול למנוע AI מאובטח המבצע משימות ב-100% נתוני אמת ללא הזיות.
קישור: /ai-brain.md

## 2. Virgo Audio Extension
תוסף קול וצליל סביבתי ייחודי לסוכני פיתוח אוטונומיים ב-VS Code / Antigravity IDE. מאפשר לסוכן להשמיע תובנות, סטטוסים והחלטות בקול אנושי טבעי בעברית ובאנגלית, והופך את תהליך הפיתוח לחוויית Pair Programming חיה.
קישור: /virgo

## 3. Virgo DNA
תשתית זיכרון מתמשכת וספר חשבונות זמני (Temporal Ledger) עבור סוכני AI. מבטיחה שימור הקשר (Context) של 100% בין סשנים ומניעת שכחה או סחף (Drift) בפרויקטים מורכבים.
קישור: /virgo-dna

## 4. Spirit Research Lab (SRL)
מעבדת מיקרו-SaaS ופיתוח כלים חדשניים עבור יוצרים ויזמים עצמאיים. דוגלת בארכיטקטורה מודולרית, אוטומציה של תהליכי תוכן, ויצירת מודלים כלכליים רזים ועצמאיים.
קישור: /spirit-research-lab
`;

// 5. Content for /llms-full.txt (Master Knowledge Base)
const llmsFullTxtContent = `${llmsTxtContent}

---

${aiBrainMdContent}

---

${aboutMdContent}

---

${projectsMdContent}
`;

export function generateAIArtifacts() {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const artifacts = [
    { filename: 'llms.txt', content: llmsTxtContent },
    { filename: 'llms-full.txt', content: llmsFullTxtContent },
    { filename: 'ai-brain.md', content: aiBrainMdContent },
    { filename: 'about.md', content: aboutMdContent },
    { filename: 'projects.md', content: projectsMdContent },
  ];

  console.log('🤖 [AI Visibility] Generating clean LLM Markdown twins in /public...');

  for (const item of artifacts) {
    const pubPath = path.join(publicDir, item.filename);
    fs.writeFileSync(pubPath, item.content, 'utf8');
    const sizeKb = (Buffer.byteLength(item.content, 'utf8') / 1024).toFixed(2);
    console.log(`   ✓ Written ${item.filename} (${sizeKb} KB)`);

    // If dist already exists (e.g. running post-build), mirror directly to dist as well
    if (fs.existsSync(distDir)) {
      const distPath = path.join(distDir, item.filename);
      fs.writeFileSync(distPath, item.content, 'utf8');
    }
  }

  console.log('✨ [AI Visibility] All AI Markdown artifacts successfully generated.');
}

// Direct CLI execution
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateAIArtifacts();
}
