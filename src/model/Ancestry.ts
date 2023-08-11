import type { Ability } from "./Abilities";
import { createList } from "./InfoList";

export type Ancestry = 'ancestry:orcish' | 'ancestry:elven' | 'ancestry:dwarvish' | 'ancestry:gnomish' | 'ancestry:kalovin' | 'ancestry:godora' | 'ancestry:ilar' | 'ancestry:almarem';

export interface AncestryInfo {
    name: Ancestry;
    abilities: Partial<Record<Ability, number>>;
}

const AncestryInfos: Record<Ancestry, Omit<AncestryInfo, 'name'>> = {
    'ancestry:orcish': {
        abilities: {
            'ability:build': 2,
            'ability:activity': 2,
            'ability:magic': -2
        }
    },
    'ancestry:elven': {
        abilities: {
            'ability:build': -2,
            'ability:presence': 2,
            'ability:magic': 2
        }
    },
    'ancestry:dwarvish': {
        abilities: {
            'ability:build': 2,
            'ability:activity': -2,
            'ability:presence': 2

        }
    },
    'ancestry:gnomish': {
        abilities: {
            'ability:activity': 2,
            'ability:presence': -2,
            'ability:magic': 2,
        }
    },
    'ancestry:kalovin': {
        abilities: {
            'ability:build': 1,
            'ability:activity': -1,
            'ability:presence': 1,
            'ability:magic': 1,
        }
    },
    'ancestry:godora': {
        abilities: {
            'ability:build': 1,
            'ability:activity': 1,
            'ability:presence': -1,
            'ability:magic': 1,
        }
    },
    'ancestry:ilar': {
        abilities: {
            'ability:build': -1,
            'ability:activity': 1,
            'ability:presence': 1,
            'ability:magic': 1,
        }
    },
    'ancestry:almarem': {
        abilities: {
            'ability:build': 1,
            'ability:activity': 1,
            'ability:presence': 1,
            'ability:magic': -1,
        }
    },
}

export const Ancestry = createList(AncestryInfos);
