import { Expression } from "../logic/Expression";

export const FP_ALAP: Expression = Expression.name('expr:pp_base', Expression.add(Expression.constant(20), Expression.value('ability:build'), Expression.value('ability:presence')));
export const FP_PER_SZINT: Expression = Expression.name('expr:pp_per_level', Expression.add(Expression.constant(10), Expression.constant('1d10', 'expr:pp_roll'), Expression.value('skill:endurance'), Expression.value('skill:pain_tolerance')));
export const TOTAL_FP: Expression = Expression.name('expr:pp_total', Expression.add(FP_ALAP, Expression.level(FP_PER_SZINT)));

