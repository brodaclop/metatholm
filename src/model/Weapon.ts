import type { Entity } from "./Entity";
import type { Skill } from "./Skills";

export interface Weapon extends Entity {
    attack: number;
    defence: number;
    speed: number;
    range: number;
    damage: number;
    skill: Skill;
}