# Spin Behind

`ActionInfo`

This is the action to be used when attempting to quickly get behind an opponent and land an attack on them while they're defenceless. Although this manoeuvre can be very effective, it isn't without risks.

## Action Points

How many action points this action costs depends on two factors: the **speed** of the weapon and the skill level of the user.

`ActionPointCalculator`

## Roll

the attacking character has to roll a [Trick Fighting](skill:trick_fighting) check [contested](rule:skill_check) by the target's [Reactions](skill:reactions) skill.

## On Success

On success the attacker gets behind the opponent and hits them, rolling damage for the weapon involved.

`DamageCalculator`

## On failure

If the manoeuvre fails the character is stuck in an exposed position, unable to defend themselves. Therefore they must roll their defence roll against the next attack against them with plain `d100`, without any positive modifiers from their weapon or skill.
