# Közelkerülés

`ActionInfo`

Ha a karakter közelharci távolságban van ellenfelével, ezen akció segítésével még közelebb léphet, és belharcot kezdeményezhet.

## Akciópontok

A támadás akciópont-költségét két tényező befolyásolja: a támadó fegyver **gyorsasága** és a képzettség szintje.

`ActionPointCalculator`

## Dobás

A dobás minden esetben `d100` plusz a támadódobás módosítója, amit a támadó fegyver típusából, **támadás** értékéből, valamint a képzettség szintjéből számolunk ki. Ehhez még hozzáadandó a fegyver **ütőtávjának** ötszöröse, mert ennél a harci távolságnál a hosszabb fegyver előnyt jelent.

`CombatRollCalculator`

## Siker esetén

Ha az akció sikeres, a harcoló felek belharc távolságra kerülnek egymással.

## Kudarc esetén

Amennyiben az akció sikertelen, úgy a küzdő felek közelharci távolságban maradnak.

