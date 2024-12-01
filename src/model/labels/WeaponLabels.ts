import type { Language } from "./Labels";

export const WeaponKeys = [
    'weapon:speed',
    'weapon:difficulty',
    'weapon:skill',
    'weapon:reach',
    'weapon:attack',
    'weapon:defence',
    'weapon:hands',
    'weapon:damage',
    'weapon:power',
    'weapon:skill_modifier',

    'weapon:difficulty:1',
    'weapon:difficulty:2',
    'weapon:difficulty:3',

    'weapon:speed:abbr',
    'weapon:attack:abbr',
    'weapon:defence:abbr',
    'weapon:damage:abbr',
    'weapon:reach:abbr',
    'weapon:skill:abbr',
    'weapon:hands:abbr',

    'weapon:base_values',
    'weapon:effective_skill'
];

export const WeaponLabels: Record<Language, Record<typeof WeaponKeys[number], string>> = {
    en: {
        'weapon:speed': 'Speed',
        'weapon:speed:abbr': 'Spd',
        'weapon:difficulty': 'Difficulty',
        'weapon:skill': 'Skill',
        'weapon:skill:abbr': 'Skl',
        'weapon:effective_skill': 'Effective Skill',
        'weapon:attack': 'Attack',
        'weapon:power': 'Overall Power',
        'weapon:skill_modifier': 'Skill level modifier',
        'weapon:attack:abbr': 'Atk',
        'weapon:defence': 'Defence',
        'weapon:defence:abbr': 'Def',
        'weapon:hands': 'Hands',
        'weapon:hands:abbr': 'Hands',
        'weapon:reach': 'Reach',
        'weapon:reach:abbr': 'Rch',
        'weapon:damage': 'Damage',
        'weapon:damage:abbr': 'Dmg',
        'weapon:base_values': 'Base Values',
        'weapon:difficulty:1': 'Easy',
        'weapon:difficulty:2': 'Average',
        'weapon:difficulty:3': 'Hard',



    },
    hu: {
        'weapon:speed': 'Gyorsaság',
        'weapon:speed:abbr': 'Gyors.',
        'weapon:difficulty': 'Nehézség',
        'weapon:skill': 'Képzettség',
        'weapon:skill:abbr': 'Képz.',
        'weapon:effective_skill': 'Hatásos Képzettség',
        'weapon:attack': 'Támadás',
        'weapon:power': 'Összesített erő',
        'weapon:attack:abbr': 'Tám.',
        'weapon:hands': 'Kéz',
        'weapon:hands:abbr': 'Kéz',
        'weapon:defence': 'Védekezés',
        'weapon:defence:abbr': 'Véd.',
        'weapon:reach': 'Ütőtáv',
        'weapon:reach:abbr': 'Üt.',
        'weapon:skill_modifier': 'Képzettség módosító',
        'weapon:damage': 'Sebzés',
        'weapon:damage:abbr': 'Sebz.',
        'weapon:base_values': 'Alapértékek',
        'weapon:difficulty:1': 'Könnyű',
        'weapon:difficulty:2': 'Átlagos',
        'weapon:difficulty:3': 'Nehéz',

    }
}

