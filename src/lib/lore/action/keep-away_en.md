# Keep Away

`ActionInfo`

If a character is in measure (i.e. they are in melee range but not in close quarters), they can use this action to counter their opponents' attempt to close in.

## Roll

Keep-away rolls are made with `d100`, plus the defence modifier, which is in turn calculated from the type and **defence** property of the weapon and the skill level of the user. Five times the weapon's **reach** is then added to this because when in measure, a longer reach is an advantage.

`CombatRollCalculator`