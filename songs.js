// ספריית השירים. כל שיר הוא אובייקט אחד; שירים שמוסיפים דרך האתר נשמרים בדפדפן
// ואפשר לייצא אותם ולהדביק לכאן.
// חשוב: לא שומרים כאן מילים מלאות, תרגום מלא של המילים או תווים מלאים (זכויות יוצרים).
// רק קישורים, טקסט מקורי שכתבנו (סיפור, משמעות), ונקודות זמן בסרטון.
//
// שדות טקסט יכולים להיות מחרוזת אחת או { he: "...", en: "..." } לאתר הדו-לשוני.
// מבנה שיר:
// { id, title, artist, year, language:"he"|"en", tags[], video:{provider:"youtube"|"vimeo", id},
//   lyricsUrl,                                     // מילים באתר מורשה
//   translations:{ he: url, en: url },             // קישור לתרגום מורשה, אם יש
//   creators:[{name, role}], story, meaning,       // meaning = תקציר המשמעות במילים שלנו
//   explainer:{audio, notebook, note},             // הסבר-השיחה מ-NotebookLM
//   covers:[{performer, year, video:{provider,id}}],
//   sheets:[{label, url}],
//   sections:[{label, start, end}] }               // קטעים ללימוד בלופ, בשניות
window.SONGS = [
  {
    id: "take-on-me",
    title: "Take On Me",
    artist: "a-ha",
    year: 1985,
    language: "en",
    tags: [{ he: "סינת'-פופ", en: "Synth-pop" }, { he: "שנות ה-80", en: "80s" }, { he: "נורווגיה", en: "Norway" }],
    video: { provider: "youtube", id: "djV11Xbc914" },
    lyricsUrl: "",
    translations: {},
    creators: [
      { name: { he: "פול וואקטאר-סבוי", en: "Paul Waaktaar-Savoy" }, role: { he: "כתיבה, גיטרה", en: "Writer, guitar" } },
      { name: { he: "מאגנה פורוהולמן", en: "Magne Furuholmen" }, role: { he: "כתיבה, קלידים (הריף המפורסם)", en: "Writer, keyboards (the famous riff)" } },
      { name: { he: "מורטן הרקט", en: "Morten Harket" }, role: { he: "כתיבה, שירה", en: "Writer, vocals" } },
      { name: { he: "אלן טרני", en: "Alan Tarney" }, role: { he: "הפקת הגרסה המוכרת (1985)", en: "Producer of the hit version (1985)" } },
      { name: { he: "סטיב בארון", en: "Steve Barron" }, role: { he: "בימוי הקליפ", en: "Music video director" } }
    ],
    story: {
      he: "להקה נורווגית צעירה שעברה ללונדון כדי להצליח. השיר יצא לראשונה ב-1984 ונכשל, הוקלט מחדש ונכשל שוב, " +
        "ורק הגרסה השלישית, יחד עם קליפ שמשלב צילום אמיתי עם ציורי עיפרון (רוטוסקופיה), הפכה ללהיט עולמי ולמקום הראשון בארצות הברית ב-1985. " +
        "הריף של הקלידים נבנה מרעיון ישן של פורוהולמן, והשירה של הרקט מטפסת לצליל גבוה במיוחד בפזמון. " +
        "הקליפ זכה בכמה פרסי MTV והוא מהקליפים הנצפים ביותר משנות ה-80.",
      en: "A young Norwegian band moved to London to make it. The song first came out in 1984 and flopped, was re-recorded and flopped again. " +
        "Only the third version, paired with a video that mixes live action with pencil-sketch animation (rotoscoping), became a worldwide hit and a US number one in 1985. " +
        "The keyboard riff grew from an old idea of Furuholmen's, and Harket's vocal climbs to an unusually high note in the chorus. " +
        "The video won several MTV awards and is one of the most watched videos of the 1980s."
    },
    meaning: {
      he: "שיר אהבה של בחור ביישן שמבקש מהאהובה לתת לו הזדמנות, למרות שהוא יודע שזה אולי לא יחזיק מעמד. " +
        "הקליפ מספר את אותו סיפור: בחורה נשאבת לעולם של קומיקס, והגיבור המצויר נאבק כדי לצאת אליה לעולם האמיתי.",
      en: "A love song from a shy young man asking someone to give him a chance, even though he knows it might not last. " +
        "The video tells the same story: a young woman is pulled into a comic book, and the drawn hero fights his way out to reach her in the real world."
    },
    explainer: { audio: "", notebook: "", note: "" },
    covers: [],
    sheets: [],
    sections: []
  }
];
