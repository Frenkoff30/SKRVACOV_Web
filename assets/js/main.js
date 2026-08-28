/* ==========================================================================
   S.K. RVÁČOV — logika webu
   Vanilla JS, bez závislostí. Data se berou z assets/js/data.js
   ========================================================================== */
(function () {
  'use strict';

  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const MONTHS = ['ledna', 'února', 'března', 'dubna', 'května', 'června',
                  'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'];
  const MONTHS_SHORT = ['Led', 'Úno', 'Bře', 'Dub', 'Kvě', 'Čvn',
                        'Čvc', 'Srp', 'Zář', 'Říj', 'Lis', 'Pro'];
  const DAYS = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];

  const parseDate = (iso) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?$/.exec(iso || '');
    return m ? new Date(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0)) : null;
  };
  const fmtLong = (d) => d ? `${d.getDate()}. ${MONTHS[d.getMonth()]} ${d.getFullYear()}` : '';
  const fmtTime = (d) => d ? `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}` : '';

  const isOurs = (name) => /rváčov|rvacov/i.test(name || '');
  const has = (arr) => Array.isArray(arr) && arr.length > 0;

  const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* Prázdný stav sekce */
  function empty(host, text, link) {
    host.innerHTML = `
      <div class="empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>
        </svg>
        <p>${esc(text)}</p>
        ${link ? `<a class="link-arrow" href="${link.href}" ${link.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>${esc(link.label)} ${ARROW}</a>` : ''}
      </div>`;
  }

  /* ---------- Motiv ------------------------------------------------------ */
  function initTheme() {
    $$('[data-theme-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        btn.setAttribute('aria-label', next === 'light' ? 'Přepnout na tmavý režim' : 'Přepnout na světlý režim');
        try { localStorage.setItem('skr-theme', next); } catch (e) { /* soukromý režim */ }
      });
    });
  }

  /* ---------- Hlavička a mobilní menu ------------------------------------ */
  function initHeader() {
    const header = $('.header');
    if (header) {
      const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 24);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    const drawer = $('#drawer');
    const openBtn = $('[data-drawer-open]');
    if (!drawer || !openBtn) return;

    let lastFocus = null;
    const open = () => {
      lastFocus = document.activeElement;
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      openBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('is-locked');
      const first = $('a, button', drawer);
      if (first) first.focus();
    };
    const close = () => {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      openBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('is-locked');
      if (lastFocus) lastFocus.focus();
    };

    openBtn.addEventListener('click', open);
    const closeBtn = $('[data-drawer-close]');
    if (closeBtn) closeBtn.addEventListener('click', close);
    $$('a', drawer).forEach((a) => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
    });
  }

  /* ---------- Jemné odhalení při scrollu --------------------------------- */
  function initReveal() {
    const items = $$('[data-reveal]');
    if (!items.length) return;
    document.body.classList.add('reveal-ready');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    items.forEach((el) => io.observe(el));

    /* Pojistka, aby obsah nikdy nezůstal neviditelný */
    const sweep = () => items.forEach((el) => {
      if (el.classList.contains('is-in')) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) { el.classList.add('is-in'); io.unobserve(el); }
    });
    requestAnimationFrame(sweep);
    window.addEventListener('load', sweep);
    setTimeout(sweep, 1200);
  }

  /* ---------- Zápasy ------------------------------------------------------ */
  const played   = (m) => typeof m.hg === 'number' && typeof m.ag === 'number';
  const byDate   = (a, b) => parseDate(a.date) - parseDate(b.date);
  const allMatches = () => (typeof MATCHES === 'undefined' ? [] : MATCHES);

  function fixtureHTML(m) {
    const d = parseDate(m.date);
    const done = played(m);
    let cls = '';
    if (done) {
      const ours = isOurs(m.home) ? m.hg : m.ag;
      const opp  = isOurs(m.home) ? m.ag : m.hg;
      cls = ours > opp ? 'txt-win' : (ours === opp ? '' : 'txt-loss');
    }
    return `
      <li class="fixture">
        <div class="fixture__date">
          <span class="fixture__day">${d ? d.getDate() + '.' : '—'}</span>
          <span class="fixture__mon">${d ? MONTHS_SHORT[d.getMonth()] + ' ' + d.getFullYear() : ''}</span>
        </div>
        <div class="fixture__main">
          <p class="fixture__teams">${esc(m.home)} <span class="dim">–</span> ${esc(m.away)}</p>
          <p class="fixture__sub">${[m.team, m.comp, m.venue].filter(Boolean).map(esc).join(' · ')}</p>
        </div>
        <div class="fixture__right">
          ${done
            ? `<span class="fixture__score ${cls}">${m.hg}:${m.ag}</span>`
            : `<span class="fixture__time">${esc(fmtTime(d))}</span>`}
        </div>
      </li>`;
  }

  const FOTBAL_CZ = { href: 'https://www.fotbal.cz', label: 'Hledat na fotbal.cz', external: true };

  function renderNextMatch(host) {
    const now = new Date();
    const next = allMatches().filter((m) => !played(m) && parseDate(m.date) >= now).sort(byDate)[0];
    if (!next) {
      empty(host, 'Termín dalšího zápasu zveřejníme, jakmile ho budeme znát.', FOTBAL_CZ);
      return;
    }
    const d = parseDate(next.date);
    host.innerHTML = `
      <div class="next-match">
        <p class="next-match__comp">${[next.team, next.comp].filter(Boolean).map(esc).join(' · ')}</p>
        <p class="next-match__teams">${esc(next.home)} <span class="dim">–</span> ${esc(next.away)}</p>
        <p class="next-match__when">${esc(fmtLong(d))} · ${esc(DAYS[d.getDay()])} · ${esc(fmtTime(d))}</p>
        <p class="next-match__where">${esc(next.venue || '')}</p>
      </div>`;
  }

  function renderFixtures(host) {
    const wantPlayed = host.getAttribute('data-status') === 'played';
    let list = allMatches().filter((m) => played(m) === wantPlayed);
    list.sort(wantPlayed ? (a, b) => byDate(b, a) : byDate);

    if (!list.length) {
      empty(host, wantPlayed
        ? 'Zatím tu nejsou žádné odehrané zápasy.'
        : 'Rozpis zápasů zatím není vyplněný. Doplníme ho, jakmile budou termíny známé.');
      return;
    }
    host.innerHTML = `<ul class="fixture-list">${list.map(fixtureHTML).join('')}</ul>`;
  }

  /* ---------- Tabulka soutěže -------------------------------------------- */
  function renderTable(host) {
    if (!has(typeof TABLE === 'undefined' ? [] : TABLE)) {
      empty(host, 'Průběžnou tabulku zatím nemáme vyplněnou.', FOTBAL_CZ);
      return;
    }
    const rows = TABLE.map((r, i) => `
      <tr class="${isOurs(r.club) ? 'is-own' : ''}">
        <td class="pos">${i + 1}</td>
        <td class="club">${esc(r.club)}</td>
        <td>${r.m}</td><td>${r.w}</td><td>${r.d}</td><td>${r.l}</td>
        <td>${r.gf}:${r.ga}</td>
        <td class="pts">${r.pts}</td>
      </tr>`).join('');

    host.innerHTML = `
      <div class="table-wrap">
        <table class="ltable">
          <thead>
            <tr>
              <th scope="col">#</th><th scope="col">Klub</th>
              <th scope="col">Z</th><th scope="col">V</th><th scope="col">R</th><th scope="col">P</th>
              <th scope="col">Skóre</th><th scope="col">B</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  }

  /* ---------- Aktuality --------------------------------------------------- */
  function renderNews(host) {
    const list = (typeof NEWS === 'undefined' ? [] : NEWS).slice()
      .sort((a, b) => parseDate(b.date) - parseDate(a.date));
    const limit = parseInt(host.getAttribute('data-limit') || '0', 10);
    const shown = limit > 0 ? list.slice(0, limit) : list;

    if (!shown.length) {
      empty(host, 'Zatím tu nic nového není.');
      return;
    }
    host.innerHTML = `<div class="news-list">${shown.map((n) => `
      <article class="news-item">
        <p class="news-item__date">${esc(fmtLong(parseDate(n.date)))}</p>
        <h3 class="news-item__title">${esc(n.title)}</h3>
        <p class="news-item__text">${esc(n.text)}</p>
      </article>`).join('')}</div>`;
  }

  /* ---------- Historie a vedení ------------------------------------------ */
  function renderHistory(host) {
    if (typeof HISTORY === 'undefined') return;
    host.innerHTML = HISTORY.map((h) => `
      <li class="tl-item">
        <span class="tl-item__year">${esc(h.year)}</span>
        <p class="tl-item__text">${esc(h.text)}</p>
      </li>`).join('');
  }

  function renderBoard(host) {
    if (!has(typeof BOARD === 'undefined' ? [] : BOARD)) {
      empty(host, 'Složení výboru doplníme.');
      return;
    }
    host.innerHTML = BOARD.map((b) => `
      <li class="board__item">
        <span class="board__name">${esc(b.name)}</span>
        <span class="board__role">${esc(b.role)}</span>
      </li>`).join('');
  }

  /* ---------- Galerie ----------------------------------------------------- */
  function renderGallery(host) {
    if (!has(typeof GALLERY === 'undefined' ? [] : GALLERY)) {
      empty(host, 'Fotky teprve sbíráme. Máte nějaké z Rváčova? Pošlete nám je a rádi je sem doplníme.',
        { href: 'mailto:' + (typeof CLUB !== 'undefined' ? CLUB.email : ''), label: 'Poslat fotky' });
      return;
    }
    host.innerHTML = `<div class="gallery">${GALLERY.map((g) => `
      <figure class="gallery__item">
        <img src="${esc(g.src)}" alt="${esc(g.cap || '')}" loading="lazy">
        ${g.cap ? `<figcaption>${esc(g.cap)}</figcaption>` : ''}
      </figure>`).join('')}</div>`;
  }

  /* ---------- Partneři ---------------------------------------------------- */
  function renderSponsors(host) {
    if (!has(typeof SPONSORS === 'undefined' ? [] : SPONSORS)) {
      empty(host, 'Místo pro partnery klubu. Chcete podpořit rváčovský fotbal?',
        { href: 'kontakt.html', label: 'Ozvat se nám' });
      return;
    }
    host.innerHTML = `<ul class="sponsors">${SPONSORS.map((s) =>
      `<li class="sponsor">${esc(s.name)}</li>`).join('')}</ul>`;
  }

  /* ---------- Kontaktní formulář ----------------------------------------- */
  function initForm() {
    const form = $('[data-contact-form]');
    if (!form) return;
    const status = $('.form-status', form);

    const check = (field) => {
      const input = $('.input, .textarea', field);
      if (!input) return true;
      const val = input.value.trim();
      let ok = true;
      if (input.required && !val) ok = false;
      if (ok && input.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(val)) ok = false;
      field.classList.toggle('has-error', !ok);
      input.setAttribute('aria-invalid', ok ? 'false' : 'true');
      return ok;
    };

    $$('.field', form).forEach((field) => {
      const input = $('.input, .textarea', field);
      if (!input) return;
      input.addEventListener('blur', () => check(field));
      input.addEventListener('input', () => { if (field.classList.contains('has-error')) check(field); });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const ok = $$('.field', form).map(check).every(Boolean);
      if (!ok) {
        const bad = $('.field.has-error .input, .field.has-error .textarea', form);
        if (bad) bad.focus();
        return;
      }
      if (status) {
        status.textContent = 'Děkujeme. Formulář zatím není napojený na server — napište nám prosím přímo na '
          + (typeof CLUB !== 'undefined' ? CLUB.email : 'e-mail klubu') + '.';
        status.classList.add('is-visible');
      }
      form.reset();
    });
  }

  /* ---------- Drobnosti --------------------------------------------------- */
  function initToTop() {
    const btn = $('.to-top');
    if (!btn) return;
    const onScroll = () => btn.classList.toggle('is-visible', window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function initYear() {
    $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
  }

  /* ---------- Start ------------------------------------------------------- */
  const RENDERERS = {
    'next-match': renderNextMatch,
    'fixtures':   renderFixtures,
    'table':      renderTable,
    'news':       renderNews,
    'history':    renderHistory,
    'board':      renderBoard,
    'gallery':    renderGallery,
    'sponsors':   renderSponsors
  };

  function boot() {
    initTheme();
    initHeader();
    $$('[data-render]').forEach((host) => {
      const fn = RENDERERS[host.getAttribute('data-render')];
      if (fn) { try { fn(host); } catch (err) { console.error('Chyba vykreslení:', err); } }
    });
    initForm();
    initToTop();
    initYear();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
