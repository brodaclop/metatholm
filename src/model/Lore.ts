import { entries } from "./InfoList";

const Lore: Record<string, Record<string, Promise<typeof import("*?raw")>>> = {
    en: {
        'main': import('$lib/lore/main_en.md?raw'),
        'character:skills': import('$lib/lore/character/skills_en.md?raw'),
        'rule:exploding_dice': import('$lib/lore/rule/exploding_dice_en.md?raw'),
        'rule:learning_skills': import('$lib/lore/rule/learning_skills_en.md?raw'),
        'rule:skill_check': import('$lib/lore/rule/skill_check_en.md?raw'),
        'character:abilities': import('$lib/lore/character/abilities_en.md?raw'),
        'ability:build': import('$lib/lore/ability/build_en.md?raw'),
        'ability:activity': import('$lib/lore/ability/activity_en.md?raw'),
        'ability:presence': import('$lib/lore/ability/presence_en.md?raw'),
        'ability:magic': import('$lib/lore/ability/magic_en.md?raw'),
        'character:ancestry': import('$lib/lore/character/ancestry_en.md?raw'),
        'ancestry:kalovin': import('$lib/lore/ancestry/kalovin_en.md?raw'),
        'ancestry:almarem': import('$lib/lore/ancestry/almarem_en.md?raw'),
        'ancestry:ilar': import('$lib/lore/ancestry/ilar_en.md?raw'),
        'ancestry:godora': import('$lib/lore/ancestry/godora_en.md?raw'),
        'ancestry:dwarvish': import('$lib/lore/ancestry/dwarvish_en.md?raw'),
        'ancestry:elven': import('$lib/lore/ancestry/elven_en.md?raw'),
        'ancestry:gnomish': import('$lib/lore/ancestry/gnomish_en.md?raw'),
        'ancestry:orcish': import('$lib/lore/ancestry/orcish_en.md?raw'),
        'skill:balance': import('$lib/lore/skill/balance_en.md?raw'),
        'skill:body_focus': import('$lib/lore/skill/body_focus_en.md?raw'),
        'skill:brawling': import('$lib/lore/skill/brawling_en.md?raw'),
        'skill:bamboozling': import('$lib/lore/skill/bamboozling_en.md?raw'),
        'skill:maces': import('$lib/lore/skill/maces_en.md?raw'),
        'skill:pain_threshold': import('$lib/lore/skill/pain_threshold_en.md?raw'),
        'skill:polearms': import('$lib/lore/skill/polearms_en.md?raw'),
        'skill:strength': import('$lib/lore/skill/strength_en.md?raw'),
        'skill:climbing': import('$lib/lore/skill/climbing_en.md?raw'),
        'skill:endurance': import('$lib/lore/skill/endurance_en.md?raw'),
        'skill:life_focus': import('$lib/lore/skill/life_focus_en.md?raw'),
        'skill:stalking': import('$lib/lore/skill/stalking_en.md?raw'),
        'skill:fistfighting': import('$lib/lore/skill/fistfighting_en.md?raw'),
        'skill:jumping': import('$lib/lore/skill/jumping_en.md?raw'),
        'skill:knives': import('$lib/lore/skill/knives_en.md?raw'),
        'skill:reactions': import('$lib/lore/skill/reactions_en.md?raw'),
        'skill:spot_hidden': import('$lib/lore/skill/spot_hidden_en.md?raw'),
        'skill:law': import('$lib/lore/skill/law_en.md?raw'),
        'skill:personal_charm': import('$lib/lore/skill/personal_charm_en.md?raw'),
        'skill:magic_force': import('$lib/lore/skill/magic_force_en.md?raw'),
        'skill:crossbows': import('$lib/lore/skill/crossbows_en.md?raw'),
        'skill:bows': import('$lib/lore/skill/bows_en.md?raw'),
        'skill:throwing_weapons': import('$lib/lore/skill/throwing_weapons_en.md?raw'),
        'skill:martial_arts': import('$lib/lore/skill/martial_arts_en.md?raw'),
        'skill:swords': import('$lib/lore/skill/swords_en.md?raw'),
        'skill:elemental_focus': import('$lib/lore/skill/elemental_focus_en.md?raw'),
        'skill:spacetime_focus': import('$lib/lore/skill/spacetime_focus_en.md?raw'),
        'skill:nature_focus': import('$lib/lore/skill/nature_focus_en.md?raw'),
        'skill:spirit_focus': import('$lib/lore/skill/spirit_focus_en.md?raw'),
        'skill:shadow_focus': import('$lib/lore/skill/shadow_focus_en.md?raw'),
        'skill:sprinting': import('$lib/lore/skill/sprinting_en.md?raw'),
        'skill:reasoning': import('$lib/lore/skill/reasoning_en.md?raw'),
        'skill:bushcraft': import('$lib/lore/skill/bushcraft_en.md?raw'),
        'skill:medicine': import('$lib/lore/skill/medicine_en.md?raw'),
        'skill:camouflage': import('$lib/lore/skill/camouflage_en.md?raw'),
        'skill:history': import('$lib/lore/skill/history_en.md?raw'),
        'skill:geography': import('$lib/lore/skill/geography_en.md?raw'),
        'skill:architecture': import('$lib/lore/skill/architecture_en.md?raw'),
        'skill:etiquette': import('$lib/lore/skill/etiquette_en.md?raw'),
        'skill:alchemy': import('$lib/lore/skill/alchemy_en.md?raw'),
        'skill:enchantment': import('$lib/lore/skill/enchantment_en.md?raw'),
        'background:assassin': import('$lib/lore/background/assassin_en.md?raw'),
        'background:bruiser': import('$lib/lore/background/bruiser_en.md?raw'),
        'background:sneak': import('$lib/lore/background/sneak_en.md?raw'),
        'background:hedge_wizard': import('$lib/lore/background/hedge_wizard_en.md?raw'),
        'background:tinker': import('$lib/lore/background/tinker_en.md?raw'),
        'background:vagabond': import('$lib/lore/background/vagabond_en.md?raw'),
        'background:charmer': import('$lib/lore/background/charmer_en.md?raw'),
        'background:witch': import('$lib/lore/background/witch_en.md?raw'),
    }
}

export const lore = async (id: string, lang: string | null | undefined): Promise<string> => (await Lore[lang ?? 'en'][id]).default;
export const loreCategoryList = async (category: string, lang: string | null | undefined): Promise<Array<{ id: string, title: string }>> => {
    const lorePromises: Array<[string, Promise<string>]> = entries(Lore[lang ?? 'en'])
        .filter(([key]) => key.split(':')[0] === category)
        .map(([key, value]) => ([key, value.then(v => v.default)]));
    const ret: Array<{ id: string, title: string }> = [];
    for (const entry of lorePromises) {
        ret.push({ id: entry[0], title: (await entry[1]).split('\n')[0] })
    }
    return ret;
}

