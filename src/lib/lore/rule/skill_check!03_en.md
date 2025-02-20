# Skill check

Skill checks are rolled with [exploding dice](rule:exploding_dice), for which you will use as many `d10!`s as your skill level. If you're unskilled, you can roll a single `d5!` instead.

## Uncontested

In an uncontested skill check the character is up against a challenge with fixed difficulty. This difficulty is determined by the GM and is expressed as a **target number**. Your skill check is considered successful if your dice total exceeds the target number, which depends on the difficulty of the task. Typical target numbers for the various difficulties are as follows:

| Difficulty | Typical target |
| :- | :- |
| Easy | 5 |
| Average | 10 |
| Hard | 20 |
| Legendary | 40 |
| Impossible | 80 |

It's worth noting that the difficulty of a task is not solely determined by the nature of the task itself, circumstances can play a decisive part. Sure, any sailor can tie a reef knot. It's an easy task. But doing so with one hand, in the middle of a raging storm? Suddenly that "easy" task has become a lot harder.

*Note to [Spirit Guides](world:concepts:spirit_guide): When asking a player to roll a **Knowledge** type skill check to see what lexical information their character can recall, it's probably a good idea to set multiple target scores for various levels of detail. So for example when performing a [Law](skill:law) check to determine if tresppassing in the king's forest is a crime, rolling above 5 could mean the character recalls a yes/no answer, above 10 would also reveal what the typical punishment is, above 20 will reveal what exceptions, loopholes and possible defenses may apply.*

The table below shows how likely you are to succeed a skill check, given your skill level and the task's difficulty.

`SkillRolls`

`PlayScenario|{"scenario": "uncontested-check"}`

## Contested

A skill check is considered contested when two or more participants pit their skills against each other. This could be the same skill (for example opposing [Strength](skill:strength) checks during arm wrestling) or different skills (for example one character using [Camouflage](skill:camouflage) to hide from someone, who will have to roll [Spot Hidden](skill:spot_hidden) to spot them). In either case the results of the roll are compared and whoever's is the highest wins the contest. If it's a tie, then everything stays the same, as if the contest didn't happen (so in the arm wrestling neither party wins, in the hiding scenario the character remains hidden).

`PlayScenario|{"scenario": "contested-check"}`