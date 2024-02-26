import type { Action, ActionRoll, ActionVariantInfo } from "../Action";
import { entries, keys, sort } from "../InfoList";
import { calculateCharacter, type Character } from "../Karakter";
import type { Labels } from "../Labels";
import type { Skill } from "../Skills";
import type { Character as TPCharacter, NumberProp, Tab, Text, TitleSection } from "./InternalTypes";
import { convertInternalToExternal } from "./TPConverter";


const convertToTableplop = (character: Character, i18n: (key: string) => string): TPCharacter => {
    if (!character.tableplop) {
        throw new Error('this should not happen');
    }
    const calculatedCharacter = calculateCharacter(character);
    const text = (name: Labels, value: string): Text => ({
        type: 'text',
        name: i18n(name),
        value: i18n(value)
    });

    const number = (name: Labels, value: number): NumberProp => ({
        type: 'number',
        name: i18n(name),
        value
    });

    const skill = (skill: Skill): NumberProp => ({
        type: 'number',
        name: i18n(skill),
        value: character.skills[skill] ?? 0,
        message: `${i18n(skill)}: {${character.skills[skill] ?? 0}d10!}`
    });

    const roll = (variant: ActionVariantInfo, roll: ActionRoll): string => variant.rolls.find(r => r.name === roll)?.rollString ?? '';

    const variantMessage = (variant: ActionVariantInfo): string => {
        let ret = '';
        ret += `${i18n(variant.name)} ${i18n('tableplop:roll')}: {${roll(variant, 'action:roll')}} `;
        const ap = roll(variant, 'action:ap');
        const dmg = roll(variant, 'label:damage');
        const trick = roll(variant, 'skill:trick_fighting');
        if (dmg) {
            ret += `${i18n('label:damage')}: {${dmg}} `
        }
        if (trick) {
            ret += `${i18n('skill:trick_fighting')}: {${trick}} `
        }
        if (ap) {
            ret += `${i18n('action:ap')}: {ap = ap - ${ap}} {initiative = ap}`
        }
        return ret;
    }

    const variantInfo = (name: string, variant: ActionVariantInfo): Text => ({
        type: 'text',
        name: `${i18n(variant.name)} - ${i18n(name)}`,
        value: `${roll(variant, 'action:ap') || '-'} / ${roll(variant, 'action:roll')}`,
        message: variantMessage(variant)
    });

    const action = (action: Action): TitleSection => ({
        type: 'title-section',
        title: i18n(action.name),
        children: sort(action.variants, 'name', i18n).map(v => variantInfo(action.name, v))
    })

    const generateMainTab = (): Tab => ({
        type: 'tab-section',
        title: i18n('label:character'),
        children: [
            text('character:ancestry', character.ancestry),
            text('character:background', character.background),
            number('character:level', character.levels.length),
            {
                type: 'number',
                name: 'AP',
                value: 10,
                local: true,
                message: `${i18n('action:ap')}: { ap = 1d10! + 10 } {initiative = ap}`
            },
            {
                type: 'health',
                name: i18n('character:ep'),
                local: true,
                max: calculatedCharacter.ep.result,
                curr: character.current.ep
            },
            {
                type: 'health',
                name: i18n('character:fp'),
                local: true,
                max: calculatedCharacter.fp.result,
                curr: character.current.fp
            },
            {
                type: 'health',
                name: i18n('character:mp'),
                local: true,
                max: calculatedCharacter.mp.result,
                curr: character.current.mp
            },
            {
                type: 'title-section',
                title: i18n('character:abilities'),
                children: entries(character.abilities).map(([ability, value]) => number(ability, value)),
                collapsed: true
            },
            {
                type: 'appearance',
                data: character.tableplop?.appearanceBlock
            }

        ]
    });

    const generateSkillTab = (): Tab => ({
        type: 'tab-section',
        title: i18n('character:skills'),
        children: keys(character.skills).map(skill)
    });

    const generateCombatTab = (): Tab => ({
        type: 'tab-section',
        title: i18n('rule:combat'),
        children: sort(calculatedCharacter.weaponActions, 'name', i18n).map(action)
    });

    const generateSpellsTab = (): Tab => ({
        type: 'tab-section',
        title: i18n('character:spells'),
        children: sort(calculatedCharacter.spellActions, 'name', i18n).map(action)
    });


    return {
        appearance: character.tableplop.tokenURL,
        id: character.tableplop.characterId,
        private: character.tableplop.private,
        tabs: [generateMainTab(), generateCombatTab(), generateSpellsTab(), generateSkillTab()]
    }
}

export const generateTableplopJSON = (character: Character, i18n: (key: string) => string): string => {
    const tpChar = convertToTableplop(character, i18n);
    return JSON.stringify(convertInternalToExternal(tpChar));
}
