# Close In

`ActionInfo`

If a character is in measure (i.e. they are in melee range but not in close quarters), using this action allows them to move into close quarters combat.

## Action Points

How many action points this action costs depends on two factors: the **speed** of the weapon and the skill level of the user.


`ActionPointCalculator`

## Roll

Attack rolls are made with `d100`, plus the attack modifier, which is in turn calculated from the type and **attack** property of the weapon and the skill level of the user. Five times the weapon's **reach** is then added to this because when in measure, a longer reach is an advantage.

`CombatRollCalculator`

## On Success

If the move succeeds, the fighters move closer to each other into close quarter range.

## On Failure

If the attempt fails, the fighters stay in normal melee range.