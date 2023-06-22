import type { EvalExpression, Expression } from "../logic/Expression";

export type ActionVariant = 'action.attack' | 'action:disarm' | 'action:defence' | 'action:cast';
export type ActionRoll = 'action:ap' | 'action:roll' | 'action:damage';

export interface Action {
    name: string;
    variants: Partial<Record<ActionVariant, Array<Roll>>>;
}

interface Roll {
    name: ActionRoll;
    roll: Expression | EvalExpression;
    rollString?: string;
}