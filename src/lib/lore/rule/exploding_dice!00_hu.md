# Kockadobások

A játék során összesen hatféle kockadobást használunk, három **egyszerű dobást** és három **halmozott dobást**.

## Egyszerű kockadobás

Az egyszerű kockadobás, mint neve is mutatja, egyszerű. Dobunk egyetlen kockával és az eredmény annyi, amennyit dobtunk, plusz/minusz esetleges fix módosítók. Tehát pl. `d100+28` azt jelenti, hogy dobjunk egy százoldalú kockával és az eredményhez adjunk hozzá 28-at.

**Egyszerű kockadobást** két esetben használunk:

- Karakteralkotáskor a karakter [tulajdonságait](character:abilities) `1d5+2`-vel határozzuk meg.
- [Szintlépéskor](character:level) a karakter [fájdalomtűrése](character:fp) `2d10`-zel (plusz a képzettségekből adódó egyéb módosítók) nő.
- [Harcban](rule:combat) a támadás ill. az ellene való védekezés sikerét egy-egy `d100` dobással határozzuk meg (plusz az esetleges módosítók, amelyek a harci helyzetből, képzettségből, fegyver tulajdonságaiból stb. adódnak): ha a támadó dobás nagyobb, mint a védekező, a támadás sikeres volt.

## Halmozott kockadobás

A **halmozott kockadobás** úgy történik, hogy először a megadott számú kockával dobunk, majd azokat, amelyek maximális értéket dobtak (tehát pl. `d10!` esetében 10-et), újradobjuk, és így tovább, végül pedig összeadjuk az összes dobás értékét.
 
A halmozott kockadobást a játékban a **!** jelöli, tehát `3d10!` azt jelenti, hogy 3 darab tízoldalú kockával kell először dobni, majd újradobni azokat, amik 10-est dobtak.

**Halmozott kockadobást** három esetben használunk:

- [Képzettségpróba](rule:skill_check) ill. [varázslás](rule:magic) esetén annyiszor `d10!`-zel dobunk, amennyi a karakter releváns képzettségének értéke.
- Sikeres támadás vagy sebző varázslat esetén sebzést `d5!` kockákkal dobunk.
- Minden [harci kör](rule:combat) elején az adott körben a karakter számára rendelkezésre álló **akciópontok** számát `1d10!+10`-zel határozzuk meg.

`DiceRoller|{"roll": "3d10!"}`