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
            "skill:magic_force": 1,
            'skill:camouflage': 2,
            'skill:throwing': 2,
            'skill:stalking': 2,
            'skill:martial_arts': 1,
            'skill:shadow_focus': 3
        }
    },
    'class:bruiser': {
        skills: {
            "skill:strength": 3,
            'skill:brawling': 3,
            'skill:maces': 2,
            'skill:body_focus': 1,
            'skill:magic_force': 1,
            'skill:pain_threshold': 3
        }
    },
    'class:charmer': {
        skills: {
            "skill:magic_force": 2,
            'skill:personal_charm': 3,
            'skill:fistfighting': 1,
            'skill:bamboozling': 3,
            'skill:spirit_focus': 1,
            'skill:crossbows': 3,
            'skill:swords': 1
        }
    },
    'class:hedge_wizard': {
        skills: {
            "skill:magic_force": 3,
            'skill:focus_elemental': 3,
            'skill:enchantment': 1,
            'skill:maces': 1,
            'skill:spacetime_focus': 3,
            'skill:reasoning': 2
        }
    },
    'class:sneak': {
        skills: {
            'skill:knives': 2,
            'skill:swords': 1,
            'skill:throwing': 2,
            'skill:hiding': 3,
            'skill:stalking': 2,
            'skill:spot_hidden': 2,
            'skill:bamboozling': 2
        }
    },
    'class:tinker': {
        skills: {
            "skill:magic_force": 2,
            'skill:life_focus': 2,
            'skill:medicine': 1,
            'skill:alchemy': 3,
            'skill:enchantment': 3,
            'skill:spacetime_focus': 3,
        }
    },
    'class:vagabond': {
        skills: {
            "skill:magic_force": 1,
            'skill:nature_focus': 3,
            'skill:bows': 3,
            'skill:bushcraft': 3,
            'skill:camouflage': 1,
            'skill:spot_hidden': 2,
            'skill:hiding': 1,
        }
    },
    'class:witch': {
        skills: {
            "skill:magic_force": 3,
            'skill:life_focus': 3,
            'skill:medicine': 2,
            'skill:enchantment': 3,
            'skill:knives': 1,
            'skill:personal_charm': 2,
            'skill:nature_focus': 1
        }
    },
};

export const CharacterClass = createList(Classes);