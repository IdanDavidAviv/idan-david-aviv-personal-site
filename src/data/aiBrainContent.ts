/**
 * Single Source of Truth (SSOT) for Business AI Brain Content
 * Consumed by:
 * 1. React client components (/ai-brain)
 * 2. Prerender script (scripts/prerender.ts -> semantic HTML for crawlers & bots)
 * 3. AI Markdown Twin generator (scripts/generate-ai-artifacts.ts -> /ai-brain.md)
 * 4. CI Parity Gatekeeper (scripts/ai-audit.ts)
 */

export interface StationStep {
  number: string;
  tag: string;
  title: string;
  description: string;
}

export interface BentoCard {
  title: string;
  subtitle: string;
  items: Array<{ title: string; desc: string }>;
}

export const aiBrainContent = {
  meta: {
    title: 'מוח AI לעסקים — ארכיטקטורת נתוני אמת וסוכנים | עידן דוד אביב',
    description: 'ארכיטקטורת Business AI Brain ריבונית המחברת את כל הידע והמערכות של העסק למנועי AI עם 100% נתוני אמת וללא הזיות.',
  },

  hero: {
    title: 'מוח AI מותאם אישית לעסק',
    subtitle: 'Business AI Brain',
    lead: 'ארכיטקטורת נתוני אמת וסוכנים אוטונומיים שמכירה את העסק שלכם מבפנים, ומאפשרת לכם לפעול מהר יותר, על בסיס נתוני האמת שלכם ובשליטה מלאה.',
    chatHook: {
      preTitle: 'רוצים לראות דוגמה?',
      title: 'הנה צ\'אט עם סוכן AI עם המוח העסקי',
    },
    cta: 'בואו נמפה את מוח ה-AI לעסק שלכם',
    whatsappCta: 'פשוט דברו איתי בוואטסאפ',
  },

  problem: {
    title: 'הבעיה: הפיצול והזיות ה-AI הגנרי',
    description: 'שימוש ב-ChatGPT או Claude רגיל מנותק מנהלי העסק, המחירונים וה-CRM, וגורם להזיות ולבזבוז שעות עבודה.',
  },

  solution: {
    title: 'הפתרון: מוח עסקי ריבוני (Sovereign Brain)',
    description: 'חיבור ישיר של Google Drive, Monday, Excel, ומערכות CRM למנועי שפה מתקדמים עם 100% נתוני אמת ואפס הזיות.',
  },

  bento: {
    headline: {
      line1: 'אוקיי אז',
      line2: 'מה זה בתכלס?',
    },
    subtitle: {
      line1: 'סך הכול שלושה חלקים: הזיכרון של העסק, החיבור למערכות שלכם',
      line2: 'ומערכת הנחיות לשליטה מלאה.',
    },
    cards: [
      {
        id: 'brain',
        title: 'הזיכרון העסקי',
        subtitle: 'המסמכים, הנהלים והידע שלכם',
        badge: 'המוח',
        items: [
          { title: 'הקשר עסקי מלא', desc: 'הגדרת תחומי הפעילות, השירותים וקהלי היעד של העסק.' },
          { title: 'סטנדרטים ונהלי עבודה', desc: 'תהליכים מוגדרים שמבטיחים פעולה מסונכרנת ומדויקת.' },
          { title: 'עדכון שוטף וגמיש', desc: 'מערכת חיה שמתפתחת יחד איתכם ומתעדכנת לפי הצורך.' },
          { title: 'זיכרון של כל שלב בדרך', desc: 'תיעוד היסטוריית השינויים המאפשר לפעול בביטחון ולשחזר גרסאות.' },
        ],
      },
      {
        id: 'pipelines',
        title: 'מערכות ומקורות מידע קיימים',
        subtitle: 'חיבור ישיר לכלים שאתם כבר עובדים איתם',
        badge: 'חיבורים ומידע',
        items: [
          { title: 'הצלבה וניתוח נתונים', desc: 'בודק את נתוני האמת מול נהלי העבודה ומבין את התמונה המלאה.' },
          { title: 'סיכום והצעות לביצוע', desc: 'מציג תמצית חדה של המצב יחד עם כיוון פעולה מומלץ להמשך.' },
          { title: 'הכנת תוצרים מוכנים', desc: 'מנסח מראש את הסיכום, המשימה או העדכון למערכת.' },
        ],
      },
      {
        id: 'governance',
        title: 'מערכת הנחיות סוכן עסקי',
        subtitle: 'שליטה מלאה באופן שבו הסוכן פועל',
        badge: 'משילות ובקרה',
        items: [
          { title: 'שליטה מלאה בידיים שלכם', desc: 'כל עדכון במערכות וכל פנייה החוצה מתבצעים אך ורק באישורכם.' },
          { title: 'שקיפות מקורות מלאה', desc: 'הסוכן מציג את הנתונים והנהלים שעליהם התבסס לבקשתכם.' },
          { title: 'אישור במילה אחת בצ\'אט', desc: 'כותבים לו "מאושר" בשיחה — והפעולה מתבצעת מיד.' },
        ],
      },
    ],
  },

  stepper: {
    title: 'תהליך ההטמעה בשלושה שלבים',
    stations: [
      {
        number: '01',
        tag: 'שיחה ראשונית',
        title: 'מבינים מה העסק צריך',
        description: 'בשיחה ממוקדת נבין יחד את תהליכי העבודה ומקורות המידע, ונבדוק האם ואיך נכון לבנות עבורכם מוח AI בעל אימפקט תפעולי ממשי.',
      },
      {
        number: '02',
        tag: 'ללא הפרעה',
        title: 'מחברים את המערכות',
        description: 'בזמן שהעסק פועל כרגיל אנחנו מקימים את מערכת המוח ומחברים אותה למערכות העסקיות שלכם.',
      },
      {
        number: '03',
        tag: 'יוצאים לדרך',
        title: 'מתחילים לעבוד עם הסוכן',
        description: 'מחברים את מוח ה-AI ישירות לאייג\'נט שאתם כבר מכירים, או שעוזרים לכם לבחור אחד שמתאים יותר לצרכים שלכם, ויוצאים לדרך.',
      },
    ],
  },

  conversion: {
    cta: 'בואו נמפה את מוח ה-AI לעסק שלכם',
    mobileCta: 'מיפוי מוח AI לעסק',
    calendlyUrl: 'https://calendly.com/idandavidaviv/discovery',
    whatsappUrl: 'https://wa.me/972545585590',
    whatsappPhone: '054-5585590',
  },
};
