# Rejtett fegyver

`ActionInfo`

Ezt az akciót használjuk akkor, ha az ellenfelet egy eleddig elrejtett fegyverrel próbáljuk megsebezni. Nyilvánvaló okokból ez a manőver egy csatában csak egyszer süthető el, és a fegyvernek igen jól el kell lennie rejtve az ellenfél elől. Ha csak úgy a hátunk mögött tartjuk, az nem ér.

## Akciópontok

A támadás akciópont-költségét három tényező befolyásolja: a támadó fegyver **sebessége**, a támadáshoz használt képzettség nehézsége és a képzettség szintje.

`ActionPointCalculator`

## Dobás

A dobás minden esetben `d100` plusz a támadódobás módosítója, amit a támadó fegyver **támadás** értékéből, a képzettség nehézségéből, valamint szintjéből számolunk ki. Ehhez még hozzáadandó a fegyver **ütőtávja**, mert ennél a harci távolságnál a hosszabb fegyver előnyt jelent.

`CombatRollCalculator`

## Siker esetén

Ha a támadás sikeres (a támadódobás értéke meghaladja a védekező dobásét), a támadó karakter [Cseles harc](skill:trick_fighting) [képzettségpróbát dob](rule:skill_check) a célpont [Rejtett dolgok felfedezése](skill:spot_hidden) képzettsége ellen. Ennek sikere esetén meglepte ellenfelét, és az a fegyver normál sebzését szenvedi el. 
