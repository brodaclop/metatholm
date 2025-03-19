import type { WeaponTemplateVariant } from './Action';
import type { UnarmedSkills } from './Skills';
import type { Weapon } from './Weapon';


export type WeaponListActions = Record<WeaponTemplateVariant, number | undefined>;

export type WeaponListEntry = Pick<Weapon, 'skill' | 'hands' | 'reach'> & { actions: WeaponListActions, name: { en: string, hu: string }, description: { en: string, hu: string } };



export const UNARMED_ACTIONS: Record<typeof UnarmedSkills[number], Weapon['actions']> = {
    'skill:brawling': {
        'action:attack-cq': 1,
        'action:defend-cq': 0,
        'action:close-in': -2,
        'action:disengage': -2,
        'action:keep-close': 1,
        'action:trip': -3,
        'action:spin-behind': -1,
        'action:knockout': -5,
    },
    'skill:fistfighting': {
        'action:attack-cq': 1,
        'action:defend-cq': 0,
        'action:close-in': -1,
        'action:disengage': -1,
        'action:keep-close': 0,
        'action:trip': -5,
        'action:spin-behind': -3,
        'action:knockout': -1,
    },
    'skill:martial_arts': {
        'action:attack-cq': 1,
        'action:defend-cq': 0,
        'action:defend': -1,
        'action:defend-range': -2,
        'action:close-in': 0,
        'action:disengage': 2,
        'action:keep-close': 0,
        'action:trip': -1,
        'action:spin-behind': -3,
        'action:knockout': -5,
    }

}

export const WEAPON_LIST: Array<
    WeaponListEntry
> = [
        {
            name: {
                en: 'Simple dagger',
                hu: 'Egyszerű tőr'
            },
            hands: 0.5,
            reach: 1,
            skill: 'skill:knives',
            actions: {
                'action:attack': undefined,
                'action:attack-cq': 0,
                'action:attack-range': -3,

                'action:defend': -3,
                'action:defend-cq': -1,
                'action:defend-range': undefined,

                'action:close-in': -4,
                'action:disengage': -1,

                'action:keep-close': -2,
                'action:keep-away': undefined,

                'action:hidden-weapon': -1,
                'action:knockout': -2,
                'action:spin-behind': undefined,
                'action:trip': undefined
            },
            description: {
                en: 'Nothing more than a long knife with a sharp point and one or two edges',
                hu: 'Lényegében egy hosszú, hegyes kés egyik vagy mindkét oldalán élesre fenve.'

            }
        },
        {
            name: {
                en: 'Quillon dagger',
                hu: 'Keresztvasas tőr'
            },
            hands: 0.5,
            reach: 1,
            skill: 'skill:knives',
            actions: {
                'action:attack': undefined,
                'action:attack-cq': 0,
                'action:attack-range': -4,

                'action:defend': -1,
                'action:defend-cq': 0,
                'action:defend-range': undefined,

                'action:close-in': -3,
                'action:disengage': -1,

                'action:keep-close': -2,
                'action:keep-away': undefined,

                'action:hidden-weapon': -2,
                'action:knockout': -2,
                'action:spin-behind': undefined,
                'action:trip': undefined
            },
            description: {
                en: 'A Pointy and sharp knife but also with quillons protruding to the sides, allowing for better parrying and more powerful stabs',
                hu: 'Hegyes és éles kés, de kétoldalt keresztvassal ellátva, ami alkalmasabbá teszi a hárításra és erőteljesebb szúrásra is'
            }
        },
        {
            name: {
                en: 'Parrying dagger',
                hu: 'Hárítótőr'
            },
            hands: 0.5,
            reach: 2,
            skill: 'skill:shields',
            actions: {
                'action:attack': undefined,
                'action:attack-cq': -2,
                'action:attack-range': -5,

                'action:defend': -1,
                'action:defend-cq': -1,
                'action:defend-range': -4,

                'action:close-in': -2,
                'action:disengage': -1,

                'action:keep-close': -2,
                'action:keep-away': undefined,

                'action:hidden-weapon': -3,
                'action:knockout': -2,
                'action:spin-behind': undefined,
                'action:trip': undefined
            },
            description: {
                en: 'A dagger specialised for parrying, usually with ample hand protection and large quillons but a less offensive blade',
                hu: 'Hárításra specializált tőr, általában igen jól védi a kézfejet, és nagy, kiálló keresztvasakkal van ellátva, de a pengéje valamivel kevésbé alkalmas támadásra'
            }
        },
        {
            name: {
                en: 'Throwing Knife',
                hu: 'Dobótőr'
            },
            hands: 0.5,
            reach: 1,
            skill: 'skill:knives',
            actions: {
                'action:attack': undefined,
                'action:attack-cq': -4,
                'action:attack-range': 0,

                'action:defend': -3,
                'action:defend-cq': -3,
                'action:defend-range': -5,

                'action:close-in': -4,
                'action:disengage': -3,

                'action:keep-close': -4,
                'action:keep-away': undefined,

                'action:hidden-weapon': 0,
                'action:knockout': -3,
                'action:spin-behind': undefined,
                'action:trip': undefined
            },
            description: {
                en: 'Small, relatively heavy knife with minimal hilt, optimised for throwing',
                hu: 'Kisméretű, viszonylag nehéz kés, dobásra optimalizált, minimális markolattal.'
            }
        },
        {
            name: {
                en: 'One-handed mace',
                hu: 'Egykezes buzogány'
            },
            hands: 1,
            reach: 3,
            skill: 'skill:maces',
            actions: {
                'action:attack': 0,
                'action:attack-cq': -2,
                'action:attack-range': -4,

                'action:defend': -1,
                'action:defend-cq': -2,
                'action:defend-range': -5,

                'action:close-in': -2,
                'action:disengage': -2,

                'action:keep-close': -4,
                'action:keep-away': -3,

                'action:hidden-weapon': -3,
                'action:knockout': 0,
                'action:spin-behind': -4,
                'action:trip': undefined
            },
            description: {
                en: 'It could be simple, it could be well-crafted and ornate but it\'s still just a stick with a weight on the end',
                hu: 'Legyen bár egyszerű vagy aprólékosan és díszesen megmunkált, végső soron csak egy bot egy jó nehéz súllyal a végén'
            }
        },
        {
            name: {
                en: 'Arming sword',
                hu: 'Lovagkard'
            },
            hands: 1,
            reach: 4,
            skill: 'skill:swords',
            actions: {
                'action:attack': 0,
                'action:attack-cq': -2,
                'action:attack-range': -5,

                'action:defend': 0,
                'action:defend-cq': -2,
                'action:defend-range': -2,

                'action:close-in': -2,
                'action:disengage': -2,

                'action:keep-close': -2,
                'action:keep-away': -2,

                'action:hidden-weapon': undefined,
                'action:knockout': -3,
                'action:spin-behind': -2,
                'action:trip': undefined
            },
            description: {
                en: 'Straight and nimble one-handed thrusting and cutting sword with moderate-sized quillons',
                hu: 'Gyors pengéjű, egyenes egykezes szúró és vágó kard, közepes méretű keresztvasakkal'
            }
        },
        {
            name: {
                en: 'Longsword',
                hu: 'Hosszúkard'
            },
            hands: 2,
            reach: 6,
            skill: 'skill:swords',
            actions: {
                'action:attack': 0,
                'action:attack-cq': -2,
                'action:attack-range': -5,

                'action:defend': 0,
                'action:defend-cq': -1,
                'action:defend-range': -2,

                'action:close-in': -1,
                'action:disengage': -1,

                'action:keep-close': -3,
                'action:keep-away': -1,

                'action:hidden-weapon': undefined,
                'action:knockout': -3,
                'action:spin-behind': -1,
                'action:trip': -3
            },
            description: {
                en: 'Straight two-handed cut and thrust sword with a fair bit of length and prominent crossguards',
                hu: 'Kétkezes, hosszú és egyenes szúró-vágó kard méretes keresztvasakkal'
            }
        },
        {
            name: {
                en: 'Zweihänder',
                hu: 'Kétkezes kard'
            },
            hands: 2,
            reach: 8,
            skill: 'skill:swords',
            actions: {
                'action:attack': 0,
                'action:attack-cq': -3,
                'action:attack-range': -6,

                'action:defend': 0,
                'action:defend-cq': -3,
                'action:defend-range': -3,

                'action:close-in': 0,
                'action:disengage': -2,

                'action:keep-close': -3,
                'action:keep-away': 2,

                'action:hidden-weapon': undefined,
                'action:knockout': -5,
                'action:spin-behind': -1,
                'action:trip': -1
            },
            description: {
                en: 'Halfway between a sword and a spear, this specialised sword stands as tall if not taller than its user, with an extra-long hilt, a massive crossguard and a long ricasso for half-swording',
                hu: 'Ez a specializált kard kb. féltávnál van egy kard és egy lándzsa között, hossza általában eléri vagy meghaladja használója magasságát, markolata extra hosszú, hatalmas keresztvassal és méretes rikasszóval van ellátva, a rövidre fogást elősegítendő'
            }
        },
        {
            name: {
                en: 'Spear',
                hu: 'Lándzsa'
            },
            hands: 2,
            reach: 9,
            skill: 'skill:polearms',
            actions: {
                'action:attack': 0,
                'action:attack-cq': -5,
                'action:attack-range': -2,

                'action:defend': -2,
                'action:defend-cq': -5,
                'action:defend-range': -5,

                'action:close-in': 0,
                'action:disengage': -3,

                'action:keep-close': -4,
                'action:keep-away': 1,

                'action:hidden-weapon': undefined,
                'action:knockout': -5,
                'action:spin-behind': -4,
                'action:trip': 0
            },
            description: {
                en: 'Probably one of the most ancient weapons: a pointy stick',
                hu: 'Alighanem a legősibb fegyverek egyike: egy hegyes bot'
            }
        },
    ];
