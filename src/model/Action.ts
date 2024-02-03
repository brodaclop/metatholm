import type { EvalExpression, Expression } from "../logic/Expression";
import type { Spell } from "./Spell";
import type { Weapon } from "./Weapon";

export type ActionVariant =
    | 'action:attack'
    | 'action:disarm'
    | 'action:defend'
    | 'action:cast'
    | 'action:cast-slow'
    | 'action:cast-snap'
    | 'action:attack-cq'
    | 'action:defend-cq'
    | 'action:keep-away'
    | 'action:close-in'
    | 'action:disengage'
    | 'action:keep-close'
    | 'action:attack-range'
    | 'action:defend-range'
    | 'action:step-in'
    | 'action:step-out'
    | 'action:do-nothing';

export type ActionRoll = 'action:ap' | 'action:roll' | 'label:damage';

export type ActionRange = 'out-of-range' | 'in-range' | 'close-quarters';

export const RANGE_ORDER: Array<ActionRange | 'any-range'> = ['close-quarters', 'in-range', 'out-of-range', 'any-range'];

export type ActionType = 'action' | 'reaction';

export interface ActionVariantProperties {
    type: ActionType;
    reactionTo?: Array<ActionVariant>;
    weapon: boolean;
    range?: ActionRange;
}

export const ACTION_VARIANT_PROPERTIES: Record<ActionVariant, ActionVariantProperties> = {
    'action:close-in': {
        type: 'action',
        weapon: true,
        range: 'in-range'
    },
    'action:attack': {
        type: 'action',
        weapon: true,
        range: 'in-range'
    },
    'action:attack-cq': {
        type: 'action',
        weapon: true,
        range: 'close-quarters'
    },
    'action:attack-range': {
        type: 'action',
        weapon: true,
        range: 'out-of-range'
    },
    'action:disengage': {
        type: 'action',
        weapon: true,
        range: 'close-quarters'
    },
    'action:step-in': {
        type: 'action',
        weapon: true,
        range: 'out-of-range'
    },
    'action:step-out': {
        type: 'action',
        weapon: true,
        range: 'in-range'
    },
    'action:disarm': {
        type: 'action',
        weapon: true,
        range: 'close-quarters'
    },
    'action:defend': {
        type: 'reaction',
        weapon: true,
        range: 'in-range',
        reactionTo: ['action:attack']
    },
    'action:defend-cq': {
        type: 'reaction',
        weapon: true,
        range: 'close-quarters',
        reactionTo: ['action:attack-cq']
    },
    'action:defend-range': {
        type: 'reaction',
        weapon: true,
        range: 'out-of-range',
        reactionTo: ['action:attack-range']
    },
    'action:keep-close': {
        type: 'reaction',
        weapon: true,
        range: 'close-quarters',
        reactionTo: ['action:disengage']
    },
    'action:keep-away': {
        type: 'reaction',
        weapon: true,
        range: 'in-range',
        reactionTo: ['action:close-in']
    },
    'action:cast': {
        type: 'action',
        weapon: false,
    },
    'action:cast-slow': {
        type: 'action',
        weapon: false,
    },
    'action:cast-snap': {
        type: 'action',
        weapon: false,
    },
    'action:do-nothing': {
        type: 'reaction',
        weapon: false
    }
};

export const MOVES_ACTION: Action = {
    name: 'action:move',
    variants: [
        {
            name: 'action:step-in',
            rolls: [
                {
                    name: 'action:ap',
                    roll: 0
                }
            ]
        },
        {
            name: 'action:step-out',
            rolls: [
                {
                    name: 'action:ap',
                    roll: 0
                }
            ]
        },
        {
            name: 'action:do-nothing',
            rolls: [
                {
                    name: 'action:roll',
                    roll: 0,
                    rollString: '0'
                }
            ]
        }
    ]
};


export interface ActionVariantInfo {
    name: ActionVariant,
    rolls: Array<Roll>,
}

export interface Action {
    name: string;
    weapon?: Weapon;
    spell?: Spell;
    variants: Array<ActionVariantInfo>;
}

export interface Roll {
    name: ActionRoll;
    roll: Expression | EvalExpression;
    rollString?: string;
}