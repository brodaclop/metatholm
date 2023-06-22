import type { Skill } from "./Skills";

export type Spell = 'spell:fire_bolt';


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
        skill: 'skill:focus_elemental'
    }
}

export const getSpellInfo = (spell: Spell): SpellInfo => ({ name: spell, ...Spells[spell] });