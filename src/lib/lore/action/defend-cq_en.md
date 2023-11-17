# Defend (Close Quarters)

`ActionInfo|{"action":"action:defend-cq"}`

This is the reaction to be used to defend against attacks in close quarters combat.

## Defence Roll

Defence rolls are made with `d100`, plus the defence modifier, which is in turn calculated from the **defence** property of the weapon, the difficulty of the combat skill used and the skill level of the user. The weapon's reach is then added to this because when in measure, a longer reach is an advantage.

`CombatRollCalculator|{"variant":"action:defend-cq"}`
