import { E, type EvalExpression } from "../logic/Expression";
import type { Entity } from "./Entity";
import { TOTAL_EP, TOTAL_FP } from "./Rules";
import type { Weapon } from "./Weapon";
import type { Ability } from "./Abilities";
import type { Action } from "./Action";
import { Background } from "./Background";
import { v4 } from "uuid";
import { Ancestry } from "./Ancestry";
import { Spell, type SpellInfo } from "./Spell";
import { entries } from "./InfoList";
import { calculateWeaponAction } from "./calculations/WeaponAction";
import { calculateSpellAction } from "./calculations/SpellAction";
import type { Skill } from "./Skills";


export interface Level {
    skills: Partial<Record<Skill, number>>;
    fpRoll: number;
}

export interface Character extends Entity {
    abilities: Record<Ability, number>;
    background: Background;
    ancestry: Ancestry;
    levels: Array<Level>;
    inventory: {
        weapons: Array<Weapon>;
    };
    current: {
        fp: number;
        ep: number;
        mp: number;
        kp: number;
    }
}

export interface CharacterInfo extends Entity {
    background: Background;
    ancestry: Ancestry;
    level: number;
}

export type CharacterTemplate = Pick<Character, 'name' | 'abilities' | 'background' | 'ancestry'>;

export interface CalculatedCharacter {
    skills: Partial<Record<Skill, number>>;
    fp: EvalExpression;
    ep: EvalExpression;
    actions: Array<Action>;
    weapons: Array<Weapon>;
    spells: Array<SpellInfo>;
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


const calculateUnarmed = (skills: Partial<Record<Skill, number>>): Array<Weapon> => {
    const ret: Array<Weapon> = [];
    const fraction = (skill: Skill, divisor: number) => Math.max(1, Math.floor((skills[skill] ?? 0) / divisor))

    if (skills['skill:brawling']) {
        ret.push({
            id: 'skill:brawling',
            name: 'skill:brawling',
            skill: 'skill:brawling',
            speed: fraction('skill:strength', 2),
            attack: fraction('skill:strength', 2),
            defence: fraction('skill:strength', 2),
            reach: 0,
            damage: fraction('skill:strength', 2),
            hands: 1,
            actions: {
                'action:attack-cq': 1,
                'action:defend-cq': 1,
            }
        });
    }
    if (skills['skill:fistfighting']) {
        ret.push({
            id: 'skill:fistfighting',
            name: 'skill:fistfighting',
            skill: 'skill:fistfighting',
            speed: fraction('skill:reactions', 1),
            attack: fraction('skill:reactions', 2),
            defence: fraction('skill:reactions', 2),
            reach: 0,
            damage: fraction('skill:reactions', 2),
            hands: 1,
            actions: {
                'action:attack-cq': 2,
                'action:defend-cq': 2,
            }
        });
    }
    if (skills['skill:martial_arts']) {
        ret.push({
            id: 'skill:martial_arts',
            name: 'skill:martial_arts',
            skill: 'skill:martial_arts',
            speed: fraction('skill:balance', 1),
            attack: fraction('skill:balance', 1),
            defence: fraction('skill:balance', 1),
            reach: 0,
            damage: fraction('skill:balance', 2),
            hands: 1,
            actions: {
                'action:attack-cq': 3,
                'action:defend-cq': 3,
            }
        });
    }
    return ret;
}


export const calculateCharacter = (character: Character): CalculatedCharacter => {
    const level = character.levels.length;
    const { abilities } = character;
    const skills = calculateSkills(character);
    const weapons: Array<Weapon> = [...character.inventory.weapons, ...calculateUnarmed(skills)];


    const spells: Array<SpellInfo> = entries(skills).flatMap(([key, value]) => Spell.available(key, value));

    const actions: Array<Action> = [
        ...weapons.map(w => calculateWeaponAction(skills, w)),
        ...spells.map(s => calculateSpellAction(skills, s))
    ];

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


export const createCharacter = (template: CharacterTemplate): Character => {
    const ancestryInfo = Ancestry.get(template.ancestry);
    const abilities: Record<Ability, number> = Object.fromEntries(Object.entries(template.abilities).map(([key, value]) => [key, value + (ancestryInfo.abilities[key as Ability] ?? 0)])) as Record<Ability, number>;

    const level: Level = {
        fpRoll: 20,
        skills: Background.get(template.background).skills
    };

    return {
        name: template.name,
        id: v4(),
        background: template.background,
        ancestry: template.ancestry,
        abilities,
        inventory: {
            weapons: []
        },
        levels: [level],
        current: {
            ep: 0,
            fp: 0,
            mp: 0,
            kp: 30
        }
    };
}