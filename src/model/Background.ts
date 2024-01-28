import type { Ability } from "./Abilities";
import { createList } from "./InfoList";
import type { Skill } from "./Skills";

export interface BackgroundInfo {
    name: Background;
    skills: Partial<Record<Skill, number>>;
    abilities: Partial<Record<Ability, number>>;
}

export type Background =
    'background:bruiser' |
    'background:sneak' |
    'background:hedge_wizard' |
    'background:tinker' |
    'background:assassin' |
    'background:vagabond' |
    'background:charmer' |
    'background:witch';

const Backgrounds: Record<Background, Omit<BackgroundInfo, 'name'>> = {
    'background:assassin': {
        skills: {
            'skill:knives': 3,
            "skill:magic_force": 1,
            'skill:camouflage': 2,
            'skill:throwing': 2,
            'skill:stalking': 2,
            'skill:martial_arts': 1,
            'skill:shadow_focus': 3,
            'skill:balance': 2,
            'skill:tinkering': 1,
        },
        abilities: {
            'ability:presence': -1,
            'ability:magic': -1
        }
    },
    'background:bruiser': {
        skills: {
            "skill:strength": 3,
            'skill:brawling': 3,
            'skill:maces': 3,
            'skill:body_focus': 1,
            'skill:magic_force': 1,
            'skill:pain_threshold': 3,
            'skill:sprinting': 2,
            'skill:jumping': 1
        },
        abilities: {
            'ability:build': 1,
            'ability:magic': -1
        }
    },
    'background:charmer': {
        skills: {
            "skill:magic_force": 2,
            'skill:personal_charm': 3,
            'skill:fistfighting': 1,
            'skill:bamboozling': 3,
            'skill:spirit_focus': 1,
            'skill:crossbows': 3,
            'skill:swords': 1,
            'skill:etiquette': 3,
        },
        abilities: {
            'ability:presence': 1,
            'ability:activity': 1
        }
    },
    'background:hedge_wizard': {
        skills: {
            "skill:magic_force": 3,
            'skill:elemental_focus': 3,
            'skill:enchantment': 1,
            'skill:maces': 1,
            'skill:spirit_focus': 3,
            'skill:reasoning': 2,
            'skill:spacetime_focus': 1,
            'skill:alchemy': 1,
            'skill:history': 2,
        },
        abilities: {
            'ability:magic': 1,
            'ability:presence': 1
        }
    },
    'background:sneak': {
        skills: {
            'skill:knives': 2,
            'skill:swords': 1,
            'skill:throwing': 2,
            'skill:hiding': 3,
            'skill:stalking': 2,
            'skill:spot_hidden': 2,
            'skill:bamboozling': 2,
            'skill:climbing': 2,
            'skill:tinkering': 1,
        },
        abilities: {
            'ability:activity': 1,
            'ability:build': -1

        }
    },
    'background:tinker': {
        skills: {
            "skill:magic_force": 2,
            'skill:life_focus': 2,
            'skill:medicine': 1,
            'skill:alchemy': 3,
            'skill:enchantment': 3,
            'skill:spacetime_focus': 3,
            'skill:tinkering': 3
        },
        abilities: {
            'ability:activity': -1,
            'ability:build': -1
        }
    },
    'background:vagabond': {
        skills: {
            "skill:magic_force": 1,
            'skill:nature_focus': 3,
            'skill:bows': 3,
            'skill:bushcraft': 3,
            'skill:camouflage': 1,
            'skill:spot_hidden': 2,
            'skill:hiding': 1,
            'skill:pain_threshold': 2,
            'skill:tinkering': 1,
        },
        abilities: {
            'ability:presence': -1,
            'ability:build': 1
        }
    },
    'background:witch': {
        skills: {
            "skill:magic_force": 3,
            'skill:life_focus': 3,
            'skill:medicine': 2,
            'skill:enchantment': 2,
            'skill:knives': 1,
            'skill:personal_charm': 2,
            'skill:nature_focus': 1,
            'skill:spirit_focus': 2,
            'skill:alchemy': 1
        },
        abilities: {
            'ability:magic': 1,
            'ability:presence': -1,
        }
    },
};

export const Background = createList(Backgrounds);