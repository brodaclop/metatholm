# Harc

## Harci kör

A követhetőség érdekében ebben a játékban a harc körökre van osztva. A legtöbb hasonló játékkal ellentétben azonban a harci kör hossza nincs rögzítve. Néha minden gyorsan történik, néha lassan. És mivel a világban nincs mód a másodperc pontosságú időmérésre, a kör hosszát fix számú másodpercben rögzíteni nem lenne túl ésszerű. Annyi azért elmondható, hogy egy tipikus harci kör hossza hozzávetőlegesen 5 és 30 másodperc közé tehető.

## Akciópontok

A harci kör úgy indul, hogy minden résztvető dob `d10!+10`-et, hogy meghatározza, a karakter hány akciópontot költhet abban a körben. A legtöbb akcióponttal rendelkező karakter fog elsőnek cselekedni, így neki kell először eldöntenie, hogy milyen akciót kíván végrehajtani, majd végrehajtania azt. A karakter akciópontjai ezután annyival csökkennek, amennyi az adott manőver akciópont-költsége. Mindezek után az a karakter "lép" következőnek, akinek a jelenlegi állás szerint legtöbb az akciópontja, és így tovább. (Ez akár lehet az imént cselekvő karakter is, amennyiben a végrehajtott manőver különösen gyors volt.) Ezt addig folytatják, amíg egyetlen karakternek sincs már akciópontja, amikoris a kör véget ér, és kezdődik minden előlről.

*Amennyiben két vagy több, egymással harcoló karakter is ugyanannyi akcióponttal rendelkezik, a játékos karaktere cselekedhet először. Játékos karakterek között pedig az dönt, hog kinek magasabb az [Aktivitás](ability:activity) tulajdonsága.*

## Akció

Amikor sorra kerül a harci körben, a játékos kiválasztja, hogy milyen akciót hajt végre. Ez lehet például egy támadás, varázslás, esetleg megpróbálhat közelebb kerülni az ellenfeléhez. Az akció célpontja általában ekkor kiválaszthatja, milyen reakcióval próbál ellenállni (tehát támadás esetén védekezés, közelkerülés esetén távoltartás stb.)

`ActionVariants`

## Távolságok

A harc szempontjából háromféle távolságot különböztetünk meg:

* **Távoli harc**: Ennél a távolságnál a küzdő felek túl messze vannak ahhoz, hogy közelharcba bocsájtkozzanak. Ez az a távolság, ahonnan lő- vagy dobófegyverekkel lehet csak támadni, esetleg meg lehet próbálni lerohanni az ellenfelet. Ha egy karakter épp csak a másik közelharci fegyverének távolságán kívül áll, zavartalanul [beléphet](action:step-in) annak zónájába, ez a művelet nem kerül akciópontba.
* **Közelharc**: Ennél a távolságnál a küzdő felek fegyverei összeérnek, így lehetségessé válik a kötés, a hárítás és persze a támadás. Bármely küzdő karakter dönthet úgy, hogy támadás helyett [kilép](action:step-out) a közelharcból, ehhez nem kell akciópontot költenie, és az ellenfél sem tudja megakadályozni ebben.
* **Belharc**: A belharc az a távolság, ahonnan a harcosok akár már puszta kézzel is meg tudják egymást ragadni. Belharcban a fegyver hossza (távolsága) már a használó **ellen** dolgozik, ennél a távolságnál jobban jár az ember, ha rövidebb fegyvert ránt, vagy akár pusztakézzel próbálkozik. Belharcba kerülni egy olyan ellenfél ellen, aki ezt nem akarja, és elég hosszú a fegyvere, igen nehéz és sikeres [Közelkerülés](action:close-in) akciót kíván, amit az ellenfél a maga [Távoltartás](action:keep-away) reakciójával próbál megakadályozni. Hasonlóképp, belharcból nem lehet csak úgy kilépni, [Elvávolodás](action:disengage) akciót igányel, az ellenfél [Közeltartás](action:keep-close)a ellen.
