import { E, type Expression } from "../logic/Expression";

export type ExpressionNames = 'expr:fp_base' | 'expr:fp_per_level' | 'expr:fp_total' | 'expr:fp_roll' | 'expr:effective_spell_skill' | 'expr:spell_level' | 'expr:spell_focus_skill' | 'expr:spell_speed' | 'expr:skill_level' | 'expr:skill_ability' | 'expr:skill_difficulty';

export type RuleLabels = 'rule:skills' | 'rule:exploding_dice' | 'rule:magic' | 'rule:combat' | 'rule:changes';


export const TOTAL_EP: Expression = E.add(E.constant(9), E.value('character:level'));
export const FP_ALAP: Expression = E.constant(30, 'expr:fp_base');
export const FP_PER_SZINT: Expression = E.name('expr:fp_per_level', E.add(E.constant('2d10', 'expr:fp_roll'), E.mul(2, E.value('skill:endurance')), E.mul(E.value('skill:pain_threshold'), 2)));
export const TOTAL_FP: Expression = E.name('expr:fp_total', E.add(FP_ALAP, E.level(FP_PER_SZINT)));

export const EFFECTIVE_ATTACK_SKILL: Expression = E.min(E.value('weapon:attack'), E.value('weapon:skill'));
export const EFFECTIVE_DEFENCE_SKILL: Expression = E.min(E.value('weapon:defence'), E.value('weapon:skill'));
export const EFFECTIVE_SPEED_SKILL: Expression = E.min(E.value('weapon:speed'), E.value('weapon:skill'));
export const EFFECTIVE_SPELL_SPEED_SKILL: Expression = E.min(E.value('expr:spell_speed'), E.value('expr:spell_focus_skill'));

export const WEAPON_ATK: Expression = E.add(E.mul(EFFECTIVE_ATTACK_SKILL, E.value('combat:multiplier'), 10), E.mul(E.value('weapon:reach'), 5), E.value('weapon:enchantment'));
export const WEAPON_DEF: Expression = E.add(E.mul(EFFECTIVE_DEFENCE_SKILL, E.value('combat:multiplier'), 10), E.mul(E.value('weapon:reach'), 5), E.value('weapon:enchantment'));

export const ATTACK_AP: Expression = E.sub(E.sub(25, E.floor(E.mul(EFFECTIVE_SPEED_SKILL, E.value('combat:multiplier')))), E.value('weapon:enchantment'));

export const SPELL_AP: Expression = E.sub(25, E.floor(E.mul(EFFECTIVE_SPELL_SPEED_SKILL, E.value('combat:multiplier'))));

export const MAGIC_EFFECTIVE_SKILL: Expression = E.name('expr:effective_spell_skill', E.add(E.sub(E.value('expr:spell_focus_skill'), E.value('expr:spell_level')), 1));
export const SKILL_KP: Expression = E.mul(E.value('expr:skill_level'), 10, E.div(E.sub(33, E.mul(E.value('expr:skill_ability'), E.sub(3, E.div(E.value('expr:skill_difficulty'), 2)))), 33));


export const SPIRIT_ANIMAL_COUNT = E.floor(E.div(E.value('character:ip'), 5));