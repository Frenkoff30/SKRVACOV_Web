/* ==========================================================================
   S.K. RVÁČOV, logika webu
   Vanilla JS bez závislostí. Data se berou z assets/js/data.js
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

  const isOurs = (n) => /rváčov|rvacov/i.test(n || '');
  const has    = (a) => Array.isArray(a) && a.length > 0;
  const abbr   = (n) => (n || '').replace(/^(S\.K\.|SK|FK|FC|TJ|Sokol)\s+/i, '')
    .split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function empty(host, text) {
    host.innerHTML = `<div class="empty"><p>${esc(text)}</p></div>`;
  }

  /* ---------- Hlavička a mobilní menu ------------------------------------ */
  function initHeader() {
    const header = $('.header');
    if (header) {
      const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 20);
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

  /* ---------- Odhalení při scrollu --------------------------------------- */
  function initReveal() {
    const items = $$('[data-reveal]');
    if (!items.length) return;
    document.body.classList.add('reveal-ready');

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
  const played = (m) => typeof m.hg === 'number' && typeof m.ag === 'number';
  const byDate = (a, b) => parseDate(a.date) - parseDate(b.date);
  const matches = (team) => (typeof MATCHES === 'undefined' ? [] : MATCHES)
    .filter((m) => !team || team === 'all' || m.team === team);

  function renderNextMatch(host) {
    const team = host.getAttribute('data-team') || 'Muži';
    const now = new Date();
    const m = matches(team).filter((x) => !played(x) && parseDate(x.date) >= now).sort(byDate)[0]
           || matches(team).filter((x) => !played(x)).sort(byDate)[0];
    if (!m) { empty(host, 'Termín dalšího zápasu zveřejníme, jakmile ho budeme znát.'); return; }

    const d = parseDate(m.date);
    const homeOurs = isOurs(m.home);
    host.innerHTML = `
      <article class="match">
        <header class="match__head">
          <span>${esc(m.comp)}</span>
          <span>${homeOurs ? 'Domácí utkání' : 'Venkovní utkání'}</span>
        </header>
        <div class="match__body">
          <div class="match__teams">
            <div class="match__team ${homeOurs ? 'is-us' : ''}">
              <span class="match__badge">${esc(abbr(m.home))}</span>
              <span class="match__name">${esc(m.home)}</span>
            </div>
            <span class="match__vs">vs</span>
            <div class="match__team ${!homeOurs ? 'is-us' : ''}">
              <span class="match__badge">${esc(abbr(m.away))}</span>
              <span class="match__name">${esc(m.away)}</span>
            </div>
          </div>
          <div class="match__meta">
            <span>${esc(DAYS[d.getDay()])} ${esc(fmtLong(d))}</span>
            <span>Výkop ${esc(fmtTime(d))}</span>
            <span>${esc(m.venue)}</span>
          </div>
        </div>
      </article>`;
  }

  function fixtureHTML(m) {
    const d = parseDate(m.date);
    const done = played(m);
    let cls = '';
    if (done) {
      const ours = isOurs(m.home) ? m.hg : m.ag;
      const opp  = isOurs(m.home) ? m.ag : m.hg;
      cls = ours > opp ? 'is-win' : (ours === opp ? 'is-draw' : 'is-loss');
    }
    return `
      <li class="fixture ${cls}">
        <div class="fixture__date">
          <b>${d ? d.getDate() + '.' : ''}</b>
          <span>${d ? MONTHS_SHORT[d.getMonth()] : ''}</span>
        </div>
        <div class="fixture__main">
          <p class="fixture__teams">${esc(m.home)} <i>vs</i> ${esc(m.away)}</p>
          <p class="fixture__sub">${[m.team, m.comp, m.venue].filter(Boolean).map(esc).join(' &middot; ')}</p>
        </div>
        <div class="fixture__res">
          ${done ? `<b class="fixture__score">${m.hg}:${m.ag}</b>`
                 : `<b class="fixture__time">${esc(fmtTime(d))}</b>`}
        </div>
      </li>`;
  }

  function renderFixtures(host) {
    const want = host.getAttribute('data-status');
    let list = matches(host.getAttribute('data-team') || 'all');
    if (want === 'played')   list = list.filter(played);
    if (want === 'upcoming') list = list.filter((m) => !played(m));
    list.sort(want === 'played' ? (a, b) => byDate(b, a) : byDate);

    if (!list.length) { empty(host, 'Žádné zápasy k zobrazení.'); return; }
    host.innerHTML = `<ul class="fixtures">${list.map(fixtureHTML).join('')}</ul>`;
  }

  /* ---------- Tabulka ----------------------------------------------------- */
  function renderTable(host) {
    const rows = (typeof TABLE === 'undefined') ? [] : TABLE;
    if (!has(rows)) { empty(host, 'Tabulku doplníme.'); return; }
    const limit = parseInt(host.getAttribute('data-limit') || '0', 10);
    const list = limit > 0 ? rows.slice(0, limit) : rows;

    host.innerHTML = `
      <div class="table-wrap">
        <table class="ltable">
          <thead><tr>
            <th scope="col">#</th><th scope="col">Klub</th>
            <th scope="col">Z</th><th scope="col">V</th><th scope="col">R</th><th scope="col">P</th>
            <th scope="col">Skóre</th><th scope="col">B</th>
          </tr></thead>
          <tbody>${list.map((r, i) => `
            <tr class="${isOurs(r.club) ? 'is-own' : ''}">
              <td class="pos">${i + 1}</td>
              <td><span class="club"><span class="club__badge">${esc(abbr(r.club))}</span>${esc(r.club)}</span></td>
              <td>${r.m}</td><td>${r.w}</td><td>${r.d}</td><td>${r.l}</td>
              <td>${r.gf}:${r.ga}</td><td class="pts">${r.pts}</td>
            </tr>`).join('')}</tbody>
        </table>
      </div>`;
  }

  /* ---------- Soupisky ---------------------------------------------------- */
  function renderSquads(host) {
    const squads = (typeof SQUADS === 'undefined') ? [] : SQUADS;
    if (!has(squads)) { empty(host, 'Soupisky doplníme.'); return; }

    host.innerHTML = squads.map((t) => `
      <section class="squad" id="${esc(t.id)}">
        <header class="squad__head">
          <h2 class="squad__name">${esc(t.name)}</h2>
          <p class="squad__note">${esc(t.note)}</p>
        </header>
        <div class="players">
          ${t.players.map((p) => `
            <article class="player">
              <span class="player__num" aria-hidden="true">${p.n}</span>
              <span class="player__post">${esc(p.post)}</span>
              <h3 class="player__name">${esc(p.name)}</h3>
              <div class="player__stats">
                <span><b>${p.apps}</b>zápasů</span>
                <span><b>${p.goals}</b>branek</span>
              </div>
            </article>`).join('')}
        </div>
      </section>`).join('');
  }

  /* ---------- Aktuality --------------------------------------------------- */
  /* Zástupná grafika, dokud nejsou fotky. Motiv hřiště, laděné do světla. */
  function pitchArt(i, w, h, label) {
    const pal = [
      ['#2E8B57', '#1D6B41'],
      ['#C4131C', '#8E0A11'],
      ['#3C6E71', '#254E52'],
      ['#B8860B', '#8A6408']
    ];
    const [a, b] = pal[i % pal.length];
    const id = 'a' + i + '_' + w;
    return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(label || '')}">
      <defs>
        <linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
        </linearGradient>
        <pattern id="p${id}" width="${Math.round(w / 10)}" height="${h}" patternUnits="userSpaceOnUse">
          <rect width="${Math.round(w / 20)}" height="${h}" fill="#fff" fill-opacity=".07"/>
        </pattern>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#g${id})"/>
      <rect width="${w}" height="${h}" fill="url(#p${id})"/>
      <g stroke="#fff" stroke-opacity=".38" fill="none" stroke-width="${Math.max(2, w / 320)}">
        <circle cx="${w / 2}" cy="${h / 2}" r="${h / 4}"/>
        <path d="M${w / 2} 0v${h}"/>
        <rect x="${-w * 0.06}" y="${h * 0.28}" width="${w * 0.16}" height="${h * 0.44}"/>
        <rect x="${w * 0.9}" y="${h * 0.28}" width="${w * 0.16}" height="${h * 0.44}"/>
      </g>
      <circle cx="${w / 2}" cy="${h / 2}" r="${Math.max(3, w / 190)}" fill="#fff" fill-opacity=".7"/>
    </svg>`;
  }

  function renderNews(host) {
    const list = (typeof NEWS === 'undefined' ? [] : NEWS).slice()
      .sort((a, b) => parseDate(b.date) - parseDate(a.date));
    const limit = parseInt(host.getAttribute('data-limit') || '0', 10);
    const shown = limit > 0 ? list.slice(0, limit) : list;
    if (!shown.length) { empty(host, 'Zatím tu nic nového není.'); return; }

    host.innerHTML = shown.map((n, i) => `
      <article class="news" data-reveal>
        <div class="news__art">${pitchArt(i, 640, 360, '')}</div>
        <div class="news__body">
          <div class="news__meta">
            <span class="tag">${esc(n.tag)}</span>
            <span>${esc(fmtLong(parseDate(n.date)))}</span>
          </div>
          <h3 class="news__title">${esc(n.title)}</h3>
          <p class="news__text">${esc(n.text)}</p>
        </div>
      </article>`).join('');
  }

  /* ---------- Historie, lineární osa -------------------------------------- */
  function renderHistory(host) {
    if (typeof HISTORY === 'undefined') return;
    host.innerHTML = HISTORY.map((h) => `
      <li class="tl ${h.major ? 'is-major' : ''}">
        <span class="tl__year">${esc(h.year)}</span>
        <span class="tl__dot" aria-hidden="true"></span>
        <span class="tl__text">${esc(h.text)}</span>
      </li>`).join('');
  }

  function renderBoard(host) {
    if (typeof BOARD === 'undefined') return;
    host.innerHTML = BOARD.map((b) => `
      <li class="board__item" data-reveal>
        <span class="board__avatar" aria-hidden="true">${esc(abbr(b.name))}</span>
        <span class="board__name">${esc(b.name)}</span>
        <span class="board__role">${esc(b.role)}</span>
      </li>`).join('');
  }

  function renderSponsors(host) {
    const list = (typeof SPONSORS === 'undefined') ? [] : SPONSORS;
    if (!has(list)) { empty(host, 'Místo pro partnery klubu.'); return; }
    host.innerHTML = list.map((s) => `
      <li class="sponsor">
        <span class="sponsor__name">${esc(s.name)}</span>
        <span class="sponsor__tier">${esc(s.tier)}</span>
      </li>`).join('');
  }

  /* ---------- Galerie a lightbox ------------------------------------------ */
  function renderGallery(host) {
    const list = (typeof GALLERY === 'undefined') ? [] : GALLERY;
    if (!has(list)) { empty(host, 'Fotky teprve sbíráme.'); return; }

    host.innerHTML = list.map((g, i) => `
      <button class="photo" type="button" data-photo="${i}" data-tag="${esc(g.tag || '')}"
              aria-label="Zvětšit: ${esc(g.cap)}">
        ${g.src ? `<img src="${esc(g.src)}" alt="${esc(g.cap)}" loading="lazy">` : pitchArt(i, 800, 600, g.cap)}
        <span class="photo__cap">${esc(g.cap)}</span>
      </button>`).join('');

    initLightbox(host, list);
  }

  function initLightbox(host, list) {
    const lb = $('#lightbox');
    if (!lb) return;
    const media = $('.lightbox__media', lb);
    const cap = $('.lightbox__cap', lb);
    let idx = 0, lastFocus = null;

    const visible = () => $$('.photo', host).filter((el) => el.style.display !== 'none');

    const show = (i) => {
      const items = visible();
      if (!items.length) return;
      idx = (i + items.length) % items.length;
      const gi = parseInt(items[idx].getAttribute('data-photo'), 10);
      const g = list[gi];
      media.innerHTML = g.src ? `<img src="${esc(g.src)}" alt="${esc(g.cap)}">` : pitchArt(gi, 1000, 700, g.cap);
      cap.textContent = g.cap;
    };
    const open = (i) => {
      lastFocus = document.activeElement;
      show(i);
      lb.classList.add('is-open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.classList.add('is-locked');
      const c = $('[data-lightbox-close]', lb);
      if (c) c.focus();
    };
    const close = () => {
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('is-locked');
      if (lastFocus) lastFocus.focus();
    };

    host.addEventListener('click', (e) => {
      const btn = e.target.closest('.photo');
      if (btn) open(visible().indexOf(btn));
    });
    $$('[data-lightbox-close]', lb).forEach((b) => b.addEventListener('click', close));
    const prev = $('[data-lightbox-prev]', lb);
    const next = $('[data-lightbox-next]', lb);
    if (prev) prev.addEventListener('click', () => show(idx - 1));
    if (next) next.addEventListener('click', () => show(idx + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  function initFilters() {
    $$('[data-filter-group]').forEach((group) => {
      const target = $(group.getAttribute('data-filter-target'));
      if (!target) return;
      $$('.pill', group).forEach((pill) => {
        pill.addEventListener('click', () => {
          const tag = pill.getAttribute('data-filter');
          $$('.pill', group).forEach((p) => p.setAttribute('aria-pressed', p === pill ? 'true' : 'false'));
          $$('[data-tag]', target).forEach((item) => {
            item.style.display = (tag === 'all' || item.getAttribute('data-tag') === tag) ? '' : 'none';
          });
        });
      });
    });
  }

  /* ---------- Časté dotazy ------------------------------------------------ */
  function renderFaq(host) {
    if (typeof FAQ === 'undefined') return;
    host.innerHTML = FAQ.map((f, i) => `
      <div class="faq__item">
        <h3><button class="faq__q" type="button" aria-expanded="false" aria-controls="fa${i}" id="fq${i}">
          <span>${esc(f.q)}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
        </button></h3>
        <div class="faq__a" id="fa${i}" role="region" aria-labelledby="fq${i}"><p>${esc(f.a)}</p></div>
      </div>`).join('');

    $$('.faq__q', host).forEach((btn) => {
      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        $$('.faq__q', host).forEach((b) => {
          b.setAttribute('aria-expanded', 'false');
          const p = document.getElementById(b.getAttribute('aria-controls'));
          if (p) p.classList.remove('is-open');
        });
        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          const p = document.getElementById(btn.getAttribute('aria-controls'));
          if (p) p.classList.add('is-open');
        }
      });
    });
  }

  /* ---------- Formulář ---------------------------------------------------- */
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
      if (!$$('.field', form).map(check).every(Boolean)) {
        const bad = $('.field.has-error .input, .field.has-error .textarea', form);
        if (bad) bad.focus();
        return;
      }
      if (status) {
        status.textContent = 'Děkujeme. Formulář zatím není napojený na server, napište nám prosím přímo na '
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
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));
  }

  function initYear() {
    $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
  }

  /* ---------- Start ------------------------------------------------------- */
  const RENDERERS = {
    'next-match': renderNextMatch,
    'fixtures':   renderFixtures,
    'table':      renderTable,
    'squads':     renderSquads,
    'news':       renderNews,
    'history':    renderHistory,
    'board':      renderBoard,
    'sponsors':   renderSponsors,
    'gallery':    renderGallery,
    'faq':        renderFaq
  };

  function boot() {
    initHeader();
    $$('[data-render]').forEach((host) => {
      const fn = RENDERERS[host.getAttribute('data-render')];
      if (fn) { try { fn(host); } catch (err) { console.error('Chyba vykreslení:', err); } }
    });
    initFilters();
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
