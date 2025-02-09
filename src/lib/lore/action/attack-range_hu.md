# Támadás (Távolról)

`ActionInfo`

Ezt az akciót használjuk a távolról, lőfegyverrel vagy dobófegyverrel való támadáshoz.

## Akciópontok

A támadás akciópont-költségét két tényező befolyásolja: a támadó fegyver **sebessége** és a képzettség szintje.

`ActionPointCalculator`

## Dobás

A dobás minden esetben `d100` plusz a támadódobás módosítója, amit a támadó fegyver **támadás** értékéből, a képzettség nehézségéből, valamint szintjéből számolunk ki.

`CombatRollCalculator`

## Sebzés

Ha a támadás talál (a támadódobás értéke meghaladja a védekező dobásét), a támadó karakter sebzést dob. A sebzés annyi [halmozott](rule:exploding_dice) `d5!`, amennyi a fegyver **sebzése**.

`DamageCalculator`