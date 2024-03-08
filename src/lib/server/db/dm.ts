import type { Encounter } from "../../../model/npc/Encounter";
import type { NPC } from "../../../model/npc/Npc";
import { ensureInit } from "./Db";

export const saveNPC = async (platform: App.Platform, char: NPC, userId: string) => {
    const db = await ensureInit(platform);
    await db.run('insert into NPC (id, user, payload) VALUES (?1,?2,?3) ON CONFLICT(id) DO UPDATE SET user=?2, payload=?3',
        char.id, userId, JSON.stringify(char));
}

export const listNPCs = async (platform: App.Platform, userId: string): Promise<Array<Pick<NPC, 'id' | 'name'>>> => {
    const db = await ensureInit(platform);
    return db.all('select id, name from NPC where user=?1', ({ id, name }) => ({ id, name } as Pick<NPC, 'id' | 'name'>), userId);
}

export const deleteNPC = async (platform: App.Platform, char: Pick<NPC, 'id'>, userId: string) => {
    const db = await ensureInit(platform);
    await db.run('delete from NPC where id = ?1 and user = ?2', char.id, userId);
}

export const loadNPC = async (platform: App.Platform, id: string, userId: string): Promise<NPC> => {
    const db = await ensureInit(platform);
    const ret = await db.one('select payload from NPC where id = ?1 and user=?2', found => JSON.parse(found.payload as string), id, userId);
    if (!ret) {
        throw new Error('NPC not found with id: ' + id);
    }
    return ret;
}

export const loadAllNPCs = async (platform: App.Platform, userId: string): Promise<Array<NPC>> => {
    const db = await ensureInit(platform);
    return db.all('select payload from NPC where user = ?1', ({ payload }) => JSON.parse(payload as string), userId);
}

export const saveEncounter = async (platform: App.Platform, enc: Encounter, userId: string) => {
    const db = await ensureInit(platform);
    await db.run(
        'insert into Encounters (id, user, payload) VALUES (?1,?2,?3) ON CONFLICT(id) DO UPDATE SET user=?2, payload=?3',
        enc.id, userId, JSON.stringify(enc));
}

export const listEncounters = async (platform: App.Platform, userId: string): Promise<Array<Pick<Encounter, 'id' | 'name'>>> => {
    const db = await ensureInit(platform);
    return await db.all('select id, name from Encounters where user = ?1', ({ id, name }) => ({
        id,
        name,
    } as Pick<Encounter, 'id' | 'name'>), userId);
}

export const deleteEncounter = async (platform: App.Platform, enc: Pick<Encounter, 'id'>, userId: string) => {
    const db = await ensureInit(platform);
    await db.run('delete from Encounters where id = ?1 and user = ?2', enc.id, userId);
}

export const loadEncounter = async (platform: App.Platform, id: string, userId: string): Promise<Encounter> => {
    const db = await ensureInit(platform);
    const ret = await db.one('select payload from Encounters where id = ?1 and user = ?2', found => JSON.parse(found.payload as string), id, userId);
    if (!ret) {
        throw new Error('Encounter not found with id: ' + id);
    }
    return ret;
}