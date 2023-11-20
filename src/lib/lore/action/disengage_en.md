# Disengage

`ActionInfo`

If a character is in close quarters, they can attempt to move out of it using this action. If their attempt fails, they stay in close quarter combat.

## Action Points

How many action points this action costs depends on three factors: the **speed** of the weapon, the difficulty of the combat skill used and the skill level of the user.

`ActionPointCalculator`

## Roll

Disengage rolls are made with `d100`, plus the attack modifier, which is in turn calculated from the **attack** property of the weapon, the difficulty of the combat skill used and the skill level of the user. The weapon's reach is then added to this because when in measure, a longer reach is an advantage.

`CombatRollCalculator`
