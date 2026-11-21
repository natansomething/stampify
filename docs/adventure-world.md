# Paw Trails: the world plan

The adventure is a journey as a tourist through eight fictional countries on one continent. The plan lives in code
(`src/games/adventure/worldmap.ts`: countries, places, road and railway on the world map); this note sums it up.
Working names are English; each language names its places in its own dialogue file.

## Shape

- **Main road**: from Moosdorf (south-west) north to Shell Bay (north), winding in four loops: east, west, east,
  then a short west loop. Each half-loop is one country; borders sit at the far ends of the loops and next to the
  station cities.
- **Railway**: straight up the middle with five stations where the road crosses it. Trains run between station
  cities of countries the cat already holds the stamp for (fast travel back and forth, never ahead).
- **Borders**: a border office with a short language exam on the country's words; passing gives the passport stamp
  for the next country.

## Countries (travel order)

| # | Country | Look | Places (on the road) | Station |
|---|---------|------|----------------------|---------|
| 1 | Woodland | forest | Moosdorf (start), Sonnenwald (forest road), Lindenburg, Millbrook, Birch Village, Oakridge (side road), border | Lindenburg |
| 2 | Frostland | snow, ice, caves | Frostheim, Ice cave, Frostburg, border | Frostburg |
| 3 | Rockland | rocky mountains | Rock Village, High pass, border | (tunnel) |
| 4 | Rainforest | jungle, rivers | Stilt Village, Great waterfall, border | (none) |
| 5 | Megacity | districts, metro | Central Station, Harbour district, border | Central Station (hub) |
| 6 | Desert | dunes, oasis | Caravan camp, Old ruins, Oasis City, border | Oasis City |
| 7 | Swamp | bog, fog | Bog Village, Fog lake, border | (none) |
| 8 | Sun Coast | beach, resort | Sunport, Lighthouse, Shell Bay (end) | Sunport |

Target length: 1-2 hours per country (shorter while playtesting).

## Built so far

**Woodland** (complete for now), following the world map's directions:

| Map | Way on | Task (roadblock or side quest) |
|-----|--------|-------------------------------|
| Moosdorf (village, start) | east | beaver clears the log for a willow twig (roadblock) |
| Sonnenwald (forest road, not a village) | north | hedgehog Hilde cuts the brambles for the right mushroom (roadblock) |
| Lindenburg (town, station) | east | guard dog wants a guest card; fox at the tourist information fills in a form (roadblock, tourist chore) |
| Mühlbach (village, mill) | east | miller lowers the drawbridge if you shop at the bakery: order + pay the right amount (roadblock, tourist chore) |
| Birkenhain (village, crossroads) | east to the border, south to Eichental | goose tourist's lost suitcase at the bus stop (side quest) |
| Eichental (village, side road) | back north | squirrel's four acorns (side quest) |
| Border woods + office | east | border exam, stamp |

**Frostland** (complete for now): Woodland's border woods lead north into Schneefeld (exchange office: talers to
crowns; clothes shop: hat and scarf; the polar bear lets you past the snowstorm), west to Frostheim (penguin,
snowdrift, ice cave with the bat's directions; side road north to the Glacier Camp: read the sled timetable), west
to Frostburg (capital, station with trains back to Lindenburg; side road south to Eisfjord: souvenir seal), west to
the Frostland border (walrus).

**Megacity** (countries 3-4 skipped for now): five districts linked by streets and the metro (day ticket from the
machine): Hauptbahnhof (exchange, language school, station), Altstadt (café, lost and found), Hafen (seagull),
Markt (fish and postcards), Türme (courier, border). Story: the passport is lost on the first metro ride; describe
it at the lost and found, buy the seagull a fish roll, then take the border exam. Repeatable (postgame): café shifts
(orders served by picture), courier deliveries, language school exam on every word of the journey, postcards.

**Money**: a wallet with each country's currency (talers, crowns, credits); exchange offices in Schneefeld and the
Megacity. **Trains**: station halls in Lindenburg, Frostburg and the Megacity; tickets to station cities whose
country stamp you hold. The Megacity border leads to Shell Bay (Sun Coast) for now.

`npm run test:adventure` checks every map: roadblocks can't be walked around, warps land on walkable tiles.

## Open ideas

Tourist challenges (one or two per country): train ticket machine, currency exchange, café or market order,
asking and following directions, hotel check-in, lost luggage.
