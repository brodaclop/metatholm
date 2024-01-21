import type { Armour } from "./Armour";

export const ARMOUR_LIST: Array<Omit<Armour, 'id'>> = [
    {
        name: 'Gambeson',
        dr: 1,
        hindrance: 0
    },
    {
        name: 'Steel plate',
        dr: 4,
        hindrance: 4,
    },
];