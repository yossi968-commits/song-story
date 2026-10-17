(() => {
  "use strict";

  // ---------- אחסון מקומי (בטוח גם כשהדפדפן חוסם) ----------
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v == null ? fallback : JSON.parse(v); }
      catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* מצב פרטי */ }
    }
  };

  // ---------- שפות הממשק ----------
  const LANG_NAMES = { he: { he: "עברית", en: "Hebrew" }, en: { he: "אנגלית", en: "English" } };
  const I18N = {
    he: {
      brand: "הסיפור של השיר", navLib: "הספרייה", navAdd: "הוספת שיר",
      foot: "השירים מושמעים מתוך YouTube ו-Vimeo בלבד. האתר לא שומר קובצי שמע, מילים מלאות, תרגומים מלאים או תווים מלאים, אלא מקשר למקורות שלהם.",
      libTitle: "הספרייה שלי", libLead: "כל שיר הוא עמוד אחד: האזנה, הסיפור שמאחוריו, תרגום, לימוד בלופ, קאברים ואקורדים.",
      exploreTitle: "איזה שיר נחקור היום?", explorePh: "הדביקו קישור לשיר ב-YouTube או ב-Vimeo", exploreGo: "יאללה",
      exploreLoading: "טוען את פרטי השיר…", exploreBad: "זה לא נראה כמו קישור לסרטון ב-YouTube או ב-Vimeo",
      exploreFail: "לא הצלחתי לקרוא את פרטי הסרטון. השלימו את השם והמבצע כאן.",
      askClaude: "את הסיפור, המשמעות וההסבר בשיחה ממלאים עם Claude Code: אמרו לו \"חקור את השיר\" והדביקו את הקישור.",
      search: "חיפוש שיר, אמן או סגנון", all: "הכל", mine: "נוסף על ידיי", noResults: "לא נמצאו שירים.", addNew: "הוסיפו שיר חדש",
      notFound: "השיר לא נמצא.", back: "→ חזרה לספרייה",
      nowOrig: "מתנגן: הביצוע המקורי", nowCover: "מתנגן: ", backToOrig: "חזרה למקור", openIn: "פתיחה ב-",
      trTitle: (l) => `תרגום ל${l}`,
      trLead: (l) => `השיר לא ב${l}, ולכן הכתוביות בנגן מוצגות מתורגמות ל${l} (תרגום אוטומטי של YouTube, כשהוא זמין). המילים המלאות והתרגום שלהן נמצאים באתרים שיש להם רישיון.`,
      meaning: "על מה השיר", trPage: (l) => `המילים מתורגמות ל${l} (Google Translate)`, trOrig: "המילים במקור",
      trCommunity: "תרגומים של מאזינים ב-LyricsTranslate", trLicensed: "תרגום מוכן",
      captionsOn: "הכתוביות המתורגמות פועלות", captionsOff: "הצגת כתוביות מתורגמות", captionsHide: "הסתרת הכתוביות",
      story: "הסיפור של השיר", noStory: "עוד לא נכתב סיפור לשיר הזה.",
      explainer: "הסבר בשיחה של 2 דקות", openNotebook: "פתיחת המחברת ב-NotebookLM",
      noExplainer: "עוד אין הסבר מוקלט. הסקיל song-explainer-notebooklm ב-Claude Code מכין אותו ב-NotebookLM ושומר אותו כאן.",
      learn: "לימוד בלופ", learnLead: "בוחרים קטע, והנגן חוזר עליו שוב ושוב עם הפסקה קצרה בין חזרה לחזרה, כדי שתספיקו לשיר אחריו.",
      start: "התחלה", end: "סוף", now: "עכשיו", gap: "הפסקה בין חזרות (שניות)", reps: "מספר חזרות (0 = בלי הגבלה)", speed: "מהירות", normal: "רגילה",
      loopGo: "הפעלת לופ", loopStop: "עצירה", loopStopped: "הלופ נעצר", loopBad: "הסוף צריך להיות אחרי ההתחלה",
      rep: (n, of) => `חזרה ${n}${of ? " מתוך " + of : ""}`, pause: "הפסקה… עכשיו תורכם", done: (n) => `סיימתם ${n} חזרות`,
      subs: "כתוביות ללימוד", subsHint: "אם התרגום האוטומטי לא מופיע, ב-YouTube בוחרים בגלגל השיניים: כתוביות ← תרגום אוטומטי ← השפה הרצויה.",
      mySubs: "כתוביות משלי, מתחת לנגן (שמורות רק בדפדפן הזה)",
      mySubsHint: "מדביקים קובץ LRC או SRT שיש לכם זכות להשתמש בו, למשל כזה שכתבתם בעצמכם. האתר לא מפרסם אותו.",
      subsOrig: "שורות המקור", subsTrans: "התרגום שלי", saveSubs: "שמירה והצגה", savedSubs: (a, b) => `נשמרו ${a} שורות מקור ו-${b} שורות תרגום`,
      lyrics: "מילים", lyricsLead: "המילים עצמן נמצאות באתרים שיש להם רישיון.",
      genius: "Genius: מילים והסברים לשורות", shironet: "שירונט: מילים לשירים בעברית",
      covers: "קאברים וביצועים נוספים", noCovers: "עוד לא נשמרו קאברים לשיר הזה.", playHere: "ניגון כאן",
      ytCovers: "חיפוש קאברים ב-YouTube", shs: "כל הגרסאות ב-SecondHandSongs", addCover: "הוספת קאבר",
      performer: "מבצע", videoLink: "קישור YouTube או Vimeo", add: "הוספה", coverBad: "צריך שם מבצע וקישור תקין מ-YouTube או מ-Vimeo",
      chords: "תווים ואקורדים", piano: "פסנתר", guitar: "גיטרה", drums: "תופים",
      msSheet: "MuseScore (תווים)", chordify: "Chordify (אקורדים לפי הסרטון)", tab4u: "Tab4u (שירים בעברית)", songsterr: "Songsterr (טאבים לתופים)", msDrums: "MuseScore תופים",
      mineTitle: "השיר הזה נוסף על ידיי", del: "מחיקת השיר מהדפדפן", delConfirm: "לחיצה נוספת תמחק",
      addTitle: "הוספת שיר",
      addNotice: "בשלב הזה שיר חדש נשמר רק בדפדפן שלכם. בכפתור הייצוא מקבלים קובץ שאפשר להוסיף לספרייה הכללית. בהמשך תתווסף שמירה משותפת, כדי שכל המשתמשים יוכלו להוסיף שירים.",
      fUrl: "קישור לשיר ב-YouTube או ב-Vimeo", fTitle: "שם השיר", fArtist: "מבצע", fYear: "שנה", fTags: "תגיות (מופרדות בפסיק)", fTagsPh: "רוק, שנות ה-80",
      fLang: "שפת השיר", fLyrics: "קישור למילים באתר מורשה (לא חובה)", fStory: "הסיפור של השיר, במילים שלכם", fExplainer: "קישור להסבר-שיחה מ-NotebookLM (לא חובה)", fExplainerPh: "קישור לקובץ שמע או למחברת",
      save: "שמירת השיר", badUrl: "הקישור צריך להיות לסרטון ב-YouTube או ב-Vimeo", missing: "חסרים שם השיר או המבצע",
      backup: "גיבוי ושיתוף", export: "ייצוא השירים שלי", import: "ייבוא קובץ", exported: (n) => `יוצאו ${n} שירים`, imported: (n) => `נוספו ${n} שירים`, importBad: "הקובץ לא נקרא. צריך קובץ JSON שיוצא מהאתר הזה."
    },
    en: {
      brand: "Song's Story", navLib: "Library", navAdd: "Add a song",
      foot: "Songs play from YouTube and Vimeo only. This site stores no audio files, full lyrics, full translations or full sheet music; it links to their sources.",
      libTitle: "My library", libLead: "Every song is one page: listen, the story behind it, translation, loop practice, covers and chords.",
      exploreTitle: "Which song shall we explore today?", explorePh: "Paste a YouTube or Vimeo link to a song", exploreGo: "Explore",
      exploreLoading: "Loading song details…", exploreBad: "That doesn't look like a YouTube or Vimeo video link",
      exploreFail: "Couldn't read the video details. Fill in the title and performer here.",
      askClaude: "The story, meaning and conversation explainer are filled in with Claude Code: tell it \"explore this song\" and paste the link.",
      search: "Search a song, artist or style", all: "All", mine: "Added by me", noResults: "No songs found.", addNew: "Add a new song",
      notFound: "Song not found.", back: "← Back to library",
      nowOrig: "Playing: original recording", nowCover: "Playing: ", backToOrig: "Back to original", openIn: "Open in ",
      trTitle: (l) => `${l} translation`,
      trLead: (l) => `This song isn't in ${l}, so the player's captions are shown translated to ${l} (YouTube auto-translate, when available). Full lyrics and their translations live on licensed sites.`,
      meaning: "What the song is about", trPage: (l) => `Lyrics translated to ${l} (Google Translate)`, trOrig: "Original lyrics",
      trCommunity: "Listener translations on LyricsTranslate", trLicensed: "Ready translation",
      captionsOn: "Translated captions are on", captionsOff: "Show translated captions", captionsHide: "Hide captions",
      story: "The story of the song", noStory: "No story written for this song yet.",
      explainer: "2-minute conversation", openNotebook: "Open the notebook in NotebookLM",
      noExplainer: "No recorded explainer yet. The song-explainer-notebooklm skill in Claude Code makes one in NotebookLM and saves it here.",
      learn: "Loop practice", learnLead: "Pick a section and the player repeats it with a short pause between rounds, so you can sing it back.",
      start: "Start", end: "End", now: "Now", gap: "Pause between rounds (sec)", reps: "Rounds (0 = no limit)", speed: "Speed", normal: "Normal",
      loopGo: "Start loop", loopStop: "Stop", loopStopped: "Loop stopped", loopBad: "End must be after start",
      rep: (n, of) => `Round ${n}${of ? " of " + of : ""}`, pause: "Pause… your turn", done: (n) => `Finished ${n} rounds`,
      subs: "Practice captions", subsHint: "If auto-translate doesn't show, in YouTube open the gear: Subtitles → Auto-translate → your language.",
      mySubs: "My own captions under the player (saved only in this browser)",
      mySubsHint: "Paste an LRC or SRT file you have the right to use, such as one you wrote. The site doesn't publish it.",
      subsOrig: "Original lines", subsTrans: "My translation", saveSubs: "Save and show", savedSubs: (a, b) => `Saved ${a} original and ${b} translated lines`,
      lyrics: "Lyrics", lyricsLead: "The lyrics themselves live on licensed sites.",
      genius: "Genius: lyrics and line annotations", shironet: "Shironet: Hebrew song lyrics",
      covers: "Covers and other versions", noCovers: "No covers saved for this song yet.", playHere: "Play here",
      ytCovers: "Search covers on YouTube", shs: "All versions on SecondHandSongs", addCover: "Add a cover",
      performer: "Performer", videoLink: "YouTube or Vimeo link", add: "Add", coverBad: "Needs a performer and a valid YouTube or Vimeo link",
      chords: "Sheet music and chords", piano: "Piano", guitar: "Guitar", drums: "Drums",
      msSheet: "MuseScore (sheet music)", chordify: "Chordify (chords from the video)", tab4u: "Tab4u (Hebrew songs)", songsterr: "Songsterr (drum tabs)", msDrums: "MuseScore drums",
      mineTitle: "I added this song", del: "Delete song from this browser", delConfirm: "Click again to delete",
      addTitle: "Add a song",
      addNotice: "For now a new song is saved only in your browser. Export gives you a file that can be added to the main library. Shared saving, so everyone can add songs, comes later.",
      fUrl: "YouTube or Vimeo link", fTitle: "Song title", fArtist: "Performer", fYear: "Year", fTags: "Tags (comma separated)", fTagsPh: "rock, 80s",
      fLang: "Song language", fLyrics: "Link to lyrics on a licensed site (optional)", fStory: "The story of the song, in your words", fExplainer: "NotebookLM explainer link (optional)", fExplainerPh: "Audio file or notebook link",
      save: "Save song", badUrl: "The link must be a YouTube or Vimeo video", missing: "Song title or performer is missing",
      backup: "Backup and sharing", export: "Export my songs", import: "Import file", exported: (n) => `Exported ${n} songs`, imported: (n) => `Added ${n} songs`, importBad: "Couldn't read the file. Use a JSON file exported from this site."
    }
  };

  const view = document.getElementById("view");
  let ui = store.get("uiLang", (navigator.language || "he").startsWith("he") ? "he" : "en");
  if (!I18N[ui]) ui = "he";
  let T = I18N[ui];
  // שדה טקסט בשיר יכול להיות מחרוזת או {he, en}
  const tx = (v) => v == null ? "" : typeof v === "string" ? v : (v[ui] ?? v.he ?? v.en ?? "");

  function applyLang() {
    T = I18N[ui];
    document.documentElement.lang = ui;
    document.documentElement.dir = ui === "he" ? "rtl" : "ltr";
    document.title = T.brand;
    document.getElementById("brand").textContent = T.brand;
    document.getElementById("navLib").textContent = T.navLib;
    document.getElementById("navAdd").textContent = T.navAdd;
    document.getElementById("foot").textContent = T.foot;
    document.querySelectorAll("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === ui)));
  }
  document.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => {
    ui = b.dataset.lang; store.set("uiLang", ui); applyLang(); render();
  }));

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const enc = encodeURIComponent;
  const fmt = (t) => { t = Math.max(0, Math.floor(t || 0)); return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`; };
  const parseTime = (s) => {
    s = String(s).trim();
    if (s.includes(":")) { const [m, sec] = s.split(":"); return (+m || 0) * 60 + (+sec || 0); }
    return +s || 0;
  };
  const ext = (href, label) => `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(label)}</a>`;

  // ---------- שירים ----------
  const mySongs = () => store.get("mySongs", []);
  const allSongs = () => [...window.SONGS, ...mySongs().map((s) => ({ ...s, mine: true }))];
  const findSong = (id) => allSongs().find((s) => s.id === id);

  function parseVideo(url) {
    url = String(url || "").trim();
    let m = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/);
    if (m) return { provider: "youtube", id: m[1] };
    m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (m) return { provider: "vimeo", id: m[1] };
    return null;
  }
  const videoUrl = (v) => v.provider === "youtube" ? `https://www.youtube.com/watch?v=${v.id}` : `https://vimeo.com/${v.id}`;
  const thumbUrl = (v) => v.provider === "youtube" ? `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg` : `https://vumbnail.com/${v.id}.jpg`;
  const providerName = (v) => v.provider === "youtube" ? "YouTube" : "Vimeo";

  // ---------- נגן אחיד ל-YouTube ול-Vimeo ----------
  let ytReady;
  function loadYouTubeApi() {
    if (ytReady) return ytReady;
    ytReady = new Promise((resolve) => {
      if (window.YT && window.YT.Player) return resolve();
      window.onYouTubeIframeAPIReady = resolve;
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
    });
    return ytReady;
  }

  // captions: null = כבוי, אחרת { from: שפת השיר, to: שפת היעד }
  async function createPlayer(box, video, captions) {
    box.innerHTML = "<div></div>";
    const el = box.firstChild;
    if (video.provider === "youtube") {
      await loadYouTubeApi();
      const p = await new Promise((resolve) => {
        const yt = new YT.Player(el, {
          videoId: video.id,
          playerVars: { rel: 0, playsinline: 1, hl: ui, cc_lang_pref: captions ? captions.to : ui, cc_load_policy: captions ? 1 : 0 },
          events: {
            onReady: () => resolve(yt),
            // תרגום אוטומטי של הכתוביות: אפשרות לא מתועדת של YouTube, ולכן בניסיון בלבד
            onApiChange: () => {
              if (!captions || captions.from === captions.to) return;
              try {
                yt.setOption("captions", "track", { languageCode: captions.from, translationLanguage: { languageCode: captions.to } });
              } catch { /* ייתכן שאין כתוביות לסרטון */ }
            }
          }
        });
      });
      return {
        play: () => p.playVideo(),
        pause: () => p.pauseVideo(),
        seek: (t) => p.seekTo(t, true),
        time: async () => p.getCurrentTime() || 0,
        rate: (r) => p.setPlaybackRate(r),
        destroy: () => p.destroy()
      };
    }
    const p = new Vimeo.Player(el, { id: +video.id, responsive: false, width: 640 });
    if (captions) p.enableTextTrack(captions.to).catch(() => p.enableTextTrack(captions.from).catch(() => {}));
    return {
      play: () => p.play().catch(() => {}),
      pause: () => p.pause().catch(() => {}),
      seek: (t) => p.setCurrentTime(t).catch(() => {}),
      time: () => p.getCurrentTime().catch(() => 0),
      rate: (r) => p.setPlaybackRate(r).catch(() => {}),
      destroy: () => p.destroy().catch(() => {})
    };
  }

  // ---------- כתוביות שהמשתמש מדביק (LRC או SRT) ----------
  function parseSubs(text) {
    const out = [];
    const lines = String(text || "").split(/\r?\n/);
    const lrc = /^\[(\d+):(\d+(?:\.\d+)?)\](.*)$/;
    if (lines.some((l) => lrc.test(l.trim()))) {
      for (const l of lines) {
        const m = l.trim().match(lrc);
        if (m) out.push({ t: +m[1] * 60 + +m[2], text: m[3].trim() });
      }
    } else {
      const srtTime = /(\d+):(\d+):(\d+)[,.](\d+)\s*-->/;
      for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(srtTime);
        if (!m) continue;
        const t = +m[1] * 3600 + +m[2] * 60 + +m[3] + +m[4] / 1000;
        const body = [];
        while (lines[i + 1] && lines[i + 1].trim()) body.push(lines[++i].trim());
        out.push({ t, text: body.join(" ") });
      }
    }
    return out.sort((a, b) => a.t - b.t);
  }
  const lineAt = (subs, t) => { let cur = null; for (const s of subs) { if (s.t <= t) cur = s; else break; } return cur; };

  // ---------- ניווט ----------
  let cleanup = [];
  function runCleanup() { cleanup.forEach((f) => { try { f(); } catch {} }); cleanup = []; }
  window.addEventListener("hashchange", render);

  function render() {
    runCleanup();
    const hash = location.hash.replace(/^#\/?/, "");
    const [page, id] = hash.split("/");
    if (page === "song" && id) return renderSong(decodeURIComponent(id));
    if (page === "add") return renderAdd();
    renderLibrary();
  }

  // ---------- חקירת שיר מקישור ----------
  // שם ומבצע מגיעים מ-oEmbed: של Vimeo ישירות, של YouTube דרך noembed.com (שניהם חינמיים ומאפשרים CORS)
  async function fetchMeta(video) {
    const url = encodeURIComponent(videoUrl(video));
    const api = video.provider === "vimeo" ? `https://vimeo.com/api/oembed.json?url=${url}` : `https://noembed.com/embed?url=${url}`;
    const res = await fetch(api);
    const data = await res.json();
    if (!data || !data.title) throw new Error("no title");
    let title = data.title.replace(/\s*[\(\[][^\)\]]*(official|video|audio|lyric|clip|hd|4k|remaster|קליפ|רשמי)[^\)\]]*[\)\]]/gi, "").trim();
    let artist = (data.author_name || "").replace(/\s*-\s*Topic$/i, "").replace(/VEVO$/i, "").trim();
    const parts = title.split(/\s+[-–—|]\s+/);
    if (parts.length >= 2) { artist = parts[0].trim(); title = parts.slice(1).join(" - ").trim(); }
    return { title, artist };
  }

  async function explore(raw, msg) {
    const video = parseVideo(raw);
    if (!video) { msg.textContent = T.exploreBad; return; }
    const existing = allSongs().find((s) => s.video.provider === video.provider && s.video.id === video.id);
    if (existing) { location.hash = `#/song/${enc(existing.id)}`; return; }
    msg.textContent = T.exploreLoading;
    let meta;
    try { meta = await fetchMeta(video); }
    catch { store.set("addDraft", { url: videoUrl(video) }); location.hash = "#/add"; return; }
    const song = newSong({ video, title: meta.title, artist: meta.artist, language: /[\u0590-\u05FF]/.test(meta.title + meta.artist) ? "he" : "en" });
    store.set("mySongs", [...mySongs(), song]);
    location.hash = `#/song/${enc(song.id)}`;
  }

  function newSong(f) {
    return {
      id: `${f.title}-${f.artist}`.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "") + "-" + Date.now().toString(36),
      title: f.title, artist: f.artist, year: f.year, language: f.language || "en", tags: f.tags || [],
      video: f.video, lyricsUrl: f.lyricsUrl, story: f.story || "", explainer: f.explainer || {},
      creators: [], covers: [], sheets: [], sections: []
    };
  }

  // ---------- ספרייה ----------
  function renderLibrary() {
    const songs = allSongs();
    const tags = [...new Set(songs.flatMap((s) => (s.tags || []).map(tx)))];
    let activeTag = store.get("libTag", "");
    if (!tags.includes(activeTag)) activeTag = "";
    let q = "";
    view.innerHTML = `
      <form class="explore" id="explore" novalidate>
        <label for="exUrl"><h1>${T.exploreTitle}</h1></label>
        <div class="explore-row">
          <input id="exUrl" type="url" dir="ltr" placeholder="${esc(T.explorePh)}">
          <button class="btn" type="submit">${T.exploreGo}</button>
        </div>
        <span class="hint" id="exMsg"></span>
      </form>
      <section class="lib-head">
        <div>
          <h2>${T.libTitle}</h2>
          <p>${T.libLead}</p>
        </div>
        <input id="q" class="search" type="search" placeholder="${esc(T.search)}">
      </section>
      <div class="tags-bar" id="tags"></div>
      <section class="grid" id="grid"></section>`;
    const grid = view.querySelector("#grid");
    const tagsEl = view.querySelector("#tags");
    const draw = () => {
      tagsEl.innerHTML = ["", ...tags].map((t) =>
        `<button class="chip" data-tag="${esc(t)}" aria-pressed="${t === activeTag}">${t ? esc(t) : T.all}</button>`).join("");
      const list = songs.filter((s) => {
        const st = (s.tags || []).map(tx);
        return (!activeTag || st.includes(activeTag)) &&
          (!q || `${s.title} ${s.artist} ${st.join(" ")}`.toLowerCase().includes(q));
      });
      grid.innerHTML = list.length ? list.map((s) => `
        <a class="card" href="#/song/${enc(s.id)}">
          <div class="thumb" style="background-image:url('${thumbUrl(s.video)}')"></div>
          <div class="card-body">
            <h3 dir="auto">${esc(s.title)}</h3>
            <span class="meta" dir="auto">${esc(s.artist)}${s.year ? " · " + esc(s.year) : ""}</span>
            ${s.mine ? `<span class="mine">${T.mine}</span>` : ""}
          </div>
        </a>`).join("") : `<p class="hint">${T.noResults} <a href="#/add">${T.addNew}</a>.</p>`;
    };
    tagsEl.addEventListener("click", (e) => {
      const b = e.target.closest("[data-tag]"); if (!b) return;
      activeTag = b.dataset.tag; store.set("libTag", activeTag); draw();
    });
    view.querySelector("#q").addEventListener("input", (e) => { q = e.target.value.trim().toLowerCase(); draw(); });
    view.querySelector("#explore").addEventListener("submit", (e) => { e.preventDefault(); explore(view.querySelector("#exUrl").value, view.querySelector("#exMsg")); });
    draw();
  }

  // ---------- עמוד שיר ----------
  async function renderSong(id) {
    const song = findSong(id);
    if (!song) { view.innerHTML = `<p class="song-head">${T.notFound} <a href="#/">${T.back}</a></p>`; return; }
    const q = `${song.title} ${song.artist}`;
    const subsKey = `subs:${song.id}`;
    const savedSubs = store.get(subsKey, { orig: "", trans: "" });
    const extraCovers = store.get(`covers:${song.id}`, []);
    const covers = [...(song.covers || []), ...extraCovers];
    const ex = song.explainer || {};
    const songLang = song.language || "he";
    const needsTranslation = songLang !== ui;
    const targetIn = LANG_NAMES[ui][ui];
    const licensedTr = song.translations && song.translations[ui];

    const translatePanel = needsTranslation ? `
      <section class="panel translate-first" id="translate">
        <h2>${esc(T.trTitle(targetIn))}</h2>
        <p class="hint">${esc(T.trLead(targetIn))}</p>
        <button class="btn small" id="capToggle"></button>
        ${tx(song.meaning) ? `<h3>${T.meaning}</h3><p>${esc(tx(song.meaning))}</p>` : ""}
        <ul class="list">
          ${licensedTr ? `<li>${ext(licensedTr, T.trLicensed)}</li>` : ""}
          ${song.lyricsUrl ? `<li>${ext(`https://translate.google.com/translate?sl=${songLang}&tl=${ui}&u=${enc(song.lyricsUrl)}`, T.trPage(targetIn))}</li>` : ""}
          <li>${ext(`https://lyricstranslate.com/en/site-search?query=${enc(q)}`, T.trCommunity)}</li>
        </ul>
      </section>` : "";

    view.innerHTML = `
      <section class="song-head">
        <a href="#/" class="hint">${T.back}</a>
        <h1 dir="auto">${esc(song.title)}</h1>
        <div class="meta"><span dir="auto">${esc(song.artist)}</span>${song.year ? " · " + esc(song.year) : ""}${(song.tags || []).length ? " · " + song.tags.map((t) => esc(tx(t))).join(" · ") : ""}</div>
      </section>
      <div class="song-layout">
        <div class="stage">
          <div class="player-box" id="player"></div>
          <div class="row">
            <span class="now-playing" id="nowPlaying">${T.nowOrig}</span>
            <button class="btn ghost small" id="backToOrig" hidden>${T.backToOrig}</button>
            ${ext(videoUrl(song.video), T.openIn + providerName(song.video)).replace("<a ", '<a class="btn ghost small" ')}
          </div>
          <div class="subs" id="subsBox" hidden><div class="orig" id="subOrig" dir="auto"></div><div class="trans" id="subTrans" dir="auto"></div></div>
        </div>

        <div class="tools">
          ${translatePanel}

          <section class="panel" id="story">
            <h2>${T.story}</h2>
            ${tx(song.story) ? `<p>${esc(tx(song.story))}</p>` : `<p class="hint">${T.noStory} ${T.askClaude}</p>`}
            ${!needsTranslation && tx(song.meaning) ? `<h3>${T.meaning}</h3><p>${esc(tx(song.meaning))}</p>` : ""}
            ${(song.creators || []).length ? `<ul class="creators">${song.creators.map((c) => `<li><b>${esc(tx(c.name))}</b> · ${esc(tx(c.role))}</li>`).join("")}</ul>` : ""}
          </section>

          <section class="panel" id="explainer">
            <h2>${T.explainer}</h2>
            ${ex.audio ? `<audio controls preload="none" src="${esc(ex.audio)}"></audio>` : ""}
            ${ex.notebook ? ext(ex.notebook, T.openNotebook) : ""}
            ${!ex.audio && !ex.notebook ? `<p class="hint">${T.noExplainer}</p>` : ""}
            ${tx(ex.note) ? `<p class="hint">${esc(tx(ex.note))}</p>` : ""}
          </section>

          <section class="panel" id="learn">
            <h2>${T.learn}</h2>
            <p class="hint">${T.learnLead}</p>
            ${(song.sections || []).length ? `<div class="row">${song.sections.map((s, i) => `<button class="chip" data-sec="${i}">${esc(tx(s.label))}</button>`).join("")}</div>` : ""}
            <div class="loop-grid">
              <label>${T.start}<span class="val"><input id="loopA" value="0:00" dir="ltr"><button class="btn ghost small" id="markA">${T.now}</button></span></label>
              <label>${T.end}<span class="val"><input id="loopB" value="0:20" dir="ltr"><button class="btn ghost small" id="markB">${T.now}</button></span></label>
              <label>${T.gap}<input id="gap" type="number" min="0" max="30" value="3"></label>
              <label>${T.reps}<input id="reps" type="number" min="0" max="99" value="0"></label>
              <label>${T.speed}
                <select id="rate"><option value="0.5">0.5</option><option value="0.75">0.75</option><option value="1" selected>${T.normal}</option></select>
              </label>
            </div>
            <div class="row">
              <button class="btn" id="loopStart">${T.loopGo}</button>
              <button class="btn ghost" id="loopStop">${T.loopStop}</button>
              <span class="loop-status" id="loopStatus"></span>
            </div>
          </section>

          <section class="panel" id="subtitles">
            <h2>${T.subs}</h2>
            ${needsTranslation ? "" : `<button class="btn ghost small" id="capToggle"></button>`}
            <p class="hint">${T.subsHint}</p>
            <details>
              <summary>${T.mySubs}</summary>
              <p class="hint">${T.mySubsHint}</p>
              <label>${T.subsOrig}<textarea id="subOrigIn" dir="auto" placeholder="[00:12.0] ...">${esc(savedSubs.orig)}</textarea></label>
              <label>${T.subsTrans}<textarea id="subTransIn" dir="auto" placeholder="[00:12.0] ...">${esc(savedSubs.trans)}</textarea></label>
              <div class="row"><button class="btn small" id="saveSubs">${T.saveSubs}</button><span class="hint" id="subsMsg"></span></div>
            </details>
          </section>

          <section class="panel" id="lyrics">
            <h2>${T.lyrics}</h2>
            <p class="hint">${T.lyricsLead}</p>
            <ul class="list">
              ${song.lyricsUrl ? `<li>${ext(song.lyricsUrl, T.trOrig)}</li>` : ""}
              <li>${ext(`https://genius.com/search?q=${enc(q)}`, T.genius)}</li>
              ${songLang === "he" ? `<li>${ext(`https://shironet.mako.co.il/search?q=${enc(q)}`, T.shironet)}</li>` : ""}
            </ul>
          </section>

          <section class="panel" id="covers">
            <h2>${T.covers}</h2>
            ${covers.length ? `<ul class="list">${covers.map((c, i) => `<li><span dir="auto"><b>${esc(c.performer)}</b>${c.year ? " · " + esc(c.year) : ""}</span>
              <button class="btn small" data-cover="${i}">${T.playHere}</button></li>`).join("")}</ul>` : `<p class="hint">${T.noCovers}</p>`}
            <div class="row">
              ${ext(`https://www.youtube.com/results?search_query=${enc(q + " cover")}`, T.ytCovers)}
              ${ext(`https://secondhandsongs.com/search/work?title=${enc(song.title)}`, T.shs)}
            </div>
            <details>
              <summary>${T.addCover}</summary>
              <div class="row"><input id="coverWho" placeholder="${esc(T.performer)}"><input id="coverUrl" dir="ltr" placeholder="${esc(T.videoLink)}"><button class="btn small" id="addCover">${T.add}</button></div>
              <span class="hint" id="coverMsg"></span>
            </details>
          </section>

          <section class="panel" id="chords">
            <h2>${T.chords}</h2>
            <div class="inst">
              <div><h3>${T.piano}</h3><ul>
                <li>${ext(`https://musescore.com/sheetmusic?text=${enc(q)}`, T.msSheet)}</li>
                <li>${ext(`https://chordify.net/search/${enc(q)}`, T.chordify)}</li>
              </ul></div>
              <div><h3>${T.guitar}</h3><ul>
                <li>${ext(`https://www.ultimate-guitar.com/search.php?search_type=title&value=${enc(q)}`, "Ultimate Guitar")}</li>
                ${songLang === "he" ? `<li>${ext(`https://www.tab4u.com/resultsSimple?tab=songs&q=${enc(song.title)}`, T.tab4u)}</li>` : ""}
              </ul></div>
              <div><h3>${T.drums}</h3><ul>
                <li>${ext(`https://www.songsterr.com/?pattern=${enc(q)}`, T.songsterr)}</li>
                <li>${ext(`https://musescore.com/sheetmusic?text=${enc(q + " drums")}`, T.msDrums)}</li>
              </ul></div>
            </div>
            ${(song.sheets || []).length ? `<ul class="list">${song.sheets.map((s) => `<li>${ext(s.url, tx(s.label))}</li>`).join("")}</ul>` : ""}
          </section>

          ${song.mine ? `<section class="panel"><h2>${T.mineTitle}</h2>
            <div class="row"><button class="btn ghost small" id="delSong">${T.del}</button></div></section>` : ""}
        </div>
      </div>`;

    const $ = (s) => view.querySelector(s);
    let alive = true;
    cleanup.push(() => { alive = false; });

    // נגן. כששפת השיר שונה משפת האתר, הכתוביות המתורגמות נדלקות מעצמן.
    let player = null;
    let current = song.video;
    let captionsOn = needsTranslation;
    const capBtn = $("#capToggle");
    const drawCapBtn = () => { capBtn.textContent = captionsOn ? T.captionsHide : T.captionsOff; };
    async function load(video) {
      if (player) player.destroy();
      player = null;
      const p = await createPlayer($("#player"), video, captionsOn ? { from: songLang, to: ui } : null);
      if (!alive) { p.destroy(); return; }
      player = p;
      player.rate(+$("#rate").value);
    }
    cleanup.push(() => player && player.destroy());
    drawCapBtn();
    load(current);
    capBtn.addEventListener("click", () => { captionsOn = !captionsOn; drawCapBtn(); load(current); });

    // לופ
    let loop = null;
    const status = $("#loopStatus");
    const stopLoop = (msg = "") => { if (loop) { clearInterval(loop.timer); clearTimeout(loop.wait); } loop = null; status.textContent = msg; };
    cleanup.push(() => stopLoop());
    view.querySelectorAll("[data-sec]").forEach((b) => b.addEventListener("click", () => {
      const s = song.sections[+b.dataset.sec];
      $("#loopA").value = fmt(s.start); $("#loopB").value = fmt(s.end);
    }));
    $("#markA").addEventListener("click", async () => { if (player) $("#loopA").value = fmt(await player.time()); });
    $("#markB").addEventListener("click", async () => { if (player) $("#loopB").value = fmt(await player.time()); });
    $("#rate").addEventListener("change", () => player && player.rate(+$("#rate").value));
    $("#loopStop").addEventListener("click", () => { stopLoop(T.loopStopped); player && player.pause(); });
    $("#loopStart").addEventListener("click", () => {
      if (!player) return;
      const a = parseTime($("#loopA").value), b = parseTime($("#loopB").value);
      if (!(b > a)) { status.textContent = T.loopBad; return; }
      const gap = Math.max(0, +$("#gap").value || 0) * 1000;
      const reps = Math.max(0, +$("#reps").value || 0);
      stopLoop();
      loop = { count: 1, waiting: false };
      const show = () => status.textContent = `${T.rep(loop.count, reps)} · ${fmt(a)}–${fmt(b)}`;
      player.seek(a); player.play(); show();
      loop.timer = setInterval(async () => {
        if (!loop || loop.waiting || !player) return;
        const t = await player.time();
        if (!loop || t < b) return;
        player.pause();
        if (reps && loop.count >= reps) { stopLoop(T.done(reps)); return; }
        loop.waiting = true;
        status.textContent = T.pause;
        loop.wait = setTimeout(() => {
          if (!loop) return;
          loop.count++; loop.waiting = false;
          player.seek(a); player.play(); show();
        }, gap);
      }, 200);
    });

    // כתוביות משלי
    let subsO = parseSubs(savedSubs.orig), subsT = parseSubs(savedSubs.trans);
    const box = $("#subsBox");
    const subTick = setInterval(async () => {
      if (!player || (!subsO.length && !subsT.length)) { box.hidden = true; return; }
      box.hidden = false;
      const t = await player.time();
      $("#subOrig").textContent = lineAt(subsO, t)?.text || "";
      $("#subTrans").textContent = lineAt(subsT, t)?.text || "";
    }, 250);
    cleanup.push(() => clearInterval(subTick));
    $("#saveSubs").addEventListener("click", () => {
      const orig = $("#subOrigIn").value, trans = $("#subTransIn").value;
      store.set(subsKey, { orig, trans });
      subsO = parseSubs(orig); subsT = parseSubs(trans);
      $("#subsMsg").textContent = T.savedSubs(subsO.length, subsT.length);
    });

    // קאברים
    view.querySelectorAll("[data-cover]").forEach((b) => b.addEventListener("click", () => {
      const c = covers[+b.dataset.cover];
      current = c.video; stopLoop(); load(current);
      $("#nowPlaying").textContent = T.nowCover + c.performer;
      $("#backToOrig").hidden = false;
    }));
    $("#backToOrig").addEventListener("click", () => {
      current = song.video; stopLoop(); load(current);
      $("#nowPlaying").textContent = T.nowOrig;
      $("#backToOrig").hidden = true;
    });
    $("#addCover").addEventListener("click", () => {
      const video = parseVideo($("#coverUrl").value);
      const performer = $("#coverWho").value.trim();
      if (!video || !performer) { $("#coverMsg").textContent = T.coverBad; return; }
      store.set(`covers:${song.id}`, [...extraCovers, { performer, video }]);
      render();
    });

    const del = $("#delSong");
    if (del) del.addEventListener("click", () => {
      if (del.dataset.armed) {
        store.set("mySongs", mySongs().filter((s) => s.id !== song.id));
        location.hash = "#/";
      } else { del.dataset.armed = "1"; del.textContent = T.delConfirm; }
    });
  }

  // ---------- הוספת שיר ----------
  function renderAdd() {
    view.innerHTML = `
      <form class="form" id="addForm" novalidate>
        <h1>${T.addTitle}</h1>
        <p class="notice">${T.addNotice}</p>
        <label>${T.fUrl}<input id="fUrl" dir="ltr" required placeholder="https://www.youtube.com/watch?v=..."></label>
        <div class="two">
          <label>${T.fTitle}<input id="fTitle" dir="auto" required></label>
          <label>${T.fArtist}<input id="fArtist" dir="auto" required></label>
          <label>${T.fYear}<input id="fYear" type="number" min="1900" max="2100"></label>
          <label>${T.fLang}<select id="fLang"><option value="he">${LANG_NAMES.he[ui]}</option><option value="en">${LANG_NAMES.en[ui]}</option></select></label>
        </div>
        <label>${T.fTags}<input id="fTags" dir="auto" placeholder="${esc(T.fTagsPh)}"></label>
        <label>${T.fLyrics}<input id="fLyrics" dir="ltr" placeholder="https://..."></label>
        <label>${T.fStory}<textarea id="fStory" dir="auto"></textarea></label>
        <label>${T.fExplainer}<input id="fExplainer" dir="ltr" placeholder="${esc(T.fExplainerPh)}"></label>
        <div class="row"><button class="btn" type="submit">${T.save}</button><span class="hint" id="fMsg"></span></div>
        <hr>
        <h2>${T.backup}</h2>
        <div class="row">
          <button class="btn ghost" type="button" id="exportBtn">${T.export}</button>
          <label class="btn ghost">${T.import}<input type="file" id="importFile" accept="application/json" hidden></label>
          <span class="hint" id="ioMsg"></span>
        </div>
      </form>`;
    const $ = (s) => view.querySelector(s);
    const draft = store.get("addDraft", null);
    if (draft && draft.url) { $("#fUrl").value = draft.url; $("#fMsg").textContent = T.exploreFail; store.set("addDraft", null); }
    $("#addForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const video = parseVideo($("#fUrl").value);
      const title = $("#fTitle").value.trim(), artist = $("#fArtist").value.trim();
      if (!video) { $("#fMsg").textContent = T.badUrl; return; }
      if (!title || !artist) { $("#fMsg").textContent = T.missing; return; }
      const exUrl = $("#fExplainer").value.trim();
      const story = $("#fStory").value.trim();
      const song = newSong({
        title, artist, video,
        year: +$("#fYear").value || undefined,
        language: $("#fLang").value,
        tags: $("#fTags").value.split(",").map((t) => t.trim()).filter(Boolean),
        lyricsUrl: $("#fLyrics").value.trim() || undefined,
        story: story ? { [ui]: story } : "",
        explainer: !exUrl ? {} : /\.(mp3|m4a|wav|ogg)(\?|$)/i.test(exUrl) ? { audio: exUrl } : { notebook: exUrl }
      });
      store.set("mySongs", [...mySongs(), song]);
      location.hash = `#/song/${enc(song.id)}`;
    });
    $("#exportBtn").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(mySongs(), null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = "my-songs.json"; a.click();
      $("#ioMsg").textContent = T.exported(mySongs().length);
    });
    $("#importFile").addEventListener("change", async (e) => {
      try {
        const list = JSON.parse(await e.target.files[0].text());
        const ids = new Set(mySongs().map((s) => s.id));
        const fresh = list.filter((s) => s && s.id && s.video && !ids.has(s.id));
        store.set("mySongs", [...mySongs(), ...fresh]);
        $("#ioMsg").textContent = T.imported(fresh.length);
      } catch { $("#ioMsg").textContent = T.importBad; }
    });
  }

  applyLang();
  render();
})();
