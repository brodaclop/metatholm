import { createList } from "./InfoList";

export type SpiritAnimal =
    // | 'spirit:badger'
    // | 'spirit:bat'
    | 'spirit:bear'
    // | 'spirit:boar'
    | 'spirit:cat'
    // | 'spirit:chameleon'
    // | 'spirit:dog'
    // | 'spirit:dove'
    // | 'spirit:gecko'
    // | 'spirit:parrot'
    // | 'spirit:wolf';
    ;

export type SpiritManifestation =
    //    | 'manifestation:ears'
    | 'manifestation:paws'
    | 'manifestation:fur'
    | 'manifestation:eyes'
    //    | 'manifestation:skin'
    //    | 'manifestation:nose'
    //    | 'manifestation:beak';
    ;

export type SpiritEffects =
    | 'effect:tree_climbing'
    | 'effect:resist_normal_cold'
    | 'effect:see_in_dark'
    | 'effect:land_on_feet'

export interface SpiritAnimalInfo {
    name: SpiritAnimal;
    manifestations: Partial<Record<SpiritManifestation, SpiritEffects>>;
}

const Spirits: Record<SpiritAnimal, Omit<SpiritAnimalInfo, 'name'>> = {
    'spirit:bear': {
        manifestations: {
            'manifestation:paws': 'effect:tree_climbing',
            'manifestation:fur': 'effect:resist_normal_cold'
        }
    },
    'spirit:cat': {
        manifestations: {
            'manifestation:paws': 'effect:land_on_feet',
            'manifestation:eyes': 'effect:see_in_dark'
        }
    },
}

export const Spirit = {
    ...createList(Spirits)
}