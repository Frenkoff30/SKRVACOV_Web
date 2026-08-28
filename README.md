# S.K. Rváčov, web klubu

Nový web fotbalového klubu S.K. Rváčov, náhrada za `skrvacov.webnode.cz`.
Statický web: HTML, jedno CSS, jeden JavaScript. Žádný build, žádné závislosti,
žádná databáze.

---

## Spuštění

Otevřít `index.html` v prohlížeči. Nebo pustit lokální server:

```bash
python -m http.server 5510
```

**Nasazení:** nahrát celou složku na hosting přes FTP.

---

## Struktura

```
index.html        Úvod
klub.html         O klubu, historie, výbor, areál
tymy.html         Soupisky mužů, dorostu a žáků
zapasy.html       Nejbližší zápas, rozpis, výsledky, tabulka
galerie.html      Fotogalerie
kontakt.html      Kontakty, formulář, mapa, časté dotazy

assets/css/style.css   Všechny styly
assets/js/data.js      OBSAH WEBU, tady se to upravuje
assets/js/main.js      Logika
assets/img/            Znak klubu, plánek areálu, mapa
```

---

## Kde se web upravuje

Všechen obsah je v `assets/js/data.js`. Otevřít v poznámkovém bloku,
upravit, uložit. Nic jiného se měnit nemusí.

| Co | Proměnná |
|---|---|
| Zápasy a výsledky | `MATCHES` |
| Tabulka soutěže | `TABLE` |
| Soupisky | `SQUADS` |
| Aktuality | `NEWS` |
| Fotogalerie | `GALLERY` |
| Partneři | `SPONSORS` |
| Historie | `HISTORY` |
| Výkonný výbor | `BOARD` |
| Časté dotazy | `FAQ` |

### Přidání zápasu

```js
{ date: '2026-10-11T15:30', home: 'S.K. Rváčov', away: 'TJ Sokol Seč',
  venue: 'Rváčov', comp: 'I.B třída', team: 'Muži' },
```

Po odehrání dopsat výsledek, `hg` jsou góly domácích, `ag` góly hostů:

```js
{ date: '2026-10-11T15:30', home: 'S.K. Rváčov', away: 'TJ Sokol Seč',
  venue: 'Rváčov', comp: 'I.B třída', team: 'Muži', hg: 2, ag: 1 },
```

Zápas se sám přesune z rozpisu do výsledků a obarví se podle výsledku.
Odpočet vždy ukazuje nejbližší nadcházející zápas mužů.

### Přidání fotky

Fotku nahrát do `assets/img/`, pak přidat do `GALLERY`:

```js
{ cap: 'Popisek fotky', src: 'assets/img/zapas-01.jpg', tag: 'zapasy' },
```

Bez `src` se vykreslí grafická dlaždice. Hodnota `tag` určuje filtr v galerii,
možnosti jsou `zapasy`, `tym`, `mladez` a `areal`.

---

## Co je nutné ověřit před spuštěním

**Ukázková data**, vymyšlená pro účely návrhu. Před spuštěním nahradit
skutečnými údaji z fotbal.cz:

- zápasy a výsledky
- tabulka soutěže včetně názvu soutěže
- jména hráčů na soupiskách
- aktuality
- sponzoři
- plánek areálu, rozmístění objektů i rozměry jsou odhad
- mapa okolí, jde o ilustrační schéma, ne o navigační mapu

**Ověřená data** převzatá z původního webu klubu:

- historie klubu, všechny letopočty
- složení výkonného výboru, pozor, stav k roku 2009
- adresa, telefony a e-mail

---

## Kontaktní formulář

Formulář kontroluje vyplnění, ale **neodesílá e-maily**, statický web to neumí.
Nejjednodušší zprovoznění je Formspree nebo Web3Forms, zdarma a bez programování.
Stačí se zaregistrovat a v `kontakt.html` doplnit do `<form>`:

```html
<form action="https://formspree.io/f/VAS_KOD" method="POST" data-contact-form>
```

Do té doby formulář zobrazí hlášku s e-mailem klubu.

---

## Vzhled

Web má jeden světlý vzhled. Barvy vychází z původního kruhového znaku klubu,
který je překreslený do `assets/img/crest.svg`.

| | |
|---|---|
| Klubová červená | `#C4131C` |
| Trávníková zelená | `#0B7A35` |
| Zlatá | `#7F5903` |
| Pozadí | `#FAF8F6` a `#F1EDE9` |
| Text | `#14181B` |

Písmo: **Barlow Condensed** na nadpisy, **Barlow** na text, obojí Google Fonts.

### Fotbalové prvky

- V pozadí úvodní části a hlaviček podstránek jsou jemné pruhy posekaného trávníku.
- Sekce oddělují pásy trávníku se středovým kruhem a postranními vápny.
- Doplňkově se střídají vlnky a oblouky.
- Historie klubu je vodorovná časová osa, posouvá se tažením do strany.

Veškerá grafika je v CSS a SVG, web nepoužívá žádné rastrové obrázky.

### Přístupnost

Veškerý text má kontrast alespoň 4,5 : 1, ovládání klávesnicí funguje,
web respektuje `prefers-reduced-motion` a bez JavaScriptu zůstane obsah čitelný.
