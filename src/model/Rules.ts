import { E, type Expression } from "../logic/Expression";

export type ExpressionNames = 'expr:fp_base' | 'expr:fp_per_level' | 'expr:fp_total' | 'expr:fp_roll' | 'expr:effective_spell_skill' | 'expr:spell_level' | 'expr:spell_focus_skill' | 'expr:spell_speed' | 'expr:skill_level' | 'expr:skill_ability' | 'expr:skill_difficulty';

export type RuleLabels = 'rule:skills' | 'rule:exploding_dice' | 'rule:magic' | 'rule:combat' | 'rule:changes';


export const TOTAL_EP: Expression = E.add(E.constant(9), E.value('character:level'));
export const FP_ALAP: Expression = E.constant(30, 'expr:fp_base');
export const FP_PER_SZINT: Expression = E.name('expr:fp_per_level', E.add(E.constant('2d10', 'expr:fp_roll'), E.mul(2, E.value('skill:endurance')), E.mul(E.value('skill:pain_threshold'), 2)));
export const TOTAL_FP: Expression = E.name('expr:fp_total', E.add(FP_ALAP, E.level(FP_PER_SZINT)));

export const EFFECTIVE_WEAPON_SKILL = E.name('weapon:effective_skill', E.max(0, E.value('weapon:skill')));

export const INVERSE_DIFFICULTY = E.sub(4, E.value('weapon:difficulty'));

export const ATTACK_WITH_DIFFICULTY = E.mul(INVERSE_DIFFICULTY, E.value('weapon:attack'));
export const DEFEND_WITH_DIFFICULTY = E.mul(INVERSE_DIFFICULTY, E.value('weapon:defence'));


export const SKILL_WITH_DIFFICULTY = E.mul(E.value('weapon:difficulty'), EFFECTIVE_WEAPON_SKILL);

export const WEAPON_ATK: Expression = E.add(ATTACK_WITH_DIFFICULTY, E.mul(SKILL_WITH_DIFFICULTY, 4), E.mul(E.value('weapon:reach'), 2));
export const WEAPON_DEF: Expression = E.add(DEFEND_WITH_DIFFICULTY, E.mul(SKILL_WITH_DIFFICULTY, 4), E.mul(E.value('weapon:reach'), 2));

export const ATTACK_AP: Expression = E.max(4, E.sub(30, E.div(E.add(E.mul(3, E.value('weapon:speed')), E.mul(EFFECTIVE_WEAPON_SKILL, 5)), 4)));
export const SPELL_AP: Expression = E.max(4, E.sub(30, E.div(E.add(E.mul(3, E.value('expr:spell_speed')), E.mul(E.value('expr:spell_focus_skill'), 5)), 4)));

// These are the old rules for calculating atk/def
// export const WEAPON_ATK: Expression = E.add(E.mul(10, E.min(1, E.max(0, E.value('weapon:skill')))), E.add(E.value('weapon:reach'), E.mul(EFFECTIVE_WEAPON_SKILL, E.value('weapon:difficulty'), 4), E.div(E.mul(EFFECTIVE_WEAPON_SKILL, E.value('weapon:attack')), E.add(1, E.value('weapon:difficulty')))));
// export const WEAPON_DEF: Expression = E.add(E.mul(10, E.min(1, EFFECTIVE_WEAPON_SKILL)), E.add(E.value('weapon:reach'), E.mul(EFFECTIVE_WEAPON_SKILL, E.value('weapon:difficulty'), 4), E.div(E.mul(EFFECTIVE_WEAPON_SKILL, E.value('weapon:defence')), E.add(1, E.value('weapon:difficulty')))));
// export const ATTACK_AP: Expression = E.max(4, E.div(E.mul(2, E.sub(20, E.value('weapon:speed')), E.sub(54, E.mul(E.add(1, E.value('weapon:difficulty')), E.sub(EFFECTIVE_WEAPON_SKILL, 1)))), 54));
// export const SPELL_AP: Expression = E.max(4, E.div(E.mul(2, E.sub(20, E.value('expr:spell_speed')), E.sub(54, E.mul(4, E.sub(E.value('expr:spell_focus_skill'), 1)))), 54));

export const MAGIC_EFFECTIVE_SKILL: Expression = E.name('expr:effective_spell_skill', E.add(E.sub(E.value('expr:spell_focus_skill'), E.value('expr:spell_level')), 1));
export const SKILL_KP: Expression = E.mul(E.value('expr:skill_level'), 10, E.div(E.sub(33, E.mul(E.value('expr:skill_ability'), E.sub(3, E.div(E.value('expr:skill_difficulty'), 2)))), 33));


export const SPIRIT_ANIMAL_COUNT = E.floor(E.div(E.value('character:ip'), 5));