/* ==========================================================================
   S.K. RVÁČOV — aplikační logika
   Vanilla JS, žádné závislosti. Data se berou z assets/js/data.js
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- Pomocné funkce -------------------------------------------- */
  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const MONTHS = ['ledna','února','března','dubna','května','června','července','srpna','září','října','listopadu','prosince'];
  const MONTHS_SHORT = ['Led','Úno','Bře','Dub','Kvě','Čvn','Čvc','Srp','Zář','Říj','Lis','Pro'];
  const DAYS = ['Neděle','Pondělí','Úterý','Středa','Čtvrtek','Pátek','Sobota'];

  const parseDate = (iso) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?$/.exec(iso || '');
    if (!m) return null;
    return new Date(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0));
  };
  const fmtLong  = (d) => d ? `${d.getDate()}. ${MONTHS[d.getMonth()]} ${d.getFullYear()}` : '';
  const fmtDay   = (d) => d ? DAYS[d.getDay()] : '';
  const fmtTime  = (d) => d ? `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}` : '';
  const pad2     = (n) => String(n).padStart(2, '0');

  const isOurs   = (name) => /rváčov|rvacov/i.test(name || '');
  const initials = (name) => (name || '')
    .replace(/^(S\.K\.|SK|FK|FC|TJ|Sokol)\s+/i, '')
    .split(/[\s-]+/).filter(Boolean).slice(0, 2)
    .map((w) => w[0]).join('').toUpperCase();

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Ikony (Lucide, 24×24, stroke) */
  const ICON = {
    arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    calendar:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    clock:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    pin:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    trophy:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4h12v5a6 6 0 0 1-12 0Z"/><path d="M6 6H4a2 2 0 0 0 0 4h2M18 6h2a2 2 0 0 1 0 4h-2M9 20h6M12 15v5"/></svg>',
    inbox:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h5l2 3h4l2-3h5"/><path d="M5 5h14l2 7v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Z"/></svg>'
  };

  /* ======================================================================
     1) MOTIV (světlý / tmavý)
     ====================================================================== */
  function initTheme() {
    const KEY = 'skr-theme';
    let saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) { /* soukromý režim */ }
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.setAttribute('data-theme', saved);
    }
    $$('[data-theme-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        btn.setAttribute('aria-label', next === 'light' ? 'Přepnout na tmavý režim' : 'Přepnout na světlý režim');
        try { localStorage.setItem(KEY, next); } catch (e) { /* ignorovat */ }
      });
    });
  }

  /* ======================================================================
     2) HLAVIČKA + MOBILNÍ NAVIGACE
     ====================================================================== */
  function initHeader() {
    const header = $('.header');
    if (header) {
      const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 24);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    const drawer = $('#drawer');
    const openBtn = $('[data-drawer-open]');
    const closeBtn = $('[data-drawer-close]');
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
    if (closeBtn) closeBtn.addEventListener('click', close);
    $$('a', drawer).forEach((a) => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
    });
  }

  /* ======================================================================
     3) ODHALOVÁNÍ PŘI SCROLLU
     ====================================================================== */
  function initReveal() {
    const items = $$('[data-reveal]');
    if (!items.length) return;
    document.body.classList.add('reveal-ready');

    const show = (el) => {
      const delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
      setTimeout(() => el.classList.add('is-in'), delay);
    };

    if (prefersReduced || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        show(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));

    /* Pojistka: cokoli je už ve výřezu, odhal i bez pozorovatele.
       Kdyby observer z jakéhokoli důvodu nespustil, obsah nezůstane neviditelný. */
    const sweep = () => {
      items.forEach((el) => {
        if (el.classList.contains('is-in')) return;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.96 && r.bottom > 0) { show(el); io.unobserve(el); }
      });
    };
    requestAnimationFrame(sweep);
    window.addEventListener('load', sweep);
    setTimeout(sweep, 1200);
  }

  /* ======================================================================
     4) POČÍTADLA
     ====================================================================== */
  function initCounters() {
    const els = $$('[data-count]');
    if (!els.length) return;
    const run = (el) => {
      const target = parseFloat(el.getAttribute('data-count'));
      if (prefersReduced || isNaN(target)) { el.textContent = String(target || el.textContent); return; }
      const dur = 1100;
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) { els.forEach(run); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.5 });
    els.forEach((el) => io.observe(el));
  }

  /* ======================================================================
     5) ZÁPASY
     ====================================================================== */
  const getMatches = (team) => (typeof MATCHES === 'undefined' ? [] : MATCHES)
    .filter((m) => !team || team === 'all' || m.team === team);

  const sortByDate = (a, b) => (parseDate(a.date) - parseDate(b.date));

  function nextMatch(team) {
    const now = new Date();
    return getMatches(team)
      .filter((m) => m.status === 'upcoming' && parseDate(m.date) > now)
      .sort(sortByDate)[0]
      || getMatches(team).filter((m) => m.status === 'upcoming').sort(sortByDate)[0];
  }

  function renderNextMatch(host) {
    const m = nextMatch(host.getAttribute('data-team') || 'muzi');
    if (!m) {
      host.innerHTML = `<div class="empty">${ICON.inbox}<p>Rozpis dalších zápasů zveřejníme brzy.</p></div>`;
      return;
    }
    const d = parseDate(m.date);
    const homeOurs = isOurs(m.home);

    host.innerHTML = `
      <article class="match-card">
        <div class="match-card__head">
          <span class="match-card__comp">${esc(m.comp)}${m.round ? ' &middot; ' + m.round + '. kolo' : ''}</span>
          <span class="match-card__comp">${homeOurs ? 'Doma' : 'Venku'}</span>
        </div>
        <div class="match-card__body">
          <div class="match-teams">
            <div class="match-team ${homeOurs ? 'match-team--home' : ''}">
              <span class="match-team__logo">${esc(initials(m.home))}</span>
              <span class="match-team__name">${esc(m.home)}</span>
            </div>
            <span class="match-vs">vs</span>
            <div class="match-team ${!homeOurs ? 'match-team--home' : ''}">
              <span class="match-team__logo">${esc(initials(m.away))}</span>
              <span class="match-team__name">${esc(m.away)}</span>
            </div>
          </div>

          <div class="match-meta">
            <span class="match-meta__item">${ICON.calendar}${esc(fmtDay(d))} ${esc(fmtLong(d))}</span>
            <span class="match-meta__item">${ICON.clock}${esc(fmtTime(d))}</span>
            <span class="match-meta__item">${ICON.pin}${esc(m.venue)}</span>
          </div>

          <div class="countdown" data-countdown="${esc(m.date)}" role="timer" aria-live="off">
            <div class="countdown__cell"><div class="countdown__num" data-cd="d">--</div><div class="countdown__lbl">Dní</div></div>
            <div class="countdown__cell"><div class="countdown__num" data-cd="h">--</div><div class="countdown__lbl">Hodin</div></div>
            <div class="countdown__cell"><div class="countdown__num" data-cd="m">--</div><div class="countdown__lbl">Minut</div></div>
            <div class="countdown__cell"><div class="countdown__num" data-cd="s">--</div><div class="countdown__lbl">Sekund</div></div>
          </div>
        </div>
      </article>`;
  }

  function initCountdowns() {
    const nodes = $$('[data-countdown]');
    if (!nodes.length) return;
    const tick = () => {
      nodes.forEach((node) => {
        const target = parseDate(node.getAttribute('data-countdown'));
        if (!target) return;
        let diff = Math.floor((target - new Date()) / 1000);
        if (diff < 0) diff = 0;
        const d = Math.floor(diff / 86400);
        const h = Math.floor((diff % 86400) / 3600);
        const mi = Math.floor((diff % 3600) / 60);
        const s = diff % 60;
        const set = (k, v) => { const el = $(`[data-cd="${k}"]`, node); if (el) el.textContent = pad2(v); };
        set('d', d); set('h', h); set('m', mi); set('s', s);
      });
    };
    tick();
    setInterval(tick, 1000);
  }

  function fixtureHTML(m) {
    const d = parseDate(m.date);
    const done = m.status === 'finished';
    let resultClass = '';
    if (done) {
      const ourGoals = isOurs(m.home) ? m.hg : m.ag;
      const oppGoals = isOurs(m.home) ? m.ag : m.hg;
      resultClass = ourGoals > oppGoals ? 'txt-win' : (ourGoals === oppGoals ? '' : 'txt-loss');
    }
    return `
      <li>
        <article class="fixture fixture--own">
          <div class="fixture__date">
            <div class="fixture__day">${d ? d.getDate() + '.' : '--'}</div>
            <div class="fixture__mon">${d ? MONTHS_SHORT[d.getMonth()] + ' ' + d.getFullYear() : ''}</div>
          </div>
          <div class="fixture__main">
            <div class="fixture__teams">${esc(m.home)} <span class="dim">–</span> ${esc(m.away)}</div>
            <div class="fixture__sub">${esc(m.comp)}${m.round ? ' &middot; ' + m.round + '. kolo' : ''} &middot; ${esc(m.venue)}</div>
          </div>
          <div class="fixture__right">
            ${done
              ? `<div class="fixture__score ${resultClass}">${m.hg}:${m.ag}</div><span class="badge">Odehráno</span>`
              : `<div class="fixture__time">${esc(fmtTime(d))}</div><span class="badge badge--accent">${esc(fmtDay(d))}</span>`}
          </div>
        </article>
      </li>`;
  }

  function renderFixtures(host) {
    const team = host.getAttribute('data-team') || 'all';
    const status = host.getAttribute('data-status') || 'all';
    const limit = parseInt(host.getAttribute('data-limit') || '0', 10);

    let list = getMatches(team);
    if (status !== 'all') list = list.filter((m) => m.status === status);
    list.sort(status === 'finished' ? (a, b) => sortByDate(b, a) : sortByDate);
    if (limit > 0) list = list.slice(0, limit);

    host.innerHTML = list.length
      ? list.map(fixtureHTML).join('')
      : `<li><div class="empty">${ICON.inbox}<p>Žádné zápasy k zobrazení.</p></div></li>`;
  }

  /* ======================================================================
     6) BĚŽÍCÍ PÁS S VÝSLEDKY
     ====================================================================== */
  function renderTicker(host) {
    const played = getMatches('all').filter((m) => m.status === 'finished').sort((a, b) => sortByDate(b, a));
    const upcoming = getMatches('all').filter((m) => m.status === 'upcoming').sort(sortByDate).slice(0, 3);

    const items = [];
    played.forEach((m) => {
      const ourGoals = isOurs(m.home) ? m.hg : m.ag;
      const oppGoals = isOurs(m.home) ? m.ag : m.hg;
      const cls = ourGoals > oppGoals ? 'res--w' : (ourGoals === oppGoals ? 'res--d' : 'res--l');
      items.push(`<span class="ticker__item"><b>${esc(initials(m.home))}</b> <span class="res ${cls}">${m.hg}:${m.ag}</span> <b>${esc(initials(m.away))}</b> <span class="dim">${esc(m.comp)}</span></span>`);
    });
    upcoming.forEach((m) => {
      const d = parseDate(m.date);
      items.push(`<span class="ticker__item"><span class="dim">${esc(d ? d.getDate() + '. ' + (d.getMonth() + 1) + '.' : '')}</span> <b>${esc(initials(m.home))}</b> <span class="dim">vs</span> <b>${esc(initials(m.away))}</b> <span class="dim">${esc(fmtTime(d))}</span></span>`);
    });
    if (!items.length) return;

    const group = `<div class="ticker__group">${items.join('')}</div>`;
    host.innerHTML = `<div class="ticker__track">${group}${group}</div>`;
  }

  /* ======================================================================
     7) TABULKA SOUTĚŽE
     ====================================================================== */
  function renderTable(host) {
    if (typeof TABLE === 'undefined' || !TABLE.length) return;
    const limit = parseInt(host.getAttribute('data-limit') || '0', 10);
    const compact = host.hasAttribute('data-compact');
    let rows = TABLE.slice();
    if (limit > 0) rows = rows.slice(0, limit);

    const head = compact
      ? ['#', 'Klub', 'Z', 'B']
      : ['#', 'Klub', 'Z', 'V', 'R', 'P', 'Skóre', 'B', 'Forma'];

    const body = rows.map((r) => {
      const own = isOurs(r.club);
      const cells = compact
        ? `<td>${r.m}</td><td class="pts">${r.pts}</td>`
        : `<td>${r.m}</td><td>${r.w}</td><td>${r.d}</td><td>${r.l}</td>
           <td>${r.gf}:${r.ga}</td><td class="pts">${r.pts}</td>
           <td><span class="form-run">${(r.form || []).map((f) => `<span class="form-dot form-dot--sm form-dot--${f.toLowerCase()}" title="${f === 'W' ? 'Výhra' : f === 'D' ? 'Remíza' : 'Prohra'}">${f === 'W' ? 'V' : f === 'D' ? 'R' : 'P'}</span>`).join('')}</span></td>`;
      return `
        <tr class="${own ? 'is-own' : ''}">
          <td class="pos">${r.pos}</td>
          <td><span class="club"><span class="club__badge">${esc(initials(r.club))}</span><span class="club__name">${esc(r.club)}</span></span></td>
          ${cells}
        </tr>`;
    }).join('');

    host.innerHTML = `
      <table class="ltable">
        <caption class="visually-hidden">Tabulka soutěže ${esc(typeof CLUB !== 'undefined' ? CLUB.competition : '')}</caption>
        <thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead>
        <tbody>${body}</tbody>
      </table>`;
  }

  /* ======================================================================
     8) SOUPISKY
     ====================================================================== */
  function playerHTML(p) {
    return `
      <article class="player">
        <span class="player__num" aria-hidden="true">${p.n}</span>
        <span class="badge badge--accent player__pos">${esc(p.pos)}</span>
        <h3 class="player__name">${esc(p.name)}</h3>
        <div class="player__meta">
          <span class="player__stat"><b>${p.apps}</b><span>Zápasů</span></span>
          <span class="player__stat"><b>${p.goals}</b><span>Branek</span></span>
          <span class="player__stat"><b>${p.n}</b><span>Číslo</span></span>
        </div>
      </article>`;
  }

  function renderSquad(host) {
    if (typeof SQUADS === 'undefined') return;
    const key = host.getAttribute('data-squad');
    const squad = SQUADS[key];
    if (!squad) return;
    host.innerHTML = squad.players.map(playerHTML).join('');
  }

  function initTabs() {
    $$('[data-tabs]').forEach((group) => {
      const tabs = $$('[role="tab"]', group);
      const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls'))).filter(Boolean);

      const select = (idx) => {
        tabs.forEach((t, i) => {
          const on = i === idx;
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          t.tabIndex = on ? 0 : -1;
          if (panels[i]) panels[i].hidden = !on;
        });
      };

      tabs.forEach((t, i) => {
        t.addEventListener('click', () => select(i));
        t.addEventListener('keydown', (e) => {
          let next = null;
          if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
          if (e.key === 'ArrowLeft')  next = (i - 1 + tabs.length) % tabs.length;
          if (e.key === 'Home') next = 0;
          if (e.key === 'End')  next = tabs.length - 1;
          if (next === null) return;
          e.preventDefault();
          select(next);
          tabs[next].focus();
        });
      });
      /* Otevření konkrétní záložky přes odkaz typu tymy.html#dorost */
      const fromHash = () => {
        const key = (location.hash || '').replace('#', '');
        if (!key) return -1;
        return tabs.findIndex((t) => t.getAttribute('data-tab-key') === key);
      };

      const hashIdx = fromHash();
      const initial = hashIdx >= 0
        ? hashIdx
        : Math.max(0, tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true'));
      select(initial);

      window.addEventListener('hashchange', () => {
        const i = fromHash();
        if (i >= 0) { select(i); tabs[i].focus(); }
      });
    });
  }

  /* ======================================================================
     9) AKTUALITY
     ====================================================================== */
  function newsThumb(seed) {
    const hues = [['#E3242B', '#7A0C13'], ['#F7C948', '#8A6404'], ['#21B85A', '#0B5228'], ['#3B82F6', '#12305F']];
    const [a, b] = hues[seed % hues.length];
    return `
      <svg viewBox="0 0 640 400" role="img" aria-label="Ilustrační grafika" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="ng${seed}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="${a}" stop-opacity=".85"/>
            <stop offset="1" stop-color="${b}" stop-opacity=".95"/>
          </linearGradient>
        </defs>
        <rect width="640" height="400" fill="#0D1113"/>
        <rect width="640" height="400" fill="url(#ng${seed})" opacity=".55"/>
        <g stroke="#fff" stroke-opacity=".18" fill="none" stroke-width="2">
          <circle cx="320" cy="200" r="86"/>
          <path d="M320 60v280"/>
          <rect x="-60" y="118" width="140" height="164"/>
          <rect x="560" y="118" width="140" height="164"/>
        </g>
        <g fill="#fff" fill-opacity=".14">
          <circle cx="112" cy="318" r="46"/>
          <circle cx="540" cy="88" r="30"/>
        </g>
      </svg>`;
  }

  function renderNews(host) {
    if (typeof NEWS === 'undefined') return;
    const limit = parseInt(host.getAttribute('data-limit') || '0', 10);
    let list = NEWS.slice().sort((a, b) => (parseDate(b.date) - parseDate(a.date)));
    if (limit > 0) list = list.slice(0, limit);

    host.innerHTML = list.map((n, i) => {
      const d = parseDate(n.date);
      const featured = n.featured && i === 0;
      return `
        <article class="card card--link card--accented news-card ${featured ? 'news-card--featured' : ''}" data-reveal data-reveal-delay="${i * 70}">
          <div class="news-card__thumb">${newsThumb(i)}</div>
          <div class="card__kicker">
            <span class="badge badge--gold">${esc(n.tag)}</span>
            <span class="news-card__date">${esc(fmtLong(d))}</span>
          </div>
          <h3 class="news-card__title">${esc(n.title)}</h3>
          <p class="news-card__text">${esc(n.perex)}</p>
          <span class="link-arrow news-card__more">Číst dál ${ICON.arrowRight}</span>
        </article>`;
    }).join('');
  }

  /* ======================================================================
     10) HISTORIE, VEDENÍ, SPONZOŘI, FAQ
     ====================================================================== */
  function renderTimeline(host) {
    if (typeof HISTORY === 'undefined') return;
    host.innerHTML = HISTORY.map((h, i) => `
      <li class="tl-item ${h.major ? 'tl-item--major' : ''}" data-reveal data-reveal-delay="${Math.min(i, 8) * 55}">
        <div class="tl-item__year">${esc(h.year)}</div>
        <h3 class="tl-item__title">${esc(h.title)}</h3>
        <p class="tl-item__text">${esc(h.text)}</p>
      </li>`).join('');
  }

  function renderBoard(host) {
    if (typeof BOARD === 'undefined') return;
    host.innerHTML = BOARD.map((b, i) => `
      <article class="board__item" data-reveal data-reveal-delay="${i * 60}">
        <div class="board__avatar" aria-hidden="true">${esc(initials(b.name))}</div>
        <h3 class="board__name">${esc(b.name)}</h3>
        <p class="board__role">${esc(b.role)}</p>
      </article>`).join('');
  }

  function renderSponsors(host) {
    if (typeof SPONSORS === 'undefined') return;
    host.innerHTML = SPONSORS.map((s) => `
      <div class="sponsor">
        <span class="sponsor__name">${esc(s.name)}</span>
        <span class="sponsor__tier">${esc(s.tier)}</span>
      </div>`).join('');
  }

  function renderFaq(host) {
    if (typeof FAQ === 'undefined') return;
    host.innerHTML = FAQ.map((f, i) => `
      <div class="faq__item">
        <h3>
          <button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-a-${i}" id="faq-q-${i}">
            <span>${esc(f.q)}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </h3>
        <div class="faq__a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}"><p>${esc(f.a)}</p></div>
      </div>`).join('');

    $$('.faq__q', host).forEach((btn) => {
      btn.addEventListener('click', () => {
        const open = btn.getAttribute('aria-expanded') === 'true';
        $$('.faq__q', host).forEach((b) => {
          b.setAttribute('aria-expanded', 'false');
          const p = document.getElementById(b.getAttribute('aria-controls'));
          if (p) p.classList.remove('is-open');
        });
        if (!open) {
          btn.setAttribute('aria-expanded', 'true');
          const panel = document.getElementById(btn.getAttribute('aria-controls'));
          if (panel) panel.classList.add('is-open');
        }
      });
    });
  }

  /* ======================================================================
     11) GALERIE + LIGHTBOX
     ====================================================================== */
  function galleryArt(id, cap) {
    const palettes = [
      ['#E3242B', '#5C070C'], ['#F7C948', '#6B4B03'], ['#21B85A', '#08341A'],
      ['#2C5364', '#0F2027'], ['#B01218', '#2A0507'], ['#D9A441', '#3A2A05']
    ];
    const [a, b] = palettes[id % palettes.length];
    return `
      <svg viewBox="0 0 800 600" role="img" aria-label="${esc(cap)}" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="gg${id}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
          </linearGradient>
          <pattern id="gp${id}" width="70" height="600" patternUnits="userSpaceOnUse">
            <rect width="35" height="600" fill="#fff" fill-opacity=".05"/>
          </pattern>
        </defs>
        <rect width="800" height="600" fill="#0A0D0F"/>
        <rect width="800" height="600" fill="url(#gg${id})" opacity=".62"/>
        <rect width="800" height="600" fill="url(#gp${id})"/>
        <g stroke="#fff" stroke-opacity=".22" fill="none" stroke-width="3">
          <circle cx="400" cy="300" r="118"/><path d="M400 0v600"/>
          <rect x="-90" y="180" width="180" height="240"/><rect x="710" y="180" width="180" height="240"/>
        </g>
        <text x="400" y="330" text-anchor="middle" font-family="Barlow Condensed, Arial Narrow, sans-serif"
              font-size="150" font-weight="800" fill="#fff" fill-opacity=".13" letter-spacing="6">SKR</text>
      </svg>`;
  }

  function renderGallery(host) {
    if (typeof GALLERY === 'undefined') return;
    host.innerHTML = GALLERY.map((g, i) => `
      <button class="gallery__item ${g.size ? 'gallery__item--' + g.size : ''}" type="button"
              data-gallery-index="${i}" data-tag="${esc(g.tag)}" aria-label="Zvětšit: ${esc(g.cap)}">
        ${galleryArt(g.id, g.cap)}
        <span class="gallery__cap">${esc(g.cap)}</span>
      </button>`).join('');
    initLightbox(host);
  }

  function initLightbox(host) {
    const lb = $('#lightbox');
    if (!lb) return;
    const media = $('.lightbox__media', lb);
    const cap = $('.lightbox__cap', lb);
    let index = 0;
    let lastFocus = null;

    const visibleItems = () => $$('.gallery__item', host).filter((el) => el.style.display !== 'none');

    const show = (i) => {
      const items = visibleItems();
      if (!items.length) return;
      index = (i + items.length) % items.length;
      const btn = items[index];
      const gi = parseInt(btn.getAttribute('data-gallery-index'), 10);
      const g = GALLERY[gi];
      media.innerHTML = galleryArt(g.id, g.cap);
      cap.textContent = g.cap;
    };

    const open = (i) => {
      lastFocus = document.activeElement;
      show(i);
      lb.classList.add('is-open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.classList.add('is-locked');
      const closeBtn = $('.lightbox__close', lb);
      if (closeBtn) closeBtn.focus();
    };
    const close = () => {
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('is-locked');
      if (lastFocus) lastFocus.focus();
    };

    host.addEventListener('click', (e) => {
      const btn = e.target.closest('.gallery__item');
      if (!btn) return;
      open(visibleItems().indexOf(btn));
    });

    $$('[data-lightbox-close]', lb).forEach((b) => b.addEventListener('click', close));
    const prev = $('[data-lightbox-prev]', lb);
    const next = $('[data-lightbox-next]', lb);
    if (prev) prev.addEventListener('click', () => show(index - 1));
    if (next) next.addEventListener('click', () => show(index + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });

    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
  }

  /* ======================================================================
     12) FILTRY (galerie)
     ====================================================================== */
  function initFilters() {
    $$('[data-filter-group]').forEach((group) => {
      const targetSel = group.getAttribute('data-filter-target');
      const target = $(targetSel);
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

  /* ======================================================================
     13) FORMULÁŘ
     ====================================================================== */
  function initForm() {
    const form = $('[data-contact-form]');
    if (!form) return;
    const status = $('.form-status', form);

    const validate = (field) => {
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
      input.addEventListener('blur', () => validate(field));
      input.addEventListener('input', () => {
        if (field.classList.contains('has-error')) validate(field);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = $$('.field', form);
      const allOk = fields.map(validate).every(Boolean);
      if (!allOk) {
        const firstBad = $('.field.has-error .input, .field.has-error .textarea', form);
        if (firstBad) firstBad.focus();
        return;
      }
      if (status) {
        status.textContent = 'Děkujeme! Zpráva je připravena k odeslání. Formulář zatím není napojen na server – ozvěte se prosím na ' + (typeof CLUB !== 'undefined' ? CLUB.email : 'e-mail klubu') + '.';
        status.classList.add('is-visible');
      }
      form.reset();
    });
  }

  /* ======================================================================
     14) TLAČÍTKO NAHORU
     ====================================================================== */
  function initToTop() {
    const btn = $('.to-top');
    if (!btn) return;
    const onScroll = () => btn.classList.toggle('is-visible', window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  }

  /* ======================================================================
     15) AKTUÁLNÍ ROK V PATIČCE
     ====================================================================== */
  function initYear() {
    $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
  }

  /* ======================================================================
     START
     ====================================================================== */
  const RENDERERS = {
    'next-match': renderNextMatch,
    'fixtures':   renderFixtures,
    'ticker':     renderTicker,
    'table':      renderTable,
    'news':       renderNews,
    'timeline':   renderTimeline,
    'board':      renderBoard,
    'sponsors':   renderSponsors,
    'faq':        renderFaq,
    'gallery':    renderGallery
  };

  function boot() {
    initTheme();
    initHeader();

    $$('[data-render]').forEach((host) => {
      const fn = RENDERERS[host.getAttribute('data-render')];
      if (fn) { try { fn(host); } catch (err) { console.error('Chyba vykreslení:', err); } }
    });
    $$('[data-squad]').forEach(renderSquad);

    initTabs();
    initFilters();
    initCountdowns();
    initForm();
    initToTop();
    initYear();
    initReveal();
    initCounters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
