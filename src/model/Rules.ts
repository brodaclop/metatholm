import { E, type Expression } from "../logic/Expression";

export type ExpressionNames = 'expr:pp_base' | 'expr:pp_per_level' | 'expr:pp_total' | 'expr:pp_roll' | 'expr:effective_spell_skill' | 'expr:spell_level' | 'expr:spell_focus_skill' | 'expr:spell_speed' | 'expr:skill_level' | 'expr:skill_ability' | 'expr:skill_difficulty';

export type RuleLabels = 'rule:skills' | 'rule:exploding_dice';

export const RuleDescriptions_en: Record<RuleLabels, string> = {
    'rule:skills': `

## What is a skill?

Skills represent a character's learned knowledge. Unlike [abilities](rule:abilities), which stay largely fixed throughout your lifetime, skills can be learnt/trained for. The level of training a character has is called their **skill level**. 

| Skill level | Description | Notes |
| :------------|:-|:-|
| 0 | Unskilled/Untrained | You can attempt only the simplest of tasks, and even then failure is more likely than success. |
| 1-2 | Beginner/Apprentice | You are familiar with the basics of the field, albeit probably more instinctively than consciously. |
| 3-4 | Skilled/Journeyman | You can make a living out of using your skill, if it's the kind of thing people pay for. You can converse about your field and are a reliable judge of others' skill level. |
| 5-6 | Expert/Master | You are an accepted expert of your field. You are now also capable of training others in this skill. |
| 7-8 | Grandmaster | You are a known authority, masters of the field will recognise your work and defer to you. |
| 9-10 | Living legend | Your name is known by all serious practitioners of this skill, and will be remembered for centuries. |

## Skill checks

In most cases, using a skill requires a skill check. Skill checks are rolled with [exploding dice](rule:exploding_dice), for which you will use as many d10s as your skill level. If you're unskilled, you can roll a single d5 instead.

Your skill check is considered successful if your dice total reaches or exceeds the target number, which depends on the difficulty of the task. Typical target numbers for the various difficulties are as follows:

| Difficulty | Typical target |
| :- | :- |
| Easy | 5 |
| Average | 10 |
| Hard | 20 |
| Legendary | 40 |
| Impossible | 80 |

It's worth noting that the difficulty of a task is not solely determined by the nature of the task itself, circumstances can play a decisive part. Sure, any sailor can tie a reef knot. It's an easy task. But doing so with one hand, in the middle of a raging storm? Suddenly that "easy" task has become a lot harder.

The table below shows how likely you are to succeed a skill check, given your skill level and the task's difficulty.

\`SkillRolls\``,
    'rule:exploding_dice': `When rolling **exploding dice** we roll the dice like normal and add up the numbers but whenever a die rolls a maximum, it is rerolled and the new value is added to the total too. 

If the reroll is a maximum too, we repeat the process, and so on. The symbol for exploding dice used in this game is **!**, so **3d10!** means roll a 10 sided die 3 times, and reroll the ones that roll a 10.

\`DiceRoller|{"roll": "3d10!"}\``
}

export const RuleDescriptions_hu: Record<RuleLabels, string> = {
    'rule:skills': `A képzettségek a karakter tanult képességeit jellemzik.
    \`SkillRolls\``,
    'rule:exploding_dice': `A **robbantott kockák** dobásánál a hagyományos módon dobunk egy vagy több kockával, és összeadjuk az eredményt. De ha bármelyik kocka a lehető legnagyobb értéket mutatja, azt a kockát újradobjuk, és ennek is hozzáadjuk az eredményét az összeghez. 

Ha az újradobás eredménye is maximális, ismét újradobunk és így tovább. A robbantott kockadobást a játékban a **!** karakterrel jelöljük, tehát például a **3d10!** annyit tesz, hogy 10 oldalú kockával dobunk háromszor, újradobva minden 10-est.
\`DiceRoller|{"roll": "3d10!"}\``
}




export const TOTAL_EP: Expression = E.add(E.constant(9), E.value('character:level'));
export const FP_ALAP: Expression = E.name('expr:pp_base', E.add(E.constant(20), E.value('ability:build'), E.value('ability:presence')));
export const FP_PER_SZINT: Expression = E.name('expr:pp_per_level', E.add(E.constant(10), E.constant('1d10', 'expr:pp_roll'), E.value('skill:endurance'), E.value('skill:pain_threshold')));
export const TOTAL_FP: Expression = E.name('expr:pp_total', E.add(FP_ALAP, E.level(FP_PER_SZINT)));

export const ATTACK_AP: Expression = E.max(1, E.div(E.mul(2, E.sub(10, E.value('weapon:speed')), E.sub(54, E.mul(E.add(1, E.value('weapon:difficulty')), E.sub(E.value('weapon:skill'), 1)))), 54));
//Math.max(1, (base * (30 + 3 * (skill - 1) * mult)) / 30);
export const WEAPON_ATK: Expression = E.max(1, E.add(E.value('weapon:reach'), E.div(E.mul(E.value('weapon:attack'), E.add(30, E.mul(3, E.sub(E.value('weapon:skill'), 1), E.value('weapon:difficulty')))), 15)));
export const WEAPON_DISARM: Expression = E.max(1, E.div(E.mul(E.value('weapon:attack'), E.add(30, E.mul(3, E.max(0, E.sub(E.value('weapon:skill'), 3)), E.value('weapon:difficulty')))), 15))
export const WEAPON_DEF: Expression = E.max(1, E.div(E.mul(E.value('weapon:defence'), E.add(30, E.mul(3, E.sub(E.value('weapon:skill'), 1), E.value('weapon:difficulty')))), 15))
export const MAGIC_EFFECTIVE_SKILL: Expression = E.name('expr:effective_spell_skill', E.sub(E.add(E.value('expr:spell_focus_skill'), 1), E.value('expr:spell_level')));
export const SKILL_KP: Expression = E.mul(E.value('expr:skill_level'), 10, E.div(E.sub(33, E.mul(E.value('expr:skill_ability'), E.sub(4, E.value('expr:skill_difficulty')))), 33));