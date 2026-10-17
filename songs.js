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
//   explainer:{audio, notebook, note, dialogue:[{who:0|1, he, en}]}, // הסבר-השיחה: קובץ שמע מ-NotebookLM, או שיחה שהדפדפן מקריא
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
    explainer: {
      audio: "", notebook: "", note: "",
      dialogue: [
        { who: 0, he: "שלום, אני נועה, ואיתי איתי. היום נדבר על Take On Me של להקת a-ha.", en: "Hi, I'm Noa, and with me is Itai. Today we're talking about Take On Me by a-ha." },
        { who: 1, he: "שיר שכל מי ששומע את הפתיחה בקלידים מזהה מיד. אבל רוב האנשים לא יודעים כמה קשה היה לו להצליח.", en: "Everyone recognizes that keyboard opening right away. But most people don't know how hard it was for this song to make it." },
        { who: 0, he: "נתחיל ביוצרים. שלושה חברים צעירים מנורווגיה: פול וואקטאר-סבוי בגיטרה, מאגנה פורוהולמן בקלידים, ומורטן הרקט בשירה.", en: "Let's start with the creators. Three young friends from Norway: Paul Waaktaar-Savoy on guitar, Magne Furuholmen on keyboards, and Morten Harket on vocals." },
        { who: 1, he: "והם החליטו לעבור ללונדון, כי האמינו שרק משם אפשר לכבוש את העולם.", en: "And they decided to move to London, because they believed that was the only place to conquer the world from." },
        { who: 0, he: "הריף המפורסם בכלל התחיל כרעיון ישן של מאגנה, עוד מהלהקה הקודמת שלהם. הם לקחו אותו וכתבו סביבו שיר חדש.", en: "The famous riff actually started as an old idea of Magne's, from their previous band. They took it and wrote a new song around it." },
        { who: 1, he: "ופה מתחיל הסיפור המעניין. הגרסה הראשונה יצאה ב-1984 ונכשלה. הקליטו אותה מחדש עם מפיק אחר, אלן טרני, וגם זה לא ממש הצליח בהתחלה.", en: "And this is where it gets interesting. The first version came out in 1984 and flopped. They re-recorded it with another producer, Alan Tarney, and at first that didn't really take off either." },
        { who: 0, he: "מה שהפך את הכל היה הקליפ. הבמאי סטיב בארון שילב צילום אמיתי עם ציורי עיפרון, טכניקה שנקראת רוטוסקופיה.", en: "What changed everything was the music video. Director Steve Barron mixed live action with pencil drawings, a technique called rotoscoping." },
        { who: 1, he: "בקליפ, בחורה בבית קפה נשאבת לתוך קומיקס, והגיבור המצויר נלחם כדי לצאת איתה לעולם האמיתי. ב-MTV לא הפסיקו לשדר אותו.", en: "In the video, a young woman in a café gets pulled into a comic book, and the drawn hero fights to get out with her into the real world. MTV played it constantly." },
        { who: 0, he: "ובאוקטובר 1985 השיר הגיע למקום הראשון בארצות הברית. להקה מנורווגיה, בראש המצעד האמריקאי.", en: "And in October 1985 the song hit number one in the United States. A band from Norway, at the top of the American chart." },
        { who: 1, he: "אז על מה השיר בעצם? זה שיר אהבה של בחור ביישן שמבקש: תני לי צ'אנס, גם אם זה אולי לא יחזיק מעמד.", en: "So what is the song actually about? It's a love song from a shy guy asking: give me a chance, even if it might not last." },
        { who: 0, he: "והמוזיקה מספרת את זה. הקצב מהיר ושמח, אבל יש בו גם התרגשות ופחד. והשירה של מורטן מטפסת בפזמון לצליל גבוה במיוחד, כמו לב שקופץ.", en: "And the music tells that story. The beat is fast and happy, but there's excitement and fear in it too. Morten's voice climbs to a very high note in the chorus, like a heart jumping." },
        { who: 1, he: "הצליל הזה הוא אתגר מוכר לכל מי שמנסה לשיר את השיר בקריוקי.", en: "That note is a famous challenge for anyone who tries it at karaoke." },
        { who: 0, he: "השיר גם הפך לאחד הקאברים האהובים. יש לו גרסאות אקוסטיות, גרסאות פאנק, ו-a-ha עצמם הקליטו גרסה שקטה ואיטית בהופעה אקוסטית.", en: "It's also become a favorite to cover. There are acoustic versions, punk versions, and a-ha themselves recorded a slow, quiet version in an acoustic concert." },
        { who: 1, he: "והקליפ המקורי עבר ביוטיוב את המיליארד צפיות, עשרות שנים אחרי שיצא.", en: "And the original video passed a billion views on YouTube, decades after it came out." },
        { who: 0, he: "אז בפעם הבאה שאתם שומעים את הפתיחה הזו, תזכרו: שיר שנכשל פעמיים, והצליח בזכות ציורי עיפרון.", en: "So next time you hear that opening, remember: a song that failed twice, and made it thanks to pencil drawings." },
        { who: 1, he: "תודה שהקשבתם. עכשיו לחצו על הנגן, ונסו לשיר את הפזמון בלופ.", en: "Thanks for listening. Now press play, and try singing the chorus in a loop." }
      ]
    },
    covers: [],
    sheets: [],
    sections: []
  }
];
