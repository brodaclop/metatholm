import type { EvalExpression, Expression } from "../logic/Expression";

export type ActionVariant = 'action:attack' | 'action:disarm' | 'action:defend' | 'action:cast' | 'action:attack-cq' | 'action:defend-cq' | 'action:keep-away' | 'action:close-in' | 'action:disengage' | 'action:keep-close' | 'action:attack-range' | 'action:defend-range' | 'action:step-in' | 'action:step-out';
export type ActionRoll = 'action:ap' | 'action:roll' | 'label:damage';

export type ActionDistance = 'out-of-range' | 'in-range' | 'close-quarters';

export const WEAPON_ACTIONS: Array<ActionVariant> = ['action:attack', 'action:attack-cq', 'action:defend', 'action:defend-cq', 'action:disarm', 'action:keep-away', 'action:close-in', 'action:disengage', 'action:keep-close', 'action:attack-range', 'action:defend-range'];

export const ActionTypes: Partial<Record<ActionVariant, 'attack' | 'defend' | 'counter'>> = {
    'action:close-in': 'attack',
    'action:attack': 'attack',
    'action:attack-cq': 'attack',
    'action:disarm': 'attack',
    'action:defend': 'defend',
    'action:defend-cq': 'defend',
    'action:keep-away': 'counter',
    'action:disengage': 'attack',
    'action:keep-close': 'counter',
    'action:attack-range': 'attack',
    'action:defend-range': 'defend',
    'action:step-in': 'attack',
    'action:step-out': 'attack',
};

export const ActionDistances: Record<ActionVariant, ActionDistance> = {
    'action:close-in': 'in-range',
    'action:attack': 'in-range',
    'action:defend': 'in-range',
    'action:attack-cq': 'close-quarters',
    'action:defend-cq': 'close-quarters',
    'action:disarm': 'in-range',
    'action:cast': 'in-range',
    'action:keep-away': 'in-range',
    "action:disengage": 'close-quarters',
    'action:keep-close': 'close-quarters',
    'action:attack-range': 'out-of-range',
    'action:defend-range': 'out-of-range',
    'action:step-in': 'out-of-range',
    'action:step-out': 'in-range'
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