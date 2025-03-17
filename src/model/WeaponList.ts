import type { UnarmedSkills } from './Skills';
import type { Weapon } from './Weapon';

export type WeaponListEntry = Pick<Weapon, 'actions' | 'skill' | 'hands' | 'reach'> & { name: { en: string, hu: string } };

export const UNARMED_ACTIONS: Record<typeof UnarmedSkills[number], Weapon['actions']> = {
    'skill:brawling': {
        'action:attack-cq': 1,
        'action:defend-cq': 0,
        'action:close-in': -2,
        'action:disengage': -2,
        'action:keep-close': 1,
        'action:trip': -3,
        'action:spin-behind': -1,
        'action:knockout': -5,
    },
    'skill:fistfighting': {
        'action:attack-cq': 1,
        'action:defend-cq': 0,
        'action:close-in': -1,
        'action:disengage': -1,
        'action:keep-close': 0,
        'action:trip': -5,
        'action:spin-behind': -3,
        'action:knockout': -1,
    },
    'skill:martial_arts': {
        'action:attack-cq': 1,
        'action:defend-cq': 0,
        'action:defend': -1,
        'action:defend-range': -2,
        'action:close-in': 0,
        'action:disengage': 2,
        'action:keep-close': 0,
        'action:trip': -1,
        'action:spin-behind': -3,
        'action:knockout': -5,
    }

}

export const WEAPON_LIST: Array<
    WeaponListEntry
> = [
        {
            name: {
                en: 'Simple dagger',
                hu: 'Egyszerű tőr'
            },
            hands: 0.5,
            reach: 1,
            skill: 'skill:knives',
            actions: {
                'action:attack-cq': 0,
                'action:close-in': -2,
                'action:defend-cq': -1,
                'action:defend': -3,
                'action:disengage': 0,
                'action:keep-close': 0,
                'action:attack-range': -4,
                'action:knockout': -2
            }
        },
        {
            name: {
                en: 'Quillon dagger',
                hu: 'Keresztvasas tőr'
            },
            hands: 0.5,
            reach: 1,
            skill: 'skill:knives',
            actions: {
                'action:attack-cq': 0,
                'action:close-in': -1,
                'action:defend-cq': 0,
                'action:defend': -2,
                'action:disengage': 0,
                'action:keep-close': 0,
                'action:attack-range': -4,
            }
        },
        {
            name: {
                en: 'Parrying dagger',
                hu: 'Hárítótőr'
            },
            hands: 0.5,
            reach: 1,
            skill: 'skill:shields',
            actions: {
                'action:attack-cq': -2,
                'action:close-in': -1,
                'action:defend-cq': -1,
                'action:defend': 0,
                'action:disengage': -1,
                'action:keep-close': -1,
                'action:attack-range': -6,
            }
        },
        {
            name: {
                en: 'Throwing Knife',
                hu: 'Dobótőr'
            },
            hands: 0.5,
            reach: 1,
            skill: 'skill:knives',
            actions: {
                'action:attack-cq': -2,
                'action:close-in': -3,
                'action:defend-cq': -3,
                'action:defend': -4,
                'action:attack-range': 0,
            }
        },
        {
            name: {
                en: 'One-handed mace',
                hu: 'Egykezes buzogány'
            },
            hands: 1,
            reach: 3,
            skill: 'skill:maces',
            actions: {
                'action:attack': 0,
                'action:attack-cq': -1,
                'action:close-in': -2,
                'action:defend-cq': -2,
                'action:defend-range': -4,
                'action:defend': -1,
                'action:keep-away': -1,
                'action:disengage': -2,
                'action:keep-close': -2,
                'action:attack-range': -5,
                'action:knockout': -1
            }
        },
        {
            name: {
                en: 'Arming sword',
                hu: 'Lovagkard'
            },
            hands: 1,
            reach: 3,
            skill: 'skill:swords',
            actions: {
                'action:attack': 0,
                'action:attack-cq': -1,
                'action:defend-range': -2,
                'action:close-in': -1,
                'action:defend-cq': -2,
                'action:defend': 0,
                'action:keep-away': -1,
                'action:disengage': -1,
                'action:keep-close': -2,
                'action:attack-range': -6,
            }
        },
        {
            name: {
                en: 'Longsword',
                hu: 'Hosszúkard'
            },
            hands: 2,
            reach: 5,
            skill: 'skill:swords',
            actions: {
                'action:attack': 0,
                'action:attack-cq': -2,
                'action:close-in': 0,
                'action:defend-cq': -3,
                'action:defend-range': -4,
                'action:defend': 0,
                'action:keep-away': 0,
                'action:disengage': -2,
                'action:keep-close': -3,
                'action:attack-range': -7,
                'action:trip': -2,
                'action:spin-behind': -1,
                'action:knockout': -4
            }
        },
        {
            name: {
                en: 'Zweihänder',
                hu: 'Kétkezes kard'
            },
            hands: 2,
            reach: 7,
            skill: 'skill:swords',
            actions: {
                'action:attack': 0,
                'action:attack-cq': -3,
                'action:close-in': 0,
                'action:defend-cq': -5,
                'action:defend': -2,
                'action:keep-away': 2,
                'action:disengage': -3,
                'action:keep-close': -4,
                'action:attack-range': -8,
                'action:trip': 0,
                'action:spin-behind': -2
            }
        },
        {
            name: {
                en: 'Spear',
                hu: 'Lándzsa'
            },
            hands: 2,
            reach: 8,
            skill: 'skill:polearms',
            actions: {
                'action:attack': 0,
                'action:attack-cq': -2,
                'action:close-in': 0,
                'action:defend-cq': -3,
                'action:defend': -2,
                'action:keep-away': 1,
                'action:disengage': -3,
                'action:keep-close': -4,
                'action:attack-range': -2,
            }
        },
    ];
