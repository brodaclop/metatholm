# Knockout

`ActionInfo`

This is the action to be used when attempting to trip or topple over somebody in combat. On a successful move the opponent will be on the floor and thus unable to use their [Keep Away](action:keep-away) action to stop opponents closing in on them.

## Action Points

How many action points this action costs depends on two factors: the **speed** of the weapon and the skill level of the user.

`ActionPointCalculator`

## Roll

Attack rolls are made with `d100`, plus the attack modifier, which is in turn calculated from the **attack** property of the weapon, the difficulty of the combat skill used and the skill level of the user. The weapon's reach is then added to this because when in measure, a longer reach is an advantage.

`CombatRollCalculator`

## On Success

If the attack is successful (the attack roll exceeds the defence roll), the attacking character has to roll a [Trick Fighting](skill:trick_fighting) check [contested](rule:skill_check) by the target's [Balance](skill:balance) skill. On success the opponent falls over.
