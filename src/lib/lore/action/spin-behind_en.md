# Spin Behind

`ActionInfo`

This is the action to be used when attempting to quickly get behind an opponent. On a successful move the opponent will be unable to defend against the attacker's next attack, thus being forced to defend with a plain `1d100 + 0` defensive roll.

## Action Points

How many action points this action costs depends on two factors: the **speed** of the weapon and the skill level of the user.

`ActionPointCalculator`

## Roll

Attack rolls are made with `d100`, plus the attack modifier, which is in turn calculated from the **attack** property of the weapon, the difficulty of the combat skill used and the skill level of the user. The weapon's reach is then added to this because when in measure, a longer reach is an advantage.

`CombatRollCalculator`

## On Success

If the attack is successful (the attack roll exceeds the defence roll), the attacking character has to roll a [Trick Fighting](skill:trick_fighting) check [contested](rule:skill_check) by the target's [Reactions](skill:reactions) skill. On success the attacker gets behind the opponent and stays there until their next attack.
