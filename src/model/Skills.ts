import type { Ability } from "./Abilities";
import { createList } from "./InfoList";

export interface SkillInfo {
    readonly name: Skill;
    readonly difficulty: 1 | 2 | 3;
    readonly ability: Ability;
    readonly positive: boolean;
    readonly type: SkillType;
}

export const SkillInfos: Record<Skill, Omit<SkillInfo, 'name'>> = {
    "skill:endurance": {
        difficulty: 2,
        ability: 'ability:build',
        positive: false,
        type: 'skill_type:basic',
    },
    'skill:pain_threshold': {
        difficulty: 2,
        ability: 'ability:build',
        positive: true,
        type: 'skill_type:basic',
    },
    'skill:knives': {
        difficulty: 1,
        ability: 'ability:activity',
        positive: true,
        type: 'skill_type:combat',
    },
    'skill:brawling': {
        difficulty: 1,
        ability: 'ability:build',
        positive: true,
        type: 'skill_type:combat',
    },
    'skill:strength': {
        difficulty: 2,
        ability: 'ability:build',
        positive: true,
        type: 'skill_type:basic',
    },
    'skill:magic_force': {
        difficulty: 3,
        ability: 'ability:magic',
        positive: true,
        type: 'skill_type:basic',
    },
    'skill:focus_elemental': {
        difficulty: 3,
        ability: 'ability:magic',
        positive: true,
        type: 'skill_type:focus',
    },
    'skill:polearms': {
        difficulty: 2,
        ability: 'ability:build',
        positive: true,
        type: 'skill_type:combat'
    },
    'skill:maces': {
        difficulty: 1,
        ability: 'ability:build',
        positive: true,
        type: 'skill_type:combat'
    },
    'skill:stalking': {
        difficulty: 2,
        ability: 'ability:build',
        positive: false,
        type: 'skill_type:movement'
    },
    'skill:climbing': {
        difficulty: 1,
        ability: 'ability:build',
        positive: false,
        type: 'skill_type:movement'
    },
    'skill:fistfighting': {
        difficulty: 2,
        ability: 'ability:activity',
        positive: true,
        type: 'skill_type:combat'
    },
    'skill:jumping': {
        difficulty: 2,
        ability: 'ability:activity',
        positive: true,
        type: 'skill_type:movement'
    },
    'skill:sprinting': {
        difficulty: 1,
        ability: 'ability:activity',
        positive: true,
        type: 'skill_type:movement'
    },
    'skill:throwing': {
        difficulty: 3,
        ability: 'ability:activity',
        positive: true,
        type: 'skill_type:combat'
    },
    'skill:reactions': {
        difficulty: 1,
        ability: 'ability:activity',
        positive: true,
        type: 'skill_type:basic'
    },
    'skill:martial_arts': {
        difficulty: 3,
        ability: 'ability:activity',
        positive: false,
        type: 'skill_type:combat'
    },
    'skill:alchemy': {
        difficulty: 3,
        ability: 'ability:activity',
        positive: false,
        type: 'skill_type:knowledge'
    },
    'skill:bows': {
        difficulty: 2,
        ability: 'ability:activity',
        positive: false,
        type: 'skill_type:combat'
    },
    'skill:balance': {
        difficulty: 1,
        ability: 'ability:activity',
        positive: false,
        type: 'skill_type:combat'
    },
    'skill:medicine': {
        difficulty: 2,
        ability: 'ability:activity',
        positive: false,
        type: 'skill_type:knowledge'
    },
    'skill:personal_charm': {
        difficulty: 2,
        ability: 'ability:presence',
        positive: true,
        type: 'skill_type:basic'
    },
    'skill:spot_hidden': {
        difficulty: 1,
        ability: 'ability:presence',
        positive: true,
        type: 'skill_type:basic'
    },
    'skill:bamboozling': {
        difficulty: 1,
        ability: 'ability:presence',
        positive: true,
        type: 'skill_type:basic'
    },
    'skill:reasoning': {
        difficulty: 2,
        ability: 'ability:presence',
        positive: false,
        type: 'skill_type:knowledge'
    },
    'skill:hiding': {
        difficulty: 3,
        ability: 'ability:presence',
        positive: false,
        type: 'skill_type:basic'
    },
    'skill:camouflage': {
        difficulty: 2,
        ability: 'ability:presence',
        positive: false,
        type: 'skill_type:knowledge'
    },
    'skill:bushcraft': {
        difficulty: 2,
        ability: 'ability:presence',
        positive: false,
        type: 'skill_type:knowledge'
    },
    'skill:enchantment': {
        difficulty: 3,
        ability: 'ability:magic',
        positive: true,
        type: 'skill_type:knowledge'
    },
    'skill:magic_resistance': {
        difficulty: 3,
        ability: 'ability:magic',
        positive: false,
        type: 'skill_type:basic'
    },
    'skill:body_focus': {
        difficulty: 3,
        ability: 'ability:build',
        positive: true,
        type: 'skill_type:focus',
    },
    'skill:life_focus': {
        difficulty: 3,
        ability: 'ability:build',
        positive: false,
        type: 'skill_type:focus',
    },
    'skill:spacetime_focus': {
        difficulty: 3,
        ability: 'ability:activity',
        positive: true,
        type: 'skill_type:focus',
    },
    'skill:nature_focus': {
        difficulty: 3,
        ability: 'ability:activity',
        positive: false,
        type: 'skill_type:focus',
    },
    'skill:spirit_focus': {
        difficulty: 3,
        ability: 'ability:presence',
        positive: true,
        type: 'skill_type:focus',
    },
    'skill:shadow_focus': {
        difficulty: 3,
        ability: 'ability:presence',
        positive: false,
        type: 'skill_type:focus',
    },
};

export type SkillType = 'skill_type:combat' | 'skill_type:focus' | 'skill_type:basic' | 'skill_type:movement' | 'skill_type:knowledge';
export type Skill = 'skill:endurance' |
    'skill:pain_threshold' |
    'skill:knives' |
    'skill:brawling' |
    'skill:strength' |
    'skill:magic_force' |
    'skill:focus_elemental' |
    'skill:polearms' |
    'skill:maces' |
    'skill:stalking' |
    'skill:climbing' |
    'skill:fistfighting' |
    'skill:jumping' |
    'skill:sprinting' |
    'skill:throwing' |
    'skill:reactions' |
    'skill:martial_arts' |
    'skill:alchemy' |
    'skill:bows' |
    'skill:balance' |
    'skill:medicine' |
    'skill:personal_charm' |
    'skill:spot_hidden' |
    'skill:bamboozling' |
    'skill:reasoning' |
    'skill:hiding' |
    'skill:camouflage' |
    'skill:bushcraft' |
    'skill:enchantment' |
    'skill:magic_resistance' |
    'skill:body_focus' |
    'skill:life_focus' |
    'skill:spacetime_focus' |
    'skill:nature_focus' |
    'skill:spirit_focus' |
    'skill:shadow_focus'


    ;

export const Skill = createList(SkillInfos);