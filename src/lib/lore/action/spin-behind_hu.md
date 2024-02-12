# Mögéperdülés

`ActionInfo`

Ezt az akciót használjuk akkor, ha gyorsan az ellenfél mögé próbálunk kerülni. Sikeres mögéperdülést követően az ellenfél képtelen lesz védekezni a karakter következő támadása ellen, így kénytelen lesz védekező dobását `1d100 + 0`-val dobni.

## Akciópontok

A támadás akciópont-költségét három tényező befolyásolja: a támadó fegyver **sebessége**, a támadáshoz használt képzettség nehézsége és a képzettség szintje.

`ActionPointCalculator`

## Dobás

A dobás minden esetben `d100` plusz a támadódobás módosítója, amit a támadó fegyver **támadás** értékéből, a képzettség nehézségéből, valamint szintjéből számolunk ki. Ehhez még hozzáadandó a fegyver **ütőtávja**, mert ennél a harci távolságnál a hosszabb fegyver előnyt jelent.

`CombatRollCalculator`

## Siker esetén

Ha a támadás sikeres (a támadódobás értéke meghaladja a védekező dobásét), a támadó karakter [Cseles harc](skill:trick_fighting) [képzettségpróbát dob](rule:skill_check) a célpont [Reflex](skill:reactions) képzettsége ellen. Ennek sikere esetén az ellenfél mögé kerül, és ott is marad következő támadásáig.
