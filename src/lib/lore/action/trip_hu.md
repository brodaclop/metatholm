# Gáncsolás/Felborítás

`ActionInfo`

Ezt az akciót használjuk akkor, ha az ellenfelet földre próbáljuk vinni.

## Akciópontok

A támadás akciópont-költségét két tényező befolyásolja: a támadó fegyver **gyorsasága** és a képzettség foka.

`ActionPointCalculator`

## Dobás

A támadó karakter [Cseles harc](skill:trick_fighting) [képzettségpróbát dob](rule:skill_check) a célpont [Egyensúly](skill:balance) képzettsége ellen.

## Siker esetén

Ha a támadás sikeres (a támadódobás értéke meghaladja a védekező dobásét), az ellenfelet sikerült földrevinni. A földre került ellenfél képtelen lesz használni a [Távoltartás](action:keep-away) akcióját, hogy megakadályozza azt, hogy bárki belharcba kerüljön vele.