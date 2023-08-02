import { E } from "../../logic/Expression";
import type { Action } from "../Action";
import { MAGIC_EFFECTIVE_SKILL } from "../Rules";
import type { Skill } from "../Skills";
import type { SpellInfo } from "../Spell";

export const calculateSpellAction = (skills: Partial<Record<Skill, number>>, spell: SpellInfo): Action => {
    const ap = E.evaluate(E.sub(20, E.value('expr:spell_speed')), { 'expr:spell_speed': spell.speed });
    const roll = E.evaluate(MAGIC_EFFECTIVE_SKILL, { 'expr:spell_level': spell.level, 'expr:spell_focus_skill': skills[spell.skill] });
    return {
        name: spell.name,
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
};