# Eltávolodás

`ActionInfo`

Ha egy karakter belharcból próbál kiaszabadulni, ezzel az akcióval kisérelheti meg.

## Akciópontok

A támadás akciópont-költségét két tényező befolyásolja: a támadó fegyver **gyorsasága** és a képzettség szintje.

`ActionPointCalculator`

## Dobás

A dobás minden esetben `d100` plusz a támadódobás módosítója, amit a támadó fegyver típusából, **támadás** értékéből, valamint a képzettség szintjéből számolunk ki. Ebből végül levonódik a fegyver **ütőtávjának** ötszöröse, mert ennél a harci távolságnál a hosszabb fegyver hátrányt jelent.

`CombatRollCalculator`

## Siker esetén

Ha az akció sikeres, a harcoló felek közelharci távolságba kerülnek egymással.

## Kudarc esetén

Amennyiben az akció sikertelen, úgy a küzdő felek belharc távolságban maradnak.