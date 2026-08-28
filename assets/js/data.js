/* ==========================================================================
   S.K. RVÁČOV, DATA WEBU

   Tady se web upravuje. Nic jiného měnit nemusíte.

   !! POZOR !!
   Zápasy, tabulka, soupisky, aktuality a sponzoři jsou UKÁZKOVÁ DATA.
   Slouží k tomu, aby bylo vidět, jak bude web vypadat naplněný.
   Před ostrým spuštěním je nahraďte skutečnými údaji z fotbal.cz.

   Ověřené a skutečné jsou pouze: historie klubu, výkonný výbor
   a kontaktní údaje. Ty pochází z původního webu klubu.
   ========================================================================== */

const CLUB = {
  name:    'S.K. Rváčov',
  founded: 1927,
  address: 'Rváčov 60, 539 01 Hlinsko',
  phone1:  '469 311 365',
  phone2:  '606 434 823',
  email:   'meloun.ales@tiscali.cz',
  season:  '2026/27',
  comp:    'I.B třída'
};

/* --------------------------------------------------------------------------
   ZÁPASY
   Odehraný zápas poznáte podle vyplněného hg (góly domácích) a ag (góly hostů).
   Bez nich se zápas zobrazí v rozpisu jako nadcházející.
   -------------------------------------------------------------------------- */
const MATCHES = [
  { date: '2026-08-15T17:00', home: 'S.K. Rváčov',      away: 'Sokol Prachovice',
    venue: 'Rváčov',   comp: 'I.B třída', team: 'Muži', hg: 5, ag: 1 },

  { date: '2026-08-22T17:00', home: 'TJ Sokol Luže',    away: 'S.K. Rváčov',
    venue: 'Luže',     comp: 'I.B třída', team: 'Muži', hg: 0, ag: 3 },

  { date: '2026-08-23T14:00', home: 'S.K. Rváčov',      away: 'Sokol Trhová Kamenice',
    venue: 'Rváčov',   comp: 'Okresní přebor', team: 'Dorost', hg: 4, ag: 2 },

  { date: '2026-08-30T17:00', home: 'S.K. Rváčov',      away: 'FK Nasavrky',
    venue: 'Rváčov',   comp: 'I.B třída', team: 'Muži' },

  { date: '2026-08-30T14:00', home: 'TJ Krouna',        away: 'S.K. Rváčov',
    venue: 'Krouna',   comp: 'Okresní přebor', team: 'Dorost' },

  { date: '2026-09-05T10:00', home: 'S.K. Rváčov',      away: 'FC Hlinsko',
    venue: 'Rváčov',   comp: 'Okresní přebor', team: 'Žáci' },

  { date: '2026-09-06T16:30', home: 'TJ Sokol Chrast',  away: 'S.K. Rváčov',
    venue: 'Chrast',   comp: 'I.B třída', team: 'Muži' },

  { date: '2026-09-13T16:30', home: 'S.K. Rváčov',      away: 'SK Skuteč',
    venue: 'Rváčov',   comp: 'I.B třída', team: 'Muži' },

  { date: '2026-09-20T16:00', home: 'FC Hlinsko B',     away: 'S.K. Rváčov',
    venue: 'Hlinsko',  comp: 'I.B třída', team: 'Muži' },

  { date: '2026-09-27T16:00', home: 'S.K. Rváčov',      away: 'TJ Sokol Proseč',
    venue: 'Rváčov',   comp: 'I.B třída', team: 'Muži' },

  { date: '2026-10-04T15:30', home: 'TJ Miřetice',      away: 'S.K. Rváčov',
    venue: 'Miřetice', comp: 'I.B třída', team: 'Muži' }
];

/* --------------------------------------------------------------------------
   TABULKA SOUTĚŽE
   m = zápasy, w = výhry, d = remízy, l = prohry,
   gf = vstřelené góly, ga = obdržené góly, pts = body
   -------------------------------------------------------------------------- */
const TABLE = [
  { club: 'S.K. Rváčov',           m: 2, w: 2, d: 0, l: 0, gf: 8, ga: 1, pts: 6 },
  { club: 'FC Hlinsko B',          m: 2, w: 2, d: 0, l: 0, gf: 6, ga: 2, pts: 6 },
  { club: 'TJ Sokol Proseč',       m: 2, w: 1, d: 1, l: 0, gf: 5, ga: 3, pts: 4 },
  { club: 'SK Skuteč',             m: 2, w: 1, d: 1, l: 0, gf: 4, ga: 2, pts: 4 },
  { club: 'TJ Sokol Chrast',       m: 2, w: 1, d: 0, l: 1, gf: 3, ga: 3, pts: 3 },
  { club: 'FK Nasavrky',           m: 2, w: 1, d: 0, l: 1, gf: 4, ga: 5, pts: 3 },
  { club: 'TJ Miřetice',           m: 2, w: 1, d: 0, l: 1, gf: 2, ga: 3, pts: 3 },
  { club: 'TJ Sokol Seč',          m: 2, w: 0, d: 2, l: 0, gf: 2, ga: 2, pts: 2 },
  { club: 'Sokol Prachovice',      m: 2, w: 0, d: 1, l: 1, gf: 2, ga: 6, pts: 1 },
  { club: 'TJ Sokol Luže',         m: 2, w: 0, d: 1, l: 1, gf: 1, ga: 4, pts: 1 },
  { club: 'TJ Krouna',             m: 2, w: 0, d: 0, l: 2, gf: 1, ga: 5, pts: 0 },
  { club: 'Sokol Trhová Kamenice', m: 2, w: 0, d: 0, l: 2, gf: 2, ga: 7, pts: 0 }
];

/* --------------------------------------------------------------------------
   SOUPISKY
   post: 'Brankář' | 'Obránce' | 'Záložník' | 'Útočník'
   -------------------------------------------------------------------------- */
const SQUADS = [
  {
    id: 'muzi', name: 'Muži', note: 'I.B třída, tréninky v úterý a v pátek od 17:30',
    players: [
      { n: 1,  name: 'Jan Novák',       post: 'Brankář',  apps: 2, goals: 0 },
      { n: 12, name: 'Petr Málek',      post: 'Brankář',  apps: 0, goals: 0 },
      { n: 2,  name: 'Tomáš Dvořák',    post: 'Obránce',  apps: 2, goals: 0 },
      { n: 3,  name: 'Martin Sodomka',  post: 'Obránce',  apps: 2, goals: 1 },
      { n: 4,  name: 'Lukáš Bárta',     post: 'Obránce',  apps: 2, goals: 0 },
      { n: 5,  name: 'David Kopecký',   post: 'Obránce',  apps: 1, goals: 0 },
      { n: 6,  name: 'Ondřej Vaněk',    post: 'Záložník', apps: 2, goals: 1 },
      { n: 7,  name: 'Filip Kučera',    post: 'Záložník', apps: 2, goals: 2 },
      { n: 8,  name: 'Michal Hejduk',   post: 'Záložník', apps: 2, goals: 0 },
      { n: 10, name: 'Jakub Řehák',     post: 'Záložník', apps: 2, goals: 1 },
      { n: 9,  name: 'Vojtěch Marek',   post: 'Útočník',  apps: 2, goals: 1 },
      { n: 11, name: 'Adam Pilný',      post: 'Útočník',  apps: 2, goals: 3 }
    ]
  },
  {
    id: 'dorost', name: 'Dorost', note: 'Okresní přebor, vedoucí družstva Vít Červinka',
    players: [
      { n: 1,  name: 'Šimon Málek',     post: 'Brankář',  apps: 1, goals: 0 },
      { n: 2,  name: 'Matěj Doležal',   post: 'Obránce',  apps: 1, goals: 0 },
      { n: 4,  name: 'Kryštof Roček',   post: 'Obránce',  apps: 1, goals: 0 },
      { n: 5,  name: 'Dominik Pavlas',  post: 'Obránce',  apps: 1, goals: 1 },
      { n: 6,  name: 'Štěpán Kynčl',    post: 'Záložník', apps: 1, goals: 0 },
      { n: 8,  name: 'Jáchym Beran',    post: 'Záložník', apps: 1, goals: 1 },
      { n: 10, name: 'Tobiáš Sýkora',   post: 'Záložník', apps: 1, goals: 0 },
      { n: 9,  name: 'Vojta Halámek',   post: 'Útočník',  apps: 1, goals: 2 },
      { n: 11, name: 'Erik Vondra',     post: 'Útočník',  apps: 1, goals: 0 }
    ]
  },
  {
    id: 'zaci', name: 'Žáci', note: 'Okresní přebor, vedoucí družstva Miloš Tichý',
    players: [
      { n: 1,  name: 'Tadeáš Kubias',   post: 'Brankář',  apps: 0, goals: 0 },
      { n: 3,  name: 'Oliver Pešek',    post: 'Obránce',  apps: 0, goals: 0 },
      { n: 4,  name: 'Matyáš Linhart',  post: 'Obránce',  apps: 0, goals: 0 },
      { n: 6,  name: 'Antonín Vrba',    post: 'Záložník', apps: 0, goals: 0 },
      { n: 7,  name: 'Kryštof Sedlák',  post: 'Záložník', apps: 0, goals: 0 },
      { n: 11, name: 'Denis Kolář',     post: 'Záložník', apps: 0, goals: 0 },
      { n: 9,  name: 'Samuel Bureš',    post: 'Útočník',  apps: 0, goals: 0 },
      { n: 10, name: 'Mikuláš Havel',   post: 'Útočník',  apps: 0, goals: 0 }
    ]
  }
];

/* --------------------------------------------------------------------------
   AKTUALITY
   -------------------------------------------------------------------------- */
const NEWS = [
  { date: '2026-08-26', tag: 'Muži',
    title: 'V neděli hostíme Nasavrky, přijďte podpořit nováčka',
    text: 'Po dvou výhrách na úvod sezony čeká Rváčov domácí duel s FK Nasavrky. Výkop je v neděli v 17:00, brány areálu otevíráme hodinu předem. Občerstvení zajištěno, vstup dobrovolný.' },

  { date: '2026-08-22', tag: 'Výsledek',
    title: 'Luže padla 0:3, držíme stoprocentní bilanci',
    text: 'Druhé kolo, druhá výhra. Na hřišti v Luži rozhodl už první poločas, kdy naši nasázeli dvě branky. Po dvou kolech vedeme tabulku se skóre 8:1.' },

  { date: '2026-08-18', tag: 'Mládež',
    title: 'Nábor žáků, hledáme fotbalisty ročníků 2013 až 2017',
    text: 'Máte doma malého fotbalistu? Tréninky žáků probíhají každé úterý a čtvrtek od 17:00 na hřišti ve Rváčově. První měsíc na zkoušku zdarma, vybavení půjčíme.' },

  { date: '2026-07-30', tag: 'Klub',
    title: 'Areál prošel letní údržbou, hřiště je připraveno',
    text: 'Během července jsme provedli vertikutaci a dosev travnaté plochy, opravili oplocení u antuky a natřeli lavičky. Díky všem dobrovolníkům, kteří přiložili ruku k dílu.' }
];

/* --------------------------------------------------------------------------
   FOTOGALERIE
   Skutečné fotky nahrajte do assets/img/ a doplňte pole src:
   { cap: 'Popisek', src: 'assets/img/zapas-01.jpg' }
   Bez src se vykreslí grafická dlaždice.
   -------------------------------------------------------------------------- */
const GALLERY = [
  { cap: 'Domácí zápas s Prachovicemi', tag: 'zapasy' },
  { cap: 'Kabina po výhře',             tag: 'tym'    },
  { cap: 'Travnatá plocha za svítání',  tag: 'areal'  },
  { cap: 'Žáci při tréninku',           tag: 'mladez' },
  { cap: 'Klubovna S.K.',               tag: 'areal'  },
  { cap: 'Dorost na turnaji',           tag: 'mladez' },
  { cap: 'Fanoušci za brankou',         tag: 'zapasy' },
  { cap: 'Antukové hřiště',             tag: 'areal'  },
  { cap: 'A tým před výkopem',          tag: 'tym'    }
];

/* --------------------------------------------------------------------------
   PARTNEŘI KLUBU
   -------------------------------------------------------------------------- */
const SPONSORS = [
  { name: 'Obec Rváčov',     tier: 'Hlavní partner' },
  { name: 'Město Hlinsko',   tier: 'Partner' },
  { name: 'Pardubický kraj', tier: 'Partner' },
  { name: 'Váš podnik',      tier: 'Volné místo' },
  { name: 'Váš podnik',      tier: 'Volné místo' },
  { name: 'Váš podnik',      tier: 'Volné místo' }
];

/* --------------------------------------------------------------------------
   HISTORIE KLUBU, ověřeno z původního webu
   -------------------------------------------------------------------------- */
const HISTORY = [
  { year: '1923',    text: 'První doložená utkání ve Rváčově.' },
  { year: '1927',    text: 'Založení DSK Rváčov.', major: true },
  { year: '1935',    text: 'Zánik DSK Rváčov.' },
  { year: '1939',    text: 'První trofej, druhé místo na turnaji ve Vítanově.' },
  { year: '1960',    text: 'Založení TJ Vysočina.' },
  { year: '1965',    text: 'Postup do okresního přeboru.' },
  { year: '1968/72', text: 'Přerušená činnost TJ Vysočina.' },
  { year: '1992',    text: 'První zájezd do zahraničí. V Itálii jsme vyhráli obě mezinárodní utkání, s Barcaccií 2:0 a se Sanpolese 4:1.', major: true },
  { year: '1993',    text: 'Změna názvu na S.K. Rváčov a postup do I.B třídy.', major: true },
  { year: '1994',    text: 'Otevření nové travnaté plochy utkáním se Sigmou Olomouc.', major: true },
  { year: '1996',    text: 'Uvedení nových kabin do provozu.' },
  { year: '2000',    text: 'Založení žákovského družstva.' },
  { year: '2001',    text: 'Založení dorosteneckého družstva.' },
  { year: '2003',    text: 'Založení mužstva elévů.' },
  { year: '2007',    text: 'Otevření nové klubovny S.K.', major: true }
];

/* --------------------------------------------------------------------------
   VÝKONNÝ VÝBOR, převzato z původního webu (stav k 1. 9. 2009)
   -------------------------------------------------------------------------- */
const BOARD = [
  { name: 'Aleš Meloun',   role: 'Předseda a sekretář' },
  { name: 'Zdeněk Štengl', role: 'Místopředseda, ekonomika klubu' },
  { name: 'Jiří Tichý',    role: 'Hospodář a správce majetku' },
  { name: 'Vít Červinka',  role: 'Družstvo dorostu' },
  { name: 'Miloš Tichý',   role: 'Družstvo žáků' }
];

/* --------------------------------------------------------------------------
   ČASTÉ DOTAZY
   -------------------------------------------------------------------------- */
const FAQ = [
  { q: 'Kdy a kde trénujeme?',
    a: 'Muži trénují v úterý a v pátek od 17:30, mládež v úterý a ve čtvrtek od 17:00. Vše na hřišti ve Rváčově. V zimní přípravě se přesouváme na stadion v Hlinsku.' },
  { q: 'Chci hrát za Rváčov, co mám udělat?',
    a: 'Stačí přijít na trénink nebo zavolat na číslo 606 434 823. Bereme hráče do všech tří kategorií, tedy muže, dorost i žáky. První měsíc je nezávazný.' },
  { q: 'Kolik stojí vstup na zápas?',
    a: 'Vstup na domácí utkání je dobrovolný. Každá koruna jde zpět do klubu, na dresy, míče a údržbu areálu.' },
  { q: 'Dá se areál pronajmout?',
    a: 'Ano. Travnaté hřiště, antukové kurty i klubovnu lze pronajmout na firemní akce, turnaje nebo oslavy. Napište nám a domluvíme termín.' },
  { q: 'Jak se stát partnerem klubu?',
    a: 'Nabízíme reklamu na mantinelech, na dresech i tady na webu. Ozvěte se nám a připravíme nabídku na míru rozpočtu vaší firmy.' }
];
