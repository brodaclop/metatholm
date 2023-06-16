import { E, type EvalExpression, type Expression } from "../logic/Expression";
import type { Entity } from "./Entity";
import type { ActionKeys } from "./Labels";
import { TOTAL_EP, TOTAL_FP, ATTACK_AP, WEAPON_ATK, WEAPON_DISARM, WEAPON_DEF, MAGIC_EFFECTIVE_SKILL } from "./Rules";
import type { Weapon } from "./Weapon";
import { unwrapFunctionStore, format } from 'svelte-i18n';
import type { Spell } from "./Spell";
import { getSkillInfo, type Skill } from "./Skills";
import type { Ability } from "./Abilities";


export interface Level {
    skills: Partial<Record<Skill, number>>;
    fpRoll: number;
}

export interface Character extends Entity {
    abilities: Record<Ability, number>;
    levels: Array<Level>;
    current: {
        fp: number;
        ep: number;
        mp: number;
    }
}

export interface CalculatedCharacter {
    skills: Partial<Record<Skill, number>>;
    fp: EvalExpression;
    ep: EvalExpression;
    actions: Array<Action>;
    weapons: Array<Weapon>;
    spells: Array<Spell>;
}

export interface Action {
    name: string;
    subtitle?: typeof ActionKeys[number];
    ap?: EvalExpression;
    roll: EvalExpression;
    rollString?: string;
    damage?: Expression;
}

const merge = <T extends string>(acc: Partial<Record<T, number>>, add: Partial<Record<T, number>>): Partial<Record<T, number>> => {
    Object.entries(add).forEach(([key, value]) => {
        if (acc[key as T] === undefined || ((acc[key as T] as number) < (value as number))) {
            acc[key as T] = value as number;
        }
    });
    return acc;
};

const calculateSkills = (character: Character): Partial<Record<Skill, number>> => character.levels.reduce((acc, curr) => merge(acc, curr.skills), {} as Partial<Record<Skill, number>>)

export const calculateCharacter = (character: Character): CalculatedCharacter => {
    const level = character.levels.length;
    const { abilities } = character;
    const skills = calculateSkills(character);
    const weapons: Array<Weapon> = [];
    if (skills['skill:brawling']) {
        weapons.push({
            id: '1',
            name: 'weapons:brawling',
            skill: 'skill:brawling',
            speed: abilities['ability:activity'],
            attack: abilities['ability:build'],
            defence: abilities['ability:build'],
            range: 1,
            damage: Math.max(1, Math.floor((skills['skill:strength'] ?? 0) / 2))
        });
    }
    weapons.push({
        id: '2',
        name: 'Dzsambia',
        skill: 'skill:knives',
        speed: 5,
        attack: 8,
        defence: 3,
        range: 1,
        damage: 3
    });

    const spells: Array<Spell> = [
        {
            name: 'spell:fire_bolt',
            speed: 8,
            level: 1,
            skill: 'skill:focus_elemental'
        }
    ];

    const actions: Array<Action> = weapons.flatMap(w => {
        const skill = skills[w.skill];
        const difficulty = getSkillInfo(w.skill).difficulty;
        const ap = E.evaluate(ATTACK_AP, {
            'weapon:ap': w.speed,
            'weapon:difficulty': difficulty,
            'weapon:skill': skill,
        });
        const attack = E.evaluate(WEAPON_ATK, {
            'weapon:attack': w.attack,
            'weapon:difficulty': difficulty,
            'weapon:skill': skill
        });
        const disarm = E.evaluate(WEAPON_DISARM, {
            'weapon:attack': w.attack,
            'weapon:difficulty': difficulty,
            'weapon:skill': skill
        });
        const defence = E.evaluate(WEAPON_DEF, {
            'weapon:defence': w.defence,
            'weapon:difficulty': difficulty,
            'weapon:skill': skill
        });
        return [
            {
                name: w.name,
                ap,
                roll: attack,
                rollString: `1d100 + ${attack.result}`,
                damage: E.constant(`${w.damage}d6!`)
            },
            {
                name: w.name,
                subtitle: 'action:disarm',
                ap: E.evaluate(ATTACK_AP, {
                    'weapon:ap': w.speed,
                    'weapon:difficulty': difficulty,
                    'weapon:skill': skill
                }),
                roll: disarm,
                rollString: `1d100 + ${disarm.result}`,
            },
            {
                name: w.name,
                subtitle: 'action:defence',
                roll: defence,
                rollString: `1d100 + ${defence.result}`,
            }

        ]
    });

    actions.push(...spells.map(s => ({
        name: s.name,
        subtitle: `skill:${s.skill}` as any,
        ap: E.evaluate(E.constant(s.speed), {}),
        roll: E.evaluate(MAGIC_EFFECTIVE_SKILL, { 'spell:level': s.level, 'spell:focus_skill': skills[s.skill] }),
        rollString: `${E.evaluate(MAGIC_EFFECTIVE_SKILL, { 'spell:level': s.level, 'spell:focus_skill': skills[s.skill] }).result}d10!`,
    })));


    return {
        skills,
        spells,
        weapons,
        actions,
        ep: E.evaluate(TOTAL_EP, { 'character:level': level }),
        fp: E.evaluate(TOTAL_FP, {
            'character:level': level,
            'expr:pp_roll': character.levels.map(l => l.fpRoll),
            ...abilities,
            ...skills
        })
    }
};
