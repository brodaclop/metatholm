import type { Skill } from "./Skills";

export interface CharacterClass {
    name: CharacterClasses;
    skills: Partial<Record<Skill, number>>;
}

export type CharacterClasses =
    'class:bruiser' |
    'class:sneak' |
    'class:hedge_wizard' |
    'class:tinker' |
    'class:assassin' |
    'class:vagabond' |
    'class:charmer' |
    'class:witch';

export const Classes: Record<CharacterClasses, Omit<CharacterClass, 'name'>> = {
    'class:assassin': {
        skills: {
            'skill:knives': 3,
        }
    },
    'class:bruiser': {
        skills: {}
    },
    'class:charmer': {
        skills: {}
    },
    'class:hedge_wizard': {
        skills: {}
    },
    'class:sneak': {
        skills: {}
    },
    'class:tinker': {
        skills: {}
    },
    'class:vagabond': {
        skills: {}
    },
    'class:witch': {
        skills: {}
    },
};