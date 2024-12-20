import type { ActionVariant } from "./Action";
import type { Entity } from "./Entity";
import type { Skill } from "./Skills";

export interface Weapon extends Entity {
    attack: number;
    defence: number;
    speed: number;
    reach: number;
    damage: number;
    skill: Skill;
    actions: Partial<Record<ActionVariant, number>>;
    notes: string;
    hands: 0.5 | 1 | 1.5 | 2;
}