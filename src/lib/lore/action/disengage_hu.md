# Eltávolodás

`ActionInfo`

Ha egy karakter belharcból próbál kiaszabadulni, ezzel az akcióval kisérelheti meg. Ha a próbálkozás nem jár sikerrel, marad belharcban.

## Akciópontok

Az eltávolodás akciópont-költségét három tényező befolyásolja: a támadó fegyver **sebessége**, a támadáshoz használt képzettség nehézsége és a képzettség szintje.

`ActionPointCalculator`

## Dobás

A dobás minden esetben `d100` plusz a támadódobás módosítója, amit a támadó fegyver **támadás** értékéből, a képzettség nehézségéből, valamint szintjéből számolunk ki.

`CombatRollCalculator`
