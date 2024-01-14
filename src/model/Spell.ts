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
    | 'spell:sense_life'
    | 'spell:lend_life'
    | 'spell:heal'
    | 'spell:farsight'
    | 'spell:extinguish_magic'
    | 'spell:borrow_time'
    ;


export interface SpellInfo {
    name: Spell;
    speed: number;
    level: number;
    target: 'self' | 'touch' | 'point';
    skill: Skill;
}

const Spells: Record<Spell, Omit<SpellInfo, 'name'>> = {
    'spell:suppress_pain': {
        speed: 8,
        level: 2,
        target: 'self',
        skill: 'skill:body_focus',
    },
    'spell:maintain_body_temperature': {
        speed: 0,
        level: 0,
        target: 'self',
        skill: 'skill:body_focus'
    },
    'spell:hardened_skin': {
        speed: 10,
        level: 2,
        target: 'self',
        skill: 'skill:body_focus'
    },
    'spell:shout': {
        speed: 10,
        level: 1,
        target: 'self',
        skill: 'skill:body_focus'
    },
    'spell:jump': {
        speed: 10,
        level: 1,
        target: 'self',
        skill: 'skill:body_focus'
    },
    'spell:iron_fist': {
        speed: 3,
        level: 4,
        target: 'self',
        skill: 'skill:body_focus'
    },
    'spell:sustenance': {
        speed: 0,
        level: 3,
        target: 'self',
        skill: 'skill:body_focus'
    },
    'spell:convert_life_to_magic': {
        speed: 5,
        level: 5,
        target: 'self',
        skill: 'skill:body_focus'
    },
    'spell:sense_life': {
        speed: 0,
        level: 0,
        target: 'self',
        skill: 'skill:life_focus'
    },
    'spell:lend_life': {
        speed: 4,
        level: 1,
        target: 'touch',
        skill: 'skill:life_focus'
    },
    'spell:heal': {
        speed: 3,
        level: 2,
        target: 'touch',
        skill: 'skill:life_focus'
    },
    'spell:farsight': {
        speed: 1,
        level: 0,
        target: 'touch',
        skill: 'skill:spacetime_focus'
    },
    'spell:extinguish_magic': {
        speed: 6,
        level: 1,
        target: 'point',
        skill: 'skill:spacetime_focus'
    },
    'spell:borrow_time': {
        speed: 9,
        level: 2,
        target: 'touch',
        skill: 'skill:spacetime_focus'
    },

}

export const Spell = {
    ...createList(Spells),
    available: (skill: Skill, level: number): Array<SpellInfo> => Spell.list().filter(spell => spell.skill === skill && spell.level <= level),
};
