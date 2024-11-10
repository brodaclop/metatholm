import type { SpiritAnimal, SpiritEffects, SpiritManifestation } from "../Spirits";
import type { Language } from "./Labels";

type UILabels =
    | 'label:spirit_animal'
    | 'label:spirit_manifestation'
    | 'label:spirit_effect'

export const SpiritLabels: Record<Language, Record<SpiritEffects | SpiritAnimal | SpiritManifestation | UILabels, string>> = {
    en: {
        "effect:land_on_feet": 'You always land on your feet, no matter how high you fall from.',
        'effect:resist_normal_cold': 'You never feel cold in non-magical cold.',
        'effect:see_in_dark': 'You can see in the dark.',
        'effect:tree_climbing': 'You can climb trees and poles as fast as you can walk.',
        'manifestation:eyes': 'Eyes',
        'manifestation:fur': 'Fur',
        'manifestation:paws': 'Paws',
        'spirit:bear': 'Bear',
        'spirit:cat': 'Cat',
        'label:spirit_animal': 'Spirit Animal',
        'label:spirit_manifestation': 'Manifestation',
        'label:spirit_effect': 'Effect',
    },
    hu: {
        "effect:land_on_feet": 'Akármilyen magasról esel, mindig talpra érkezel.',
        'effect:resist_normal_cold': 'Sosem fázol nem mágikus hidegben',
        'effect:see_in_dark': 'Látsz a sötétben',
        'effect:tree_climbing': 'Olyan gyorsan tudsz fára mászni, mint ahogy gyalogolni.',
        'manifestation:eyes': 'Szem',
        'manifestation:fur': 'Bunda',
        'manifestation:paws': 'Mancs',
        'spirit:bear': 'Medve',
        'spirit:cat': 'Macska',
        'label:spirit_animal': 'Totemállat',
        'label:spirit_manifestation': 'Megnyilvánulás',
        'label:spirit_effect': 'Hatás',
    }
}