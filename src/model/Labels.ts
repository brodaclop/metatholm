import type { Ability } from "./Abilities";
import type { ActionRoll, ActionVariant } from "./Action";
import type { Background } from "./Background";
import type { ExpressionNames, RuleLabels } from "./Rules";
import type { Skill, SkillType } from "./Skills";
import type { Species } from "./Species";
import type { Spell } from "./Spell";

type GenericLabels = 'label:name' |
    'label:weapon' |
    'label:learn' |
    'label:edit' |
    'label:delete' |
    'label:new' |
    'label:create_character' |
    'label:character' |
    'label:species' |
    'label:background' |
    'label:skill' |
    'label:difficulty' |
    'label:ability' |
    'label:type' |
    'label:rule' |
    'label:dice_roller' |
    'label:average' |
    'label:at_least' |
    'label:exactly' |
    'label:roll' |
    'label:skill_check_success_probabilities'
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

] as const;

export type LabelCollection = Record<Values, string>;

export type Values = typeof Keys[number] | Skill | Ability | ExpressionNames;

type Valueless = Background | ActionVariant | ActionRoll | Species | Spell | SkillType | GenericLabels | RuleLabels;

export type Labels = Valueless | Values;
export const Labels_en: Record<Labels, string> = {
    'ability:build': 'Build',
    'ability:presence': 'Presence',
    'ability:activity': 'Activity',
    'ability:magic': 'Magic',

    'action:title': 'Actions',
    'action:attack': 'Attack',
    'action:attack-cq': 'Attack (Close Quarters)',
    'action:disarm': 'Disarm',
    'action:ap': 'Action Points',
    'action:roll': 'Roll',
    'label:damage': 'Damage',
    'action:defend': 'Defend',
    'action:defend-cq': 'Defend (Close Quarters)',
    'action:cast': 'Cast',

    'label:name': 'Name',
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

    'background:bruiser': 'Bruiser',
    'background:sneak': 'Sneak',
    'background:hedge_wizard': 'Hedge Wizard',
    'background:tinker': 'Tinker',
    'background:assassin': 'Assassin',
    'background:vagabond': 'Vagabond',
    'background:charmer': 'Charmer',
    'background:witch': 'Witch',

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
    'label:character': 'Character',
    'label:create_character': 'Create Character',
    'label:species': 'Species',
    'label:background': 'Background',
    'label:skill': 'Skill',
    'label:difficulty': 'Difficulty',
    'label:ability': 'Ability',
    'label:type': 'Type',
    'label:rule': 'Rule',
    'label:dice_roller': 'Dice Roller',
    'label:average': 'Average',
    'label:at_least': 'Result is at Least...',
    'label:exactly': 'Result is exactly...',
    'label:roll': 'Roll',
    'label:skill_check_success_probabilities': 'Skill check success probabilities',

    'rule:skills': 'Skills',
    'rule:exploding_dice': 'Exploding dice',

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
    'species:gnome': 'Gnome',
    'species:dwarf': 'Dwarf',

    'spell:fire_bolt': 'Fire Bolt',
    'spell:lightning_strike': 'Lightning Strike',

    'weapon:speed': 'Speed',
    'weapon:difficulty': 'Difficulty',
    'weapon:skill': 'Skill',
    'weapon:attack': 'Attack',
    'weapon:defence': 'Defence',
    'weapon:reach': 'Reach',

};

export const Labels_hu: Record<Labels, string> = {
    'ability:build': 'Testalkat',
    'ability:presence': 'Jelenlét',
    'ability:activity': 'Aktivitás',
    'ability:magic': 'Mágia',

    'action:title': 'Akciók',
    'action:attack': 'Támadás',
    'action:attack-cq': 'Támadás (Belharc)',
    'action:ap': 'Akció pont',
    'action:roll': 'Dobás',
    'label:damage': 'Sebzés',
    'action:cast': 'Varázslás',

    'action:disarm': 'Lefegyverzés',
    'action:defend': 'Védekezés',
    'action:defend-cq': 'Védekezés (Belharc)',

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
    'character:weapons': 'Fegyverek',

    'background:bruiser': 'Balhés',
    'background:sneak': 'Sunyi',
    'background:hedge_wizard': 'Sufnimágus',
    'background:tinker': 'Ezermester',
    'background:assassin': 'Orgyilkos',
    'background:vagabond': 'Kóborló',
    'background:charmer': 'Bájgúnár',
    'background:witch': 'Vajákos',

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
    'label:character': 'Karakter',
    'label:create_character': 'Új karakter',
    'label:species': 'Faj',
    'label:background': 'Háttér',
    'label:skill': 'Képzettség',
    'label:difficulty': 'Nehézség',
    'label:ability': 'Tulajdonság',
    'label:type': 'Típus',
    'label:dice_roller': 'Kocka Szimulátor',
    'label:average': 'Átlag',
    'label:at_least': 'Az eredmény legalább...',
    'label:exactly': 'Az eredmény pontosan...',
    'label:roll': 'Dobás',
    'label:skill_check_success_probabilities': 'Sikeres képzettségpróba esélye',

    'label:weapon': 'Fegyver',
    'label:rule': 'Szabály',

    'rule:skills': 'Képzettségek',
    'rule:exploding_dice': 'Robbantott kockadobás',

    'species:elf': 'Elf',
    'species:orc': 'Ork',
    'species:gnome': 'Gnóm',
    'species:dwarf': 'Törp',

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
};

export const convertToDescription = <T extends string>(ob: Record<T, string>): Record<string, string> => Object.fromEntries(Object.entries(ob).map(([key, value]) => ([`description:${key}`, value as string])));

export type Language = 'en' | 'hu';


