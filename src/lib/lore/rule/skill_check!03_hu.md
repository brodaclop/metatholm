# Képzettségpróba

A képzettségpróbákat [halmozott kockákkal](rule:exploding_dice) dobjuk, mégpedig annyi `d10`-zel, amennyi a képzettség foka. Ha a karakter teljesen képzetlen, akkor is próbálkozhat, de akkor egyetlen `d5!`-öt dobhat csak.

## Célpróba

Célpróba esetén a karakter egy rögzített nehézségű feladatot próbál elvégezni. A nehézséget minden esetben a [Szellemkalauz](world:concepts:spirit_guide) határozza meg, és egy **célszámban** nyilvánul meg. A képzettségpróba akkor minősül sikeresnek, ha a dobás meghaladja a célszámot. Íme pár példa célszám:

| Nehézség | Tipikus célszám |
| :- | :- |
| Könnyű | 5 |
| Átlagos | 10 |
| Nehéz | 20 |
| Legendás | 40 |
| Lehetetlen | 80 |

Megjegyzendő, hogy a feladat nehézségét nem pusztán a feladat természete határozza meg, a körülmények sokszor döntő súllyal esnek latba. Például bár bármelyik matróz tud laposcsomót kötni, ez önmagában könnyű feladat, na de dühöngő viharban, fél kézzel? Hirtelen a "könnyű" feladat sokkal nehezebb lett.

> [note]: #
**Megjegyzés a [Szellemkalauznak](world:concepts:spirit_guide):** Amikor egy játékos **Tudás** típusú képzettségpróbát tesz, hogy fel tud-e idézni valamilyen lexikális tudást, érdemes több célszámot is meghatározni, hogy kiderüljön, mennyire részletes a válasz. Tehát pl. egy [Jog](skill:law) próba esetén ha a dobás 5-nél nagyobb, a karakter tudja, hogy a király erdeiben való mászkálás illegális-e vagy sem, 10 fölött már azt is tudja, mi a tipikus büntetés, 20 fölött pedig már a kivételekkel, kiskapukkal és lehetséges mentő körülményekkel is tisztában van.

Az alábbi táblázat azt mutatja meg, hogy a képzettség foka és a feladat nehézsége függvényében mekkora várható eséllyel sikerül egy célpróba.

`SkillRolls`

`PlayScenario|{"scenario": "uncontested-check"}`

## Ellenpróba

A képzettségpróba ellenpróbának minősül, ha két vagy több fél dob próbát egymás ellen. Ez történhet ugyanazzal a képzettséggel (pl. [Erő](skill:strength) ellenpróba szkanderozáshoz) vagy különböző képzettségekkel (pl. az egyik karakter [Álcázás](skill:camouflage) próbát dob, hogy elrejtőzzön valaki elől, aki [Rejtett dolgok felfedezése](skill:spot_hidden) próbával igyekszik "ellenállni"). Mindkét esetben a győztes az, aki nagyobbat dob. Egyenlő dobás esetén minden "marad a régiben", tehát szkanderozásnál hosszas erőlködés után se nyer senki, rejtőzés esetén pedig a rejtőző karakter rejtve marad.

`PlayScenario|{"scenario": "contested-check"}`
