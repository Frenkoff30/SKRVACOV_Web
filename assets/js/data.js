/* ==========================================================================
   S.K. RVÁČOV — DATOVÝ SOUBOR
   --------------------------------------------------------------------------
   TOHLE JE JEDINÝ SOUBOR, KTERÝ JE POTŘEBA UPRAVOVAT PŘI AKTUALIZACI WEBU.
   Zápasy, tabulka, soupisky, aktuality i sponzoři se načítají odsud.

   !! UPOZORNĚNÍ !!
   Údaje o soutěži, zápasech a tabulce jsou UKÁZKOVÉ (vychází z veřejně
   dostupných zpráv o klubu, ale nejsou ověřené). Před spuštěním webu je
   nahraďte skutečnými daty z fotbal.cz. Jména hráčů jsou zástupná.
   Reálné a ověřené jsou: historie klubu, výkonný výbor a kontakty
   (převzato z původního webu skrvacov.webnode.cz).
   ========================================================================== */

const CLUB = {
  name: 'S.K. Rváčov',
  shortName: 'Rváčov',
  abbr: 'SKR',
  founded: 1927,
  address: 'Rváčov 60, 539 01 Hlinsko',
  phone: ['469 311 365', '606 434 823'],
  email: 'meloun.ales@tiscali.cz',
  season: '2026/27',
  competition: 'I.B třída – 6. liga mužů',
  stadium: 'Hřiště S.K. Rváčov'
};

/* --------------------------------------------------------------------------
   ZÁPASY
   status: 'upcoming' | 'finished'
   date:   ISO formát 'RRRR-MM-DDTHH:MM'
   -------------------------------------------------------------------------- */
const MATCHES = [
  { id: 1, team: 'muzi', comp: 'I.B třída', round: 1, date: '2026-08-15T17:00',
    home: 'S.K. Rváčov', away: 'Sokol Prachovice', venue: 'Rváčov', status: 'finished', hg: 5, ag: 1 },

  { id: 2, team: 'muzi', comp: 'I.B třída', round: 2, date: '2026-08-22T17:00',
    home: 'TJ Sokol Luže', away: 'S.K. Rváčov', venue: 'Luže', status: 'finished', hg: 0, ag: 3 },

  { id: 3, team: 'muzi', comp: 'I.B třída', round: 3, date: '2026-08-30T17:00',
    home: 'S.K. Rváčov', away: 'FK Nasavrky', venue: 'Rváčov', status: 'upcoming' },

  { id: 4, team: 'muzi', comp: 'I.B třída', round: 4, date: '2026-09-06T16:30',
    home: 'TJ Sokol Chrast', away: 'S.K. Rváčov', venue: 'Chrast', status: 'upcoming' },

  { id: 5, team: 'muzi', comp: 'I.B třída', round: 5, date: '2026-09-13T16:30',
    home: 'S.K. Rváčov', away: 'SK Skuteč', venue: 'Rváčov', status: 'upcoming' },

  { id: 6, team: 'muzi', comp: 'I.B třída', round: 6, date: '2026-09-20T16:00',
    home: 'FC Hlinsko B', away: 'S.K. Rváčov', venue: 'Hlinsko', status: 'upcoming' },

  { id: 7, team: 'muzi', comp: 'I.B třída', round: 7, date: '2026-09-27T16:00',
    home: 'S.K. Rváčov', away: 'TJ Sokol Proseč', venue: 'Rváčov', status: 'upcoming' },

  { id: 8, team: 'muzi', comp: 'I.B třída', round: 8, date: '2026-10-04T15:30',
    home: 'TJ Miřetice', away: 'S.K. Rváčov', venue: 'Miřetice', status: 'upcoming' },

  { id: 20, team: 'dorost', comp: 'Okresní přebor dorostu', round: 1, date: '2026-08-23T14:00',
    home: 'S.K. Rváčov', away: 'Sokol Trhová Kamenice', venue: 'Rváčov', status: 'finished', hg: 4, ag: 2 },

  { id: 21, team: 'dorost', comp: 'Okresní přebor dorostu', round: 2, date: '2026-08-30T14:00',
    home: 'TJ Krouna', away: 'S.K. Rváčov', venue: 'Krouna', status: 'upcoming' },

  { id: 22, team: 'dorost', comp: 'Okresní přebor dorostu', round: 3, date: '2026-09-06T14:00',
    home: 'S.K. Rváčov', away: 'SK Skuteč', venue: 'Rváčov', status: 'upcoming' },

  { id: 40, team: 'zaci', comp: 'Okresní přebor žáků', round: 1, date: '2026-08-29T10:00',
    home: 'S.K. Rváčov', away: 'FC Hlinsko', venue: 'Rváčov', status: 'upcoming' },

  { id: 41, team: 'zaci', comp: 'Okresní přebor žáků', round: 2, date: '2026-09-05T10:00',
    home: 'Sokol Vítanov', away: 'S.K. Rváčov', venue: 'Vítanov', status: 'upcoming' },

  { id: 42, team: 'zaci', comp: 'Okresní přebor žáků', round: 3, date: '2026-09-12T10:00',
    home: 'S.K. Rváčov', away: 'TJ Nasavrky', venue: 'Rváčov', status: 'upcoming' }
];

/* --------------------------------------------------------------------------
   TABULKA SOUTĚŽE (muži)
   -------------------------------------------------------------------------- */
const TABLE = [
  { pos: 1,  club: 'S.K. Rváčov',        m: 2, w: 2, d: 0, l: 0, gf: 8,  ga: 1,  pts: 6, form: ['W','W'] },
  { pos: 2,  club: 'FC Hlinsko B',       m: 2, w: 2, d: 0, l: 0, gf: 6,  ga: 2,  pts: 6, form: ['W','W'] },
  { pos: 3,  club: 'TJ Sokol Proseč',    m: 2, w: 1, d: 1, l: 0, gf: 5,  ga: 3,  pts: 4, form: ['D','W'] },
  { pos: 4,  club: 'SK Skuteč',          m: 2, w: 1, d: 1, l: 0, gf: 4,  ga: 2,  pts: 4, form: ['W','D'] },
  { pos: 5,  club: 'TJ Sokol Chrast',    m: 2, w: 1, d: 0, l: 1, gf: 3,  ga: 3,  pts: 3, form: ['L','W'] },
  { pos: 6,  club: 'FK Nasavrky',        m: 2, w: 1, d: 0, l: 1, gf: 4,  ga: 5,  pts: 3, form: ['W','L'] },
  { pos: 7,  club: 'TJ Miřetice',        m: 2, w: 1, d: 0, l: 1, gf: 2,  ga: 3,  pts: 3, form: ['L','W'] },
  { pos: 8,  club: 'TJ Sokol Seč',       m: 2, w: 0, d: 2, l: 0, gf: 2,  ga: 2,  pts: 2, form: ['D','D'] },
  { pos: 9,  club: 'Sokol Prachovice',   m: 2, w: 0, d: 1, l: 1, gf: 2,  ga: 6,  pts: 1, form: ['L','D'] },
  { pos: 10, club: 'TJ Sokol Luže',      m: 2, w: 0, d: 1, l: 1, gf: 1,  ga: 4,  pts: 1, form: ['D','L'] },
  { pos: 11, club: 'TJ Krouna',          m: 2, w: 0, d: 0, l: 2, gf: 1,  ga: 5,  pts: 0, form: ['L','L'] },
  { pos: 12, club: 'Sokol Trhová Kamenice', m: 2, w: 0, d: 0, l: 2, gf: 2, ga: 7, pts: 0, form: ['L','L'] }
];

/* --------------------------------------------------------------------------
   SOUPISKY  (jména jsou ZÁSTUPNÁ – doplňte skutečné)
   pos: 'Brankář' | 'Obránce' | 'Záložník' | 'Útočník'
   -------------------------------------------------------------------------- */
const SQUADS = {
  muzi: {
    label: 'Muži',
    comp: 'I.B třída – 6. liga',
    coach: 'Trenér – doplnit',
    players: [
      { n: 1,  name: 'Jan Novák',       pos: 'Brankář',  apps: 2, goals: 0 },
      { n: 12, name: 'Petr Málek',      pos: 'Brankář',  apps: 0, goals: 0 },
      { n: 2,  name: 'Tomáš Dvořák',    pos: 'Obránce',  apps: 2, goals: 0 },
      { n: 3,  name: 'Martin Sodomka',  pos: 'Obránce',  apps: 2, goals: 1 },
      { n: 4,  name: 'Lukáš Bárta',     pos: 'Obránce',  apps: 2, goals: 0 },
      { n: 5,  name: 'David Kopecký',   pos: 'Obránce',  apps: 1, goals: 0 },
      { n: 6,  name: 'Ondřej Vaněk',    pos: 'Záložník', apps: 2, goals: 1 },
      { n: 7,  name: 'Filip Kučera',    pos: 'Záložník', apps: 2, goals: 2 },
      { n: 8,  name: 'Michal Hejduk',   pos: 'Záložník', apps: 2, goals: 0 },
      { n: 10, name: 'Jakub Řehák',     pos: 'Záložník', apps: 2, goals: 1 },
      { n: 11, name: 'Adam Pilný',      pos: 'Útočník',  apps: 2, goals: 3 },
      { n: 9,  name: 'Vojtěch Marek',   pos: 'Útočník',  apps: 2, goals: 1 },
      { n: 14, name: 'Radek Stará',     pos: 'Záložník', apps: 1, goals: 0 },
      { n: 15, name: 'Josef Zeman',     pos: 'Obránce',  apps: 1, goals: 0 },
      { n: 17, name: 'Marek Culek',     pos: 'Útočník',  apps: 1, goals: 0 },
      { n: 18, name: 'Daniel Hromádka', pos: 'Záložník', apps: 0, goals: 0 }
    ]
  },
  dorost: {
    label: 'Dorost',
    comp: 'Okresní přebor dorostu',
    coach: 'Vedoucí – Vít Červinka',
    players: [
      { n: 1,  name: 'Šimon Málek',     pos: 'Brankář',  apps: 1, goals: 0 },
      { n: 2,  name: 'Matěj Doležal',   pos: 'Obránce',  apps: 1, goals: 0 },
      { n: 4,  name: 'Kryštof Roček',   pos: 'Obránce',  apps: 1, goals: 0 },
      { n: 5,  name: 'Dominik Pavlas',  pos: 'Obránce',  apps: 1, goals: 1 },
      { n: 6,  name: 'Štěpán Kynčl',    pos: 'Záložník', apps: 1, goals: 0 },
      { n: 8,  name: 'Jáchym Beran',    pos: 'Záložník', apps: 1, goals: 1 },
      { n: 9,  name: 'Vojta Halámek',   pos: 'Útočník',  apps: 1, goals: 2 },
      { n: 10, name: 'Tobiáš Sýkora',   pos: 'Záložník', apps: 1, goals: 0 },
      { n: 11, name: 'Erik Vondra',     pos: 'Útočník',  apps: 1, goals: 0 },
      { n: 14, name: 'Sebastian Chára', pos: 'Obránce',  apps: 0, goals: 0 }
    ]
  },
  zaci: {
    label: 'Žáci',
    comp: 'Okresní přebor žáků',
    coach: 'Vedoucí – Miloš Tichý',
    players: [
      { n: 1,  name: 'Tadeáš Kubias',   pos: 'Brankář',  apps: 0, goals: 0 },
      { n: 3,  name: 'Oliver Pešek',    pos: 'Obránce',  apps: 0, goals: 0 },
      { n: 4,  name: 'Matyáš Linhart',  pos: 'Obránce',  apps: 0, goals: 0 },
      { n: 6,  name: 'Antonín Vrba',    pos: 'Záložník', apps: 0, goals: 0 },
      { n: 7,  name: 'Kryštof Sedlák',  pos: 'Záložník', apps: 0, goals: 0 },
      { n: 9,  name: 'Samuel Bureš',    pos: 'Útočník',  apps: 0, goals: 0 },
      { n: 10, name: 'Mikuláš Havel',   pos: 'Útočník',  apps: 0, goals: 0 },
      { n: 11, name: 'Denis Kolář',     pos: 'Záložník', apps: 0, goals: 0 }
    ]
  }
};

/* --------------------------------------------------------------------------
   AKTUALITY
   -------------------------------------------------------------------------- */
const NEWS = [
  {
    id: 'nasavrky',
    date: '2026-08-26',
    tag: 'Muži',
    title: 'V neděli hostíme Nasavrky. Přijďte podpořit nováčka!',
    perex: 'Po dvou výhrách na úvod sezony čeká Rváčov domácí duel s FK Nasavrky. Výkop je v neděli v 17:00, brány areálu otevíráme hodinu předem. Občerstvení zajištěno, vstup dobrovolný.',
    featured: true
  },
  {
    id: 'luze',
    date: '2026-08-22',
    tag: 'Výsledek',
    title: 'Luže padla 0:3, Rváčov drží stoprocentní bilanci',
    perex: 'Druhé kolo, druhá výhra. Na hřišti v Luži rozhodl už první poločas, kdy naši nasázeli dvě branky. Po dvou kolech vedeme tabulku se skóre 8:1.',
    featured: false
  },
  {
    id: 'mladez',
    date: '2026-08-18',
    tag: 'Mládež',
    title: 'Nábor žáků: hledáme nové fotbalisty ročníků 2013–2017',
    perex: 'Máte doma malého fotbalistu? Tréninky žáků probíhají každé úterý a čtvrtek od 17:00 na hřišti ve Rváčově. První měsíc na zkoušku zdarma, vybavení půjčíme.',
    featured: false
  },
  {
    id: 'areal',
    date: '2026-07-30',
    tag: 'Klub',
    title: 'Areál prošel letní údržbou, hřiště je připraveno na sezonu',
    perex: 'Během července jsme provedli vertikutaci a dosev travnaté plochy, opravili oplocení u antuky a natřeli lavičky. Díky všem dobrovolníkům, kteří přiložili ruku k dílu.',
    featured: false
  }
];

/* --------------------------------------------------------------------------
   HISTORIE — ověřená data z původního webu klubu
   -------------------------------------------------------------------------- */
const HISTORY = [
  { year: '1923', title: 'První doložená utkání', text: 'Ve Rváčově se hraje první doložený fotbal.', major: false },
  { year: '1927', title: 'Založení DSK Rváčov', text: 'Oficiální zrod organizovaného fotbalu v obci.', major: true },
  { year: '1935', title: 'Zánik DSK Rváčov', text: 'Činnost klubu je na čas přerušena.', major: false },
  { year: '1939', title: 'První trofej', text: 'Druhé místo na turnaji ve Vítanově – vůbec první získané ocenění.', major: false },
  { year: '1960', title: 'Založení TJ Vysočina', text: 'Fotbal se ve Rváčově vrací pod novou hlavičkou.', major: false },
  { year: '1965', title: 'Postup do okresního přeboru', text: 'První velký sportovní úspěch obnoveného klubu.', major: false },
  { year: '1968–72', title: 'Přerušená činnost', text: 'TJ Vysočina na čtyři roky pozastavuje činnost.', major: false },
  { year: '1992', title: 'První zájezd do zahraničí', text: '2.–7. 7. 1992, Itálie. První mezinárodní utkání: Barcaccia – Rváčov 0:2 a Poli-Sportiva Sanpolese – Rváčov 1:4.', major: true },
  { year: '1993', title: 'Vzniká S.K. Rváčov', text: '9. 1. 1993 změna názvu. O půl roku později, 19. 6. 1993, postup do I.B třídy.', major: true },
  { year: '1994', title: 'Nová travnatá plocha', text: '31. 7. 1994 slavnostní otevření utkáním S.K. Rváčov – Sigma Olomouc 1:10.', major: true },
  { year: '1996', title: 'Nové kabiny', text: '30. 7. 1996 uvedení nových kabin do provozu.', major: false },
  { year: '2000', title: 'Vzniká družstvo žáků', text: '1. 7. 2000 zakládáme žákovské družstvo.', major: false },
  { year: '2001', title: 'Vzniká dorost', text: '1. 7. 2001 zakládáme dorostenecké družstvo.', major: false },
  { year: '2003', title: 'Družstvo elévů', text: '1. 4. 2003 rozšiřujeme mládež o nejmenší.', major: false },
  { year: '2007', title: 'Nová klubovna', text: '1. 9. 2007 otevíráme novou klubovnu S.K. – srdce celého areálu.', major: true }
];

/* --------------------------------------------------------------------------
   VÝKONNÝ VÝBOR — ověřená data z původního webu klubu
   -------------------------------------------------------------------------- */
const BOARD = [
  { name: 'Aleš Meloun',   role: 'Předseda a sekretář S.K.' },
  { name: 'Zdeněk Štengl', role: 'Místopředseda, ekonomika klubu' },
  { name: 'Jiří Tichý',    role: 'Hospodář a správce majetku' },
  { name: 'Vít Červinka',  role: 'Člen výboru – družstvo dorostu' },
  { name: 'Miloš Tichý',   role: 'Člen výboru – družstvo žáků' }
];

/* --------------------------------------------------------------------------
   SPONZOŘI — doplňte skutečné partnery klubu
   -------------------------------------------------------------------------- */
const SPONSORS = [
  { name: 'Obec Rváčov',       tier: 'Hlavní partner' },
  { name: 'Město Hlinsko',     tier: 'Partner' },
  { name: 'Pardubický kraj',   tier: 'Partner' },
  { name: 'Váš podnik',        tier: 'Volné místo' },
  { name: 'Váš podnik',        tier: 'Volné místo' },
  { name: 'Váš podnik',        tier: 'Volné místo' }
];

/* --------------------------------------------------------------------------
   GALERIE — zástupné dlaždice, nahraďte fotkami z assets/img/
   -------------------------------------------------------------------------- */
const GALLERY = [
  { id: 1, cap: 'Domácí zápas s Prachovicemi', tag: 'zapasy', size: 'wide' },
  { id: 2, cap: 'Kabina po výhře',             tag: 'tym',    size: '' },
  { id: 3, cap: 'Travnatá plocha za svítání',  tag: 'areal',  size: 'tall' },
  { id: 4, cap: 'Žáci při tréninku',           tag: 'mladez', size: '' },
  { id: 5, cap: 'Klubovna S.K.',               tag: 'areal',  size: '' },
  { id: 6, cap: 'Dorost na turnaji',           tag: 'mladez', size: '' },
  { id: 7, cap: 'Fanoušci za brankou',         tag: 'zapasy', size: 'wide' },
  { id: 8, cap: 'Antukové hřiště',             tag: 'areal',  size: '' },
  { id: 9, cap: 'A-tým před výkopem',          tag: 'tym',    size: '' }
];

/* --------------------------------------------------------------------------
   ČASTÉ DOTAZY
   -------------------------------------------------------------------------- */
const FAQ = [
  { q: 'Kdy a kde trénujeme?',
    a: 'Muži trénují v úterý a v pátek od 17:30, mládež v úterý a ve čtvrtek od 17:00. Vše na hřišti ve Rváčově. V zimní přípravě se přesouváme na stadion v Hlinsku.' },
  { q: 'Chci hrát za Rváčov, co mám udělat?',
    a: 'Stačí přijít na trénink nebo zavolat na číslo 606 434 823. Bereme hráče do všech tří kategorií – muži, dorost i žáci. První měsíc je nezávazný.' },
  { q: 'Kolik stojí vstup na zápas?',
    a: 'Vstup na domácí utkání je dobrovolný. Každá koruna jde zpět do klubu – na dresy, míče a údržbu areálu.' },
  { q: 'Dá se areál pronajmout?',
    a: 'Ano. Travnaté hřiště, antukové kurty i klubovnu lze pronajmout na firemní akce, turnaje nebo oslavy. Napište nám na e-mail a domluvíme termín.' },
  { q: 'Jak se stát partnerem klubu?',
    a: 'Nabízíme reklamu na mantinelech, na dresech i na webu. Ozvěte se nám a připravíme nabídku na míru rozpočtu vaší firmy.' }
];
