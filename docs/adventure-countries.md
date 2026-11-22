# Building a country for Paw Trails

The journey runs Woodland → Frostland → Rockland → Rainforest → Megacity → Desert → Swamp → Sun Coast
(`ROUTE` in `src/games/adventure/world.ts`). Woodland, Frostland and the Megacity live in `world.ts`; every other
country is a **country module** in its own files, so countries can be built independently:

| File | What |
|---|---|
| `src/games/adventure/countries/<c>.ts` | maps, quest scripts, line keys, English place names, animals, "name it" things |
| `src/games/adventure/countries/<c>-art.ts` | the country's pixel art: themes (palette + tile drawing + trees), animals, props, items, ride look |
| `src/content/de/adventure-<c>.ts` | German dialogue part (names, places, currency, exam words, lines) |
| `src/content/zh/adventure-<c>.ts` | Mandarin dialogue part (same keys, tokens with pinyin) |

`<c>` is `mountains`, `jungle`, `desert`, `swamp` or `beach`. Don't edit shared files (`world.ts`, `art.ts`,
`render.ts`, `engine.ts`, `Adventure.tsx`, the main `adventure.ts` files); if a core hook is truly missing, work around
it and say so.

## The module

`countries/<c>.ts` default-exports `(kit: Kit) => CountryModule` (types in `world.ts`; import them with `import type`
only, and import your art file for its side effects: `import './<c>-art';`).

- `maps`: `MapDef[]`. Map ids are unique across the world; `at` is a place id of the world map
  (`ROAD`/`SIDE` in `worldmap.ts`, e.g. `felsdorf`, `stonebridge`, `pass`…). The border map is `border_<c>` with a
  `gate` object (`{ k: 'gate', country: '<c>' }`) across the road and a door into `office_<c>`
  (`kit.office('office_<c>', '<c>', clerkKind, 'border_<c>', bx, by, 'border_<c>')`).
- Neighbours: edge warps to the previous / next country use `to: '@prev'` / `to: '@next'` (tx/ty are filled in).
  `entry` / `exit` (`Arrival`) say where the cat arrives from the previous country and when coming back from the
  next one: the map, one cell per warp row (top to bottom), and the facing.
- `script(o, s)`: steps for objects on *your* maps (check `o.id`), or `undefined` to fall back to the shared handlers
  (doors of `decor` buildings, trains, signs with a `house.<sign>` line, the gate…). The officer: `kit.clerk('<c>', who, s)`
  with lines `kit.clerkLines(who)` (hello1, hello2, ready, pass, gate, fail, later, done).
- Steps: `say`, `ask` (options `o` are line keys; `pic` for picture options), `give`/`take` items, `set`/`unset` flags,
  `money: '<currency>', n`, `xp`, `fx`, `exam`, `stamp`, `end`, `ride`. Flags are plain strings; prefix yours with
  the country (`mt_`, `jg_`, `ds_`, `sw_`, `bc_`).
- `lineKeys`: every key your scripts can say, including options and `item.<x>` / `pickup.<x>` lines.
  `npm run test:adventure` plays every script under random states and fails on a key that is missing here.
- `places`: the English name of each of your maps (one canonical English name for every course).
- `npcKinds`: your new animals; `things`: your "name it" keys (each needs a line `thing.<key>`).

### Map codes

Only the standard codes, so the engine and tests understand them:
`.` ground, `"` tall grass, `:` path, `~` water, `#` wall/forest/cliff, `r` `y` `w` flowers (or the theme's small
details), `o` rock, `=` fence, `|` vertical track. Blocked: `#`, `~`, `o`, `=`, `|`. Each theme decides how a code
looks (a desert `#` can be a dune wall or a sandstone cliff, swamp `~` is murky water). Rows must all be the same
width. Outdoor maps are typically 30–44 × 18–30 tiles.

### Objects

Everything from `Obj` in `world.ts`. Especially useful:
- `{ k: 'decor', art }`: any sprite you add to `DECOR` (size in tiles in `DECOR_SIZE`); buildings too. A door is a
  warp with `door: true` on a tile of the building's bottom row (the cat walks into it).
- `{ k: 'block', art, until }`: **your roadblocks** (a rockfall, a broken rope bridge, a fallen tree, a sleeping
  camel…), drawn from `DECOR[art]`, gone when the flag `until` is set. A roadblock must really block: the test checks
  that removing it opens tiles nobody could reach before.
- `{ k: 'npc', npc }`, `{ k: 'sign' }`, `{ k: 'item', item }`, `{ k: 'tree' }`, `{ k: 'stall', color, vendor }`…

### Stations

Oasis City (desert) and Sunport (coast) are on the railway. `kit.station('oasis', 'desert', streetMapId, sx, sy, people)`
returns the hall, underpass and platforms (`station_<city>`, `under_<city>`, `gleis_<city>`); put a door on your street
map to `station_<city>` landing at (11, 13) facing up, and make the hall exit land at (sx, sy). Tickets, platforms
and boards are already handled (their lines exist). Add the three station maps' English names to `places`.

## The art (`countries/<c>-art.ts`)

Import what you need from `../art` and `../pix`, then register:
- `registerTheme(name, palette, { terrain, trees, things })`: palette as in `PALS`; `terrain` draws a tile its own way
  (return `true`) or leaves it to the standard drawing (`false`); `trees` are the sprites on `#` tiles (2 variants,
  overlapping crowns — leave out for cliffs/walls you draw in `terrain`); `things` names bare tiles for the "name it"
  key.
- `NPCS[kind] = sprite(...)` (16×16, outline, 2–3 shades, readable at 1×), `DECOR[name]` + `DECOR_SIZE[name]`,
  `ITEMS[kind]` (16×16 icon), `RIDE_LOOKS[country]` for countries with a station (sky, far shape, props).
- Helpers exported from `art.ts`: `grass`, `path`, `water`, `flowers`, `fence`, `inlet`, `canopy`, `trunk`,
  `shadowEllipse`, `outlined`, `line`, `poly`, `disc`, `wall`, `boardwalk`, `tuft`, `palette()`, plus `sprite`, `hex`,
  `hash`, `Pix` from `pix.ts`.

**The bar is high.** Match the existing look (Woodland's overlapping trees, the Megacity's facades, the stations):
16 px tiles, dark outlines, 3–4 tone shading with a consistent top-left light, texture without noise, edges that
blend (shores, path borders, cliff tops), depth (tall things overlap what is behind them; the cat can walk behind
crowns and roofs), and a distinct palette per country. Every place should have something to look at: props, small
animations where it matters (water, waterfalls, flags), and variety between maps. Look at your work:
`npx tsx scripts/preview-adventure.ts X,Y down <mapId>` writes `dev/out/adventure-<mapId>.png` (and
`adventure-npcs.png` with every animal) — open the PNGs and iterate until it looks good.

## Content (`src/content/<lang>/adventure-<c>.ts`)

`const part: AdventurePart = { names, places, currencies, exam, proper, lines }`:
- `names`: every new animal's name; `places`: every map id **and** the country id → `[native name, English]`, the
  English exactly as in the module's `places` (country: Rockland, Rainforest, Desert, Swamp, Sun Coast).
- `currencies`: `{ <id>: [native, English plural] }` for the country's money (`gulden`, `bean`, `dinar`, `pearl`, `sol`).
- `exam` (countries with a border): `{ '<c>': [...] }` — at least 10 hand-picked words that belong to the country
  (its landscape, quests, tourist life), each said in its lines; a vocabulary word as a string, otherwise
  `[word, reading, English]` (German nouns with their article, "die Höhle"; reading `''` in German, pinyin in Mandarin).
- `lines`: `{ key: { en, t } }`, tokens `[surface, reading, gloss, lemma?]` (see `Token` in `src/content/types.ts`):
  German reading `''`, lemma for inflected forms; Mandarin segmented by word, pinyin with tone marks, full-width
  punctuation, no Latin letters. Punctuation tokens are `[p, '', '']`.

Naming rules (the owner's):
- **Places** have one English name in every course; each language names a place by what it means, as a native word
  ("Rock Village" → Felsdorf → 石头村), never by copying another language's sound.
- **Animals** get names that are common in the language (German: Gerda, Theo; Mandarin: 小明, 阿福…). The English
  translation of a Mandarin line uses the pinyin of the name ("Xiaoming"). Never use another course's names.
- Names and place names go in `names` / `places` / `proper` so they are shown untappable.

Level: German A2, Mandarin HSK 1–2; friendly, short lines (one or two sentences; they fill a small box).

## Checking

- `npx tsc --noEmit -p .` (look at errors in your files)
- `ONLY=<c> npm run test:adventure` (roadblocks block, everything reachable, warps land on walkable tiles, every
  line key known)
- `npx tsx scripts/validate.ts 2>&1 | grep -E "adventure|errors"` (every line in both languages, tokens, pinyin,
  place and exam rules)
- previews (above). Quests: play them through in a small script that runs `script()` step by step and applies the
  steps (see how `scripts/test-adventure.ts` calls it).

## Homes and residents

Most houses can be entered, and someone lives in them who tells the cat something interesting: about the region
(its nature, history, food, customs, a local legend), or simply anything worth hearing (a funny story, a fact about
animals or the stars). A few houses stay locked (a shared "closed" line is fine).

- A resident is an NPC whose id starts with `res_` (prefix it with your country: `res_mt_…`), using any sprite kind
  (reuse existing ones freely). The shared script says `<id>.1` and `<id>.2` on the first visit and `<id>.3` on later
  visits; `kit.residentLines(id)` gives the three keys for `lineKeys`. The speaker's name is looked up by the NPC's
  **id**, so every resident needs its own entry in `names` in both languages (`names: { res_mt_berta: 'Berta' }`).
  A name belongs to one character only, in the whole game (the validator checks it per language).
- Lines: short and friendly at the course level, but with real content — a learner should come away knowing
  something. Line 3 is a short goodbye or one more fact.
- Interiors: a room in the country's style (walls, floor, windows, furniture that fits the house and its owner — a
  baker's kitchen, a fisher's hut with nets, a scholar's study), 9–14 tiles wide; the door mat leads back to just in
  front of the house's door, and the house gets a `door: true` warp on its door tile. Vary the rooms: not every home
  the same layout. Furniture as DECOR sprites drawn with the same care as the outdoor art.
