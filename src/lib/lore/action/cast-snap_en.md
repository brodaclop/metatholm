# Cast (Snapshot)

`ActionInfo`

This action is used whenever a spell is to be cast at high speed. This will drastically reduce the action points cost of the spell but sloppy casting results in a more difficult to control spell, reducing the effective skill rank of the caster by 1.

## Action Points

How many action points this action costs depends on two factors: the **speed** of the spell and the corresponding focus skill rank of the spell caster.

`SpellActionPointCalculator`

## Spellcasting Roll

The spellcasting roll depends on two factors: the **level** of the spell and the corresponding focus skill rank of the spellcaster.

`SpellRollCalculator`