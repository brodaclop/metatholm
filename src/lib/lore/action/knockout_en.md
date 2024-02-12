# Knockout

`ActionInfo`

This is the action to be used when attempting to knock out an opponent outright. It's usually best attempted against a defenceless opponent.

## Action Points

How many action points this action costs depends on three factors: the **speed** of the weapon, the difficulty of the combat skill used and the skill level of the user.

`ActionPointCalculator`

## Roll

Attack rolls are made with `d100`, plus the attack modifier, which is in turn calculated from the **attack** property of the weapon, the difficulty of the combat skill used and the skill level of the user. The weapon's reach is then added to this because when in measure, a longer reach is an advantage.

`CombatRollCalculator`

## On Success

If the attack is successful (the attack roll exceeds the defence roll), the attacking character has to roll a [Trick Fighting](skill:trick_fighting) check [contested](rule:skill_check) by the target's [Endurance](skill:endurance) skill. On success the opponent loses consciousness for a few minutes, and is thus at the mercy of those around them.
