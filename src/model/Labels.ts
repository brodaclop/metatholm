import type { Ability } from "./Abilities";
import type { CharacterClasses } from "./CharacterClass";
import type { Skill } from "./Skills";

export const ActionKeys = [
    'action:title',
    'action:ap',
    'action:roll',
    'action:damage',

    'action:disarm',
    'action:defence'
] as const;


export const Keys = [
    ...ActionKeys,
    'character:level',
    'character:abilities',
    'character:skills',
    'character:info',
    'character:name',
    'character:points',
    'character:ep',
    'character:fp',
    'character:mp',
    'character:class',

    'expr:pp_base',
    'expr:pp_per_level',
    'expr:pp_total',
    'expr:pp_roll',

    'spell:effective_skill',
    'spell:level',
    'spell:focus_skill',
    'spell:fire_bolt',

    'weapon:ap',
    'weapon:difficulty',
    'weapon:skill',
    'weapon:attack',
    'weapon:defence',

    'weapons:brawling'
] as const;

export type LabelCollection = Record<Values, string>;

export type Values = typeof Keys[number] | Skill | Ability;

type Labels = CharacterClasses;
export const Labels_en: Record<Labels | Values, string> = {
    'ability:build': 'Build',
    'ability:presence': 'Presence',
    'ability:activity': 'Activity',
    'ability:magic': 'Magic',

    'action:title': 'Actions',
    'action:disarm': 'Disarm',
    'action:ap': 'Action Points',
    'action:roll': 'Roll',
    'action:damage': 'Damage',
    'action:defence': 'Defence',

    'character:name': 'Name',
    'character:class': 'Class',
    'character:abilities': 'Abilities',
    'character:skills': 'Skills',
    'character:info': 'Info',
    'character:points': 'Points',
    'character:level': 'Level',
    'character:fp': 'Pain tolerance',
    'character:ep': 'Life force',
    'character:mp': 'Magic Power',

    'class:bruiser': 'Bruiser',
    'class:sneak': 'Sneak',
    'class:hedge_wizard': 'Hedge Wizard',
    'class:tinker': 'Tinker',
    'class:assassin': 'Assassin',
    'class:vagabond': 'Vagabond',
    'class:charmer': 'Charmer',
    'class:witch': 'Witch',

    'expr:pp_base': 'Pain Tolerance Base',
    'expr:pp_per_level': 'Level Pain Tolerance',
    'expr:pp_total': 'Pain Tolerance Total',
    'expr:pp_roll': 'Pain Tolerance Roll',

    'skill:endurance': 'Endurance',
    'skill:pain_threshold': 'Pain Threshold',
    'skill:brawling': 'Brawling',
    'skill:knives': 'Knives',
    'skill:strength': 'Strength',
    'skill:magic_force': 'Magic Force',
    'skill:focus_elemental': 'Elemental Focus',

    'spell:effective_skill': 'Effective Skill',
    'spell:level': 'Spell Level',
    'spell:focus_skill': 'Focus skill',
    'spell:fire_bolt': 'Fire Bolt',

    'weapon:ap': 'Weapon AP',
    'weapon:difficulty': 'Weapon Difficulty',
    'weapon:skill': 'Weapon Skill',
    'weapon:attack': 'Weapon Attack',
    'weapon:defence': 'Weapon Defence',

    'weapons:brawling': 'Brawling',

};

export const Labels_hu: Record<Labels | Values, string> = {
    'ability:build': 'Testalkat',
    'ability:presence': 'Jelenlét',
    'ability:activity': 'Aktivitás',
    'ability:magic': 'Mágia',

    'action:title': 'Akciók',
    'action:ap': 'Akció pont',
    'action:roll': 'Dobás',
    'action:damage': 'Sebzés',

    'action:disarm': 'Lefegyverzés',
    'action:defence': 'Védekezés',


    'character:name': 'Név',
    'character:abilities': 'Tulajdonságok',
    'character:skills': 'Képzettségek',
    'character:info': 'Adatok',
    'character:points': 'Pontok',
    'character:level': 'Szint',
    'character:fp': 'Fájdalomtűrés',
    'character:ep': 'Életerő',
    'character:mp': 'Mágia ???',
    'character:class': 'Kaszt',

    'class:bruiser': 'Balhés',
    'class:sneak': 'Sunyi',
    'class:hedge_wizard': 'Sufnimágus',
    'class:tinker': 'Ezermester',
    'class:assassin': 'Orgyilkos',
    'class:vagabond': 'Kóborló',
    'class:charmer': 'Bájgúnár',
    'class:witch': 'Vajákos',

    'expr:pp_base': 'Fájdalomtűrés Alap',
    'expr:pp_per_level': 'Szintenkénti Fájdalomtűrés',
    'expr:pp_total': 'Fájdalomtűrés',
    'expr:pp_roll': 'Fájdalomtűrés Dobás',

    'spell:effective_skill': 'Hatásos Képzettség',
    'spell:level': 'Varázslat Szintje',
    'spell:focus_skill': 'Fókusz képzettség',
    'spell:fire_bolt': 'Tűznyíl',

    'skill:endurance': 'Állóképesség',
    'skill:pain_threshold': 'Fájdalomküszöb',
    'skill:brawling': 'Bunyó',
    'skill:knives': 'Kés',
    'skill:strength': 'Erő',
    'skill:magic_force': 'Mágikus erő',
    'skill:focus_elemental': 'Elemi fókusz',

    'weapon:ap': 'Fegyver AP',
    'weapon:difficulty': 'Fegyver Nehézség',
    'weapon:skill': 'Fegyver képzettség',
    'weapon:attack': 'Fegyver támadó',
    'weapon:defence': 'Fegyver védő',
    'weapons:brawling': 'Bunyó',

};

export type Language = 'en' | 'hu';


