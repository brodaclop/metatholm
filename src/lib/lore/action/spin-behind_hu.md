# Mögéperdülés

`ActionInfo`

Ezt az akciót használjuk akkor, ha gyorsan az ellenfél mögé próbálunk kerülni, és onnan támadni a védekezésre képtelen ellenfélre, mielőtt még meg tudna fordulni. Bár a manőver nagyon hatékony tud lenni, ugyanakkor igen rizikós is.

## Akciópontok

A támadás akciópont-költségét két tényező befolyásolja: a támadó fegyver **gyorsasága** és a képzettség szintje.

`ActionPointCalculator`

## Dobás

A támadó karakter [Cseles harc](skill:trick_fighting) [képzettségpróbát dob](rule:skill_check) a célpont [Reflex](skill:reactions) képzettsége ellen.

## Siker esetén

Sikere esetén a karakter az ellenfél mögé kerül, és az ellenfél a fegyver normál sebzését szenvedi el.

`DamageCalculator`

## Kudarc esetén

Amennyiben a manőver sikertelen volt, a karakter védtelen helyzetben ragadt, és a következő támadás elleni védekező dobását a fegyverből vagy képzettségéből adódó pozitív módosítók nélkül, puszta `d100`-zal kénytelen dobni.
