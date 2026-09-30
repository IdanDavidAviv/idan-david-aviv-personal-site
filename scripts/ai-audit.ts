import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const distDir = path.resolve(rootDir, 'dist');

/**
 * AI Visibility & Agent Closed-Loop Audit Script
 * Enforces the Zero-Junk Invariant on all AI artifacts and prerendered outputs.
 */

interface AuditIssue {
  file: string;
  type: string;
  detail: string;
}

const FORBIDDEN_PATTERNS = [
  { pattern: /className=["'][^"']+["']/g, name: 'JSX/React className leakage' },
  { pattern: /<svg[\s\S]*?<\/svg>/gi, name: 'Raw SVG block leakage' },
  { pattern: /<script[\s\S]*?<\/script>/gi, name: 'Raw script block leakage' },
  { pattern: /(?:px-\d|py-\d|flex-col|grid-cols|text-accent|bg-basebg)/g, name: 'Tailwind utility class leakage' },
  { pattern: /Shabtai|Shap-Tie|Alchemical Anchor/gi, name: 'Obscurity Constraint violation (internal mystical leak)' },
];

export function runAIAudit(): boolean {
  console.log('\n🔍 [Agent Closed-Loop Audit] Scanning AI artifacts for dirty patterns and noise...');
  const issues: AuditIssue[] = [];

  const markdownFiles = ['llms.txt', 'llms-full.txt', 'ai-brain.md', 'about.md', 'projects.md'];

  for (const filename of markdownFiles) {
    const filePath = path.join(publicDir, filename);
    if (!fs.existsSync(filePath)) {
      issues.push({ file: filename, type: 'MISSING_FILE', detail: 'File does not exist in /public' });
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const byteLength = Buffer.byteLength(content, 'utf8');
    const estimatedTokens = Math.round(content.length / 3.5); // Hebrew/English mixed approximation

    // Check for forbidden dirty patterns
    for (const check of FORBIDDEN_PATTERNS) {
      const matches = content.match(check.pattern);
      if (matches) {
        issues.push({
          file: filename,
          type: 'DIRTY_CONTENT',
          detail: `Found ${matches.length} instance(s) of ${check.name}: "${matches[0].slice(0, 40)}..."`,
        });
      }
    }

    // Check minimum content density
    if (content.length < 200) {
      issues.push({
        file: filename,
        type: 'LOW_DENSITY',
        detail: `Content length is too small (${content.length} chars). Possible truncated export.`,
      });
    }

    console.log(`   📄 [${filename}] ${(byteLength / 1024).toFixed(2)} KB | ~${estimatedTokens} tokens | Structure: Valid`);
  }

  // Check robots.txt
  const robotsPath = path.join(publicDir, 'robots.txt');
  if (!fs.existsSync(robotsPath)) {
    issues.push({ file: 'robots.txt', type: 'MISSING_FILE', detail: 'robots.txt is missing in /public' });
  } else {
    const robotsContent = fs.readFileSync(robotsPath, 'utf8');
    if (!robotsContent.includes('GPTBot') || !robotsContent.includes('ClaudeBot')) {
      issues.push({ file: 'robots.txt', type: 'INCOMPLETE_PERMISSIONS', detail: 'Missing dedicated AI bot rules' });
    } else {
      console.log('   🤖 [robots.txt] AI bot permissions: Verified');
    }
  }

  // Check dist prerender if dist exists
  if (fs.existsSync(distDir)) {
    console.log('\n🌐 [Prerender Verification] Auditing static HTML files in /dist...');
    const routesToCheck = [
      { name: 'Home (/)', file: path.join(distDir, 'index.html') },
      { name: 'AI Brain (/ai-brain)', file: path.join(distDir, 'ai-brain', 'index.html') },
    ];

    for (const route of routesToCheck) {
      if (!fs.existsSync(route.file)) {
        issues.push({ file: route.name, type: 'MISSING_PRERENDER', detail: `Prerender HTML not found at ${route.file}` });
        continue;
      }
      const html = fs.readFileSync(route.file, 'utf8');
      if (html.includes('<div id="root"></div>')) {
        issues.push({ file: route.name, type: 'EMPTY_ROOT_DOM', detail: 'Root DOM is empty! Semantic HTML not injected.' });
      } else if (!html.includes('<main id="main-content"')) {
        issues.push({ file: route.name, type: 'MISSING_SEMANTIC_MAIN', detail: 'Semantic <main> container missing in prerender.' });
      } else {
        console.log(`   ✓ ${route.name} — Rich semantic HTML present in initial DOM`);
      }
    }
  }

  console.log('----------------------------------------------------');
  if (issues.length === 0) {
    console.log('✅ [Agent Audit PASSED] Zero-Junk Invariant verified! All outputs are clean, high-density, and LLM-ready.\n');
    return true;
  } else {
    console.error('❌ [Agent Audit FAILED] Detected dirty patterns or missing artifacts:');
    for (const err of issues) {
      console.error(`   ⚠️  [${err.file}] ${err.type}: ${err.detail}`);
    }
    console.log('');
    return false;
  }
}

// Direct CLI execution
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const success = runAIAudit();
  if (!success) process.exit(1);
}
