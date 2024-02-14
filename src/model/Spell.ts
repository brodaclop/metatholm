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
    | 'spell:strike_from_afar'
    | 'spell:borrow_time'
    | 'spell:telekinesis'
    | 'spell:lantern'
    | 'spell:cleaning'
    | 'spell:sense_poison'
    | 'spell:call_animals'
    | 'spell:thicket'
    | 'spell:shelter'
    | 'spell:lightning_strike'
    | 'spell:cloak_of_shadow'
    | 'spell:shadow_leap'
    | 'spell:whispering_shadows'
    | 'spell:drain_magic'
    | 'spell:darken'
    | 'spell:light_fire'
    | 'spell:fire_arrow'
    | 'spell:extinguish_fire'
    | 'spell:heat_material'
    | 'spell:flameball'
    | 'spell:tapestry_of_flame'
    | 'spell:magic_bolt'
    | 'spell:steel_will'
    | 'spell:message'
    | 'spell:read_emotions'
    | 'spell:commune_with_spirits'
    | 'spell:write_memories'
    | 'spell:blunt_senses'
    | 'spell:fool_senses'
    | 'spell:spirit_shroud'
    | 'spell:silence_of_forests'
    ;

export type SpellTargets = 'spell_target:self' | 'spell_target:touch' | 'spell_target:point' | 'spell_target:other';
export type SpellDurations = 'spell_duration:instant' | 'spell_duration:round' | 'spell_duration:hour' | 'spell_duration:day';

export interface SpellInfo {
    name: Spell;
    speed: number;
    level: number;
    target: SpellTargets;
    duration: SpellDurations;
    skill: Skill;
}

const Spells: Record<Spell, Omit<SpellInfo, 'name'>> = {
    'spell:suppress_pain': {
        speed: 8,
        level: 2,
        target: 'spell_target:self',
        duration: 'spell_duration:instant',
        skill: 'skill:body_focus',
    },
    'spell:maintain_body_temperature': {
        speed: 0,
        level: 0,
        target: 'spell_target:self',
        duration: 'spell_duration:hour',
        skill: 'skill:body_focus'
    },
    'spell:hardened_skin': {
        speed: 10,
        level: 2,
        target: 'spell_target:self',
        duration: 'spell_duration:round',
        skill: 'skill:body_focus'
    },
    'spell:shout': {
        speed: 10,
        level: 1,
        target: 'spell_target:self',
        duration: 'spell_duration:instant',
        skill: 'skill:body_focus'
    },
    'spell:jump': {
        speed: 10,
        level: 1,
        target: 'spell_target:self',
        duration: 'spell_duration:round',
        skill: 'skill:body_focus'
    },
    'spell:iron_fist': {
        speed: 3,
        level: 4,
        target: 'spell_target:self',
        duration: 'spell_duration:round',
        skill: 'skill:body_focus'
    },
    'spell:sustenance': {
        speed: 0,
        level: 3,
        target: 'spell_target:self',
        duration: 'spell_duration:day',
        skill: 'skill:body_focus'
    },
    'spell:convert_life_to_magic': {
        speed: 5,
        level: 5,
        target: 'spell_target:self',
        duration: 'spell_duration:instant',
        skill: 'skill:body_focus'
    },
    'spell:sense_life': {
        speed: 0,
        level: 0,
        target: 'spell_target:self',
        duration: 'spell_duration:round',
        skill: 'skill:life_focus'
    },
    'spell:lend_life': {
        speed: 4,
        level: 1,
        target: 'spell_target:touch',
        duration: 'spell_duration:instant',
        skill: 'skill:life_focus'
    },
    'spell:heal': {
        speed: 3,
        level: 2,
        target: 'spell_target:touch',
        duration: 'spell_duration:instant',
        skill: 'skill:life_focus'
    },
    'spell:farsight': {
        speed: 1,
        level: 0,
        target: 'spell_target:touch',
        duration: 'spell_duration:round',
        skill: 'skill:spacetime_focus'
    },
    'spell:extinguish_magic': {
        speed: 6,
        level: 1,
        target: 'spell_target:point',
        duration: 'spell_duration:instant',
        skill: 'skill:spacetime_focus'
    },
    'spell:strike_from_afar': {
        speed: 9,
        level: 3,
        target: 'spell_target:point',
        duration: 'spell_duration:instant',
        skill: 'skill:spacetime_focus'
    },
    'spell:borrow_time': {
        speed: 9,
        level: 2,
        target: 'spell_target:touch',
        duration: 'spell_duration:round',
        skill: 'skill:spacetime_focus'
    },
    'spell:telekinesis': {
        speed: 4,
        level: 3,
        target: 'spell_target:point',
        duration: 'spell_duration:round',
        skill: 'skill:spacetime_focus'
    },
    'spell:lantern': {
        speed: 8,
        level: 0,
        target: 'spell_target:touch',
        duration: 'spell_duration:hour',
        skill: 'skill:nature_focus'
    },
    'spell:cleaning': {
        speed: 1,
        level: 0,
        target: 'spell_target:touch',
        duration: 'spell_duration:hour',
        skill: 'skill:nature_focus'
    },
    'spell:sense_poison': {
        speed: 7,
        level: 1,
        target: 'spell_target:self',
        duration: 'spell_duration:round',
        skill: 'skill:nature_focus'
    },
    'spell:call_animals': {
        speed: 5,
        level: 1,
        target: 'spell_target:self',
        duration: 'spell_duration:instant',
        skill: 'skill:nature_focus'
    },
    'spell:thicket': {
        speed: 5,
        level: 2,
        target: 'spell_target:touch',
        duration: 'spell_duration:round',
        skill: 'skill:nature_focus'
    },
    'spell:shelter': {
        speed: 5,
        level: 2,
        target: 'spell_target:point',
        duration: 'spell_duration:day',
        skill: 'skill:nature_focus'
    },
    'spell:lightning_strike': {
        speed: 6,
        level: 3,
        target: 'spell_target:point',
        duration: 'spell_duration:instant',
        skill: 'skill:nature_focus'
    },
    'spell:cloak_of_shadow': {
        speed: 7,
        level: 2,
        target: 'spell_target:touch',
        duration: 'spell_duration:hour',
        skill: 'skill:shadow_focus'
    },
    'spell:shadow_leap': {
        speed: 10,
        level: 3,
        target: 'spell_target:touch',
        duration: 'spell_duration:instant',
        skill: 'skill:shadow_focus'
    },
    'spell:whispering_shadows': {
        speed: 4,
        level: 1,
        target: 'spell_target:other',
        duration: 'spell_duration:round',
        skill: 'skill:shadow_focus'
    },
    'spell:drain_magic': {
        speed: 8,
        level: 4,
        target: 'spell_target:point',
        duration: 'spell_duration:instant',
        skill: 'skill:shadow_focus'
    },
    'spell:darken': {
        speed: 5,
        level: 0,
        target: 'spell_target:point',
        duration: 'spell_duration:round',
        skill: 'skill:shadow_focus'
    },
    'spell:light_fire': {
        speed: 7,
        level: 0,
        target: 'spell_target:point',
        duration: 'spell_duration:round',
        skill: 'skill:elemental_focus'
    },
    'spell:extinguish_fire': {
        speed: 9,
        level: 0,
        target: 'spell_target:point',
        duration: 'spell_duration:instant',
        skill: 'skill:elemental_focus'
    },
    'spell:fire_arrow': {
        speed: 10,
        level: 1,
        target: 'spell_target:point',
        duration: 'spell_duration:instant',
        skill: 'skill:elemental_focus'
    },
    'spell:heat_material': {
        speed: 3,
        level: 2,
        target: 'spell_target:point',
        duration: 'spell_duration:instant',
        skill: 'skill:elemental_focus'
    },
    'spell:flameball': {
        speed: 8,
        level: 3,
        target: 'spell_target:point',
        duration: 'spell_duration:instant',
        skill: 'skill:elemental_focus'
    },
    'spell:tapestry_of_flame': {
        speed: 2,
        level: 4,
        target: 'spell_target:point',
        duration: 'spell_duration:round',
        skill: 'skill:elemental_focus'
    },
    'spell:magic_bolt': {
        speed: 10,
        level: 5,
        target: 'spell_target:point',
        duration: 'spell_duration:instant',
        skill: 'skill:elemental_focus'
    },
    'spell:steel_will': {
        speed: 7,
        level: 1,
        target: 'spell_target:touch',
        duration: 'spell_duration:round',
        skill: 'skill:spirit_focus'
    },
    'spell:write_memories': {
        speed: 2,
        level: 4,
        target: 'spell_target:other',
        duration: 'spell_duration:instant',
        skill: 'skill:spirit_focus'
    },
    'spell:read_emotions': {
        speed: 5,
        level: 2,
        target: 'spell_target:other',
        duration: 'spell_duration:instant',
        skill: 'skill:spirit_focus'
    },
    'spell:blunt_senses': {
        speed: 6,
        level: 1,
        target: 'spell_target:point',
        duration: 'spell_duration:round',
        skill: 'skill:spirit_focus'
    },
    'spell:message': {
        speed: 10,
        level: 0,
        target: 'spell_target:other',
        duration: 'spell_duration:round',
        skill: 'skill:spirit_focus'
    },
    'spell:commune_with_spirits': {
        speed: 0,
        level: 3,
        target: 'spell_target:self',
        duration: 'spell_duration:instant',
        skill: 'skill:spirit_focus'
    },
    'spell:fool_senses': {
        speed: 4,
        level: 3,
        target: 'spell_target:point',
        duration: 'spell_duration:round',
        skill: 'skill:spirit_focus'
    },
    'spell:spirit_shroud': {
        speed: 4,
        level: 4,
        target: 'spell_target:touch',
        duration: 'spell_duration:day',
        skill: 'skill:spirit_focus'
    },
    'spell:silence_of_forests': {
        speed: 0,
        level: 3,
        target: 'spell_target:touch',
        duration: 'spell_duration:hour',
        skill: 'skill:nature_focus'
    },

}

export const Spell = {
    ...createList(Spells),
    available: (skill: Skill, level: number): Array<SpellInfo> => Spell.list().filter(spell => spell.skill === skill && spell.level <= level),
};
