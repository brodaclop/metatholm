# Defend

`ActionInfo`

This is the reaction to be used to defend against attacks in standard, in-range melee combat. 

## Roll

Defence rolls are made with `d100`, plus the defence modifier, which is in turn calculated from the type and **defence** property of the weapon and the skill level of the user. Five times the weapon's **reach** is then added to this because when in measure, a longer reach is an advantage.

`CombatRollCalculator`