import type { Armour } from "./Armour";

export const ARMOUR_LIST: Array<Omit<Armour, 'id'>> = [
    {
        name: 'Gambeson',
        dr: 1,
        hindrance: 0
    },
    {
        name: 'Plate harness',
        dr: 5,
        hindrance: 4,
    },
];