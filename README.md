# S.K. Rváčov — web klubu

Nový web fotbalového klubu S.K. Rváčov, náhrada za `skrvacov.webnode.cz`.
Statický web — HTML, jedno CSS, jeden JavaScript. Žádný build, žádné závislosti,
žádná databáze.

---

## Spuštění

Otevřít `index.html` v prohlížeči. Nebo pustit lokální server:

```bash
python -m http.server 5510
```

**Nasazení:** nahrát celou složku na hosting přes FTP. Nic víc není potřeba.

---

## Struktura

```
index.html        Úvod
klub.html         O klubu, historie, výbor, areál
zapasy.html       Rozpis, výsledky, tabulka
galerie.html      Fotogalerie
kontakt.html      Kontakty a formulář

assets/css/style.css    Všechny styly
assets/js/data.js       ► OBSAH WEBU — tady se to upravuje
assets/js/main.js       Logika
assets/img/             Znak klubu (crest, mark, favicon)
```

---

## Jak web naplnit obsahem

Otevřít `assets/js/data.js` v poznámkovém bloku, upravit, uložit.
Nic jiného se měnit nemusí.

Sekce, které jsou zatím **prázdné** a čekají na vyplnění:

| Co | Proměnná v `data.js` |
|---|---|
| Zápasy a výsledky | `MATCHES` |
| Tabulka soutěže | `TABLE` |
| Aktuality | `NEWS` |
| Fotogalerie | `GALLERY` |
| Partneři klubu | `SPONSORS` |

Dokud jsou prázdné, web na jejich místě sám napíše, že se obsah doplní.
Nic nerozbité, nic vymyšleného.

**Už vyplněné** (převzato z původního webu klubu):

| Co | Proměnná |
|---|---|
| Historie 1923–2007 | `HISTORY` |
| Výkonný výbor | `BOARD` — pozor, stav k roku 2009, ověřit |
| Adresa, telefony, e-mail | `CLUB` + patičky v HTML |

### Příklad — přidání zápasu

Do `MATCHES` vložit řádek:

```js
{ date: '2026-09-06T17:00', home: 'S.K. Rváčov', away: 'Soupeř',
  venue: 'Rváčov', comp: 'Okresní přebor', team: 'Muži' },
```

Po odehrání dopsat výsledek — `hg` jsou góly domácích, `ag` góly hostů:

```js
{ date: '2026-09-06T17:00', home: 'S.K. Rváčov', away: 'Soupeř',
  venue: 'Rváčov', comp: 'Okresní přebor', team: 'Muži', hg: 2, ag: 1 },
```

Zápas se sám zařadí buď do rozpisu, nebo do výsledků.

### Příklad — přidání fotky

Fotku nahrát do `assets/img/`, pak do `GALLERY`:

```js
{ src: 'assets/img/zapas-01.jpg', cap: 'Domácí zápas' },
```

---

## Kontaktní formulář

Formulář kontroluje vyplnění, ale **neodesílá e-maily** — statický web to neumí.
Nejjednodušší zprovoznění je Formspree nebo Web3Forms (zdarma, bez programování):
zaregistrovat se, dostat kód a v `kontakt.html` doplnit do `<form>`:

```html
<form action="https://formspree.io/f/VAS_KOD" method="POST" data-contact-form>
```

Do té doby formulář zobrazí hlášku s e-mailem klubu.

---

## Co web umí

- Tmavý a světlý režim, volba se pamatuje.
- Responzivní od 375 px výš.
- Prázdné sekce mají srozumitelnou hlášku místo prázdna.
- Text má všude kontrast alespoň 4,5 : 1, ovládání klávesnicí funguje.
- Bez JavaScriptu zůstane obsah čitelný.

---

## Barvy a písmo

Vychází z původního kruhového znaku klubu (červený kruh s hvězdicí),
který je překreslený do `assets/img/crest.svg`.

| | Tmavý režim | Světlý režim |
|---|---|---|
| Červená | `#E3242B` | `#C4131C` |
| Zlatá | `#F7C948` | `#7F5903` |
| Pozadí | `#07090A` | `#FAF8F6` |
| Text | `#F4F7F8` | `#14181B` |

Písmo: **Barlow Condensed** na nadpisy, **Barlow** na text (Google Fonts).
