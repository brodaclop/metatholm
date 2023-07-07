import { E, type EvalExpression } from "../logic/Expression";
import type { Entity } from "./Entity";
import { TOTAL_EP, TOTAL_FP, ATTACK_AP, WEAPON_ATK, WEAPON_DISARM, WEAPON_DEF, MAGIC_EFFECTIVE_SKILL } from "./Rules";
import type { Weapon } from "./Weapon";
import type { Ability } from "./Abilities";
import type { Action } from "./Action";
import { CharacterClass } from "./CharacterClass";
import { v4 } from "uuid";
import { Species } from "./Species";
import { Skill } from "./Skills";
import { Spell, type SpellInfo } from "./Spell";
import { entries } from "./InfoList";


export interface Level {
    skills: Partial<Record<Skill, number>>;
    fpRoll: number;
}

export interface Character extends Entity {
    abilities: Record<Ability, number>;
    class: CharacterClass;
    species: Species;
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
    class: CharacterClass;
    species: Species;
    level: number;
}

export type CharacterTemplate = Pick<Character, 'name' | 'abilities' | 'class' | 'species'>;

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

export const calculateCharacter = (character: Character): CalculatedCharacter => {
    const level = character.levels.length;
    const { abilities } = character;
    const skills = calculateSkills(character);
    const weapons: Array<Weapon> = [...character.inventory.weapons];
    if (skills['skill:brawling']) {
        weapons.push({
            id: '1',
            name: 'weapons:brawling',
            skill: 'skill:brawling',
            speed: abilities['ability:activity'],
            attack: abilities['ability:build'],
            defence: abilities['ability:build'],
            reach: 1,
            damage: Math.max(1, Math.floor((skills['skill:strength'] ?? 0) / 2))
        });
    }

    const spells: Array<SpellInfo> = entries(skills).flatMap(([key, value]) => Spell.available(key, value));

    const actions: Array<Action> = weapons.map(w => {
        const skill = skills[w.skill];
        const difficulty = Skill.get(w.skill).difficulty;
        const ap = E.evaluate(ATTACK_AP, {
            'weapon:speed': w.speed,
            'weapon:difficulty': difficulty,
            'weapon:skill': skill,
        });
        const attack = E.evaluate(WEAPON_ATK, {
            'weapon:attack': w.attack,
            'weapon:difficulty': difficulty,
            'weapon:skill': skill,
            'weapon:reach': w.reach

        });
        const disarm = E.evaluate(WEAPON_DISARM, {
            'weapon:attack': w.attack,
            'weapon:difficulty': difficulty,
            'weapon:skill': skill,
            'weapon:reach': w.reach

        });
        const defence = E.evaluate(WEAPON_DEF, {
            'weapon:defence': w.defence,
            'weapon:difficulty': difficulty,
            'weapon:skill': skill,
            'weapon:reach': w.reach

        });
        const ret: Action = {
            name: w.name,
            variants: {
                'action:attack': [
                    {
                        name: 'action:ap',
                        roll: ap,
                        rollString: String(ap.result)
                    },
                    {
                        name: 'action:roll',
                        roll: attack,
                        rollString: `1d100 + ${attack.result}`,
                    },
                    {
                        name: 'label:damage',
                        roll: E.constant(`${w.damage}d6!`),
                        rollString: `${w.damage}d6!`
                    }
                ],
                'action:disarm': [
                    {
                        name: 'action:ap',
                        roll: ap,
                    },
                    {
                        name: 'action:roll',
                        roll: disarm,
                        rollString: `1d100 + ${disarm.result}`,
                    },
                ],
                'action:defence': [
                    {
                        name: 'action:roll',
                        roll: defence,
                        rollString: `1d100 + ${defence.result}`,
                    },
                ]
            }
        };
        return ret;
    });

    actions.push(...spells.map(s => {
        const ap = E.evaluate(E.sub(20, E.value('expr:spell_speed')), { 'expr:spell_speed': s.speed });
        const roll = E.evaluate(MAGIC_EFFECTIVE_SKILL, { 'expr:spell_level': s.level, 'expr:spell_focus_skill': skills[s.skill] });
        const ret: Action = {
            name: s.name,
            variants: {
                'action:cast': [
                    {
                        name: 'action:ap',
                        roll: ap,
                    },
                    {
                        name: 'action:roll',
                        roll,
                        rollString: `${roll.result}d10!`
                    }
                ]
            }
        };
        return ret;
    }));

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
    const speciesInfo = Species.get(template.species);
    const abilities: Record<Ability, number> = Object.fromEntries(Object.entries(template.abilities).map(([key, value]) => [key, value + (speciesInfo.abilities[key as Ability] ?? 0)])) as Record<Ability, number>;

    const level: Level = {
        fpRoll: 10,
        skills: CharacterClass.get(template.class).skills
    };

    return {
        name: template.name,
        id: v4(),
        class: template.class,
        species: template.species,
        abilities,
        inventory: {
            weapons: [
                {
                    id: '2',
                    name: 'Dzsambia',
                    skill: 'skill:knives',
                    speed: 5,
                    attack: 8,
                    defence: 3,
                    reach: 1,
                    damage: 3
                }
            ]
        },
        levels: [level],
        current: {
            ep: 0,
            fp: 0,
            mp: 0,
            kp: 20
        }
    };
}