import type { Ability } from "./Abilities";
import { createList } from "./InfoList";

export type Species = 'species:orc' | 'species:elf';

export interface SpeciesInfo {
    name: Species;
    abilities: Partial<Record<Ability, number>>;
}

const SpeciesInfos: Record<Species, Omit<SpeciesInfo, 'name'>> = {
    'species:orc': {
        abilities: {
            'ability:build': 2,
            'ability:activity': 2,
            'ability:magic': -2
        }
    },
    'species:elf': {
        abilities: {
            'ability:build': -2,
            'ability:presence': 2,
            'ability:magic': 2
        }
    }
}

export const Species = createList(SpeciesInfos);
