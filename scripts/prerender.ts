import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

import { aiBrainContent } from '../src/data/aiBrainContent.ts';

/**
 * Lightweight Semantic Prerendering Engine (Node/TSX Native - Zero Puppeteer Dependency)
 * Injects clean semantic DOM into static HTML for each route in /dist.
 */

interface RoutePrerenderConfig {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  markdownTwinUrl: string;
  semanticHtml: string;
  ogImage?: string;
}

function getAiBrainSemanticHtml(): string {
  const { hero, contrast, bento, stepper, realityCheck, conversion } = aiBrainContent;

  return `
      <main id="main-content" class="semantic-prerender">
        <header>
          <h1>${hero.title} — ${hero.subtitle}</h1>
          <p>${hero.lead}</p>
          <div class="chat-hook">
            <span>${hero.chatHook.preTitle}</span>
            <p>${hero.chatHook.title}</p>
            <p>${hero.chatHook.processTag}</p>
          </div>
        </header>

        <section id="the-contrast">
          <h2>${contrast.title}</h2>
          <p>${contrast.lead}</p>
          <div class="contrast-pairs">
            ${contrast.pairs.map((pair) => `
              <article class="contrast-pair">
                <h3>${pair.category}</h3>
                <div class="before">
                  <h4>לפני (AI כללי): ${pair.before.title} (${pair.before.subtitle})</h4>
                  <p>${pair.before.description}</p>
                </div>
                <div class="after">
                  <h4>אחרי (מוח עסקי): ${pair.after.title} (${pair.after.subtitle})</h4>
                  <p>${pair.after.description}</p>
                </div>
              </article>
            `).join('')}
          </div>
        </section>

        <section id="bento-overview">
          <h2>${bento.headline.line1} ${bento.headline.line2}</h2>
          <p>${bento.subtitle.line1} ${bento.subtitle.line2}</p>
          
          <div class="bento-cards">
            ${bento.cards.map((card) => `
              <article class="bento-card">
                <h3>${card.title}</h3>
                <p>${card.subtitle}</p>
                <ul>
                  ${card.items.map(item => `<li><strong>${item.title}:</strong> ${item.desc}</li>`).join('')}
                </ul>
              </article>
            `).join('')}
          </div>
        </section>

        <section id="stepper-process">
          <h2>${stepper.title}</h2>
          <ol>
            ${stepper.stations.map(st => `
              <li><strong>שלב ${st.number} — ${st.tag}:</strong> ${st.title} — ${st.description}</li>
            `).join('')}
          </ol>
        </section>

        <section id="reality-check">
          <h2>${realityCheck.title}</h2>
          ${realityCheck.subtitle ? `<p>${realityCheck.subtitle}</p>` : ''}
          <ul>
            ${realityCheck.points.map(pt => `
              <li><strong>${pt.title}:</strong> ${pt.description}</li>
            `).join('')}
          </ul>
        </section>

        <section id="booking-cta">
          <h2>${conversion.cta}</h2>
          <p>${conversion.description}</p>
          <p>שיחת אפיון (Calendly): <a href="${conversion.calendlyUrl}">קביעת שיחה ביומן</a></p>
          <p>שיחת וואטסאפ מהירה: <a href="${conversion.whatsappUrl}">${conversion.whatsappPhone}</a></p>
        </section>
      </main>
  `;
}

const routesConfig: RoutePrerenderConfig[] = [
  {
    path: '/',
    title: 'עידן דוד אביב — ארכיטקט בינה מלאכותית ומערכות סוכנים',
    description: 'עידן דוד אביב — ארכיטקט בינה מלאכותית ומערכות סוכנים אוטונומיים. הטמעת Business AI Brain מותאם אישית לעסקים, חיבור מאובטח למערכות ליבה ואוטומציה עסקית מתקדמת.',
    keywords: 'עידן דוד אביב, ארכיטקט AI, הטמעת בינה מלאכותית לעסקים, Business AI Brain, סוכני AI אוטונומיים, אוטומציה עסקית, חיבור AI ל-CRM, מערכות מולטי סוכנים, מוח AI לעסק, AI Architect Israel',
    markdownTwinUrl: '/llms.txt',
    ogImage: 'https://idan-david-aviv.web.app/assets/og-cover.jpg',
    semanticHtml: `
      <main id="main-content" class="semantic-prerender">
        <header>
          <h1>עידן דוד אביב — AI Systems Architect & Senior Full Stack Engineer</h1>
          <p>ארכיטקטורת מערכות בינה מלאכותית ריבוניות, רשתות סוכנים אוטונומיים, Business AI Brain ומחשוב סביבתי (Ambient AI).</p>
          <nav aria-label="Machine-Readable AI Endpoints">
            <a href="/llms.txt">LLM Full Context Summary</a> |
            <a href="/about.md">Biography & Academic Credentials</a> |
            <a href="/ai-brain.md">Business AI Brain Architecture</a> |
            <a href="/projects.md">Ecosystem Projects (Virgo, DNA)</a>
          </nav>
        </header>
        
        <section id="academic-credentials">
          <h2>השכלה אקדמית, מחקר ותזה (Academic Credentials & Research)</h2>
          <p>עידן דוד אביב מחזיק בשלושה תארים אקדמיים מאוניברסיטת תל אביב ומכון סגול לחקר המוח:</p>
          <ul>
            <li><strong>MSc במדעי המוח (Neuroscience)</strong> — אוניברסיטת תל אביב ומכון סגול לחקר המוח (ציון 90). מחקר ותזה בממשקי נוירופידבק (Neurofeedback) ושיפור למידה בהנחיית פרופ' טלמה הנדלר.</li>
            <li><strong>BSc בהנדסה ביו-רפואית (Biomedical Engineering)</strong> — אוניברסיטת תל אביב. התמחות בעיבוד אותות, אלגוריתמיקה ושילוב חומרה-תוכנה.</li>
            <li><strong>BSc בביולוגיה עם הדגש במדעי המוח (Biology & Neuroscience)</strong> — אוניברסיטת תל אביב. תוכנית כפולה המשלבת מדעי החיים, גנומיקה חישובית וביופיזיקה.</li>
          </ul>
        </section>

        <section id="engineering-experience">
          <h2>ניסיון הנדסי מצטבר ומתודולוגיית עבודה (Experience & Philosophy)</h2>
          <p><strong>ניסיון מצטבר:</strong> 5 עד 7 שנות ניסיון מעשי בפיתוח מערכות תוכנה, עיבוד אותות, אלגוריתמים למכשור רפואי (Healium), ארכיטקטורת נתונים (INFRA), וניהול טכנולוגי כ-CTO ויזם עצמאי (Virgo, Spirit Research Lab).</p>
          <p><strong>The North-Star AI Methodology:</strong> &quot;איך לעזור ל-AI להבין הכי טוב מה אני רוצה שהוא יעשה — כדי שהוא יוכל להתמקד בלעזור לי, במקום שאני אתמקד בלעזור לו.&quot; תכנון סוכנים ריבוניים עם הקשר מלא המייתרים תלות בבייביסיטר של פרומפטים ומפנים את האדם ליצירה ולצמיחה.</p>
        </section>

        <section id="services-overview">
          <h2>מוח AI מותאם אישית לעסק (Business AI Brain)</h2>
          <p>ארכיטקטורת AI ריבונית ומאובטחת המחברת מסמכים, נהלים ומערכות קיימות למנועי AI מתקדמים עם נתוני אמת ומשילות אנושית מלאה (Human-in-the-Loop).</p>
          <a href="/ai-brain">מידע מלא על שירות מוח ה-AI העסקי</a>
        </section>

        <section id="ecosystem-projects">
          <h2>פרויקטים ומערכות אקוסיסטם</h2>
          <article>
            <h3>Virgo Audio Extension</h3>
            <p>תוסף סאונד וקול סביבתי לסוכני פיתוח אוטונומיים בסביבת VS Code ו-Antigravity IDE. משמיע תובנות והחלטות בקול אנושי טבעי בעברית ובאנגלית.</p>
            <a href="/virgo">פרטי פרויקט Virgo</a>
          </article>
          <article>
            <h3>Virgo DNA</h3>
            <p>תשתית זיכרון מתמשכת וספר חשבונות זמני (Temporal Ledger) המבטיח שמירת הקשר מלאה בין סשנים של סוכנים ללא סחף או שכחה.</p>
            <a href="/virgo-dna">פרטי פרויקט Virgo DNA</a>
          </article>
          <article>
            <h3>Spirit Research Lab (SRL)</h3>
            <p>מעבדת מיקרו-SaaS ליוצרים ויזמים עצמאיים בארכיטקטורה מודולרית ורזה.</p>
            <a href="/spirit-research-lab">פרטי מעבדת SRL</a>
          </article>
        </section>

        <section id="contact-funnel">
          <h2>יצירת קשר ותיאום שיחת אפיון</h2>
          <p>פגישת היכרות ואפיון: <a href="https://calendly.com/idandavidaviv/ai-brain-discovery">Calendly Discovery Call</a></p>
          <p>וואטסאפ ישיר: <a href="https://wa.me/972542475705">WhatsApp 054-2475705</a></p>
        </section>
      </main>
    `,
  },
  {
    path: '/ai-brain',
    title: aiBrainContent.meta.title,
    description: aiBrainContent.meta.description,
    keywords: aiBrainContent.meta.keywords,
    markdownTwinUrl: '/ai-brain.md',
    ogImage: 'https://idan-david-aviv.web.app/assets/og-ai-brain.jpg',
    semanticHtml: getAiBrainSemanticHtml(),
  },
  {
    path: '/spirit-research-lab',
    title: 'Spirit Research Lab (SRL) — מעבדת מיקרו-SaaS | עידן דוד אביב',
    description: 'מעבדת החדשנות SRL לפיתוח כלי מיקרו-SaaS מודולריים ומערכות אוטונומיות ליוצרים.',
    markdownTwinUrl: '/projects.md',
    ogImage: 'https://idan-david-aviv.web.app/assets/og-cover.jpg',
    semanticHtml: `
      <main id="main-content" class="semantic-prerender">
        <header>
          <h1>Spirit Research Lab (SRL)</h1>
          <p>מעבדת מחקר ופיתוח למיקרו-SaaS וארכיטקטורות סוכנים אוטונומיות.</p>
        </header>
        <section>
          <h2>מתודולוגיית הפיתוח</h2>
          <p>פיתוח רזה, מודולרי ומבוסס AI המאפשר בדיקת היתכנות מהירה ושיגור מוצרים דיגיטליים בסטנדרט תעשייתי גבוה.</p>
        </section>
      </main>
    `,
  },
  {
    path: '/virgo',
    title: 'Virgo Audio Extension — תוסף שמע סביבתי לסוכני AI | עידן דוד אביב',
    description: 'תוסף שמע וקול אנושי טבעי לסוכני בינה מלאכותית בסביבת הפיתוח VS Code ו-Antigravity IDE.',
    markdownTwinUrl: '/projects.md',
    ogImage: 'https://idan-david-aviv.web.app/assets/og-cover.jpg',
    semanticHtml: `
      <main id="main-content" class="semantic-prerender">
        <header>
          <h1>Virgo Audio Extension</h1>
          <p>ממשק שמע וצליל סביבתי (Ambient Voice) לסוכני תכנות אוטונומיים.</p>
        </header>
        <section>
          <h2>חוויית Pair Programming קולית</h2>
          <p>במקום לרוץ בשתיקה, הסוכן משמיע תובנות, החלטות ארכיטקטוניות וסיכומי עבודה בקול אנושי טבעי בעברית ובאנגלית.</p>
        </section>
      </main>
    `,
  },
  {
    path: '/virgo-dna',
    title: 'Virgo DNA — תשתית זיכרון ורשת מבוזרת לסוכנים | עידן דוד אביב',
    description: 'ספר חשבונות זמני (Temporal Ledger) ומשילות מתמשכת בין סשנים של סוכני AI ללא אובדן הקשר.',
    markdownTwinUrl: '/projects.md',
    ogImage: 'https://idan-david-aviv.web.app/assets/og-cover.jpg',
    semanticHtml: `
      <main id="main-content" class="semantic-prerender">
        <header>
          <h1>Virgo DNA</h1>
          <p>תשתית זיכרון מתמשכת וספר חשבונות זמני (Temporal Ledger) עבור סוכני AI.</p>
        </header>
        <section>
          <h2>מניעת סחף הקשר (Zero Context Drift)</h2>
          <p>פרוטוקול סנכרון המבטיח שכל סשן חדש יורש באופן דטרמיניסטי את החלטות העבר והסטטוס הפעיל ללא איבוד מידע.</p>
        </section>
      </main>
    `,
  },
];

export function runPrerender() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('❌ [Prerender] dist/index.html not found! Run "vite build" first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  console.log('⚡ [Prerender] Injecting stripped semantic DOM for all routes...');

  for (const route of routesConfig) {
    let routeHtml = baseHtml;

    // 1. Clean out existing meta tags to prevent duplication
    routeHtml = routeHtml.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
    routeHtml = routeHtml.replace(/<meta name="description"[^>]*>/gi, '');
    routeHtml = routeHtml.replace(/<meta name="keywords"[^>]*>/gi, '');
    routeHtml = routeHtml.replace(/<link rel="canonical"[^>]*>/gi, '');
    routeHtml = routeHtml.replace(/<meta property="og:[^>]*>/gi, '');
    routeHtml = routeHtml.replace(/<meta name="twitter:[^>]*>/gi, '');
    routeHtml = routeHtml.replace(/<link rel="alternate" type="text\/markdown"[^>]*>/gi, '');
    routeHtml = routeHtml.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

    const ogImg = route.ogImage || 'https://idan-david-aviv.web.app/assets/og-cover.jpg';
    const canonicalUrl = `https://idan-david-aviv.web.app${route.path === '/' ? '' : route.path}`;

    // Generate Rich JSON-LD Schemas (Schema.org)
    const personSchema: Record<string, unknown> = {
      '@type': 'Person',
      '@id': 'https://idan-david-aviv.web.app/#person',
      'name': 'עידן דוד אביב',
      'alternateName': 'Idan David Aviv',
      'url': 'https://idan-david-aviv.web.app/',
      'image': 'https://idan-david-aviv.web.app/assets/og-cover.jpg',
      'jobTitle': 'AI Systems Architect & Senior Full Stack Engineer',
      'description': 'ארכיטקט בינה מלאכותית, מערכות סוכנים אוטונומיים ו-Business AI Brain. בעל תואר שני במדעי המוח (MSc) ושני תארי BSc: בהנדסה ביו-רפואית ובביולוגיה עם הדגש במדעי המוח.',
      'sameAs': [
        'https://github.com/IdanDavidAviv',
        'https://www.linkedin.com/in/idan-david-aviv/',
      ],
      'alumniOf': [
        {
          '@type': 'EducationalOrganization',
          'name': 'Tel Aviv University',
          'url': 'https://www.tau.ac.il/',
        },
        {
          '@type': 'ResearchOrganization',
          'name': 'Sagol Brain Institute',
          'url': 'https://www.sagolbrain.org/',
        },
      ],
      'hasCredential': [
        {
          '@type': 'EducationalOccupationalCredential',
          'name': 'MSc in Neuroscience',
          'credentialCategory': 'degree',
          'recognizedBy': {
            '@type': 'EducationalOrganization',
            'name': 'Tel Aviv University',
          },
        },
        {
          '@type': 'EducationalOccupationalCredential',
          'name': 'BSc in Biomedical Engineering',
          'credentialCategory': 'degree',
          'recognizedBy': {
            '@type': 'EducationalOrganization',
            'name': 'Tel Aviv University',
          },
        },
        {
          '@type': 'EducationalOccupationalCredential',
          'name': 'BSc in Biology & Neuroscience',
          'credentialCategory': 'degree',
          'recognizedBy': {
            '@type': 'EducationalOrganization',
            'name': 'Tel Aviv University',
          },
        },
      ],
      'knowsAbout': [
        'Artificial Intelligence',
        'Autonomous AI Agents',
        'Multi-Agent Systems',
        'Agentic Workflows',
        'Business AI Architecture',
        'Neuroscience',
        'Neurofeedback',
        'Biomedical Engineering',
        'Systems Architecture',
        'Full Stack Engineering',
      ],
    };

    const professionalServiceSchema: Record<string, unknown> = {
      '@type': 'ProfessionalService',
      '@id': 'https://idan-david-aviv.web.app/#service',
      'name': 'Business AI Brain & Autonomous Systems — עידן דוד אביב',
      'url': 'https://idan-david-aviv.web.app/ai-brain',
      'description': 'ארכיטקטורת Business AI Brain ריבונית, הטמעת סוכנים אוטונומיים וחיבור נתוני אמת של עסקים למנועי AI בשליטה מלאה.',
      'provider': {
        '@id': 'https://idan-david-aviv.web.app/#person',
      },
      'telephone': '+972542475705',
      'areaServed': [
        {
          '@type': 'Country',
          'name': 'Israel',
        },
        {
          '@type': 'AdministrativeArea',
          'name': 'Worldwide',
        },
      ],
      'availableChannel': [
        {
          '@type': 'ServiceChannel',
          'serviceUrl': 'https://calendly.com/idandavidaviv/ai-brain-discovery',
          'name': 'שיחת אפיון (Calendly)',
        },
        {
          '@type': 'ServiceChannel',
          'serviceUrl': 'https://wa.me/972542475705',
          'name': 'וואטסאפ מהיר',
        },
      ],
    };

    const schemaGraph: Record<string, unknown>[] = [
      {
        '@type': 'WebSite',
        '@id': 'https://idan-david-aviv.web.app/#website',
        'url': 'https://idan-david-aviv.web.app/',
        'name': 'עידן דוד אביב — ארכיטקט בינה מלאכותית ומערכות סוכנים',
        'description': 'ארכיטקטורת Business AI Brain ריבונית, מערכות סוכנים אוטונומיים ו-Ambient AI.',
      },
      personSchema,
      professionalServiceSchema,
    ];

    if (route.path === '/ai-brain') {
      schemaGraph.push({
        '@type': 'FAQPage',
        '@id': 'https://idan-david-aviv.web.app/ai-brain#faq',
        'mainEntity': aiBrainContent.faq.map((item) => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.answer,
          },
        })),
      });
    }

    if (route.path === '/virgo') {
      schemaGraph.push({
        '@type': 'SoftwareApplication',
        '@id': 'https://idan-david-aviv.web.app/virgo#app',
        'name': 'Virgo Audio Extension',
        'operatingSystem': 'VS Code, Antigravity IDE, Windows, macOS, Linux',
        'applicationCategory': 'DeveloperApplication',
        'description': 'תוסף שמע סביבתי ודיאלוג קולי בעברית ובאנגלית לסוכני תכנות אוטונומיים בסביבת VS Code ו-Antigravity IDE.',
        'author': {
          '@id': 'https://idan-david-aviv.web.app/#person',
        },
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
        },
      });
    }

    if (route.path === '/virgo-dna') {
      schemaGraph.push({
        '@type': 'SoftwareApplication',
        '@id': 'https://idan-david-aviv.web.app/virgo-dna#app',
        'name': 'Virgo DNA',
        'applicationCategory': 'DeveloperApplication',
        'description': 'תשתית זיכרון מתמשכת וספר חשבונות זמני (Temporal Ledger) המבטיח שמירת הקשר מלאה בין סשנים של סוכני AI ללא סחף.',
        'author': {
          '@id': 'https://idan-david-aviv.web.app/#person',
        },
      });
    }

    const jsonLdScript = `\n  <script type="application/ld+json">\n${JSON.stringify({ '@context': 'https://schema.org', '@graph': schemaGraph }, null, 2)}\n  </script>`;

    // Inject Meta Description, OpenGraph, Twitter and Canonical
    const metaTags = `
  <!-- SEO & Canonical -->
  <meta name="description" content="${route.description}" />
  ${route.keywords ? `<meta name="keywords" content="${route.keywords}" />\n  ` : ''}<link rel="canonical" href="${canonicalUrl}" />

  <!-- OpenGraph / Social Sharing -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:title" content="${route.title}" />
  <meta property="og:description" content="${route.description}" />
  <meta property="og:image" content="${ogImg}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="he_IL" />

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${canonicalUrl}" />
  <meta name="twitter:title" content="${route.title}" />
  <meta name="twitter:description" content="${route.description}" />
  <meta name="twitter:image" content="${ogImg}" />

  <!-- AI Markdown Twin -->
  <link rel="alternate" type="text/markdown" href="${route.markdownTwinUrl}" title="LLM Markdown Twin" />${jsonLdScript}
</head>`;

    routeHtml = routeHtml.replace('</head>', metaTags);

    // 2. Inject rich semantic HTML into <div id="root"> for AI crawlers & bots
    // When React mounts client-side, createRoot cleanly replaces this initial DOM with the interactive application.
    if (route.semanticHtml) {
      routeHtml = routeHtml.replace('<div id="root"></div>', `<div id="root">\n${route.semanticHtml}\n  </div>`);
    }

    // 3. Determine Target Directory
    if (route.path === '/') {
      fs.writeFileSync(indexHtmlPath, routeHtml, 'utf8');
      console.log('   ✓ Injected semantic prerender for / (dist/index.html)');
    } else {
      const cleanPath = route.path.replace(/^\//, '');
      const routeSubdir = path.join(distDir, cleanPath);
      if (!fs.existsSync(routeSubdir)) {
        fs.mkdirSync(routeSubdir, { recursive: true });
      }
      // 1. Write [route]/index.html for directory requests (/ai-brain/)
      const routeFilePath = path.join(routeSubdir, 'index.html');
      fs.writeFileSync(routeFilePath, routeHtml, 'utf8');

      // 2. Write [route].html for direct cleanUrls requests (/ai-brain)
      const cleanHtmlPath = path.join(distDir, `${cleanPath}.html`);
      fs.writeFileSync(cleanHtmlPath, routeHtml, 'utf8');

      console.log(`   ✓ Injected semantic prerender for ${route.path} (${path.relative(rootDir, routeFilePath)} & ${cleanPath}.html)`);
    }
  }

  console.log('✨ [Prerender] All routes successfully prerendered with semantic HTML.');
}

// Direct CLI execution
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runPrerender();
}
