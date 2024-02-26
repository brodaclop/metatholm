import { E } from "../../logic/Expression";
import type { Action, ActionVariantInfo } from "../Action";
import { MAGIC_EFFECTIVE_SKILL, SPELL_AP } from "../Rules";
import type { Skill } from "../Skills";
import type { SpellInfo } from "../Spell";

const CastActions = ['action:cast', 'action:cast-slow', 'action:cast-snap'] as const;

const SpeedModifiers: Record<typeof CastActions[number], number> = {
    'action:cast': 1,
    'action:cast-snap': 2,
    'action:cast-slow': 0
}

const LevelModifiers: Record<typeof CastActions[number], number> = {
    'action:cast': 0,
    'action:cast-slow': -1,
    'action:cast-snap': 1
}

export const calculateSpellAction = (skills: Partial<Record<Skill, number>>, spell: SpellInfo): Action => {
    const variants: Array<ActionVariantInfo> = CastActions.map(av => {
        const ap = E.evaluate(SPELL_AP, { 'expr:spell_speed': Math.min(20, spell.speed * SpeedModifiers[av]), 'expr:spell_focus_skill': skills[spell.skill] });
        const roll = E.evaluate(MAGIC_EFFECTIVE_SKILL, { 'expr:spell_level': Math.max(0, spell.level + LevelModifiers[av]), 'expr:spell_focus_skill': skills[spell.skill] });
        return roll.result > 0 ? {
            name: av,
            rolls: [
                {
                    name: 'action:ap',
                    roll: ap,
                    rollString: ap.result
                },
                {
                    name: 'action:roll',
                    roll,
                    rollString: `${roll.result}d10!`
                }
            ]
        } : undefined;
    }).filter(x => x !== undefined) as Array<ActionVariantInfo>;
    return {
        name: spell.name,
        spell: spell.name,
        variants
    };
};