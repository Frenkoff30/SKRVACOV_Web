/* ==========================================================================
   S.K. RVÁČOV — DATA WEBU

   Tady se web upravuje. Nic jiného měnit nemusíte.
   Prázdné hranaté závorky [] znamenají "sekce je zatím prázdná" —
   web v takovém případě sám zobrazí hlášku, že se obsah doplní.

   Ověřená data (historie, vedení, kontakty) pochází z původního webu klubu.
   ========================================================================== */

/* --------------------------------------------------------------------------
   UKÁZKOVÁ DATA

   true  = soupisky a tabulka níže jsou jen NÁSTŘEL, aby bylo vidět,
           jak to bude vypadat. Web u nich zobrazí upozornění.
   false = data jsou skutečná, upozornění zmizí.
   -------------------------------------------------------------------------- */
const DEMO = true;

/* --------------------------------------------------------------------------
   ZÁKLADNÍ ÚDAJE O KLUBU
   -------------------------------------------------------------------------- */
const CLUB = {
  name:     'S.K. Rváčov',
  founded:  1927,
  address:  'Rváčov 60, 539 01 Hlinsko',
  phone1:   '469 311 365',
  phone2:   '606 434 823',
  email:    'meloun.ales@tiscali.cz'
};

/* --------------------------------------------------------------------------
   ZÁPASY

   Prázdné = web napíše, že se rozpis doplní.
   Přidání zápasu — zkopírujte řádek a upravte:

   { date: '2026-09-06T17:00', home: 'S.K. Rváčov', away: 'Soupeř',
     venue: 'Rváčov', comp: 'Okresní přebor', team: 'Muži' },

   Odehraný zápas: dopište výsledek pomocí hg (góly domácích) a ag (góly hostů):

   { date: '2026-09-06T17:00', home: 'S.K. Rváčov', away: 'Soupeř',
     venue: 'Rváčov', comp: 'Okresní přebor', team: 'Muži', hg: 2, ag: 1 },
   -------------------------------------------------------------------------- */
const MATCHES = [];

/* --------------------------------------------------------------------------
   TABULKA SOUTĚŽE

   Prázdné = web odkáže na fotbal.cz.
   Řádek tabulky:

   { club: 'S.K. Rváčov', m: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },

   m = zápasy, w = výhry, d = remízy, l = prohry,
   gf = vstřelené góly, ga = obdržené góly, pts = body
   -------------------------------------------------------------------------- */
const TABLE = [
  { club: 'Soupeř A',      m: 5, w: 4, d: 1, l: 0, gf: 14, ga: 4,  pts: 13 },
  { club: 'S.K. Rváčov',   m: 5, w: 4, d: 0, l: 1, gf: 12, ga: 6,  pts: 12 },
  { club: 'Soupeř B',      m: 5, w: 3, d: 1, l: 1, gf: 10, ga: 7,  pts: 10 },
  { club: 'Soupeř C',      m: 5, w: 2, d: 2, l: 1, gf: 9,  ga: 8,  pts: 8 },
  { club: 'Soupeř D',      m: 5, w: 2, d: 1, l: 2, gf: 8,  ga: 9,  pts: 7 },
  { club: 'Soupeř E',      m: 5, w: 1, d: 2, l: 2, gf: 6,  ga: 9,  pts: 5 },
  { club: 'Soupeř F',      m: 5, w: 1, d: 0, l: 4, gf: 5,  ga: 12, pts: 3 },
  { club: 'Soupeř G',      m: 5, w: 0, d: 1, l: 4, gf: 3,  ga: 12, pts: 1 }
];

/* --------------------------------------------------------------------------
   SOUPISKY

   Jména níže jsou ZÁSTUPNÁ — nahraďte skutečnými hráči.
   post: 'Brankář' | 'Obránce' | 'Záložník' | 'Útočník'
   -------------------------------------------------------------------------- */
const SQUADS = [
  {
    id: 'muzi',
    name: 'Muži',
    note: 'A-tým klubu',
    players: [
      { n: 1,  name: 'Jméno Příjmení', post: 'Brankář'  },
      { n: 2,  name: 'Jméno Příjmení', post: 'Obránce'  },
      { n: 3,  name: 'Jméno Příjmení', post: 'Obránce'  },
      { n: 4,  name: 'Jméno Příjmení', post: 'Obránce'  },
      { n: 5,  name: 'Jméno Příjmení', post: 'Obránce'  },
      { n: 6,  name: 'Jméno Příjmení', post: 'Záložník' },
      { n: 7,  name: 'Jméno Příjmení', post: 'Záložník' },
      { n: 8,  name: 'Jméno Příjmení', post: 'Záložník' },
      { n: 9,  name: 'Jméno Příjmení', post: 'Útočník'  },
      { n: 10, name: 'Jméno Příjmení', post: 'Záložník' },
      { n: 11, name: 'Jméno Příjmení', post: 'Útočník'  }
    ]
  },
  {
    id: 'dorost',
    name: 'Dorost',
    note: 'Družstvo od roku 2001',
    players: [
      { n: 1,  name: 'Jméno Příjmení', post: 'Brankář'  },
      { n: 3,  name: 'Jméno Příjmení', post: 'Obránce'  },
      { n: 5,  name: 'Jméno Příjmení', post: 'Obránce'  },
      { n: 6,  name: 'Jméno Příjmení', post: 'Záložník' },
      { n: 8,  name: 'Jméno Příjmení', post: 'Záložník' },
      { n: 9,  name: 'Jméno Příjmení', post: 'Útočník'  },
      { n: 11, name: 'Jméno Příjmení', post: 'Útočník'  }
    ]
  },
  {
    id: 'zaci',
    name: 'Žáci',
    note: 'Družstvo od roku 2000',
    players: [
      { n: 1,  name: 'Jméno Příjmení', post: 'Brankář'  },
      { n: 4,  name: 'Jméno Příjmení', post: 'Obránce'  },
      { n: 6,  name: 'Jméno Příjmení', post: 'Záložník' },
      { n: 7,  name: 'Jméno Příjmení', post: 'Záložník' },
      { n: 9,  name: 'Jméno Příjmení', post: 'Útočník'  },
      { n: 10, name: 'Jméno Příjmení', post: 'Útočník'  }
    ]
  }
];

/* --------------------------------------------------------------------------
   AKTUALITY

   { date: '2026-09-01', title: 'Nadpis', text: 'Text aktuality.' },
   -------------------------------------------------------------------------- */
const NEWS = [];

/* --------------------------------------------------------------------------
   FOTOGALERIE

   Fotky nahrajte do assets/img/ a přidejte řádek:

   { src: 'assets/img/zapas-01.jpg', cap: 'Popisek fotky' },
   -------------------------------------------------------------------------- */
const GALLERY = [];

/* --------------------------------------------------------------------------
   PARTNEŘI KLUBU

   { name: 'Název firmy' },
   -------------------------------------------------------------------------- */
const SPONSORS = [];

/* --------------------------------------------------------------------------
   HISTORIE KLUBU — ověřeno, převzato z původního webu
   -------------------------------------------------------------------------- */
const HISTORY = [
  { year: '1923',    text: 'První doložená utkání ve Rváčově.' },
  { year: '1927',    text: 'Založení DSK Rváčov.' },
  { year: '1935',    text: 'Zánik DSK Rváčov.' },
  { year: '1939',    text: 'První získaná trofej — 2. místo na turnaji ve Vítanově.' },
  { year: '1960',    text: 'Založení TJ Vysočina.' },
  { year: '1965',    text: 'Postup do okresního přeboru.' },
  { year: '1968–72', text: 'Přerušená činnost TJ Vysočina.' },
  { year: '1992',    text: 'První zájezd do zahraničí (Itálie, 2.–7. 7.). Mezinárodní utkání Barcaccia – Rváčov 0:2 a Poli-Sportiva Sanpolese – Rváčov 1:4.' },
  { year: '1993',    text: 'Změna názvu na S.K. Rváčov (9. 1.). Postup do I.B třídy (19. 6.).' },
  { year: '1994',    text: 'Otevření nové travnaté plochy utkáním S.K. Rváčov – Sigma Olomouc 1:10 (31. 7.).' },
  { year: '1996',    text: 'Uvedení nových kabin do provozu (30. 7.).' },
  { year: '2000',    text: 'Založení žákovského družstva (1. 7.).' },
  { year: '2001',    text: 'Založení dorosteneckého družstva (1. 7.).' },
  { year: '2003',    text: 'Založení mužstva elévů (1. 4.).' },
  { year: '2007',    text: 'Otevření nové klubovny S.K. (1. 9.).' }
];

/* --------------------------------------------------------------------------
   VÝKONNÝ VÝBOR — převzato z původního webu, stav k 1. 9. 2009.
   Pokud se složení změnilo, upravte zde.
   -------------------------------------------------------------------------- */
const BOARD = [
  { name: 'Aleš Meloun',   role: 'Předseda a sekretář' },
  { name: 'Zdeněk Štengl', role: 'Místopředseda, ekonomika klubu' },
  { name: 'Jiří Tichý',    role: 'Hospodář a správce majetku' },
  { name: 'Vít Červinka',  role: 'Družstvo dorostu' },
  { name: 'Miloš Tichý',   role: 'Družstvo žáků' }
];
