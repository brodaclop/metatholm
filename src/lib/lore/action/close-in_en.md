# Close In

`ActionInfo`

If a character is in measure (i.e. they are in melee range but not in close quarters), using this action allows them to move into close quarters combat. If the attempt fails, they stay in normal melee range.

## Action Points

How many action points this action costs depends on three factors: the **speed** of the weapon, the difficulty of the combat skill used and the skill level of the user.

`ActionPointCalculator`

## Roll

Close-in rolls are made with `d100`, plus the attack modifier, which is in turn calculated from the **attack** property of the weapon, the difficulty of the combat skill used and the skill level of the user. The weapon's reach is then added to this because when in measure, a longer reach is an advantage.

`CombatRollCalculator`