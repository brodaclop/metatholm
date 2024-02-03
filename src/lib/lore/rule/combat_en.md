# Combat

## Rounds

For easier handling of time, combat is split into rounds. Unlike in most other games though, rounds do not represent a specific amount of "real" time. Sometimes thing happen fast, sometimes they don't. And since there's no independent way of measuring time with a second precision, assigning a fixed number of seconds to each round would be meaningless. But just to give an idea, your typical round will take somewhere between 5 and 30 seconds.

## Action Points

Each combat round begins with every participant rolling `d10!+10`, this is how many action points they've got for that round. The character with the highest action point total will act first in the round, picking an action they want to perform. Performing the action will reduce the character's action point total, meaning the character who has the highest total now will act next. (This could be the same character if the action was particularly quick.) This is repeated until none of the participants have any action points left, at which point the combat round ends and we start afresh with the next round.

## Actions

On their turn characters can pick an action to perform. This could be an attack, casting a spell, attempting to get close to an opponent or any other combat manoeuvre. The target can then usually pick a reaction to oppose the action, depending on what the action was.

`ActionVariants`

## Ranges

For the purposes of combat, we differentiate between 3 different ranges:

* **Out of Measure**: At this range the combatants are too far out for their weapons to engage with each other, so at this distance melee combat isn't possible. This is the range for ranged combat, thrown weapons, shooting or indeed charging at your opponent. A character just outside of measure can also choose to [step in](action:step-in) measure unopposed, costing them no action points.
* **In Measure**: At this range the combatants' weapons can touch, bind or parry, therefore this is the range at which most melee combat is fought. When it's their turn, any combatant can choose to take a step back, [stepping out](action:step-out) of measure unopposed, with no action point cost.
* **Close Quarters**: Also called "grappling distance", this range is very much up close and personal. You're close enough to reach the opponent's body with your hands. In close quarters fighting the range of your weapon works **against** you, and what you need is small and nimble weapons, or even just going unarmed. Getting into a close quarters fight against an unwilling opponent with a sufficiently long weapon is hard though and requires a successful [Close In](action:close-in) action, which is opposed by the target's [Keep Away](action:keep-away) reaction. Similarly, it isn't possible to simply step out of grappling distance, a [Disengage](action:disengage) action is needed, opposed by [Keep Close](action:keep-close).
