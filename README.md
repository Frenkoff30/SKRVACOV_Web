# S.K. Rváčov — nový web

Redesign webu fotbalového klubu S.K. Rváčov (náhrada za `skrvacov.webnode.cz`).
Statický web — čisté HTML, CSS a JavaScript. Žádný build, žádné závislosti.

---

## Spuštění

Stačí otevřít `index.html` v prohlížeči. Pro plnou funkčnost (načítání SVG a skriptů)
je ale lepší pustit lokální server:

```bash
python -m http.server 5510
```

Pak otevřít <http://localhost:5510>.

### Nasazení
Nahrát celou složku na libovolný webhosting (FTP). Není potřeba PHP ani databáze.

---

## Struktura

```
RVACOVWEB/
├── index.html          Úvodní stránka
├── klub.html           O klubu, historie, výkonný výbor, areál
├── tymy.html           Soupisky – muži / dorost / žáci
├── zapasy.html         Rozpis, výsledky, tabulka
├── galerie.html        Fotogalerie s lightboxem
├── kontakt.html        Kontakty, formulář, mapa, časté dotazy
└── assets/
    ├── css/
    │   ├── style.css        Barvy, písma, mřížka (design tokeny)
    │   ├── components.css   Tlačítka, karty, tabulka, hlavička, patička…
    │   └── pages.css        Sekce jednotlivých stránek + responzivita
    ├── js/
    │   ├── data.js          ► VŠECHNA DATA WEBU (viz níže)
    │   └── main.js          Logika – vykreslování, odpočet, menu, motiv
    └── img/
        ├── crest.svg        Velký znak klubu
        ├── mark.svg         Malý znak (hlavička, patička)
        ├── favicon.svg      Ikona v záložce prohlížeče
        ├── areal.svg        Plánek areálu
        └── mapa.svg         Orientační mapa
```

---

## Jak web aktualizovat

**Vše podstatné se mění v jediném souboru: `assets/js/data.js`.**
Otevřete ho v poznámkovém bloku, upravte a uložte. Web se přizpůsobí sám.

| Co chcete změnit | Kde v `data.js` |
|---|---|
| Zápasy, výsledky, termíny | `MATCHES` |
| Tabulka soutěže | `TABLE` |
| Soupisky hráčů | `SQUADS` |
| Aktuality | `NEWS` |
| Historie klubu | `HISTORY` |
| Výkonný výbor | `BOARD` |
| Sponzoři a partneři | `SPONSORS` |
| Popisky v galerii | `GALLERY` |
| Časté dotazy | `FAQ` |
| Adresa, telefony, e-mail | `CLUB` + patička v HTML |

### Přidání zápasu
```js
{ id: 9, team: 'muzi', comp: 'I.B třída', round: 9, date: '2026-10-11T15:30',
  home: 'S.K. Rváčov', away: 'TJ Sokol Seč', venue: 'Rváčov', status: 'upcoming' },
```
Po odehrání změňte `status` na `'finished'` a doplňte `hg` (góly domácích)
a `ag` (góly hostů). Odpočet na úvodní stránce se automaticky přesune
na nejbližší další zápas.

### Vložení skutečných fotek
Galerie zatím používá generovanou grafiku. Nahrajte fotky do `assets/img/`
a v `assets/js/main.js` ve funkci `galleryArt()` nahraďte generované SVG
za `<img src="assets/img/nazev.jpg" alt="…">`.

---

## ⚠️ Co je potřeba ověřit před spuštěním

Reálná a ověřená data převzatá z původního webu klubu:

- historie klubu (všechny letopočty),
- složení výkonného výboru,
- adresa, telefony a e-mail,
- popis areálu.

**Ukázková data, která je nutné nahradit skutečnými (zdroj: fotbal.cz):**

- rozpis zápasů a výsledky (`MATCHES`),
- tabulka soutěže (`TABLE`) — včetně názvu soutěže,
- jména hráčů na soupiskách (`SQUADS`) — jsou zástupná,
- aktuality (`NEWS`),
- sponzoři (`SPONSORS`).

Vychází z veřejných zpráv o klubu (postup do 6. ligy, dobrý vstup do sezony),
ale nejde o ověřená čísla.

---

## Kontaktní formulář

Formulář na stránce Kontakt validuje vstupy, ale **neodesílá e-maily** —
statický web to sám neumí. Možnosti zprovoznění:

1. **Formspree / Web3Forms** (zdarma, bez programování) — stačí do
   `<form>` doplnit `action="https://formspree.io/f/VAS_KOD"` a `method="POST"`.
2. **PHP skript** na hostingu, pokud ho hosting podporuje.

Do té doby formulář zobrazí hlášku s e-mailem klubu.

---

## Vlastnosti webu

- Tmavý i světlý režim (přepínač v hlavičce, volba se pamatuje).
- Plně responzivní: 375 px, 768 px, 1024 px, 1440 px.
- Živý odpočet do nejbližšího výkopu.
- Tabulka soutěže se zvýrazněným Rváčovem a ukazatelem formy.
- Běžící pás s výsledky.
- Galerie s lightboxem — ovládání šipkami, zavření klávesou Esc.
- Přístupnost: veškerý text má kontrast alespoň 4,5 : 1, ovládání klávesnicí,
  popisky pro čtečky, respektuje `prefers-reduced-motion`.
- Bez JavaScriptu zůstane obsah čitelný.

---

## Barvy značky

Vychází z původního kruhového znaku klubu (červený kruh s hvězdicí).

| Role | Tmavý režim | Světlý režim |
|---|---|---|
| Klubová červená | `#E3242B` | `#C4131C` |
| Červená pro text | `#FF7175` | `#C4131C` |
| Zlatá | `#F7C948` | `#7F5903` |
| Pozadí | `#07090A` | `#FAF8F6` |
| Text | `#F4F7F8` | `#14181B` |

Písmo: **Barlow Condensed** (nadpisy) + **Barlow** (text), obojí Google Fonts.
