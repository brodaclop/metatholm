# Defend

`ActionInfo`

This is the reaction to be used to defend against attacks in standard, in-range melee combat. 

## Defence Roll

Defence rolls are made with `d100`, plus the defence modifier, which is in turn calculated from the **defence** property of the weapon, the difficulty of the combat skill used and the skill level of the user. The weapon's reach is then subtracted from this because in close quarters combat a longer reach is a disadvantage.

`CombatRollCalculator`