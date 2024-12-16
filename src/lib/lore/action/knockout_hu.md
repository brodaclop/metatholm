# Leütés

`ActionInfo`

Ezt az akciót használjuk akkor, ha az ellenfelet egy mozdulattal próbáljuk eszméletvesztésre rábírni. Leginkább csak védekezésre képtelen ellenfelek ellen érdemes használni.

## Akciópontok

A támadás akciópont-költségét két tényező befolyásolja: a támadó fegyver **sebessége** és a képzettség szintje.

`ActionPointCalculator`

## Dobás

A dobás minden esetben `d100` plusz a támadódobás módosítója, amit a támadó fegyver **támadás** értékéből, a képzettség nehézségéből, valamint szintjéből számolunk ki. Ehhez még hozzáadandó a fegyver **ütőtávja**, mert ennél a harci távolságnál a hosszabb fegyver előnyt jelent.

`CombatRollCalculator`

## Siker esetén

Ha a támadás sikeres (a támadódobás értéke meghaladja a védekező dobásét), a támadó karakter [Cseles harc](skill:trick_fighting) [képzettségpróbát dob](rule:skill_check) a célpont [Állóképesség](skill:endurance) képzettsége ellen. Ennek sikere esetén ellenfele eszméletét veszti pár percre, további sorsa a körülötte állók kezében van.
