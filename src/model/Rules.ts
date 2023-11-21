import { E, type Expression } from "../logic/Expression";

export type ExpressionNames = 'expr:fp_base' | 'expr:fp_per_level' | 'expr:fp_total' | 'expr:fp_roll' | 'expr:effective_spell_skill' | 'expr:spell_level' | 'expr:spell_focus_skill' | 'expr:spell_speed' | 'expr:skill_level' | 'expr:skill_ability' | 'expr:skill_difficulty';

export type RuleLabels = 'rule:skills' | 'rule:exploding_dice';

export const RuleDescriptions_hu: Record<RuleLabels, string> = {
    'rule:skills': `A képzettségek a karakter tanult képességeit jellemzik.
    \`SkillRolls\``,
    'rule:exploding_dice': `A **robbantott kockák** dobásánál a hagyományos módon dobunk egy vagy több kockával, és összeadjuk az eredményt. De ha bármelyik kocka a lehető legnagyobb értéket mutatja, azt a kockát újradobjuk, és ennek is hozzáadjuk az eredményét az összeghez. 

Ha az újradobás eredménye is maximális, ismét újradobunk és így tovább. A robbantott kockadobást a játékban a **!** karakterrel jelöljük, tehát például a **3d10!** annyit tesz, hogy 10 oldalú kockával dobunk háromszor, újradobva minden 10-est.
\`DiceRoller|{"roll": "3d10!"}\``
}




export const TOTAL_EP: Expression = E.add(E.constant(9), E.value('character:level'));
export const FP_ALAP: Expression = E.constant(30, 'expr:fp_base');
export const FP_PER_SZINT: Expression = E.name('expr:fp_per_level', E.add(10, E.constant('2d10', 'expr:fp_roll'), E.mul(2, E.value('skill:endurance')), E.mul(E.value('skill:pain_threshold'), 2)));
export const TOTAL_FP: Expression = E.name('expr:fp_total', E.add(FP_ALAP, E.level(FP_PER_SZINT)));

export const ATTACK_AP: Expression = E.max(4, E.div(E.mul(2, E.sub(20, E.value('weapon:speed')), E.sub(54, E.mul(E.add(1, E.value('weapon:difficulty')), E.sub(E.value('weapon:skill'), 1)))), 54));
export const WEAPON_ATK: Expression = E.add(10, E.add(E.value('weapon:reach'), E.mul(E.value('weapon:skill'), E.value('weapon:difficulty'), 4), E.div(E.mul(E.value('weapon:skill'), E.value('weapon:attack')), E.add(1, E.value('weapon:difficulty')))));
export const WEAPON_DISARM: Expression = E.max(1, E.div(E.mul(E.value('weapon:attack'), E.add(30, E.mul(3, E.max(0, E.sub(E.value('weapon:skill'), 3)), E.value('weapon:difficulty')))), 15))
export const WEAPON_DEF: Expression = E.add(10, E.add(E.value('weapon:reach'), E.mul(E.value('weapon:skill'), E.value('weapon:difficulty'), 4), E.div(E.mul(E.value('weapon:skill'), E.value('weapon:defence')), E.add(1, E.value('weapon:difficulty')))));
export const MAGIC_EFFECTIVE_SKILL: Expression = E.name('expr:effective_spell_skill', E.sub(E.add(E.value('expr:spell_focus_skill'), 1), E.value('expr:spell_level')));
export const SKILL_KP: Expression = E.mul(E.value('expr:skill_level'), 10, E.div(E.sub(33, E.mul(E.value('expr:skill_ability'), E.sub(4, E.value('expr:skill_difficulty')))), 33));

export const SPELL_AP: Expression = E.max(4, E.div(E.mul(2, E.sub(20, E.value('expr:spell_speed')), E.sub(54, E.mul(4, E.sub(E.value('expr:spell_focus_skill'), 1)))), 54));
