# Mágia

Metatholm világában a mágia mindent és mindenkit óceánként vesz körül, ott van a fákat kidöntő viharban, a tavak finoman fodrozódó felületén, de megtalálható a hétköznapokban is. Amikor a pék kenyere megkel, amikor a kovács a forró acélt hajlítja, amikor az író tolla mintha magától mozdulna, amikor a levesben a fűszerek összeállnak egy új ízzé, az mind a mágia hétköznapi megnyilvánulása.

De egy dolog a mágia spontán kisugárzása, amelyre minden élőlény képes, és megint más a tudatos irányítása. Ez utóbbira már csak jóval kevesebben képesek, és még annál is kevesebben értik igazán, hogy működik az egész.

Ezt igazán csak a Mágusok mondhatják el magukról, ők hatalmas erőknek tudnak parancsolni, bár mindennek ára is van: a Mágusok gyakran hetekig-hónapokig készítik elő nagyszabású varázslataikat, fóliánsokat bújnak, tervrajzokat készítenek, drága tintákkal varázsköröket rónak fel, gyertyákat és drágaköveket bűvölnek. Az eredmény persze megéri az árát, már amennyiben valaki meg tudja fizetni: egy Mágus által mágikusan megerősített várfal évekig ledönthetetlen marad, mivel a mágiát oly hatékonyan zárja magába, hogy alig szivárog valami belőle.

A hétköznapi varázshasználók (ide tartoznak például a játékos karakterek) tapasztalati mágiája ezzel szemben olcsó játékszernek tűnhet csupán, még a legképzettebbek se tudnak pár hétnél tovább tartó mágiákat megidézni. De erejüket lebecsülni még egy Mágus számára is súlyos hiba lenne, mert bár varázslataik ereje és időtartama meg sem közelíti az övékét, van egy behozhatatlan előnyük: szinte elképzelhetetlen sebességgel, pillanatok alatt képesek létrehozni azokat. Egy ügyesebb [sufnimágus](background:hedge_wizard) könnyedén képes halálos tűzbe borítani egy felkészületlen Mágust, miközben az azon tűnődik, merre keresse a tűzmágia alapjait részletező könyveit.

Mint említve lett már, a mágia minden élőlényben koncentráltan megtalálható, és a kisugárzása érzékelhető és felismerhető is a megfelelően képzettek számára, mivel másképp rezeg mágikusan egy gyümölcsfa, egy egér vagy egy ember.

És vannak persze lények, amelyek még ennél is több mágiával vannak átitatva: például a sárkányok, akik bár mágiájukat csak ösztönösen tudják irányítani, a bennük tárolt mágia mennyisége miatt hihetetlenül veszedelmesek tudnak lenni.

## Varázslás

A játékos karakterek által varázslásra felhasználható mágia maximális mennyiségét a karakter [Mágikus erő](skill:magic_force) képzettsége határozza meg, ennyi [Mágia Ponttal](character:mp) rendelkezhet legfeljebb.

De ahhoz, hogy ebből varázslat is lehessen, a karakternek egy vagy több mágikus fókusz képzettséget is kell tanulnia, ez határozza meg, hogy milyen varázslatok állnak rendelkezésére, és mennyire könnyedén tudja azokat létrehozni. A tanulható fókuszok az alábbiak:

`SkillListByType|{"type":"skill_type:focus"}`

A varázslás pontos menete ugyanakkor nincs előre meghatározva, ezt minden karakter maga választhatja meg magának. Van, aki csak magába mélyed és mágikus szavakra koncentrál, mások fennhangon kántálnak, esetleg egy szerencsét hozó kavicsot kell szorongassanak a kezükben, ismét mások a kardjuk hegyével rónak rúnákat a levegőbe, a lehetőségeknek csak a képzelet szab határt.

## Varázslatok

Minden varázslat egy **fókusz** képzettséghez tartozik, ezt a képzettséget kell fejleszteni ahhoz, hogy a varázslatot megismerje a karakter. A varázslatoknak van továbbá egy **szintje** is, ami minél magasabb, annál magasabb kell legyen a **fókusz** képzettség foka is. Tehát például egy karakter, aki a [Testi fókusz](skill:body_focus) képzettségét 4-es fokra fejlesztette, legfeljebb 3-as szintű varázslatokat tud létrehozni az odatartozó varázslatok közül.

Ehhez először is el kell döntenie, milyen erősséggel próbálja létrehozni a varázslatot. Hogy az erősség hogy hat a varázslatra, az mindig az adott varázslat leírásából derül ki, de általában a magasabb erősség erősebb hatást, több célpontot vagy hosszabb időrtartamot jelent, esetleg a fentiek kombinációját. (Ilyenkor a varázslat leírásában szerepel az, hogy az adott paraméter "erősíthető".)

Mindezek után a varázsló dob annyi `d10!`-zel, amennyivel a fókusz képzettsége nagyobb a varázslat szintjénél. Tehát ha pl. a már említett 4-es fokú Testi fókuszú karakter egy 2-es szintű varázslatot próbál létrehozni, akkor a dobás `2d10!` lesz.

Ezzel szemben a [Szellemkalauz](world:concepts:spirit_guide) annyi `d10!`-zel dob, amennyi a létrehozni kívánt varázslat erőssége.

Amennyiben a varázsló dobása magasabb, úgy a varázslat minden további nélkül létrejön.

Ha viszont a [Szellemkalauz](world:concepts:spirit_guide) dobása eléri vagy meghaladja a varázslóét, akkor a varázslat minden megkezdett 10 pontnyi különbség után 1 Mágia Pontba kerül. Tehát ha a varázsló 17-et dobott, a [Szellemkalauz](world:concepts:spirit_guide) meg 20-at, akkor a költség 1 MP, ha 27-et, akkor 2 MP stb. Amennyiben a varázslónak nincs elég Mágia Pontja, dönthet úgy, hogy a fennmaradó összeget közvetlenül az [életerejéből](character:ep) kívánja törleszteni. De természetesen úgy is dönthet, hogy inkább abbahagyja a varázslást, ezesetben mindössze a varázslásra szánt ideje vész el.

### "Csípőből" varázslás

A varázsló dönthet úgy, hogy a varázslatot gyorsabban, de kevésbé biztosan hozza létre. Ilyenkor fókusz képzettsége 1-gyel alacsonyabbnak számít.

### Lassú varázslás

A lassú varázslás a fentiek ellentéte: a varázsló a hatást különös gonddal és figyelemmel hozza létre, a szokásosnál több időt szánva rá. Cserébe viszont fókusz képzettsége a valósnál 1-gyel magasabbnak fog számítani.

### Időtartam

Minden varázslat időtartama az alábbi négy egyike: **azonnali**, **kör**, **óra** vagy **nap**. Az **azonnali** varázslatokat leszámítva mindegyik többszörözhető a varázslat **erősítésével**

Amennyiben a varázslat időtartama 1 kör, úgy az alapesetben a varázslás utáni kör végéig tart. A hosszabban tartó varázslatok addig tartanak, amíg az időtartam nevéből is kitalálható.

Minden varázslat, amelynek időtartama nem **azonnali**, bármikor megszüntethető a varázsló által. Ez történhet úgy, hogy a varázsló ezt bejelenti, amikor ő kerül sorra a körben (akciópont költség nélkül), vagy egy előre meghatározott feltétel teljesülésekor (pl. "amikor bármelyik társam megközelíti a tűzfalat, az eltűnik").

`PlayScenario|{"scenario":"casting"}`
