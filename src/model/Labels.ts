import type { Ability } from "./Abilities";
import type { ActionRoll, ActionVariant } from "./Action";
import type { CharacterClass } from "./CharacterClass";
import type { ExpressionNames } from "./Rules";
import type { Skill, SkillType } from "./Skills";
import type { Species } from "./Species";
import type { Spell } from "./Spell";

type GenericLabels = 'label:name' |
    'label:weapon' |
    'label:learn' |
    'label:edit' |
    'label:delete' |
    'label:new'
    ;

export const Keys = [
    'action:title',
    'character:level',
    'character:abilities',
    'character:skills',
    'character:info',
    'character:points',
    'character:ep',
    'character:fp',
    'character:mp',
    'character:kp',
    'character:class',
    'character:weapons',

    'weapon:speed',
    'weapon:difficulty',
    'weapon:skill',
    'weapon:reach',
    'weapon:attack',
    'weapon:defence',

    'label:difficulty:1',
    'label:difficulty:2',
    'label:difficulty:3',

    'weapons:brawling'
] as const;

export type LabelCollection = Record<Values, string>;

export type Values = typeof Keys[number] | Skill | Ability | ExpressionNames;

type Valueless = CharacterClass | ActionVariant | ActionRoll | Species | Spell | SkillType | GenericLabels;

export type Labels = Valueless | Values;
export const Labels_en: Record<Labels, string> = {
    'ability:build': 'Build',
    'ability:presence': 'Presence',
    'ability:activity': 'Activity',
    'ability:magic': 'Magic',

    'action:title': 'Actions',
    'action:attack': 'Attack',
    'action:disarm': 'Disarm',
    'action:ap': 'Action Points',
    'action:roll': 'Roll',
    'label:damage': 'Damage',
    'action:defence': 'Defence',
    'action:cast': 'Cast',

    'label:name': 'Name',
    'character:class': 'Class',
    'character:abilities': 'Abilities',
    'character:skills': 'Skills',
    'character:info': 'Info',
    'character:points': 'Points',
    'character:level': 'Level',
    'character:fp': 'Pain tolerance',
    'character:ep': 'Life force',
    'character:mp': 'Magic Power',
    'character:kp': 'Skill Points',
    'character:weapons': 'Weapons',

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
    'expr:effective_spell_skill': 'Effective Skill',
    'expr:spell_level': 'Spell Level',
    'expr:spell_focus_skill': 'Focus skill',
    'expr:spell_speed': 'Spell speed',
    'expr:skill_level': 'Skill level',
    'expr:skill_ability': 'Ability',
    'expr:skill_difficulty': 'Difficulty',

    'label:weapon': 'Weapon',
    'label:difficulty:1': 'Easy',
    'label:difficulty:2': 'Average',
    'label:difficulty:3': 'Hard',
    'label:learn': 'Learn',
    'label:edit': 'Edit',
    'label:delete': 'Delete',
    'label:new': 'New',
    'skill:endurance': 'Endurance',
    'skill:pain_threshold': 'Pain Threshold',
    'skill:brawling': 'Brawling',
    'skill:knives': 'Knives',
    'skill:strength': 'Strength',
    'skill:magic_force': 'Magic Force',
    'skill:focus_elemental': 'Elemental Focus',
    'skill:climbing': 'Climbing',
    'skill:maces': 'Maces',
    'skill:polearms': 'Polearms',
    'skill:stalking': 'Stalking',
    'skill:fistfighting': 'Fistfighting',
    'skill:jumping': 'Jumping',
    'skill:sprinting': 'Sprinting',
    'skill:throwing': 'Throwing Weapons',
    'skill:reactions': 'Reactions',
    'skill:martial_arts': 'Martial Arts',
    'skill:alchemy': 'Alchemy',
    'skill:bows': 'Bows',
    'skill:crossbows': 'Crossbows',
    'skill:swords': 'Swords',
    'skill:balance': 'Balance',
    'skill:medicine': 'Medicine',
    'skill:personal_charm': 'Personal Charm',
    'skill:spot_hidden': 'Spot Hidden',
    'skill:bamboozling': 'Bamboozling',
    'skill:reasoning': 'Reasoning',
    'skill:hiding': 'Hiding',
    'skill:camouflage': 'Camouflage',
    'skill:bushcraft': 'Bushcraft',
    'skill:enchantment': 'Enchantment',
    'skill:magic_resistance': 'Magic Resistance',
    'skill:body_focus': 'Body Focus',
    'skill:life_focus': 'Life Focus',
    'skill:spacetime_focus': 'Spacetime Focus',
    'skill:nature_focus': 'Nature Focus',
    'skill:spirit_focus': 'Spirit Focus',
    'skill:shadow_focus': 'Shadow Focus',
    'skill:history': 'History',
    'skill:geography': 'Geography',
    'skill:architecture': 'Architecture',
    'skill:law': 'Law',
    'skill:etiquette': 'Etiquette',

    'skill_type:basic': 'Basic',
    'skill_type:combat': 'Combat',
    'skill_type:focus': 'Focus',
    'skill_type:movement': 'Movement',
    'skill_type:knowledge': 'Knowledge',
    'skill_type:general': 'General',

    'species:elf': 'Elf',
    'species:orc': 'Orc',

    'spell:fire_bolt': 'Fire Bolt',
    'spell:lightning_strike': 'Lightning Strike',

    'weapon:speed': 'Speed',
    'weapon:difficulty': 'Difficulty',
    'weapon:skill': 'Skill',
    'weapon:attack': 'Attack',
    'weapon:defence': 'Defence',
    'weapon:reach': 'Reach',

    'weapons:brawling': 'Brawling',

};

export const Labels_hu: Record<Labels, string> = {
    'ability:build': 'Testalkat',
    'ability:presence': 'Jelenlét',
    'ability:activity': 'Aktivitás',
    'ability:magic': 'Mágia',

    'action:title': 'Akciók',
    'action:attack': 'Támadás',
    'action:ap': 'Akció pont',
    'action:roll': 'Dobás',
    'label:damage': 'Sebzés',
    'action:cast': 'Varázslás',

    'action:disarm': 'Lefegyverzés',
    'action:defence': 'Védekezés',

    'label:name': 'Név',
    'character:abilities': 'Tulajdonságok',
    'character:skills': 'Képzettségek',
    'character:info': 'Adatok',
    'character:points': 'Pontok',
    'character:level': 'Szint',
    'character:fp': 'Fájdalomtűrés',
    'character:ep': 'Életerő',
    'character:mp': 'Mágia Kapacitás',
    'character:kp': 'Képzettség Pont',
    'character:class': 'Kaszt',
    'character:weapons': 'Fegyverek',

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
    'expr:effective_spell_skill': 'Hatásos Képzettség',
    'expr:spell_level': 'Varázslat Szintje',
    'expr:spell_focus_skill': 'Fókusz képzettség',
    'expr:spell_speed': 'Varázslat sebessége',
    'expr:skill_level': 'Képzettség szintje',
    'expr:skill_ability': 'Tulajdonság',
    'expr:skill_difficulty': 'Nehézség',

    'label:difficulty:1': 'Könnyű',
    'label:difficulty:2': 'Átlagos',
    'label:difficulty:3': 'Nehéz',
    'label:learn': 'Tanulás',
    'label:edit': 'Szerkeszt',
    'label:delete': 'Töröl',
    'label:new': 'Új',


    'label:weapon': 'Fegyver',

    'species:elf': 'Elf',
    'species:orc': 'Ork',

    'spell:fire_bolt': 'Tűznyíl',
    'spell:lightning_strike': 'Lightning Strike',

    'skill:endurance': 'Állóképesség',
    'skill:pain_threshold': 'Fájdalomküszöb',
    'skill:brawling': 'Bunyó',
    'skill:knives': 'Kés',
    'skill:strength': 'Erő',
    'skill:magic_force': 'Mágikus erő',
    'skill:focus_elemental': 'Elemi fókusz',
    'skill:climbing': 'Mászás',
    'skill:maces': 'Buzogány',
    'skill:polearms': 'Szálfegyver',
    'skill:stalking': 'Lopakodás',
    'skill:fistfighting': 'Öklözés',
    'skill:jumping': 'Ugrás',
    'skill:sprinting': 'Sprint',
    'skill:throwing': 'Dobófegyver',
    'skill:reactions': 'Reflex',
    'skill:martial_arts': 'Harcművészet',
    'skill:alchemy': 'Alkímia',
    'skill:bows': 'Íjászat',
    'skill:crossbows': 'Számszeríj',
    'skill:swords': 'Kard',
    'skill:balance': 'Egyensúly',
    'skill:medicine': 'Orvoslás',
    'skill:personal_charm': 'Személyes varázs',
    'skill:spot_hidden': 'Rejtett dolgok felfedezése',
    'skill:bamboozling': 'Szemfényvesztés',
    'skill:reasoning': 'Érvelés',
    'skill:hiding': 'Rejtőzés',
    'skill:camouflage': 'Álcázás',
    'skill:bushcraft': 'Túlélés',
    'skill:enchantment': 'Bájolás',
    'skill:magic_resistance': 'Mágiaellenállás',
    'skill:body_focus': 'Testi fókusz',
    'skill:life_focus': 'Élet fókusz',
    'skill:spacetime_focus': 'Téridő fókusz',
    'skill:nature_focus': 'Természet fókusz',
    'skill:spirit_focus': 'Szellem fókusz',
    'skill:shadow_focus': 'Árnyék fókusz',
    'skill:history': 'Történelem',
    'skill:geography': 'Földrajz',
    'skill:architecture': 'Építészet',
    'skill:law': 'Jog',
    'skill:etiquette': 'Etikett',


    'skill_type:basic': 'Alap',
    'skill_type:combat': 'Harci',
    'skill_type:focus': 'Fókusz',
    'skill_type:movement': 'Mozgás',
    'skill_type:knowledge': 'Tudás',
    'skill_type:general': 'Általános',




    'weapon:speed': 'Sebesség',
    'weapon:difficulty': 'Nehézség',
    'weapon:skill': 'Képzettség',
    'weapon:attack': 'Támadás',
    'weapon:defence': 'Védekezés',
    'weapon:reach': 'Ütőtáv',
    'weapons:brawling': 'Bunyó',

};

export type Language = 'en' | 'hu';


