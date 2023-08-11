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
import ancestry_en from '$lib/lore/character/ancestry_en.md?raw';
import kalovin_en from '$lib/lore/ancestry/kalovin_en.md?raw';
import almarem_en from '$lib/lore/ancestry/almarem_en.md?raw';
import ilar_en from '$lib/lore/ancestry/ilar_en.md?raw';
import godora_en from '$lib/lore/ancestry/godora_en.md?raw';
import dwarvish_en from '$lib/lore/ancestry/dwarvish_en.md?raw';
import elven_en from '$lib/lore/ancestry/elven_en.md?raw';
import gnomish_en from '$lib/lore/ancestry/gnomish_en.md?raw';
import orcish_en from '$lib/lore/ancestry/orcish_en.md?raw';


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
        'ability:magic': magic_en,
        'character:ancestry': ancestry_en,
        'ancestry:kalovin': kalovin_en,
        'ancestry:almarem': almarem_en,
        'ancestry:ilar': ilar_en,
        'ancestry:godora': godora_en,
        'ancestry:dwarvish': dwarvish_en,
        'ancestry:elven': elven_en,
        'ancestry:gnomish': gnomish_en,
        'ancestry:orcish': orcish_en
    }
}


export const lore = (id: string, lang: string | null | undefined): string => Lore[lang ?? 'en'][id];

