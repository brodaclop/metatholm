import type { NPC } from "./Npc";

export interface Encounter {
    id: string;
    name: string;
    npcs: Array<NPC>;
    notes: string;
}