# Rejtett fegyver

`ActionInfo`

Ezt az akciót használjuk akkor, ha az ellenfelet egy eleddig elrejtett fegyverrel próbáljuk megsebezni. Nyilvánvaló okokból ez a manőver egy csatában csak egyszer süthető el, és a fegyvernek igen jól el kell lennie rejtve az ellenfél elől. Ha csak úgy a hátunk mögött tartjuk, az nem ér.

## Akciópontok

A támadás akciópont-költségét két tényező befolyásolja: a támadó fegyver **gyorsasága** és a fegyveres képzettség szintje.

`ActionPointCalculator`

## Dobás

A támadó karakter [Cseles harc](skill:trick_fighting) [képzettségpróbát dob](rule:skill_check) a célpont [Rejtett dolgok felfedezése](skill:spot_hidden) képzettsége ellen.


## Siker esetén

Ha a támadás sikeres (a támadódobás értéke meghaladja a védekező dobásét), a karakter meglepte ellenfelét, és az a fegyver normál sebzését szenvedi el.

`DamageCalculator`