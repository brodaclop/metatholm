export const Keys = [
    'expr:pp_base',
    'expr:pp_per_level',
    'expr:pp_total',
    'expr:pp_roll',
    'skill:endurance',
    'skill:pain_tolerance',
    'ability:build',
    'ability:presence',
    'character:level'
] as const;

export type LabelCollection = Record<typeof Keys[number], string>;

export const Labels_en: Record<typeof Keys[number], string> = {
    'expr:pp_base': 'Pain Point Base',
    'expr:pp_per_level': 'Level Pain Point',
    'expr:pp_total': 'Pain Point Total',
    'skill:endurance': 'Endurance',
    'skill:pain_tolerance': 'Pain Tolerance',
    'ability:build': 'Build',
    'ability:presence': 'Presence',
    'expr:pp_roll': 'Pain Point Roll',
    'character:level': 'Level'
}

export const Labels_hu: Record<typeof Keys[number], string> = {
    'expr:pp_base': 'Fájdalomtűrés Pont Alap',
    'expr:pp_per_level': 'Szintenkénti Fájdalomtűrés Pont',
    'expr:pp_total': 'Fájdalomtűrés Pont',
    'expr:pp_roll': 'Fájdalomtűrés Pont Dobás',
    'skill:endurance': 'Állóképesség',
    'skill:pain_tolerance': 'Fájdalomtűrés',
    'ability:build': 'Testalkat',
    'ability:presence': 'Jelenlét',
    'character:level': 'Szint'
}

export type Language = 'en' | 'hu';


