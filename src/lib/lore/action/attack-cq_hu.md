# Támadás (Belharcban)

`ActionInfo`

Ezt az akciót használjuk belharcban való támadáshoz.

## Akciópontok

A támadás akciópont-költségét két tényező befolyásolja: a támadó fegyver **gyorsasága** és a képzettség szintje.

`ActionPointCalculator`

## Dobás

A dobás minden esetben `d100` plusz a támadódobás módosítója, amit a támadó fegyver **támadás** értékéből, a képzettség nehézségéből, valamint szintjéből számolunk ki. Ebből végül levonódik a fegyver **ütőtávja**, mert ennél a harci távolságnál a hosszabb fegyver hátrányt jelent.

`CombatRollCalculator`

## Sebzés

Ha a támadás talál (a támadódobás értéke meghaladja a védekező dobásét), a támadó karakter sebzést dob. A sebzés annyi [halmozott](rule:exploding_dice) `d5!`, amennyi a fegyver **sebzése**.

`DamageCalculator`