import type { Ability } from "./Abilities";
import type { ActionRoll, ActionVariant } from "./Action";
import type { Background } from "./Background";
import type { ExpressionNames, RuleLabels } from "./Rules";
import type { Skill, SkillType } from "./Skills";
import type { Ancestry } from "./Ancestry";
import type { Spell } from "./Spell";
import type { ArmourLabels } from "./Armour";

type GenericLabels = 'label:name' |
    'label:action' |
    'label:weapon' |
    'label:learn' |
    'label:edit' |
    'label:delete' |
    'label:new' |
    'label:create_character' |
    'label:character' |
    'character:skill' |
    'label:difficulty' |
    'label:type' |
    'label:rule' |
    'label:dice_roller' |
    'label:average' |
    'label:at_least' |
    'label:exactly' |
    'label:roll' |
    'label:wear' |
    'label:skill_check_success_probabilities' |
    'label:lore' |
    'label:close-quarters' |
    'label:in-range' |
    'label:out-of-range' |
    'label:any-range' |
    'label:range' |
    'label:counters' |
    'label:countered-by' |
    'label:reaction' |
    'label:armour' |
    'label:levelup' |
    'label:save' |
    'action:move' |
    'label:select-character' |
    'label:new-character' |
    'rule:combat'
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
    'character:armours',
    'character:ancestry',
    'character:background',
    'character:ability',

    'weapon:speed',
    'weapon:difficulty',
    'weapon:skill',
    'weapon:reach',
    'weapon:attack',
    'weapon:defence',
    'weapon:hands',

    'label:difficulty:1',
    'label:difficulty:2',
    'label:difficulty:3',

] as const;

export type LabelCollection = Record<Values, string>;

export type Values = typeof Keys[number] | Skill | Ability | ExpressionNames;

type Valueless = Background | ActionVariant | ActionRoll | Ancestry | Spell | SkillType | GenericLabels | RuleLabels | ArmourLabels;

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
    'action:keep-away': 'Keep away',
    'action:close-in': 'Close in',
    'action:disengage': 'Disengage',
    'action:keep-close': 'Keep close',
    'action:attack-range': 'Attack (Ranged)',
    'action:defend-range': 'Defend (Ranged)',
    'action:move': 'Movement',
    'action:step-in': 'Step In',
    'action:step-out': 'Step Out',
    'action:do-nothing': 'Do Nothing',

    'armour:dr': 'Damage Reduction',
    'armour:hindrance': 'Hindrance',

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
    'character:armours': 'Armours',
    'character:ancestry': 'Ancestry',

    'background:bruiser': 'Bruiser',
    'background:sneak': 'Sneak',
    'background:hedge_wizard': 'Hedge Wizard',
    'background:tinker': 'Tinker',
    'background:assassin': 'Assassin',
    'background:vagabond': 'Vagabond',
    'background:charmer': 'Charmer',
    'background:witch': 'Witch',

    'expr:fp_base': 'Pain Tolerance Base',
    'expr:fp_per_level': 'Level Pain Tolerance',
    'expr:fp_total': 'Pain Tolerance Total',
    'expr:fp_roll': 'Pain Tolerance Roll',
    'expr:effective_spell_skill': 'Effective Skill',
    'expr:spell_level': 'Spell Level',
    'expr:spell_focus_skill': 'Focus skill',
    'expr:spell_speed': 'Spell speed',
    'expr:skill_level': 'Skill level',
    'expr:skill_ability': 'Ability',
    'expr:skill_difficulty': 'Difficulty',

    'label:action': 'Action',
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
    'character:background': 'Background',
    'character:skill': 'Skill',
    'label:difficulty': 'Difficulty',
    'character:ability': 'Ability',
    'label:type': 'Type',
    'label:rule': 'Rule',
    'label:dice_roller': 'Dice Roller',
    'label:average': 'Average',
    'label:at_least': 'Result is at Least...',
    'label:exactly': 'Result is exactly...',
    'label:roll': 'Roll',
    'label:skill_check_success_probabilities': 'Skill check success probabilities',
    'label:lore': 'Lore',
    'label:close-quarters': 'Close Quarters',
    'label:in-range': 'In Measure',
    'label:out-of-range': 'Out Of Measure',
    'label:any-range': 'Any Range',
    'label:range': 'Range',
    'label:counters': 'Counters',
    'label:countered-by': 'Countered by',
    'label:reaction': 'Reaction',
    'label:armour': 'Armour',
    'label:wear': 'Wear',
    'label:levelup': 'Level Up',
    'label:save': 'Save',
    'label:select-character': 'Select character',
    'label:new-character': 'New character',

    'rule:skills': 'Skills',
    'rule:exploding_dice': 'Exploding dice',
    'rule:combat': 'Combat',

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
    'skill:shields': 'Shields',
    'skill:shadow_focus': 'Shadow Focus',
    'skill:history': 'History',
    'skill:geography': 'Geography',
    'skill:architecture': 'Architecture',
    'skill:law': 'Law',
    'skill:etiquette': 'Etiquette',
    'skill:swimming': 'Swimming',

    'skill_type:basic': 'Basic',
    'skill_type:combat': 'Combat',
    'skill_type:focus': 'Focus',
    'skill_type:movement': 'Movement',
    'skill_type:knowledge': 'Knowledge',

    'ancestry:elven': 'Elven',
    'ancestry:orcish': 'Orcish',
    'ancestry:gnomish': 'Gnomish',
    'ancestry:dwarvish': 'Dwarvish',
    'ancestry:almarem': 'Almarem',
    'ancestry:godora': 'Godora',
    'ancestry:ilar': 'Ilar',
    'ancestry:kalovin': 'Kalovin',

    'spell:fire_bolt': 'Fire Bolt',
    'spell:lightning_strike': 'Lightning Strike',

    'weapon:speed': 'Speed',
    'weapon:difficulty': 'Difficulty',
    'weapon:skill': 'Skill',
    'weapon:attack': 'Attack',
    'weapon:defence': 'Defence',
    'weapon:hands': 'Hands',
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
    'action:ap': 'Akciópont',
    'action:roll': 'Dobás',
    'label:damage': 'Sebzés',
    'action:cast': 'Varázslás',

    'action:disarm': 'Lefegyverzés',
    'action:defend': 'Védekezés',
    'action:defend-cq': 'Védekezés (Belharc)',
    'action:keep-away': 'Távoltartás',
    'action:close-in': 'Közelkerülés',
    'action:disengage': 'Eltávolodás',
    'action:keep-close': 'Közeltartás',
    'action:attack-range': 'Támadás (Távolról)',
    'action:defend-range': 'Védekezés (Távolról)',
    'action:move': 'Mozgás',
    'action:step-in': 'Belépés',
    'action:step-out': 'Kilépés',
    'action:do-nothing': 'Semmi',

    'armour:dr': 'Sebzéscsökkentés',
    'armour:hindrance': 'Akadály',

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
    'character:armours': 'Páncélok',
    'character:ancestry': 'Származás',
    'character:background': 'Háttér',
    'character:skill': 'Képzettség',
    'character:ability': 'Tulajdonság',

    'background:bruiser': 'Balhés',
    'background:sneak': 'Sunyi',
    'background:hedge_wizard': 'Sufnimágus',
    'background:tinker': 'Ezermester',
    'background:assassin': 'Orgyilkos',
    'background:vagabond': 'Kóborló',
    'background:charmer': 'Bájgúnár',
    'background:witch': 'Vajákos',

    'expr:fp_base': 'Fájdalomtűrés Alap',
    'expr:fp_per_level': 'Szintenkénti Fájdalomtűrés',
    'expr:fp_total': 'Fájdalomtűrés',
    'expr:fp_roll': 'Fájdalomtűrés Dobás',
    'expr:effective_spell_skill': 'Hatásos Képzettség',
    'expr:spell_level': 'Varázslat Szintje',
    'expr:spell_focus_skill': 'Fókusz képzettség',
    'expr:spell_speed': 'Varázslat sebessége',
    'expr:skill_level': 'Képzettség szintje',
    'expr:skill_ability': 'Tulajdonság',
    'expr:skill_difficulty': 'Nehézség',

    'label:action': 'Akció',
    'label:difficulty:1': 'Könnyű',
    'label:difficulty:2': 'Átlagos',
    'label:difficulty:3': 'Nehéz',
    'label:learn': 'Tanulás',
    'label:edit': 'Szerkeszt',
    'label:delete': 'Töröl',
    'label:new': 'Új',
    'label:character': 'Karakter',
    'label:create_character': 'Új karakter',
    'label:difficulty': 'Nehézség',
    'label:type': 'Típus',
    'label:dice_roller': 'Kocka Szimulátor',
    'label:average': 'Átlag',
    'label:at_least': 'Az eredmény legalább...',
    'label:exactly': 'Az eredmény pontosan...',
    'label:roll': 'Dobás',
    'label:skill_check_success_probabilities': 'Sikeres képzettségpróba esélye',
    'label:lore': 'Kódex',
    'label:close-quarters': 'Belharc',
    'label:in-range': 'Közelharc',
    'label:out-of-range': 'Távol',
    'label:any-range': 'Bármely távolság',
    'label:range': 'Távolság',
    'label:counters': 'Ennek ál ellen',
    'label:countered-by': 'Ez ál ellen neki',
    'label:reaction': 'Reakció',
    'label:armour': 'Páncél',
    'label:wear': 'Visel',
    'label:levelup': 'Szintlépés',
    'label:save': 'Mentés',
    'label:select-character': 'Válassz karaktert',
    'label:new-character': 'Új karakter',

    'label:weapon': 'Fegyver',
    'label:rule': 'Szabály',

    'rule:skills': 'Képzettségek',
    'rule:exploding_dice': 'Robbantott kockadobás',
    'rule:combat': 'Harc',

    'ancestry:elven': 'Elf',
    'ancestry:orcish': 'Ork',
    'ancestry:gnomish': 'Gnóm',
    'ancestry:dwarvish': 'Törp',
    'ancestry:almarem': 'Almarem',
    'ancestry:godora': 'Godora',
    'ancestry:ilar': 'Ilar',
    'ancestry:kalovin': 'Kalovin',

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
    'skill:shields': 'Pajzs',
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
    'skill:swimming': 'Úszás',


    'skill_type:basic': 'Alap',
    'skill_type:combat': 'Harci',
    'skill_type:focus': 'Fókusz',
    'skill_type:movement': 'Mozgás',
    'skill_type:knowledge': 'Tudás',

    'weapon:speed': 'Sebesség',
    'weapon:difficulty': 'Nehézség',
    'weapon:skill': 'Képzettség',
    'weapon:attack': 'Támadás',
    'weapon:hands': 'Kéz',
    'weapon:defence': 'Védekezés',
    'weapon:reach': 'Ütőtáv',
};

export const convertToDescription = <T extends string>(ob: Record<T, string>): Record<string, string> => Object.fromEntries(Object.entries(ob).map(([key, value]) => ([`description:${key}`, value as string])));

export type Language = 'en' | 'hu';


