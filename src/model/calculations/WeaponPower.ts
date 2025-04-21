import { E, type Expression } from "../../logic/Expression";
import type { ActionVariant } from "../Action";
import { entries } from "../InfoList";
import { Skill } from "../Skills";
import type { Weapon } from "../Weapon";

const WEAPON_POWER: Expression = E.add(
    E.mul(E.value('weapon:speed'), 1.5),
    E.value('weapon:attack'),
    E.value('weapon:defence'),
    E.mul(E.value('weapon:damage'), 3),
    E.div(10, E.value('weapon:hands'))
);

const ACTION_MULTIPLIER: Partial<Record<ActionVariant, number>> = {
    'action:attack-cq': 0.5,
    'action:attack': 1,
    'action:attack-range': 2,
    'action:defend-cq': 0.5,
    'action:defend': 1,
    'action:defend-range': 2,
    'action:hidden-weapon': 2,
    'action:knockout': 2,
    'action:trip': 2,
    'action:spin-behind': 2,
}

export const calculateWeaponPower = (weapon: Omit<Weapon, 'notes' | 'id' | 'name'>): number => {
    const skill = Skill.get(weapon.skill);
    const multipliers = skill.weaponMultipliers;
    const base = E.evaluate(WEAPON_POWER, {
        'weapon:attack': weapon.attack * (multipliers?.attack ?? 1),
        'weapon:defence': weapon.defence * (multipliers?.defence ?? 1),
        'weapon:damage': weapon.damage * (multipliers?.damage ?? 1),
        'weapon:speed': weapon.speed * (multipliers?.speed ?? 1),
        'weapon:hands': weapon.hands
    });

    const multiplier = entries(weapon.actions).map(([action, skill]) => {
        return (ACTION_MULTIPLIER[action] ?? 0) * (10 + skill) * (10 + skill) / 10;
    }).reduce((acc, curr) => acc + curr, 0);

    return Math.max(1, Math.round((base.result * multiplier - 0) / 250));
}