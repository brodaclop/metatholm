import { createList } from "./InfoList";
import type { Skill } from "./Skills";

export type Spell = 'spell:fire_bolt' | 'spell:lightning_strike' | 'spell:suppress_pain' | 'spell:endure_weather';


export interface SpellInfo {
    name: Spell;
    speed: number;
    level: number;
    skill: Skill,
}

const Spells: Record<Spell, Omit<SpellInfo, 'name'>> = {
    'spell:fire_bolt': {
        speed: 8,
        level: 1,
        skill: 'skill:elemental_focus',
    },
    'spell:lightning_strike': {
        speed: 3,
        level: 2,
        skill: 'skill:elemental_focus',
    },
    'spell:suppress_pain': {
        speed: 8,
        level: 1,
        skill: 'skill:body_focus',
    },
    'spell:endure_weather': {
        speed: 3,
        level: 0,
        skill: 'skill:body_focus',
    }
}

export const Spell = {
    ...createList(Spells),
    available: (skill: Skill, level: number): Array<SpellInfo> => Spell.list().filter(spell => spell.skill === skill && spell.level <= level),
};
