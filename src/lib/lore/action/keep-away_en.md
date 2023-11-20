# Keep Away

`ActionInfo`

If a character is in measure (i.e. they are in melee range but not in close quarters), they can use this action to counter their opponents' attempt to close in.

## Roll

Keep-away rolls are made with `d100`, plus the defence modifier, which is in turn calculated from the **defence** property of the weapon, the difficulty of the combat skill used and the skill level of the user. The weapon's reach is then subtracted from this because in close quarters combat a longer reach is a disadvantage.

`CombatRollCalculator`