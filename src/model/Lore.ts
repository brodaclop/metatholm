import skills_en from '$lib/lore/character/skills_en.md?raw';
import exploding_dice_en from '$lib/lore/rule/exploding_dice_en.md?raw';
import learning_skills_en from '$lib/lore/rule/learning_skills_en.md?raw';

import balance_en from '$lib/lore/skill/balance_en.md?raw';
import law_en from '$lib/lore/skill/law_en.md?raw';

import abilities_en from '$lib/lore/character/abilities_en.md?raw';
import build_en from '$lib/lore/ability/build_en.md?raw';
import activity_en from '$lib/lore/ability/activity_en.md?raw';
import presence_en from '$lib/lore/ability/presence_en.md?raw';
import magic_en from '$lib/lore/ability/magic_en.md?raw';


const Lore: Record<string, Record<string, string>> = {
    en: {
        'character:skills': skills_en,
        'rule:exploding_dice': exploding_dice_en,
        'rule:learning_skills': learning_skills_en,
        'skill:balance': balance_en,
        'skill:law': law_en,
        'character:abilities': abilities_en,
        'ability:build': build_en,
        'ability:activity': activity_en,
        'ability:presence': presence_en,
        'ability:magic': magic_en
    }
}


export const lore = (id: string, lang: string | null | undefined): string => Lore[lang ?? 'en'][id];

