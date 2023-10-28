import type { EvalExpression, Expression } from "../logic/Expression";

export type ActionVariant = 'action:attack' | 'action:disarm' | 'action:defend' | 'action:cast' | 'action:attack-cq' | 'action:defend-cq' | 'action:keep-away' | 'action:close-in' | 'action:disengage' | 'action:keep-close' | 'action:attack-range' | 'action:defend-range' | 'action:step-in' | 'action:step-out';
export type ActionRoll = 'action:ap' | 'action:roll' | 'label:damage';

export type ActionDistance = 'out-of-range' | 'in-range' | 'close-quarters';

export type ActionType = 'initial' | 'reaction';

export interface ActionVariantProperties {
    type: ActionType;
    reactionTo?: Array<ActionVariant>;
    weapon: boolean;
    distance: ActionDistance;
}

export const ACTION_VARIANT_PROPERTIES: Record<ActionVariant, ActionVariantProperties> = {
    'action:close-in': {
        type: 'initial',
        weapon: true,
        distance: 'in-range'
    },
    'action:attack': {
        type: 'initial',
        weapon: true,
        distance: 'in-range'
    },
    'action:attack-cq': {
        type: 'initial',
        weapon: true,
        distance: 'close-quarters'
    },
    'action:attack-range': {
        type: 'initial',
        weapon: true,
        distance: 'out-of-range'
    },
    'action:disengage': {
        type: 'initial',
        weapon: true,
        distance: 'close-quarters'
    },
    'action:step-in': {
        type: 'initial',
        weapon: true,
        distance: 'out-of-range'
    },
    'action:step-out': {
        type: 'initial',
        weapon: true,
        distance: 'in-range'
    },
    'action:disarm': {
        type: 'initial',
        weapon: true,
        distance: 'close-quarters'
    },
    'action:defend': {
        type: 'reaction',
        weapon: true,
        distance: 'in-range',
        reactionTo: ['action:attack']
    },
    'action:defend-cq': {
        type: 'reaction',
        weapon: true,
        distance: 'close-quarters',
        reactionTo: ['action:attack-cq']
    },
    'action:defend-range': {
        type: 'reaction',
        weapon: true,
        distance: 'out-of-range',
        reactionTo: ['action:attack-range']
    },
    'action:keep-close': {
        type: 'reaction',
        weapon: true,
        distance: 'close-quarters',
        reactionTo: ['action:disengage']
    },
    'action:keep-away': {
        type: 'reaction',
        weapon: true,
        distance: 'in-range',
        reactionTo: ['action:close-in']
    },
    'action:cast': {
        type: 'initial',
        weapon: false,
        distance: 'in-range'
    },
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