import type { Skill } from "../Skills";
import type { Spell } from "../Spell";

export interface NPC {
    name: string;
    ep: number;
    maxEp: number;
    maxFp: number;
    fp: number;
    dr: number;
    magic_res: number;
    spot_hidden: number;
    reactions: number;
    weapons: Array<{
        name: string;
        ap: number;
        dmg: number;
        disengageCloseIn: [number | null, number | null];
        keepCloseKeepAway: [number | null, number | null];
        attack: [number | null, number | null, number | null];
        defend: [number | null, number | null, number | null];
    }>;
    spells: Array<{
        name: Spell,
        strength: number;
        count: number;
        maxCount: number;
        ap: number;
    }>;
    extra_skills: Array<{
        name: Skill;
        level: number;
    }

}