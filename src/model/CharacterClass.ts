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
            "skill:magic_force": 1
        }
    },
    'class:bruiser': {
        skills: {
            "skill:strength": 3
        }
    },
    'class:charmer': {
        skills: {
            "skill:magic_force": 2
        }
    },
    'class:hedge_wizard': {
        skills: {
            "skill:magic_force": 3
        }
    },
    'class:sneak': {
        skills: {}
    },
    'class:tinker': {
        skills: {
            "skill:magic_force": 2
        }
    },
    'class:vagabond': {
        skills: {
            "skill:magic_force": 1
        }
    },
    'class:witch': {
        skills: {
            "skill:magic_force": 3
        }
    },
};

export const CharacterClass = createList(Classes);