# Defend (Close Quarters)

`ActionInfo`

This is the reaction to be used to defend against attacks in close quarters combat.

## Roll

Defence rolls are made with `d100`, plus the defence modifier, which is in turn calculated from the type and **defence** property of the weapon and the skill rank of the user. Five times the weapon's **reach** is then subtracted from this because in close quarters combat a longer reach is a disadvantage.

`CombatRollCalculator`
