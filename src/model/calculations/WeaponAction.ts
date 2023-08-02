import { E, type EvalExpression } from "../../logic/Expression";
import type { Action, ActionRoll, Roll } from "../Action";
import { ATTACK_AP, WEAPON_ATK, WEAPON_DEF, WEAPON_DISARM } from "../Rules";
import { Skill } from "../Skills";
import type { Weapon } from "../Weapon";

export const calculateWeaponAction = (skills: Partial<Record<Skill, number>>, weapon: Weapon): Action => {
    const skill = skills[weapon.skill];
    const difficulty = Skill.get(weapon.skill).difficulty;
    const ap = E.evaluate(ATTACK_AP, {
        'weapon:speed': weapon.speed,
        'weapon:difficulty': difficulty,
        'weapon:skill': skill,
    });
    const attack = E.evaluate(WEAPON_ATK, {
        'weapon:attack': weapon.attack,
        'weapon:difficulty': difficulty,
        'weapon:skill': skill,
        'weapon:reach': weapon.reach
    });
    const attackCq = E.evaluate(WEAPON_ATK, {
        'weapon:attack': weapon.attack,
        'weapon:difficulty': difficulty,
        'weapon:skill': skill,
        'weapon:reach': -weapon.reach
    });
    const disarm = E.evaluate(WEAPON_DISARM, {
        'weapon:attack': weapon.attack,
        'weapon:difficulty': difficulty,
        'weapon:skill': skill,
        'weapon:reach': weapon.reach

    });
    const defence = E.evaluate(WEAPON_DEF, {
        'weapon:defence': weapon.defence,
        'weapon:difficulty': difficulty,
        'weapon:skill': skill,
        'weapon:reach': weapon.reach
    });
    const defenceCq = E.evaluate(WEAPON_DEF, {
        'weapon:defence': weapon.defence,
        'weapon:difficulty': difficulty,
        'weapon:skill': skill,
        'weapon:reach': -weapon.reach
    });
    return {
        name: weapon.name,
        variants: {
            'action:attack': [
                apRoll(ap),
                d100roll('action:roll', attack),
                damageRoll(weapon.damage)
            ],
            'action:attack-cq': [
                apRoll(ap),
                d100roll('action:roll', attackCq),
                damageRoll(weapon.damage)
            ],
            'action:disarm': [
                apRoll(ap),
                d100roll('action:roll', disarm)
            ],
            'action:defend': [
                d100roll('action:roll', defence)
            ],
            'action:defend-cq': [
                d100roll('action:roll', defenceCq)
            ]
        }
    };
};

const d100roll = (name: ActionRoll, roll: EvalExpression): Roll => ({
    name,
    roll,
    rollString: `1d100 + ${roll.result}`,
});

const apRoll = (roll: EvalExpression): Roll => ({
    name: 'action:ap',
    roll
});

const damageRoll = (dice: number): Roll => ({
    name: 'label:damage',
    roll: E.constant(`${dice}d5!`),
    rollString: `${dice}d5!`
})