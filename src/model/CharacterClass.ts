import { createList } from "./InfoList";
import type { Skill } from "./Skills";

export interface CharacterClassInfo {
    name: CharacterClass;
    skills: Partial<Record<Skill, number>>;
}

export type CharacterClass =
    'class:bruiser' |
    'class:sneak' |
    'class:hedge_wizard' |
    'class:tinker' |
    'class:assassin' |
    'class:vagabond' |
    'class:charmer' |
    'class:witch';

export const Classes: Record<CharacterClass, Omit<CharacterClassInfo, 'name'>> = {
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

export const CharacterClass = createList(Classes);