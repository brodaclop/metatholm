# Attack (Ranged)

`ActionInfo`

This is the action to be used for ranged attacks, including thrown weapons.

## Action Points

How many action points this action costs depends on two factors: the **speed** of the weapon and the skill rank of the user.


`ActionPointCalculator`

## Roll

Attack rolls are made with `d100`, plus the attack modifier, which is in turn calculated from the type and **attack** property of the weapon and the skill rank of the user.

`CombatRollCalculator`

## Damage Roll

If a weapon successfully hits (the attack roll exceeds the defence roll), the attacking character can roll for damage. The damage is as many [exploding](rule:exploding_dice) `d5!`s as the weapon's **damage** property.

`DamageCalculator`