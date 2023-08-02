import type { EvalExpression, Expression } from "../logic/Expression";

export type ActionVariant = 'action:attack' | 'action:disarm' | 'action:defend' | 'action:cast' | 'action:attack-cq' | 'action:defend-cq';
export type ActionRoll = 'action:ap' | 'action:roll' | 'label:damage';

export interface Action {
    name: string;
    variants: Partial<Record<ActionVariant, Array<Roll>>>;
}

export interface Roll {
    name: ActionRoll;
    roll: Expression | EvalExpression;
    rollString?: string;
}