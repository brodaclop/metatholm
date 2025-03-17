# Attack (Close Quarters)

`ActionInfo`

This is the action to be used for close quarters, brawling combat.

## Action Points

How many action points this action costs depends on two factors: the **speed** of the weapon and the skill rank of the user.


`ActionPointCalculator`

## Roll

Attack rolls are made with `d100`, plus the attack modifier, which is in turn calculated from the type and **attack** property of the weapon and the skill rank of the user. Five times the weapon's **reach** is then subtracted from this because in close quarters combat a longer reach is a disadvantage.

`CombatRollCalculator`

## Damage Roll

If a weapon successfully hits (the attack roll exceeds the defence roll), the attacking character can roll for damage. The damage is as many [exploding](rule:exploding_dice) `d5!`s as the weapon's **damage** property.

`DamageCalculator`