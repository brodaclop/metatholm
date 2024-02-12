# (Attack With) Hidden Weapon

`ActionInfo`

This is the action to be used when attempting to wound an opponent with a weapon that hitherto had been hidden. Obviously this move can only been attempted once in a combat, and the weapon must have been well hidden from the opponent. Just holding it behind your back won't do.

## Action Points

How many action points this action costs depends on three factors: the **speed** of the weapon, the difficulty of the combat skill used and the skill level of the user.

`ActionPointCalculator`

## Roll

Attack rolls are made with `d100`, plus the attack modifier, which is in turn calculated from the **attack** property of the weapon, the difficulty of the combat skill used and the skill level of the user. The weapon's reach is then added to this because when in measure, a longer reach is an advantage.

`CombatRollCalculator`

## On Success

If the attack is successful (the attack roll exceeds the defence roll), the attacking character has to roll a [Trick Fighting](skill:trick_fighting) check [contested](rule:skill_check) by the target's [Spot Hidden](skill:spot_hidden) skill. On success the attacker hits their opponent and can roll damage for the weapon involved.