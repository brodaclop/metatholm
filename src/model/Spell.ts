import type { Keys } from "./Labels";
import type { Skill } from "./Skills";

export interface Spell {
    name: typeof Keys[number];
    speed: number;
    level: number;
    skill: Skill,
}