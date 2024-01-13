import { createList } from "./InfoList";
import type { Skill } from "./Skills";

export type Spell =
    | 'spell:suppress_pain'
    | 'spell:maintain_body_temperature'
    | 'spell:hardened_skin'
    | 'spell:shout'
    | 'spell:jump'
    | 'spell:iron_fist'
    | 'spell:sustenance'
    | 'spell:convert_life_to_magic'
    ;


export interface SpellInfo {
    name: Spell;
    speed: number;
    level: number;
    skill: Skill,
}

const Spells: Record<Spell, Omit<SpellInfo, 'name'>> = {
    'spell:suppress_pain': {
        speed: 8,
        level: 2,
        skill: 'skill:body_focus',
    },
    'spell:maintain_body_temperature': {
        speed: 0,
        level: 0,
        skill: 'skill:body_focus'
    },
    'spell:hardened_skin': {
        speed: 10,
        level: 2,
        skill: 'skill:body_focus'
    },
    'spell:shout': {
        speed: 10,
        level: 1,
        skill: 'skill:body_focus'
    },
    'spell:jump': {
        speed: 10,
        level: 1,
        skill: 'skill:body_focus'
    },
    'spell:iron_fist': {
        speed: 3,
        level: 4,
        skill: 'skill:body_focus'
    },
    'spell:sustenance': {
        speed: 0,
        level: 3,
        skill: 'skill:body_focus'
    },
    'spell:convert_life_to_magic': {
        speed: 5,
        level: 5,
        skill: 'skill:body_focus'
    },
}

export const Spell = {
    ...createList(Spells),
    available: (skill: Skill, level: number): Array<SpellInfo> => Spell.list().filter(spell => spell.skill === skill && spell.level <= level),
};
