/* =========================================================
   C++ Notebook ✨ — App Logic
   ========================================================= */

(function () {
  'use strict';

  const STORAGE = {
    progress: 'cppnb.progress',
    bookmarks: 'cppnb.bookmarks',
    theme: 'cppnb.theme',
    last: 'cppnb.lastLesson',
    sound: 'cppnb.sound',
    palette: 'cppnb.palette',
    style: 'cppnb.style',
    petals: 'cppnb.petals',
    hearts: 'cppnb.hearts',
    cursor: 'cppnb.cursor'
  };

  /* ===========================================================
     🔊 CUTE SOUND ENGINE — Web Audio API (no external files)
     =========================================================== */
  const Sound = (function () {
    let ctx = null;
    let enabled = localStorage.getItem(STORAGE.sound) !== 'off';
    let masterGain = null;

    function ensureCtx() {
      if (!ctx) {
        try {
          ctx = new (window.AudioContext || window.webkitAudioContext)();
          masterGain = ctx.createGain();
          masterGain.gain.value = 0.18;
          masterGain.connect(ctx.destination);
        } catch (e) { /* unsupported */ }
      }
      if (ctx && ctx.state === 'suspended') ctx.resume();
      return ctx;
    }

    function tone(freq, dur = 0.12, type = 'sine', vol = 1, attack = 0.005) {
      if (!enabled) return;
      ensureCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      const t = ctx.currentTime;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(vol, t + attack);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(gain).connect(masterGain);
      osc.start(t);
      osc.stop(t + dur + 0.02);
      return osc;
    }

    function slide(fromFreq, toFreq, dur = 0.18, type = 'triangle', vol = 1) {
      if (!enabled) return;
      ensureCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      const t = ctx.currentTime;
      osc.frequency.setValueAtTime(fromFreq, t);
      osc.frequency.exponentialRampToValueAtTime(toFreq, t + dur);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(vol, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(gain).connect(masterGain);
      osc.start(t);
      osc.stop(t + dur + 0.02);
    }

    return {
      isOn: () => enabled,
      toggle() {
        enabled = !enabled;
        localStorage.setItem(STORAGE.sound, enabled ? 'on' : 'off');
        if (enabled) this.click();
        return enabled;
      },
      // tiny pop on hover
      hover() { tone(880, 0.05, 'sine', 0.3); },
      // soft cute click
      click() {
        slide(700, 1000, 0.08, 'triangle', 0.6);
      },
      // page flip whoosh
      flip() {
        slide(400, 900, 0.18, 'sine', 0.5);
        setTimeout(() => slide(900, 600, 0.12, 'triangle', 0.4), 90);
      },
      // boop for mascot
      boop() {
        slide(600, 1200, 0.08, 'sine', 0.7);
        setTimeout(() => slide(1200, 800, 0.1, 'sine', 0.5), 70);
      },
      // success chime — happy little melody 💕
      success() {
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C, E, G, C
        notes.forEach((f, i) => setTimeout(() => tone(f, 0.18, 'triangle', 0.7), i * 90));
        setTimeout(() => tone(1318.51, 0.4, 'sine', 0.5), notes.length * 90);
      },
      // bookmark sparkle
      sparkle() {
        const notes = [1046.5, 1318.51, 1568];
        notes.forEach((f, i) => setTimeout(() => tone(f, 0.08, 'sine', 0.5), i * 50));
      },
      // soft toast pop
      pop() { tone(1200, 0.06, 'sine', 0.5); }
    };
  })();
  window.__cppSound = Sound;

  // ----- DOM refs -----
  const $ = (sel) => document.querySelector(sel);
  const lessonList = $('#lessonList');
  const lessonView = $('#lessonView');
  const search = $('#search');
  const progressBar = $('#progressBar');
  const progressText = $('#progressText');
  const progressMessage = $('#progressMessage');
  const themeToggle = $('#themeToggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');
  const menuBtn = $('#menuBtn');
  const sidebar = $('#sidebar');
  const backdrop = $('#backdrop');
  const prevBtn = $('#prevBtn');
  const nextBtn = $('#nextBtn');
  const completeBtn = $('#completeBtn');
  const resetBtn = $('#resetBtn');
  const toast = $('#toast');
  const confettiCanvas = $('#confetti');

  // ----- State -----
  const lessons = window.LESSONS;
  let progress = loadJSON(STORAGE.progress, {});
  let bookmarks = loadJSON(STORAGE.bookmarks, {});
  let currentId = localStorage.getItem(STORAGE.last) || null;
  let filterTerm = '';

  // ----- Theme -----
  function initTheme() {
    const saved = localStorage.getItem(STORAGE.theme);
    const theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(theme);
  }
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem(STORAGE.theme, theme);
  }
  themeToggle.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    applyTheme(cur === 'dark' ? 'light' : 'dark');
    Sound.click();
  });

  // ----- Sound toggle -----
  const soundToggle = document.getElementById('soundToggle');
  const soundIcon = soundToggle.querySelector('.sound-icon');
  function refreshSoundUI() {
    if (Sound.isOn()) {
      soundToggle.classList.remove('muted');
      soundIcon.textContent = '🔊';
    } else {
      soundToggle.classList.add('muted');
      soundIcon.textContent = '🔇';
    }
  }
  refreshSoundUI();
  soundToggle.addEventListener('click', () => {
    Sound.toggle();
    refreshSoundUI();
    showToast(Sound.isOn() ? 'sound on 🔊' : 'sound off 🔇');
  });

  /* ===== 🎨 Palette / Style drawer ===== */
  const paletteToggle = document.getElementById('paletteToggle');
  const paletteDrawer = document.getElementById('paletteDrawer');
  const paletteClose  = document.getElementById('paletteClose');
  const paletteGrid   = document.getElementById('paletteGrid');
  const styleGrid     = document.getElementById('styleGrid');
  const togglePetals  = document.getElementById('togglePetals');
  const toggleHearts  = document.getElementById('toggleHearts');
  const toggleCursor  = document.getElementById('toggleCursor');

  function applyPalette(name) {
    if (!name || name === 'sakura') {
      document.documentElement.removeAttribute('data-palette');
    } else {
      document.documentElement.setAttribute('data-palette', name);
    }
    localStorage.setItem(STORAGE.palette, name || 'sakura');
    paletteGrid.querySelectorAll('.swatch').forEach(s => {
      s.classList.toggle('active', s.dataset.palette === (name || 'sakura'));
    });
  }
  function applyStyle(name) {
    if (!name || name === 'crayon') {
      document.documentElement.removeAttribute('data-style');
    } else {
      document.documentElement.setAttribute('data-style', name);
    }
    localStorage.setItem(STORAGE.style, name || 'crayon');
    styleGrid.querySelectorAll('.style-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.style === (name || 'crayon'));
    });
  }

  paletteGrid.querySelectorAll('.swatch').forEach((sw) => {
    sw.addEventListener('click', () => {
      applyPalette(sw.dataset.palette);
      Sound.sparkle();
      showToast(`palette: ${sw.dataset.palette} 🌸`);
    });
  });
  styleGrid.querySelectorAll('.style-chip').forEach((c) => {
    c.addEventListener('click', () => {
      applyStyle(c.dataset.style);
      Sound.sparkle();
      showToast(`vibe: ${c.dataset.style} ✨`);
    });
  });

  function openDrawer() {
    paletteDrawer.classList.add('open');
    paletteDrawer.setAttribute('aria-hidden', 'false');
    Sound.click();
  }
  function closeDrawer() {
    paletteDrawer.classList.remove('open');
    paletteDrawer.setAttribute('aria-hidden', 'true');
  }
  paletteToggle.addEventListener('click', () => {
    paletteDrawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });
  paletteClose.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && paletteDrawer.classList.contains('open')) closeDrawer();
  });

  /* ----- Extras toggles (petals / hearts / cursor) ----- */
  function loadBool(key, defaultVal = true) {
    const v = localStorage.getItem(key);
    if (v === null) return defaultVal;
    return v === 'true';
  }
  const petalsOn = loadBool(STORAGE.petals, true);
  const heartsOn = loadBool(STORAGE.hearts, true);
  const cursorOn = loadBool(STORAGE.cursor, true);
  togglePetals.checked = petalsOn;
  toggleHearts.checked = heartsOn;
  toggleCursor.checked = cursorOn;

  function applyExtras() {
    if (window.__cppEffects) {
      window.__cppEffects.setPetals(togglePetals.checked);
      window.__cppEffects.setHearts(toggleHearts.checked);
      window.__cppEffects.setCursor(toggleCursor.checked);
    }
    localStorage.setItem(STORAGE.petals, togglePetals.checked);
    localStorage.setItem(STORAGE.hearts, toggleHearts.checked);
    localStorage.setItem(STORAGE.cursor, toggleCursor.checked);
  }
  [togglePetals, toggleHearts, toggleCursor].forEach(t => {
    t.addEventListener('change', () => {
      applyExtras();
      Sound.click();
    });
  });

  // initial apply
  applyPalette(localStorage.getItem(STORAGE.palette) || 'sakura');
  applyStyle(localStorage.getItem(STORAGE.style) || 'crayon');
  applyExtras();

  // ----- Sidebar mobile toggle -----
  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    backdrop.classList.toggle('show');
  });
  backdrop.addEventListener('click', closeSidebar);
  function closeSidebar() {
    sidebar.classList.remove('open');
    backdrop.classList.remove('show');
  }

  // ----- Search -----
  search.addEventListener('input', (e) => {
    filterTerm = e.target.value.toLowerCase().trim();
    renderLessonList();
  });

  // ----- Reset -----
  resetBtn.addEventListener('click', () => {
    if (!confirm('really reset all your progress? 🥺')) return;
    progress = {};
    bookmarks = {};
    saveAll();
    renderAll();
    showToast('progress reset! fresh start 🌱');
  });

  // ----- Render: lesson list -----
  function renderLessonList() {
    lessonList.innerHTML = '';
    const filtered = lessons.filter((l) => {
      if (!filterTerm) return true;
      const haystack = (
        l.title + ' ' + l.tagline + ' ' +
        (l.sections || []).map(s => (s.title || '') + ' ' + (s.body || '') + ' ' + (s.code || '')).join(' ')
      ).toLowerCase();
      return haystack.includes(filterTerm);
    });

    if (filtered.length === 0) {
      const li = document.createElement('li');
      li.style.fontFamily = "'Caveat', cursive";
      li.style.fontSize = '20px';
      li.style.textAlign = 'center';
      li.style.color = 'var(--ink-soft)';
      li.style.padding = '12px';
      li.textContent = 'no matches… try another word 🙈';
      lessonList.appendChild(li);
      return;
    }

    filtered.forEach((lesson, idx) => {
      const realIdx = lessons.indexOf(lesson);
      const li = document.createElement('li');
      li.className = 'lesson-item';
      if (currentId === lesson.id) li.classList.add('active');
      if (progress[lesson.id]) li.classList.add('completed');
      if (bookmarks[lesson.id]) li.classList.add('bookmarked');

      li.innerHTML = `
        <span class="num"><span>${realIdx + 1}</span></span>
        <span class="title-text">${escapeHtml(lesson.title)}</span>
        <span class="bookmark">${bookmarks[lesson.id] ? '🔖' : '📍'}</span>
      `;
      li.addEventListener('click', () => {
        showLesson(lesson.id);
        closeSidebar();
      });
      lessonList.appendChild(li);
    });
  }

  // ----- Render: progress -----
  function renderProgress() {
    const done = Object.keys(progress).filter((k) => progress[k]).length;
    const total = lessons.length;
    const pct = total ? (done / total) * 100 : 0;
    progressBar.style.width = pct + '%';
    progressText.textContent = `${done}/${total}`;
    progressMessage.textContent = pickMessage(done, total);
  }
  function pickMessage(done, total) {
    if (done === 0) return "let's get started! 💕";
    if (done < total / 3) return 'you\'re doing great! 🌷';
    if (done < (2 * total) / 3) return 'wow, halfway-ish! 🌟';
    if (done < total) return 'almost there, cutie! 💪';
    return 'YAY! all done! you\'re a C++ wizard 🧙‍♀️✨';
  }

  // ----- Render: a single lesson (with 3D page flip) -----
  function showLesson(id) {
    const isSwitch = currentId && currentId !== id;
    currentId = id;
    localStorage.setItem(STORAGE.last, id);
    const lesson = lessons.find((l) => l.id === id);
    if (!lesson) return;

    if (isSwitch) {
      Sound.flip();
      lessonView.classList.remove('flipping');
      void lessonView.offsetWidth;
      lessonView.classList.add('flipping');
      setTimeout(() => lessonView.classList.remove('flipping'), 450);
    }

    lessonView.innerHTML = renderLessonHTML(lesson);
    // soft scroll without 'smooth' to avoid jank when combined with flip
    requestAnimationFrame(() => {
      lessonView.scrollIntoView({ block: 'start' });
    });

    // attach copy buttons
    lessonView.querySelectorAll('.copy-btn').forEach((btn) => {
      btn.addEventListener('click', () => copyCode(btn));
    });
    // bookmark btn
    const bk = lessonView.querySelector('.bookmark-btn');
    if (bk) {
      bk.addEventListener('click', () => toggleBookmark(id));
    }

    Prism.highlightAllUnder(lessonView);
    renderLessonList();
    updateNavButtons();
    updateCompleteButton();
  }

  function renderWelcomeHTML() {
    const cards = [
      { e: '🌸', t: 'beginner-friendly', d: 'we explain everything like you\'re 10 (in a nice way!).' },
      { e: '🎨', t: 'cute & cozy',        d: 'pastel crayons, little flowers, and floating clouds ☁️.' },
      { e: '💾', t: 'tracks progress',    d: 'mark lessons as done and your stars are saved here forever.' },
      { e: '🌙', t: 'dark mode',          d: 'tap the moon up top for a soft purple night theme.' }
    ];
    return `
      <div class="welcome">
        <h1>welcome to C++ Notebook ✨</h1>
        <p class="subtitle">a cute, hand-drawn place to learn C++ 💕</p>
        <button class="start-btn" id="startBtn">start the first lesson 🌟</button>
        <div class="welcome-cards">
          ${cards.map(c => `
            <div class="welcome-card">
              <div class="emoji">${c.e}</div>
              <h3>${c.t}</h3>
              <p>${c.d}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderLessonHTML(lesson) {
    const isBookmarked = !!bookmarks[lesson.id];
    const sections = (lesson.sections || []).map((s, i) => {
      if (s.type === 'explain') {
        return `
          <section class="section ${i === 0 ? 'tape' : ''}">
            <h3>${escapeHtml(s.title)}</h3>
            <div>${s.body}</div>
          </section>
        `;
      }
      if (s.type === 'tips') {
        return `
          <section class="section tip-section">
            <h3>${escapeHtml(s.title)}</h3>
            <ul>${s.items.map(it => `<li>${it}</li>`).join('')}</ul>
          </section>
        `;
      }
      if (s.type === 'mistakes') {
        return `
          <section class="section mistake-section">
            <h3>${escapeHtml(s.title)}</h3>
            <ul>${s.items.map(it => `<li>${it}</li>`).join('')}</ul>
          </section>
        `;
      }
      if (s.type === 'code') {
        return `
          <section class="section">
            <h3>${escapeHtml(s.title)}</h3>
            <div class="code-block-wrap">
              <div class="code-block-head">
                <div class="dots"><span></span><span></span><span></span></div>
                <span class="label">main.cpp</span>
                <button class="copy-btn" data-code="${escapeAttr(s.code)}">📋 copy</button>
              </div>
              <pre><code class="language-cpp">${escapeHtml(s.code)}</code></pre>
            </div>
            ${s.output ? `
              <div class="section output-section" style="margin-top:14px">
                <h3>🧪 Output</h3>
                <pre>${escapeHtml(s.output)}</pre>
              </div>
            ` : ''}
          </section>
        `;
      }
      return '';
    }).join('');

    const idx = lessons.indexOf(lesson);
    return `
      <div class="lesson-header">
        <span class="lesson-emoji">${lesson.emoji}</span>
        <h2 class="lesson-title">${escapeHtml(lesson.title)}</h2>
      </div>
      <div class="lesson-meta">
        <span>lesson ${idx + 1} of ${lessons.length}</span>
        <span>·</span>
        <span>${escapeHtml(lesson.tagline || '')}</span>
        <button class="bookmark-btn ${isBookmarked ? 'active' : ''}">
          ${isBookmarked ? '🔖 bookmarked' : '📍 bookmark'}
        </button>
      </div>
      ${sections}
    `;
  }

  // ----- Bookmarks -----
  function toggleBookmark(id) {
    bookmarks[id] = !bookmarks[id];
    saveJSON(STORAGE.bookmarks, bookmarks);
    showToast(bookmarks[id] ? 'bookmarked! 🔖' : 'bookmark removed 📍');
    Sound.sparkle();
    showLesson(id); // rerender
  }

  // ----- Completion -----
  function toggleComplete(id) {
    const wasDone = !!progress[id];
    progress[id] = !wasDone;
    saveJSON(STORAGE.progress, progress);
    renderProgress();
    renderLessonList();
    updateCompleteButton();
    if (!wasDone) {
      const lesson = lessons.find((l) => l.id === id);
      showToast(`Yay! You learned ${lesson ? lesson.title : 'a lesson'}! 🎉`);
      celebrate();
      Sound.success();
    } else {
      showToast('marked as not done — no worries, take your time 💕');
      Sound.click();
    }
  }
  completeBtn.addEventListener('click', () => {
    if (!currentId) return;
    toggleComplete(currentId);
  });

  function updateCompleteButton() {
    if (!currentId) {
      completeBtn.style.display = 'none';
      return;
    }
    completeBtn.style.display = 'inline-block';
    if (progress[currentId]) {
      completeBtn.textContent = '🎉 completed — undo';
      completeBtn.classList.add('done');
    } else {
      completeBtn.textContent = '✅ mark as completed';
      completeBtn.classList.remove('done');
    }
  }

  // ----- Prev / Next -----
  function updateNavButtons() {
    if (!currentId) {
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }
    const idx = lessons.findIndex((l) => l.id === currentId);
    prevBtn.disabled = idx <= 0;
    nextBtn.disabled = idx >= lessons.length - 1;
  }
  prevBtn.addEventListener('click', () => {
    const idx = lessons.findIndex((l) => l.id === currentId);
    if (idx > 0) showLesson(lessons[idx - 1].id);
  });
  nextBtn.addEventListener('click', () => {
    const idx = lessons.findIndex((l) => l.id === currentId);
    if (idx < lessons.length - 1) showLesson(lessons[idx + 1].id);
  });

  // ----- Copy code -----
  function copyCode(btn) {
    const code = btn.getAttribute('data-code') || '';
    const text = decodeAttr(code);
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = '✓ copied!';
      btn.classList.add('copied');
      Sound.sparkle();
      setTimeout(() => {
        btn.textContent = '📋 copy';
        btn.classList.remove('copied');
      }, 1500);
    }).catch(() => {
      showToast('couldn\'t copy, try selecting manually 🙈');
    });
  }

  // ----- Toast -----
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    Sound.pop();
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  // ----- Confetti -----
  function celebrate() {
    const ctx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    const colors = ['#FFB7CE', '#D4BBFC', '#B6F0D5', '#FFF2A8', '#FFD6BA', '#BEE3F8'];
    const shapes = ['🌸','⭐','💖','🎀','✨','🍬'];
    const particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * confettiCanvas.width,
        y: -20 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 4,
        size: 16 + Math.random() * 16,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.2,
        emoji: Math.random() < 0.6 ? shapes[Math.floor(Math.random() * shapes.length)] : null,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    let running = true;
    const start = performance.now();
    function frame(now) {
      if (!running) return;
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        if (p.emoji) {
          ctx.font = `${p.size}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.emoji, 0, 0);
        } else {
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.4);
        }
        ctx.restore();
      });
      if (now - start < 2500) {
        requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        running = false;
      }
    }
    requestAnimationFrame(frame);
  }

  // ----- Helpers -----
  function loadJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; }
    catch { return fallback; }
  }
  function saveJSON(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
  function saveAll() {
    saveJSON(STORAGE.progress, progress);
    saveJSON(STORAGE.bookmarks, bookmarks);
  }
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function escapeAttr(str) {
    return encodeURIComponent(str);
  }
  function decodeAttr(str) {
    try { return decodeURIComponent(str); } catch { return str; }
  }

  // ----- Render everything -----
  function renderAll() {
    renderLessonList();
    renderProgress();
    if (currentId && lessons.find(l => l.id === currentId)) {
      showLesson(currentId);
    } else {
      lessonView.innerHTML = renderWelcomeHTML();
      updateNavButtons();
      updateCompleteButton();
      const startBtn = document.getElementById('startBtn');
      if (startBtn) startBtn.addEventListener('click', () => showLesson(lessons[0].id));
    }
  }

  // ----- Keyboard navigation -----
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowLeft' && !prevBtn.disabled) prevBtn.click();
    else if (e.key === 'ArrowRight' && !nextBtn.disabled) nextBtn.click();
    else if (e.key === '/') { e.preventDefault(); search.focus(); }
  });

  // ----- Parallax decorations (rAF-throttled, GPU-accelerated) -----
  const decorations = Array.from(document.querySelectorAll('.deco'));
  let parallaxX = 0, parallaxY = 0;
  let parallaxQueued = false;
  function flushParallax() {
    parallaxQueued = false;
    for (let i = 0; i < decorations.length; i++) {
      const d = decorations[i];
      const depth = parseFloat(d.dataset.depth || 1);
      d.style.setProperty('--px', `${parallaxX * depth * 10}px`);
      d.style.setProperty('--py', `${parallaxY * depth * 10}px`);
    }
  }
  document.addEventListener('mousemove', (e) => {
    parallaxX = (e.clientX / window.innerWidth - 0.5) * 2;
    parallaxY = (e.clientY / window.innerHeight - 0.5) * 2;
    if (!parallaxQueued) {
      parallaxQueued = true;
      requestAnimationFrame(flushParallax);
    }
  }, { passive: true });

  // ----- 3D card tilt (rAF-throttled, single delegated handler) -----
  function attachTilt(el, intensity = 8) {
    let rect = null;
    let queued = false;
    let mx = 0, my = 0, lx = 0, ly = 0;
    function flush() {
      queued = false;
      const x = (mx - rect.left) / rect.width;
      const y = (my - rect.top) / rect.height;
      const rx = (0.5 - y) * intensity;
      const ry = (x - 0.5) * intensity;
      el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translate3d(0,-3px,0) scale(1.015)`;
      el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
      el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
    }
    el.addEventListener('mouseenter', () => { rect = el.getBoundingClientRect(); });
    el.addEventListener('mousemove', (e) => {
      if (!rect) rect = el.getBoundingClientRect();
      mx = e.clientX; my = e.clientY;
      // skip tiny moves
      if (Math.abs(mx - lx) < 2 && Math.abs(my - ly) < 2) return;
      lx = mx; ly = my;
      if (!queued) { queued = true; requestAnimationFrame(flush); }
    }, { passive: true });
    el.addEventListener('mouseleave', () => {
      rect = null;
      el.style.transform = '';
    });
  }

  function attachAllTilts() {
    // Skip tilts on touch / mobile (causes jank)
    if (matchMedia('(hover: none)').matches || window.innerWidth < 820) return;
    document.querySelectorAll('.welcome-card').forEach(c => attachTilt(c, 10));
    document.querySelectorAll('.section').forEach(c => attachTilt(c, 4));
  }

  // ----- Click sparkles ✨ + click sound (lighter: 3 particles, batched) -----
  const sparkleLayer = document.getElementById('sparkleLayer');
  const sparkleEmojis = ['✨','💖','🌸','⭐','💫'];
  document.addEventListener('click', (e) => {
    if (e.target.closest('input, textarea')) return;
    const frag = document.createDocumentFragment();
    const sparkles = [];
    for (let i = 0; i < 3; i++) {
      const s = document.createElement('span');
      s.className = 'sparkle';
      s.textContent = sparkleEmojis[(Math.random() * sparkleEmojis.length) | 0];
      s.style.left = `${e.clientX}px`;
      s.style.top = `${e.clientY}px`;
      const angle = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * 50;
      s.style.setProperty('--sx', `${Math.cos(angle) * dist}px`);
      s.style.setProperty('--sy', `${Math.sin(angle) * dist - 30}px`);
      s.style.fontSize = `${14 + Math.random() * 12}px`;
      frag.appendChild(s);
      sparkles.push(s);
    }
    sparkleLayer.appendChild(frag);
    setTimeout(() => sparkles.forEach(s => s.remove()), 1000);

    if (e.target.closest('button, a, .lesson-item, .welcome-card')) {
      Sound.click();
    }
  });

  // ----- Cursor sparkle + heart trail (single rAF loop, GPU transforms) -----
  const heartTrail = document.getElementById('heartTrail');
  const cursorSparkle = document.getElementById('cursorSparkle');
  const heartEmojis = ['💖','💕','🌸','✨'];
  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;
  let mouseActive = false;
  let lastHeartT = 0;
  let lastHeartX = 0, lastHeartY = 0;
  let heartsEnabled = true;
  let cursorEnabled = true;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    mouseActive = true;
  }, { passive: true });
  document.addEventListener('mouseleave', () => {
    cursorSparkle.classList.remove('show');
    mouseActive = false;
  });

  function cursorLoop(now) {
    if (cursorEnabled && mouseActive) {
      // smooth lerp toward mouse
      curX += (mouseX - curX) * 0.25;
      curY += (mouseY - curY) * 0.25;
      cursorSparkle.style.transform = `translate3d(${curX | 0}px, ${curY | 0}px, 0) translate(-50%, -50%)`;
      cursorSparkle.classList.add('show');
    } else {
      cursorSparkle.classList.remove('show');
    }
    // heart trail (max ~10 hearts/sec)
    if (heartsEnabled && mouseActive && now - lastHeartT > 110) {
      const dx = mouseX - lastHeartX, dy = mouseY - lastHeartY;
      if (dx * dx + dy * dy > 36 * 36) {
        lastHeartT = now;
        lastHeartX = mouseX; lastHeartY = mouseY;
        const h = document.createElement('span');
        h.className = 'heart-bit';
        h.textContent = heartEmojis[(Math.random() * heartEmojis.length) | 0];
        h.style.left = `${mouseX}px`;
        h.style.top  = `${mouseY}px`;
        h.style.setProperty('--hr', `${(Math.random() - 0.5) * 60}deg`);
        h.style.fontSize = `${14 + Math.random() * 8}px`;
        heartTrail.appendChild(h);
        setTimeout(() => h.remove(), 1300);
      }
    }
    requestAnimationFrame(cursorLoop);
  }
  requestAnimationFrame(cursorLoop);

  // expose so toggles can disable cleanly
  window.__cppEffects = {
    setHearts(on) { heartsEnabled = on; if (!on) heartTrail.innerHTML = ''; },
    setCursor(on) { cursorEnabled = on; if (!on) cursorSparkle.classList.remove('show'); }
  };

  // ----- Falling petals 🌸 (lighter: 8 ambient, slow rate) -----
  const petalLayer = document.getElementById('petalLayer');
  const petalEmojis = ['🌸','🌷','🌼','💮','🍃'];
  let petalsEnabled = true;
  let petalInterval = null;
  function spawnPetal() {
    if (!petalsEnabled) return;
    if (petalLayer.childElementCount > 18) return; // hard cap
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = petalEmojis[(Math.random() * petalEmojis.length) | 0];
    p.style.left = `${(Math.random() * 100).toFixed(1)}%`;
    const dur = 12 + Math.random() * 12;
    p.style.setProperty('--dur', `${dur}s`);
    p.style.fontSize = `${18 + Math.random() * 14}px`;
    p.style.animationDelay = `-${(Math.random() * dur).toFixed(2)}s`;
    petalLayer.appendChild(p);
    setTimeout(() => p.remove(), dur * 1000 + 500);
  }
  function startPetals() {
    if (petalInterval) return;
    for (let i = 0; i < 8; i++) spawnPetal();
    petalInterval = setInterval(spawnPetal, 2200);
  }
  function stopPetals() {
    petalsEnabled = false;
    clearInterval(petalInterval);
    petalInterval = null;
    petalLayer.innerHTML = '';
  }
  startPetals();
  window.__cppEffects.setPetals = (on) => {
    petalsEnabled = on;
    if (on) { petalsEnabled = true; startPetals(); } else stopPetals();
  };

  // ----- Hover sound (heavier throttle to avoid lag) -----
  let lastHover = 0;
  document.addEventListener('mouseover', (e) => {
    if (!e.target.closest('button, a, .lesson-item, .welcome-card, .bookmark-btn, .copy-btn')) return;
    const now = performance.now();
    if (now - lastHover < 140) return;
    lastHover = now;
    Sound.hover();
  });

  // ----- Mascot interactions 🐰 -----
  const mascot = document.getElementById('mascot');
  const mascotBubble = document.getElementById('mascotBubble');
  const mascotMessages = [
    'hi cutie! 💕',
    'you got this! 💪',
    'so proud of you 🌸',
    'one lesson at a time! ✨',
    'C++ is fun, right? 🎀',
    'take a tea break ☕',
    'keep going lovely! 🌟',
    'don\'t forget to smile 😊'
  ];
  let bubbleTimer;
  function showMascotBubble(msg) {
    mascotBubble.textContent = msg || mascotMessages[Math.floor(Math.random() * mascotMessages.length)];
    mascot.classList.add('show-bubble');
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => mascot.classList.remove('show-bubble'), 2500);
  }
  mascot.addEventListener('click', () => {
    showMascotBubble();
    celebrate();
    Sound.boop();
  });
  // periodic encouragement
  setInterval(() => {
    if (Math.random() < 0.5) showMascotBubble();
  }, 18000);
  setTimeout(() => showMascotBubble('hi! tap me 💕'), 1500);

  // ----- Re-attach tilts whenever lesson content changes (debounced) -----
  let tiltDebounce = null;
  const observer = new MutationObserver(() => {
    clearTimeout(tiltDebounce);
    tiltDebounce = setTimeout(attachAllTilts, 80);
  });
  observer.observe(lessonView, { childList: true, subtree: false });

  // ----- Init -----
  initTheme();
  renderAll();
  attachAllTilts();

  // accessibility: close sidebar on resize back to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) closeSidebar();
  });
})();
