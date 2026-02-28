תוכנית סוכן: Build Homepage from Image A + CV (for Claude CLI)
כותרת פעילות (single task)

פשוט: Build a full personal homepage using the provided Image A and CV DOCX. Deliver production-ready project files (React + Tailwind) and generated hero image assets. Follow the exact steps below, produce file outputs in the project folder, and report progress + errors.

הוראות כלליות לסוכן (קונטקסט ו־constraints)

שפה פנימית: עברית (חוץ מקוד וקבצי README שבהם יש להשתמש ב-English ל־package.json וכו' אם נדרש).

אין להשתמש במילים בתוך התמונה — רק סמלים מופשטים.

שמרו על האווירה המקורית (lonely silhouette on glowing path, dark palette) — הוסיפו סמלים מופשטים בהתאם ל-CV.

דגש חזותי: תכנים חדשים (2024–2025) בהירות ומרכזיות; ישן — מטושטש, רקע.

תוצאות: תיקיית פרויקט מלאה עם קבצי מקור, תמונות בגודל למסך (1920×1080) ולקאנון 2560×1440, והוראות פריסה.

שלב A — חילוץ וניתוח ה-DOCX

קבצים לייצור: tools/extract_cv.py, data/cv_parsed.json

משימה: להריץ את הסקריפט הבא (Python) על ה-DOCX שסיפקו ולייצר JSON עם: סיכום, רשימת כישורים (tagged), תפקידים עם תאריכים, וקטגוריות מדורגות (strong/medium/light) לפי תאריכים במסמך.

קוד — tools/extract_cv.py:

# requires: python-docx, dateparser
# pip install python-docx dateparser

from docx import Document
import json, sys, re
from datetime import datetime
import dateparser

def parse_docx(path):
    doc = Document(path)
    text = []
    for p in doc.paragraphs:
        t = p.text.strip()
        if t:
            text.append(t)
    return text

def find_sections(lines):
    # very pragmatic: find lines that look like headers (caps or contain years)
    sections = {}
    cur = "main"
    sections[cur] = []
    for l in lines:
        if re.search(r'\b(Experience|Education|Technical skills|Experience|Experience)\b', l, re.I):
            cur = l
            sections[cur] = []
        else:
            sections[cur].append(l)
    return sections

def extract_dates(s):
    # find years
    years = re.findall(r'(\b20\d{2}\b)', s)
    return years

def rank_by_recency(sections):
    # produce tags strong/medium/light by found years
    entries = []
    for sec, lines in sections.items():
        block = "\n".join(lines)
        years = extract_dates(block)
        year_max = max([int(y) for y in years]) if years else None
        entries.append({"section": sec, "text": block, "year": year_max})
    # sort by year desc
    entries_sorted = sorted(entries, key=lambda x: x['year'] if x['year'] else 0, reverse=True)
    # assign ranks
    for e in entries_sorted:
        if e['year'] and e['year'] >= 2023:
            e['rank'] = 'strong'
        elif e['year'] and e['year'] >= 2019:
            e['rank'] = 'medium'
        else:
            e['rank'] = 'light'
    return entries_sorted

if __name__ == "__main__":
    in_path = sys.argv[1]
    out_path = sys.argv[2]
    lines = parse_docx(in_path)
    sections = find_sections(lines)
    ranked = rank_by_recency(sections)
    summary = " ".join(lines[:8])
    out = {"summary": summary, "ranked": ranked, "raw_lines": lines}
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print("wrote", out_path)


הוראות הרצה:
python tools/extract_cv.py /path/to/Idan\ CV.docx data/cv_parsed.json

שלב B — תרגום תכנים לסמלים (mapping)

קובץ לייצור: data/symbol_map.json

משימה: מה-cv_parsed.json ליצור מפה (symbol_map) שמקשרת קטגוריות למאפיינים ויזואליים (shape, intensity, placement). השתמש בכללים הבאים:

strong → proximity to figure, brightness high, center/before path.

medium → midground, medium brightness, semi-transparent.

light → background grain, faint.

דוגמת Template (כתוב בדוקומנט שהסוכן ימלא אוטומטית):

{
  "LLM Agents": {"shape":"fractal_net","intensity":"high","position":"sky_center"},
  "System Architecture": {"shape":"layered_blocks","intensity":"high","position":"path_near"},
  "Neuroscience": {"shape":"dendritic_branches","intensity":"medium","position":"left_mid"},
  "Teaching": {"shape":"branching_rays","intensity":"medium","position":"above_path"},
  "Signal Processing": {"shape":"radiology_halo","intensity":"medium","position":"right_mid"},
  "Old Projects": {"shape":"grain_texture","intensity":"low","position":"background"}
}

שלב C — יצירת פרומפטים לייצור תמונה (Image B variations)

קובץ לייצור: prompts/image_prompts.json

משימה: ליצור 3 פרומפטים מובנים לפרודקשן (hero 1920x1080, hero 2560x1440, wallpaper 3840x2160). כל פרומפט יכלול: תיאור הכרחי, מפת סמלים (מה מונח איפה), סגנון (digital painting, cinematic, minimal), צבעים (hex palette), atmosphere rules (no text).

תבנית פרומפט לדוגמה — (הסוכן ימלא מה-symbol_map.json):

Base scene: a lone silhouette walking along a winding dim path at night, cinematic composition.
Mood: introspective, minimal, quiet depth.
Palette: #0A0A0A, #0D1117, #C28F2C.
Symbols:
 - fractal_net (LLM Agents) -> glowing golden lattice in the sky_center, prominent, high intensity.
 - layered_blocks (System Architecture) -> faint translucent stacked blocks emerging from the path near the figure.
 - dendritic_branches (Neuroscience) -> branching thin golden lines left_mid, medium intensity.
Constraints: no text, no logos, keep silhouette intact, new elements closer/brighter.
Output size: 2560x1440, high detail, painterly texture.


הערה: אם אתה מפעיל ה-image API (DALL·E, Stable Diffusion, Midjourney, או Claude image capability), השתמש בפרומפט הזה. בקשות לחזור על הייצור עם seed שונים עד לקבלת אחת שאתה מסכים עליה.

שלב D — שילוב (composite) של Image B בתוך Image A (final integration)

מטרה: לשמור על הצורה החלקה של Image B, להשתמש ב-path מאת Image A (proportions for desktop/hero), ולשלב בתזמון כך שהתוצאה נראית native ל-Image A אך עם סמלים מ-B.

הוראות אוטומטיות לסוכן:

קבל את Image A (המקורית) ואת Image B ( המאופיינת ) — שקול את פרופורציות Image A (רוחב/גובה) וייצר תמונה גזורה ל-16:9 או 3:2 לפי הצורך (desktop hero).

השתמש ב-Image B כ-overlay שקוף (mode: screen או linear dodge) מעל Image A, אך שמור על קונטרסט/וינייט ששומר על "dark edges" של A.

שמור על הדרך (path) מה-Image A: השתמש ב-mask שמגן על האזור התחתון־מרכזי כך שה-path מדויק לפרופורציה של מסך מחשב.

יצא שלושה assets: hero_2560x1440.png, hero_1920x1080.jpg (web optimized), wallpaper_3840x2160.webp.

אם אין אפשרות לערוך תמונה אוטומטית בתוך Claude, הסוכן צריך להפיק הוראות מדויקות ל-Photoshop/GIMP/Imagemagick:

Imagemagick example:

# overlay ImageB over ImageA with mask and color-correction
convert ImageA.png ImageB.png -compose Screen -composite -colorspace RGB -modulate 100,100,100 -sharpen 0x0.5 hero_out.png


(תתאים פרמטרים לאחר בדיקה ויזואלית.)

שלב E — בניית פרויקט האתר (React + Tailwind)

תיקיית מוצא: website/

מה לייצר: package.json, postcss.config.js, tailwind.config.js, public/index.html, src/main.jsx, src/App.jsx, src/index.css, components: Hero.jsx, About.jsx, WorkGrid.jsx, Footer.jsx, README.md, assets/ (with hero images).

Template files — להעתיק ישירות:

package.json
{
  "name": "idan-homepage",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "tailwindcss": "^3.0.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0"
  }
}

tailwind.config.js
module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        basebg: '#0D1117',
        accent: '#C28F2C'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}

public/index.html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Idan David-Aviv — AI Innovator</title>
  </head>
  <body class="bg-basebg text-gray-200">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

src/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(<App />)

src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #0D1117;
  color: #d1d5db;
  font-family: Inter, system-ui, sans-serif;
}

/* subtle noise overlay */
.noise {
  background-image: url('/assets/noise.png');
  mix-blend-mode: overlay;
  opacity: 0.06;
}

src/App.jsx
import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import WorkGrid from './components/WorkGrid'
import Footer from './components/Footer'

export default function App(){
  return (
    <div className="min-h-screen text-gray-200">
      <Hero />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <About />
        <WorkGrid />
      </main>
      <Footer />
    </div>
  )
}

src/components/Hero.jsx
import React from 'react'

export default function Hero(){
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <img src="/assets/hero_2560x1440.jpg" alt="hero" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">Idan David-Aviv</h1>
        <p className="mt-4 text-xl text-gray-300">AI Innovator · CTO · LLM Architect</p>
        <p className="mt-6 max-w-xl mx-auto text-gray-400">Building AI systems that feel alive — system architecture, LLM agents, & human-centered AI.</p>
      </div>
      <div className="absolute bottom-8 w-full flex justify-center z-10">
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#C28F2C] to-transparent rounded"></div>
      </div>
    </section>
  )
}

src/components/About.jsx (skeleton)
import React from 'react'
import cv from '../../data/cv_parsed.json' // static copy

export default function About(){
  const summary = cv?.summary || "AI Innovator.";
  return (
    <section id="about" className="py-12">
      <h2 className="text-2xl font-semibold">About</h2>
      <p className="mt-4 text-gray-300 max-w-prose">{summary}</p>
    </section>
  )
}

src/components/WorkGrid.jsx (skeleton)
import React from 'react'
import cv from '../../data/cv_parsed.json'

export default function WorkGrid(){
  const items = cv?.ranked || []
  return (
    <section id="work" className="py-12">
      <h2 className="text-2xl font-semibold">Selected Work</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((it, idx)=>(
          <div key={idx} className="p-6 bg-black/30 rounded-lg">
            <h3 className="font-medium">{it.section}</h3>
            <p className="mt-2 text-gray-400">{it.text.slice(0,200)}...</p>
          </div>
        ))}
      </div>
    </section>
  )
}

src/components/Footer.jsx
export default function Footer(){
  return (
    <footer className="py-8 text-center text-gray-500">
      © {new Date().getFullYear()} Idan David-Aviv — contact: idaneurosc@gmail.com
    </footer>
  )
}

שלב F — חיבור ה-assets והתאמות סופיות

הסוכן יצטרך:

למקם את ה-hero images ב־website/public/assets/hero_2560x1440.jpg וכן noise.png (ניתן ליצור ב-Photoshop או עם small generated noise).

להעתיק data/cv_parsed.json לתיקיית website/src/data/cv_parsed.json (או לשרת end-point).

לבצע בדיקות: npm install, npm run dev ולהראות preview link (localhost) + produce build.

שלב G — אופטימיזציה ופריסה

הוראות לפריסה ל־Vercel/Netlify:

בנה build עם npm run build.

דחוף את התיקייה ל־Git (create repo), התחבר ל־Vercel, קבע build command: npm run build ו־publish: dist (Vite builds to dist).

ודא שה-public/assets נכללים.

אם הסוכן יכול — צרף קישור דמו (preview).

שלב H — בדיקות איכות (QA)

הסוכן יריץ סדרת בדיקות אוטומטיות קצרות:

האם ה-hero cover נטען בשלוש רזולוציות?

האם טקסט הקריטי לקריאות (contrast) עומד ביחס 4.5:1? (בדיקה ויזואלית פשוטה או כלי contrast).

האם יש console errors ב־npm run dev?

האם הקבצים יצאו ל־dist/?

שלב I — מסירת חבילה וסיכום

הסוכן יחזיר חבילה ארוזה (website_package.zip) עם:

כל קבצי המקור (src, public)

README.md עם הוראות build והפצה

assets/ עם שלוש תמונות hero (optimized)

data/cv_parsed.json

log של כל השלבים שבוצעו וגרסאות/seed של תמונות שנוצרו

README example (לכלול בקצץ):

# Idan homepage — build artifacts

## Local dev
npm install
npm run dev

## Build
npm run build
npm run preview

## Deploy
Push to Git and connect to Vercel.

סיכום המשימות המדויקות שהסוכן צריך לבצע (steps list — Execute in order)

להריץ tools/extract_cv.py לקבלת data/cv_parsed.json.

לבנות data/symbol_map.json מתוך הפלט.

להפיק 3 פרומפטים מפורטים ליצירת hero images (sizes specified).

לקרוא ל־image API שבשימוש (אם אפשרויות: DALL·E / SD / Midjourney) — להפעיל עם הפרומפטים עד לקבלת תוצאה מספקת. לשמור תמונות. (אם אין גישה — להחזיר פרומטים מדויקים והמלצות לפאראטרים).

להשוות בין Image A ל-Image B, לבצע composite כפי שהוגדר (שמור על path מ-A, אחוז שקיפות/overlay).

ליצור פרויקט React+Tailwind בתיקיית website/ עם הקבצים שסופקו (התאמות מקומיות: import path to cv json).

להכניס את ה-assets לתיקייה המתאימה ולהריץ dev build.

להריץ QA, לתקן בעיות קטנות (contrast, mobile scaling).

לארוז את התיקייה ולהציג artifact להורדה + סיכום ביצועי המשימה.

הערות חשובות ל־Claude (איך לפעול אם אין יכולת מסויימת)

אם אין חיבור ל-image generation API — תרשום את כל הפרומפטים, seed, ופרמטרים והצע קובץ image_generation_instructions.txt עם ההוראות המדויקות (להרצה ידנית).

אם אין יכולת לערוך תמונות (composite) — תווצר הוראות Imagemagick/Photoshop מדויקות + אפשרות לשלוח ליצרן חיצוני.

כל קובץ שנוצר יש לשים ב-zip ולספק לינק הורדה או לחזור עם base64 של קבצים גדולים אם נדרש.

חבילת deploy-ready (מה להחזיר אלי אחרי ריצה)

website_package.zip (או git repo link)

פרוט: אילו תמונות נוצרו (names + sizes + seed/metadata)

קובץ logs/steps.log עם פלט כל פקודה

README.md עם הוראות פריסה ו־env variables אם נדרש

סיום — תבנית הודעת סטטוס (הסוכן יחזור עם זה מיד אחרי ריצה)
STATUS: COMPLETE | PARTIAL | FAILED
STEPS_DONE: [1,2,3,...]
ARTIFACTS:
 - website_package.zip (size MB) -> /path/or/download-link
 - assets/hero_2560x1440.jpg -> seed: XXXX, prompt-file: prompts/image_prompts.json
NOTES: any issues or manual steps remaining.