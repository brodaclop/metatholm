import type { EvalExpression, Expression } from "../logic/Expression";

export type ActionVariant = 'action:attack' | 'action:disarm' | 'action:defend' | 'action:cast' | 'action:attack-cq' | 'action:defend-cq' | 'action:counter' | 'action:close-in';
export type ActionRoll = 'action:ap' | 'action:roll' | 'label:damage';

export type ActionDistance = 'out-of-range' | 'in-range' | 'close-quarters';

export const ActionTypes: Partial<Record<ActionVariant, 'attack' | 'defend' | 'counter'>> = {
    'action:close-in': 'attack',
    'action:attack': 'attack',
    'action:attack-cq': 'attack',
    'action:disarm': 'attack',
    'action:defend': 'defend',
    'action:defend-cq': 'defend',
    'action:counter': 'counter'
};

export const ActionDistances: Record<ActionVariant, ActionDistance> = {
    'action:close-in': 'in-range',
    'action:attack': 'in-range',
    'action:defend': 'in-range',
    'action:attack-cq': 'close-quarters',
    'action:defend-cq': 'close-quarters',
    'action:disarm': 'in-range',
    'action:cast': 'in-range',
    'action:counter': 'in-range'
};

export interface ActionVariantInfo {
    name: ActionVariant,
    rolls: Array<Roll>,
}

export interface Action {
    name: string;
    variants: Array<ActionVariantInfo>;
}

export interface Roll {
    name: ActionRoll;
    roll: Expression | EvalExpression;
    rollString?: string;
}