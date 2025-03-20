import { createList } from "./InfoList";

export type SpiritAnimal =
    // | 'spirit:bat'
    | 'spirit:bear'
    | 'spirit:boar'
    | 'spirit:cat'
    | 'spirit:squirrel'
    | 'spirit:wolf'
    // | 'spirit:snake'
    // | 'spirit:stag'
    // | 'spirit:bee'
    // | 'spirit:horse'
    // | 'spirit:lizard'
    // | 'spirit:raven'
    // | 'spirit:goose'
    // | 'spirit:hare'
    ;

export type SpiritManifestation =
    | 'manifestation:bear:paws'
    | 'manifestation:bear:fur'
    | 'manifestation:bear:nose'
    | 'manifestation:bear:fangs'
    | 'manifestation:bear:sleep'
    | 'manifestation:bear:visage'
    | 'manifestation:cat:eyes'
    | 'manifestation:cat:paws'
    | 'manifestation:cat:whiskers'
    | 'manifestation:cat:dexterity'
    | 'manifestation:cat:ears'
    | 'manifestation:cat:tail'
    | 'manifestation:squirrel:eyes'
    | 'manifestation:squirrel:legs'
    | 'manifestation:squirrel:paws'
    | 'manifestation:squirrel:tail'
    | 'manifestation:squirrel:ears'
    | 'manifestation:squirrel:fur'
    | 'manifestation:boar:tusks'
    | 'manifestation:boar:appetite'
    | 'manifestation:boar:strength'
    | 'manifestation:boar:nerves'
    | 'manifestation:boar:courage'
    | 'manifestation:boar:luck'
    | 'manifestation:wolf:nose'
    | 'manifestation:wolf:hunger'
    | 'manifestation:wolf:eyes'
    | 'manifestation:wolf:heart'
    | 'manifestation:wolf:howl'
    | 'manifestation:wolf:feet'
    ;

export type SpiritEffects =
    | 'effect:tree_climbing'
    | 'effect:resist_normal_cold'
    | 'effect:see_in_dark'
    | 'effect:land_on_feet'
    | 'effect:exceptional_smell'
    | 'effect:hibernation'
    | 'effect:intimidating_presence'
    | 'effect:friend_shaped'
    | 'effect:detect_spirits'
    | 'effect:wriggle_free'
    | 'effect:exceptional_hearing'
    | 'effect:follow_tracks'
    | 'effect:circular_vision'
    | 'effect:zigzagging'
    | 'effect:glide'
    | 'effect:messenger'
    | 'effect:insatiable'
    | 'effect:exceptional_swimmer'
    | 'effect:poison_immune'
    | 'effect:pack_fighter'
    | 'effect:gambler'
    | 'effect:sense_friends'
    | 'effect:gorge'
    | 'effect:mask_party_size'
    | 'effect:sense_disturbance'
    ;
export interface SpiritAnimalInfo {
    name: SpiritAnimal;
    manifestations: Partial<Record<SpiritManifestation, SpiritEffects>>;
}

const Spirits: Record<SpiritAnimal, Omit<SpiritAnimalInfo, 'name'>> = {
    'spirit:bear': {
        manifestations: {
            'manifestation:bear:paws': 'effect:tree_climbing',
            'manifestation:bear:fur': 'effect:resist_normal_cold',
            'manifestation:bear:nose': 'effect:exceptional_smell',
            'manifestation:bear:sleep': 'effect:hibernation',
            'manifestation:bear:fangs': 'effect:intimidating_presence',
            'manifestation:bear:visage': 'effect:friend_shaped'
        }
    },
    'spirit:cat': {
        manifestations: {
            'manifestation:cat:tail': 'effect:land_on_feet',
            'manifestation:cat:eyes': 'effect:see_in_dark',
            'manifestation:cat:whiskers': 'effect:detect_spirits',
            'manifestation:cat:dexterity': 'effect:wriggle_free',
            'manifestation:cat:ears': 'effect:exceptional_hearing',
            'manifestation:cat:paws': 'effect:follow_tracks',
        }
    },
    'spirit:squirrel': {
        manifestations: {
            'manifestation:squirrel:eyes': 'effect:circular_vision',
            'manifestation:squirrel:legs': 'effect:zigzagging',
            'manifestation:squirrel:paws': 'effect:tree_climbing',
            'manifestation:squirrel:tail': 'effect:glide',
            'manifestation:squirrel:ears': 'effect:messenger',
            'manifestation:squirrel:fur': 'effect:friend_shaped'
        }
    },
    'spirit:boar': {
        manifestations: {
            'manifestation:boar:tusks': 'effect:intimidating_presence',
            'manifestation:boar:appetite': 'effect:insatiable',
            'manifestation:boar:strength': 'effect:exceptional_swimmer',
            'manifestation:boar:nerves': 'effect:poison_immune',
            'manifestation:boar:courage': 'effect:pack_fighter',
            'manifestation:boar:luck': 'effect:gambler'

        }
    },
    'spirit:wolf': {
        manifestations: {
            'manifestation:wolf:nose': 'effect:exceptional_smell',
            'manifestation:wolf:howl': 'effect:sense_friends',
            'manifestation:wolf:hunger': 'effect:gorge',
            'manifestation:wolf:feet': 'effect:mask_party_size',
            'manifestation:wolf:heart': 'effect:sense_disturbance',
            'manifestation:wolf:eyes': 'effect:see_in_dark'
        }
    }
}

export const Spirit = {
    ...createList(Spirits)
}