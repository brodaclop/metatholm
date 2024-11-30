import type { Entity } from "./Entity";

export type ArmourLabels = 'armour:dr' | 'armour:hindrance';

export interface Armour extends Entity {
    dr: number;
    hindrance: number;
    notes: string;
}