# Attack

`ActionInfo`

This is the action to be used for standard, in-range melee combat. 

## Action Points

How many action points this action costs depends on three factors: the **speed** of the weapon, the difficulty of the combat skill used and the skill level of the user.

`ActionPointCalculator`

## Roll

Attack rolls are made with `d100`, plus the attack modifier, which is in turn calculated from the **attack** property of the weapon, the difficulty of the combat skill used and the skill level of the user. The weapon's reach is then added to this because when in measure, a longer reach is an advantage.

`CombatRollCalculator`

## Damage Roll

If a weapon successfully hits (the attack roll exceeds the defence roll), the attacking character can roll for damage. The damage is as many [exploding](rule:exploding_dice) `d5!`s as the weapon's **damage** property.

`DamageCalculator`