# Disengage

`ActionInfo`

If a character is in close quarters, they can attempt to move out of it using this action.

## Action Points

How many action points this action costs depends on two factors: the **speed** of the weapon and the skill level of the user.


`ActionPointCalculator`

## Roll

Disengage rolls are made with `d100`, plus the attack modifier, which is in turn calculated from the type and **attack** property of the weapon and the skill level of the user. Five times the weapon's **reach** is then subtracted from this because in close quarters combat a longer reach is a disadvantage.

`CombatRollCalculator`

## On Success

If the move succeeds, the fighters move away from each other into normal melee (in measure) range.

## On Failure

If the attempt fails, the fighters stay in close quarters range.