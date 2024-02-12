import type { Weapon } from "./Weapon";


export const WEAPON_LIST = [
    {
        name: 'Bollock dagger',
        attack: 4,
        damage: 3,
        defence: 1,
        hands: 0.5,
        reach: 1,
        skill: 'skill:knives',
        speed: 8,
        actions: {
            "action:attack-cq": 0,
            "action:close-in": -2,
            "action:defend-cq": 0,
            "action:defend": -3,
            "action:disengage": 0,
            "action:keep-close": 0,
            'action:attack-range': -4,
        }
    },
    {
        name: 'Quillon dagger',
        attack: 4,
        damage: 2,
        defence: 3,
        hands: 0.5,
        reach: 1,
        skill: 'skill:knives',
        speed: 8,
        actions: {
            "action:attack-cq": 0,
            "action:close-in": -1,
            "action:defend-cq": 0,
            "action:defend": -3,
            "action:disengage": 0,
            "action:keep-close": 0,
            'action:attack-range': -4,
        }
    },
    {
        name: 'Baselard',
        attack: 5,
        damage: 3,
        defence: 4,
        hands: 0.5,
        reach: 1,
        skill: 'skill:knives',
        speed: 7,
        actions: {
            "action:attack-cq": 0,
            "action:close-in": -1,
            "action:defend-cq": 0,
            "action:defend": -3,
            "action:disengage": 0,
            "action:keep-close": 0,
            'action:attack-range': -4,
        }
    },
    {
        name: 'Throwing Knife',
        attack: 5,
        damage: 3,
        defence: 1,
        hands: 0.5,
        reach: 1,
        skill: 'skill:knives',
        speed: 6,
        actions: {
            "action:attack-cq": -2,
            "action:close-in": -3,
            "action:defend-cq": -3,
            "action:defend": -4,
            'action:attack-range': 0,
        }
    },
    {
        name: 'Mace',
        attack: 6,
        damage: 4,
        defence: 1,
        hands: 1,
        reach: 2,
        skill: 'skill:maces',
        speed: 4,
        actions: {
            "action:attack": 0,
            "action:attack-cq": -1,
            "action:close-in": -2,
            "action:defend-cq": -2,
            "action:defend": 0,
            "action:keep-away": -1,
            "action:disengage": -1,
            "action:keep-close": -1,
            'action:attack-range': -4,
        }
    },
] as const;

export const WEAPON_NAMES_LIST: Record<typeof WEAPON_LIST[number]['name'], { en: string, hu: string }> = {
    'Bollock dagger': {
        en: 'Bollock dagger',
        hu: 'Heretőr'
    },
    'Baselard': {
        en: 'Baselard',
        hu: 'Bazelárd'
    },
    'Mace': {
        en: 'Mace',
        hu: 'Buzogány'
    },
    "Quillon dagger": {
        en: 'Quillon dagger',
        hu: 'Keresztvasas tőr'
    },
    "Throwing Knife": {
        en: 'Throwing knife',
        hu: 'Dobótőr'
    }
} as const;
