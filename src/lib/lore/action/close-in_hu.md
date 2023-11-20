# Közelkerülés

`ActionInfo`

Ha a karakter közelharci távolságban van ellenfelével, ezen akció segítésével még közelebb léphet, és belharcot kezdeményezhet. Amennyiben az akció sikertelen, úgy a küzdő felek közelharci távolságban maradnak.

## Akciópontok

A támadás akciópont-költségét három tényező befolyásolja: a támadó fegyver **sebessége**, a támadáshoz használt képzettség nehézsége és a képzettség szintje.

`ActionPointCalculator`

## Dobás

A dobás minden esetben `d100` plusz a támadó dobás módosítója, amit a támadó fegyver **támadás** értékéből, a képzettség nehézségéből, valamint szintjéből számolunk ki. Ehhez még hozzáadandó a fegyver **ütőtávja**, mert ennél a harci távolságnál a hosszabb fegyver előnyt jelent.

`CombatRollCalculator`