# Attack (Ranged)

`ActionInfo|{"action":"action:attack-range"}`

This is the action to be used for ranged attacks, including thrown weapons.

## Action Points

How many action points this action costs depends on three factors: the **speed** of the weapon, the difficulty of the combat skill used and the skill level of the user.

`ActionPointCalculator|{"variant":"action:attack-range"}`

## Attack Roll

Attack rolls are made with `d100`, plus the attack modifier, which is in turn calculated from the **attack** property of the weapon, the difficulty of the combat skill used and the skill level of the user.

`CombatRollCalculator|{"variant":"action:attack-range"}`

## Damage Roll

If a weapon successfully hits (the attack roll exceeds the defence roll), the attacking character can roll for damage. The damage is as many [exploding](rule:exploding_dice) `d5!`s as the weapon's **damage** property.

`DamageCalculator|{"variant":"action:attack-range"}`