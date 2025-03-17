import { E, type EvalExpression } from "../../logic/Expression";
import { ACTION_VARIANT_PROPERTIES, type Action, type ActionRange, type ActionVariant, type ActionVariantInfo, type Roll } from "../Action";
import { keys } from "../InfoList";
import { ATTACK_AP, WEAPON_ATK, WEAPON_DEF } from "../Rules";
import { Skill } from "../Skills";
import { ENCHANTMENT_MAGNITUDE, type Weapon } from "../Weapon";

export const calculateWeaponAction = (skills: Partial<Record<Skill, number>>, weapon: Weapon): Action => ({
    name: weapon.name,
    weapon,
    variants: keys(weapon.actions).map(v => calculateVariant(v, skills, weapon))
});

export const ReachMultipliers: Record<ActionRange, number> = {
    'close-quarters': -1,
    'in-range': 1,
    'out-of-range': 0
};

const calculateSkill = (characterSkill?: number, actionModifier = 0): number => {
    if (characterSkill) {
        return actionModifier + (characterSkill ?? 0);
    } else {
        return Math.min(0, actionModifier)
    }
}

const calculateVariant = (name: ActionVariant, skills: Partial<Record<Skill, number>>, weapon: Weapon): ActionVariantInfo => {
    const variantInfo = ACTION_VARIANT_PROPERTIES[name];
    const ap = variantInfo.type === 'action' ? ATTACK_AP : undefined;
    const roll = variantInfo.type === 'action' ? WEAPON_ATK : WEAPON_DEF;
    const damage = name === 'action:attack' || name === 'action:attack-cq' || name === 'action:attack-range' || name === 'action:hidden-weapon' ? weapon.damage : 0;
    const skill = calculateSkill(skills[weapon.skill], weapon.actions[name]);
    const multipliers = Skill.get(weapon.skill).weaponMultipliers;

    const weaponProp = variantInfo.type === 'action' ? 'attack' : 'defence';

    const rolls: Array<Roll> = [];
    const args = {
        'weapon:speed': weapon.speed,
        'weapon:attack': weapon.attack,
        'weapon:defence': weapon.defence,
        'weapon:skill': skill,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        'weapon:reach': ReachMultipliers[variantInfo.range!] * weapon.reach,
    };
    if (ap) {
        rolls.push(apRoll(E.evaluate(ap,
            {
                ...args,
                'combat:multiplier': multipliers?.speed ?? 1,
                'weapon:enchantment': weapon.enchantment.speed ?? 0
            })));
    }
    rolls.push(d100roll(E.evaluate(roll, {
        ...args,
        'combat:multiplier': multipliers![weaponProp] ?? 1,
        'weapon:enchantment': ENCHANTMENT_MAGNITUDE[weaponProp] * (weapon.enchantment[weaponProp] ?? 0)
    })));
    if (variantInfo.trick) {
        const trickSkill = skills["skill:trick_fighting"] ?? 0;
        rolls.push({
            name: 'skill:trick_fighting',
            roll: E.constant(trickSkill ? `${trickSkill}d10!` : '1d5!'),
            rollString: trickSkill ? `${trickSkill}d10!` : '1d5!'
        });
    }
    if (damage) {
        rolls.push(damageRoll(damage, multipliers?.damage ?? 1));
    }
    return {
        name,
        rolls
    }
}

const d100roll = (roll: EvalExpression): Roll => ({
    name: 'action:roll',
    roll,
    rollString: `1d100 ${roll.result >= 0 ? '+' : '-'} ${Math.abs(roll.result)}`,
});

const apRoll = (roll: EvalExpression): Roll => ({
    name: 'action:ap',
    roll,
    rollString: `${roll.result}`
});

const damageRoll = (dice: number, multiplier: number): Roll => ({
    name: 'weapon:damage',
    roll: E.constant(`${Math.floor(dice * multiplier)}d5!`),
    rollString: `${Math.floor(dice * multiplier)}d5!`
})