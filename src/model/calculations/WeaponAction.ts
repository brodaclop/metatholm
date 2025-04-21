import { E, type EvalExpression } from "../../logic/Expression";
import { ACTION_VARIANT_PROPERTIES, type Action, type ActionRange, type ActionVariant, type ActionVariantInfo, type Roll } from "../Action";
import { keys } from "../InfoList";
import { WEAPON_AP, WEAPON_ATK, WEAPON_DAMAGE, WEAPON_DEF } from "../Rules";
import { Skill } from "../Skills";
import { ENCHANTMENT_MAGNITUDE, type Weapon } from "../Weapon";

export const calculateWeaponAction = (skills: Partial<Record<Skill, number>>, weapon: Weapon): Action => ({
    name: weapon.name,
    weapon,
    variants: [...keys(weapon.actions), 'action:hop-about' as ActionVariant, 'action:straight-line-move' as ActionVariant].map(v => calculateVariant(v, skills, weapon))
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

    if (variantInfo.defenceBonus) {
        return {
            name,
            rolls: [d100roll(E.evaluate(E.constant(variantInfo.defenceBonus), {}))]
        };
    }


    const multipliers = Skill.get(weapon.skill).weaponMultipliers;
    const skill = calculateSkill(skills[weapon.skill], weapon.actions[name]);

    const rolls: Array<Roll> = [];

    if (variantInfo.type === 'action') {
        rolls.push(apRoll(E.evaluate(WEAPON_AP,
            {
                'weapon:speed': weapon.speed,
                'weapon:skill': skill,
                'combat:multiplier': multipliers?.speed ?? 1,
                'weapon:enchantment': weapon.enchantment.speed ?? 0
            })));
    }
    if (variantInfo.trick) {
        const trickSkill = calculateSkill(skills['skill:trick_fighting'], weapon.actions[name]);
        rolls.push({
            name: 'skill:trick_fighting',
            roll: E.constant(trickSkill > 0 ? `${trickSkill + (weapon.enchantment.attack ?? 0)}d10!` : '1d5!'),
            rollString: trickSkill ? `${trickSkill}d10!` : '1d5!'
        });
    } else {
        const weaponProp = variantInfo.type === 'action' ? 'attack' : 'defence';
        rolls.push(d100roll(E.evaluate(variantInfo.type === 'action' ? WEAPON_ATK : WEAPON_DEF, {
            'weapon:speed': weapon.speed,
            'weapon:attack': weapon.attack,
            'weapon:defence': weapon.defence,
            'weapon:skill': skill,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            'weapon:reach': ReachMultipliers[variantInfo.range!] * weapon.reach,
            'combat:multiplier': multipliers![weaponProp] ?? 1,
            'weapon:enchantment': ENCHANTMENT_MAGNITUDE[weaponProp] * (weapon.enchantment[weaponProp] ?? 0)
        })));
    }
    if (name === 'action:attack' || name === 'action:attack-cq' || name === 'action:attack-range' || name === 'action:hidden-weapon' || name === 'action:spin-behind') {
        rolls.push(damageRoll(E.evaluate(WEAPON_DAMAGE, {
            'weapon:damage': weapon.damage,
            'weapon:skill': skill,
            'combat:multiplier': multipliers?.damage ?? 1,
            'weapon:enchantment': weapon.enchantment.damage ?? 0
        })));
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

const damageRoll = (roll: EvalExpression): Roll => ({
    name: 'weapon:damage',
    roll: E.constant(`${Math.max(1, roll.result)}d5!`),
    rollString: `${Math.max(1, roll.result)}d5!`
})