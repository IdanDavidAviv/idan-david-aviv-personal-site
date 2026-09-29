---
name: business_ai_brain_manifesto
description: The definitive Source of Truth for the "Why", 4 architectural layers, conversion UX, and copywriting behind the Business AI Brain offering (/services).
---

# Business AI Brain Manifesto & Architecture

> [!NOTE]
> This skill serves as the definitive Source of Truth (SSOT) for the commercial arm and business AI advisory services of Idan David Aviv ("מוח AI לעסק").
> **ROUTING MANDATE:** Whenever translating this offering into site copy, marketing funnels, or Call-to-Actions (CTAs), the agent MUST route the operation through the [`manifesto_router`](../manifesto_router/SKILL.md) skill to ensure deep alignment and premium aesthetics without leaking internal mechanics.

---

## 🏛️ The Triad Architecture (מבנה שלושת הרבדים של הידע)

הידע של השירות מאורגן בשלושה מסמכי ייחוס מובחנים תחת תיקיית `references/`, ללא כפילויות וללא סתירות:

```text
references/
├── 01_business_ai_brain_services_manifesto.md   # הרובד האסטרטגי: המוצר וההצעה העסקית (מה מוכרים)
├── 02_effective_landing_page_visual_ux.md       # רובד החוויה: חזון ה-UX ופילוסופיית ההמרה (הפסיכולוגיה)
└── 03_services_sections_spec.md                 # רובד המימוש: מפרט המקטעים והקופי המדויק לקוד (הביצוע)
```

### 1. [01_business_ai_brain_services_manifesto.md](references/01_business_ai_brain_services_manifesto.md)
* **תפקיד:** מגדיר את *הקונספט והמוצר עצמו*:
  * הצעת הערך המרכזית: לבנות לעסק מוח AI אמין שמכיר אותו מבפנים ופועל על 100% נתוני אמת.
  * **ארבעת הרבדים:**
    1. המוח והזיכרון (The Knowledge Brain & DNA).
    2. הצנרת וחיבור הכלים (Pipelines & Tool Integrations).
    3. הנחיות הפעלה וביצוע (Operational Intelligence).
    4. משילות ושער האישור האנושי (Governance & Human-in-the-Loop).
  * תהליך הלקוח הפשוט (1-2-3 Stepper): מיפוי ➔ בנייה מאחורי הקלעים ➔ עלייה לאוויר.
  * מדיניות פרטיות ואבטחה: נושא אימון המודלים נידון פרטנית בשיחה לפי סוג המנוי של הלקוח ואינו מועמס בדף הראשי.

### 2. [02_effective_landing_page_visual_ux.md](references/02_effective_landing_page_visual_ux.md)
* **תפקיד:** מגדיר את *עקרונות העיצוב וחוויית המשתמש הממירה*:
  * "להמחיש את הבלתי-נראה" — המוצר הוא לא אפליקציה חדשה אלא מוח שמתלבש על הצ'אט שהלקוח כבר מכיר (ChatGPT, Claude, Gemini).
  * עקרון ה-"Show, Don't Tell" — הדמיית צ'אט חיה עם תגיות אמינות (`[✓ מקור]`, `[✓ CRM]`).
  * חוויית מגע חיה (Tactile Feedback) — כפתור אישור שמגיב בלחיצה וממחיש שהשליטה תמיד בידי המנהל.
  * בנטו-גריד אסימטרי לשבירת שעמום ויזואלי והובלת עין ב-F-Pattern.
  * סרגל מובייל צף (Floating Sticky CTA) להמרה מיידית בגלילה.
  * שפה ויזואלית: Dark Core (`#050510`), Glassmorphism, אפס איורי רובוטים מצועצעים, תאימות RTL מלאה.

### 3. [03_services_sections_spec.md](references/03_services_sections_spec.md)
* **תפקיד:** ה-Blueprint המעשי למימוש הקוד של [`ServicesPage.tsx`](file:///c:/Users/Idan4/Desktop/idan-david-aviv-personal-site/src/pages/ServicesPage.tsx):
  * מפרט מילה במילה בעברית של כל 6 המקטעים:
    1. Hero Section + הדמיית צ'אט (2 תרחישים + תגובת כפתור + פס תאימות סוכנים).
    2. כרטיסי הניגוד (3 כרטיסי Split: לפני ➔ אחרי).
    3. בנטו-גריד 3 עמודי התווך של המערכת.
    4. ציר הזמן 1-2-3.
    5. תיאום ציפיות (Reality Check) נקי ממשחקי מכירה.
    6. תיבת ההמרה והסגירה (Calendly + WhatsApp).
    7. סרגל צף תחתון במובייל.

---

## 🎯 שפת המותג וטון הדיבור (Tone of Voice & Anti-Bullshit Rules)

כאשר סוכן כותב תוכן, קוד או מענה הקשור לשירות זה, עליו לדבוק בחוקי הברזל הבאים:

1. **שפת אדם לא מתפלספת (Plain Business Language)**:
   * איסור מוחלט על סיסמאות מנופחות ("מהפכה דיגיטלית", "שיבוש", "טרנספורמציה").
   * מדברים בגובה העיניים, פשוט וישיר: סדר, שקט בראש, תשובות מעוגנות בעובדות, חיסכון בשעות עבודה, אפס שינוי הרגלים.
2. **אפס משחקי מכירה (Anti-Sales Gimmicks)**:
   * "מי שרוצה ייקח, בלי לבלבל את השכל".
   * ללא טיימרים של דחיפות מזויפת, ללא מבחני סינון מלאכותיים ("אם ענית כן על 2 מתוך 4"), וללא הבטחות שווא.
3. **יושרה מקצועית (Intellectual Honesty)**:
   * שיחת המיפוי הראשונה (30 דק') היא קודם כל בדיקת היתכנות כנה. אם העסק לא מוכן — אומרים לו את זה ישר.
4. **עקרון השליטה של המנהל (Human-in-the-Loop)**:
   * תמיד להדגיש: הסוכן מכין, מציג וממתין — שום פעולה לא יוצאת ללא אישור מפורש של המנהל בצ'אט.

---

## 🧭 מתי ניגשים לאיזה מסמך? (Agent Execution Matrix)

| משימת הסוכן | המסמך שאליו יש לגשת |
|---|---|
| כתיבת קוד / רכיבי UI / תיקוני סטיילינג ל-`/services` | [`references/03_services_sections_spec.md`](references/03_services_sections_spec.md) |
| הוספת עמודי נחיתה חדשים / עיצוב רכיבי המרה | [`references/02_effective_landing_page_visual_ux.md`](references/02_effective_landing_page_visual_ux.md) |
| יצירת תוכן שיווקי, כתיבת Case Studies, ניסוח CTAs | [`references/01_business_ai_brain_services_manifesto.md`](references/01_business_ai_brain_services_manifesto.md) + [`manifesto_router`](../manifesto_router/SKILL.md) |
| יישור קו נרטיבי של כלל האתר | קריאת מסמך זה (`SKILL.md`) + [`idan_core_blueprint`](../idan_core_blueprint/SKILL.md) |
