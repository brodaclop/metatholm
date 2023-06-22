import { E, type Expression } from "../logic/Expression";

export type ExpressionNames = 'expr:pp_base' | 'expr:pp_per_level' | 'expr:pp_total' | 'expr:pp_roll' | 'expr:effective_spell_skill' | 'expr:spell_level' | 'expr:spell_focus_skill' | 'expr:spell_speed';

export const TOTAL_EP: Expression = E.add(E.constant(9), E.value('character:level'));
export const FP_ALAP: Expression = E.name('expr:pp_base', E.add(E.constant(20), E.value('ability:build'), E.value('ability:presence')));
export const FP_PER_SZINT: Expression = E.name('expr:pp_per_level', E.add(E.constant(10), E.constant('1d10', 'expr:pp_roll'), E.value('skill:endurance'), E.value('skill:pain_threshold')));
export const TOTAL_FP: Expression = E.name('expr:pp_total', E.add(FP_ALAP, E.level(FP_PER_SZINT)));

export const ATTACK_AP: Expression = E.max(1, E.div(E.mul(2, E.sub(10, E.value('weapon:ap')), E.sub(54, E.mul(E.add(1, E.value('weapon:difficulty')), E.sub(E.value('weapon:skill'), 1)))), 54));
//Math.max(1, (base * (30 + 3 * (skill - 1) * mult)) / 30);
export const WEAPON_ATK: Expression = E.max(1, E.div(E.mul(E.value('weapon:attack'), E.add(30, E.mul(3, E.sub(E.value('weapon:skill'), 1), E.value('weapon:difficulty')))), 15))
export const WEAPON_DISARM: Expression = E.max(1, E.div(E.mul(E.value('weapon:attack'), E.add(30, E.mul(3, E.max(0, E.sub(E.value('weapon:skill'), 3)), E.value('weapon:difficulty')))), 15))
export const WEAPON_DEF: Expression = E.max(1, E.div(E.mul(E.value('weapon:defence'), E.add(30, E.mul(3, E.sub(E.value('weapon:skill'), 1), E.value('weapon:difficulty')))), 15))
export const MAGIC_EFFECTIVE_SKILL: Expression = E.name('expr:effective_spell_skill', E.sub(E.value('expr:spell_focus_skill'), E.value('expr:spell_level')));