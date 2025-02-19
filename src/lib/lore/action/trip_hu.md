# Gáncsolás/Felborítás

`ActionInfo`

Ezt az akciót használjuk akkor, ha az ellenfelet földre próbáljuk vinni. A földre került ellenfél képtleen lesz használni a [Távoltartás](action:keep-away) akcióját, hogy megakadályozza azt, hogy bárki belharcba kerüljön vele.

## Akciópontok

A támadás akciópont-költségét két tényező befolyásolja: a támadó fegyver **gyorsasága** és a képzettség szintje.

`ActionPointCalculator`

## Dobás

A dobás minden esetben `d100` plusz a támadódobás módosítója, amit a támadó fegyver **támadás** értékéből, a képzettség nehézségéből, valamint szintjéből számolunk ki. Ehhez még hozzáadandó a fegyver **ütőtávja**, mert ennél a harci távolságnál a hosszabb fegyver előnyt jelent.

`CombatRollCalculator`

## Siker esetén

Ha a támadás sikeres (a támadódobás értéke meghaladja a védekező dobásét), a támadó karakter [Cseles harc](skill:trick_fighting) [képzettségpróbát dob](rule:skill_check) a célpont [Egyensúly](skill:balance) képzettsége ellen. Ennek sikere esetén az ellenfél földre kerül.
