---
name: ai_visibility_engine
description: Protocol and quality governance for AI model inference visibility, clean LLM Markdown twins (llms.txt), semantic prerendering, and Agent Closed-Loop Audit.
---

# AI Visibility & Inference Architecture Engine

## 1. Core Mandate
This skill governs how open-web AI models (ChatGPT, Claude, Gemini, Perplexity, and autonomous agents) interact with, read, and cite the site during real-time web browsing and inference. It eliminates the "empty SPA shell" problem by providing zero-noise Markdown twins and lightweight semantic HTML prerendering.

## 2. The Three Architectural Pillars

### 1. Zero-Junk Markdown Twins (`llms.txt`, `llms-full.txt`, `*.md`)
- Every public route has a clean Markdown twin (e.g., `/ai-brain.md`, `/about.md`).
- **The Zero-Junk Invariant**: Markdown artifacts MUST NOT contain raw SVG blocks, JSX properties (`className=`), unparsed Tailwind utility classes (`flex-col`, `px-4`), or unclosed HTML tags.
- Maximum information density: clean headings (`#`, `##`), bullet points, and tables that LLMs can ingest in under 1,000 tokens without wasting context window.

### 2. Lightweight Semantic Prerendering (HTML Fallback)
- For bots that fetch raw HTML (`GET /ai-brain`), `scripts/prerender.ts` injects a clean semantic DOM (`<main>`, `<h1>`, `<h2>`, `<p>`, `<ul>`) directly into `<div id="root">`.
- This ensures immediate 100% readability even if JavaScript execution is disabled or times out.
- **Firebase Clean URLs Invariant**: `cleanUrls: true` must remain enabled in `firebase.json` so `/ai-brain` serves `dist/ai-brain/index.html` statically.

### 3. Open AI Robots Governance (`robots.txt`)
- Dedicated `Allow: /` rules for `GPTBot`, `ChatGPT-User`, `ClaudeBot`, `Google-Extended`, `PerplexityBot`, `CCBot`, and `Bytespider`.
- Direct links to `/llms.txt`, `/llms-full.txt`, and `/ai-brain.md`.

## 3. Agent Closed-Loop Audit Protocol (`npm run ai:audit`)
Whenever building or deploying the site, the agent MUST run the audit script to verify:
1. All Markdown twins exist and are > 200 characters.
2. No dirty patterns (Tailwind leakages, raw SVGs, scripts) are present.
3. Obscurity Constraint is honored (never leak internal mystical terms like "Shabtai" or "Alchemical Anchor" into public LLM feeds).
4. Prerendered HTML in `dist/` contains non-empty root DOM with semantic containers.

## 4. Build Pipeline Hook
The build script in `package.json` enforces continuous synchronization:
```bash
npm run build # tsc && tsx scripts/generate-ai-artifacts.ts && vite build && tsx scripts/prerender.ts && tsx scripts/ai-audit.ts
```
Zero drift between source code, user UI, and AI machine-readable twins.
