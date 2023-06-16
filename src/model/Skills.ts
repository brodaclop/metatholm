import type { Ability } from "./Abilities";

interface SkillInfo {
    readonly name: Skill;
    readonly difficulty: 1 | 2 | 3;
    readonly ability: Ability;
    readonly positive: boolean;
}

export const SkillInfo: Record<Skill, Omit<SkillInfo, 'name'>> = {
    "skill:endurance": {
        difficulty: 2,
        ability: 'ability:build',
        positive: false,
    },
    'skill:pain_threshold': {
        difficulty: 2,
        ability: 'ability:build',
        positive: true,
    },
    'skill:knives': {
        difficulty: 1,
        ability: 'ability:activity',
        positive: true,
    },
    'skill:brawling': {
        difficulty: 1,
        ability: 'ability:build',
        positive: true,
    },
    'skill:strength': {
        difficulty: 2,
        ability: 'ability:build',
        positive: true,
    },
    'skill:magic_force': {
        difficulty: 3,
        ability: 'ability:magic',
        positive: true
    },
    'skill:focus_elemental': {
        difficulty: 3,
        ability: 'ability:magic',
        positive: true
    }
};

export const getSkillInfo = (skill: Skill): SkillInfo => ({ name: skill, ...SkillInfo[skill] });

export type Skill = 'skill:endurance' | 'skill:pain_threshold' | 'skill:knives' | 'skill:brawling' | 'skill:strength' | 'skill:magic_force' | 'skill:focus_elemental';
