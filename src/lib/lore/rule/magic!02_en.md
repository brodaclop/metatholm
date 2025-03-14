# Magic

In the world of Metatholm magic pervades and surrounds everything and everyone, it's there in the raging storm, the gently rippling surface of the lake, but in the everydays too. When the baker's dough rises, when the blacksmith bends the hot steel, when the writer's pen appears to glide all by itself, when the spices in a soup combine into a new flavour, these are all mundane manifestations of the gentle flow of magic.

But while the spontaneous radiation of magic is something every living being is capable of, it's quite a different thing to take conscious control of it. This is a feat far fewer are capable of, and even fewer understand how it all works.

The latter can only be really said about the **Mages**, who command vast powers but as always, this has a price: Mages often have to prepare their grand spells for weeks or months, poring over old tomes, drawing detailed plans, inscribing magic circles with expensive inks, enchanting candles and gemstones. Of course the results are well worth the price, so long as someone can afford to pay it: a castle wall reinforced by a Mage's spell will be near indestructible for years, as it encloses magic so tightly that hardly anything leaks out.

Compared to that the empirical magic of mundane magic users (such as all player characters) may look like a cheap toy version of "real magic" at first, seeing as only the most powerful of them can make a spell last more than a couple of days. Underestimating their power would however be a huge mistake even for a Mage because while mundane magic users may not have as much power, they have one massive advantage: they can weave their spells with blinding speed, in a matter of moments. A crafty [Hedge Wizard](background:hedge_wizard) can easily engulf an unprepared Mage in all-consuming flame, while the Mage is still pondering where to find their book detailing the basics of fire magic.

As has been alluded to, magic can be found in every living being in a concentrated form, and its radiance can be detected and recognised by those who know what to look for, as there are different resonances to a tree, to a mouse or to a person.

And of course there are also beings who are infused with even more magic: dragons for example, who although can only direct their magic instinctively, are nonetheless immensely dangerous due to the amount of magic stored in them.

## Casting spells

A character's magic that can be used to cast spells is determined by their [Magic Force](skill:magic_force) skill, this is the maximum amount of [Magic Power](character:mp) they can have.

To turn this power into spells, the character also has to learn magic focus skills, this will determine what spells they have at their disposal and how easily they can cast them. The available foci are:

`SkillListByType|{"type":"skill_type:focus"}`

The exact method of casting a spell isn't pre-determined, this is something every character can choose for themselves. There are some who just internally concentrate on magic words, others chant them out loud or insist on clutching a lucky pebble in their left hand, yet others draw intricate runes in the air with the tip of their sword, it could be anything you can imagine.

## Spells

Each spell belongs to a **focus skill**, this is the skill the character needs to develop to gain access to that spell. Each spell also has a **level**, the bigger this is, the higher your corresponding focus skill has to be. So for example a character with a [Body Focus](skill:body_focus) skill of 4 can only cast spells of level 3 or lower from that focus.

For this they first of all have to decide what **strength** they want to cast the spell with. How strength affects a spell is always specified in the description of the spell but usually it means a stronger effect, more targets/larger area of effect, longer duration, or a combination of the above. (The description of the spell will describe this by stating that a property of the spell can be "improved".)

Once strength has been determined, the caster has to roll with as many `d10!` as the difference of their focus skill and the level of the spell. E.g. the aforementioned character with a Body Focus skill of 4 casting a level 2 spell will roll with `2d10!`.

The [Spirit Guide](world:concepts:spirit_guide) will "oppose" this roll with as many `d10!`s as the chosen strength of the spell.

If the spellcaster's roll is higher, the spell is cast without further cost or complication.

If the spellcaster loses the contest, for every 10 points of the difference (starting from 0) they also have to expend 1 Magic Power points. So if the spellcaster rolls a 17 and the [Spirit Guide](world:concepts:spirit_guide) a 20, the cost is 1 MP, if the [Spirit Guide](world:concepts:spirit_guide) rolls 27, it's 2 MPs and so on. If the spellcaster hasn't got enough MPs left, they can choose to pay the remaining cost from their [Life Force](character:ep). Of course they can also always decide that they don't want to cast the spell after all, in which case the only thing they lose is the time it took to not-quite-cast the spell.

### Snapshot

The caster can choose to cast their spell faster with less precise control, in this case their focus skill counts as 1 lower than it really is.

### Slow casting

Slow casting is the opposite of the above: the caster will formulate the spell very carefully and deliberately, taking more time but with their focus skill counting as 1 higher than it really is.

### Duration

All spells can have one of four duration values: **instant**, **round**, **hour** or **day**. All of them except **instant** can be extended by increasing the **spell strength**.

If the duration of a spell is **round**, it lasts until the end of the round after it was cast. Longer duration spell last as long as the duration name implies.

Any spell whose duration isn't **instant** can be cancelled at any time by the caster, either when it's the caster's turn (no AP cost) or at a pre-determined trigger point (e.g. "when one of my teammates approaches the wall of fire, it disappears").

`PlayScenario|{"scenario":"casting"}`
