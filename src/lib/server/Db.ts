import type { Character, CharacterInfo } from "../../model/Karakter";
import { fail } from "@sveltejs/kit";
import type { NPC } from "../../model/npc/Npc";
import type { Encounter } from "../../model/npc/Encounter";
import { wrapDb } from "./db-wrapper";

let initialised = false;

//TODO: use virtual generated columns for name, ancestry, background and level

const ensureInit = async (platform: App.Platform) => {
    if (!initialised) {
        await platform.env.D1_DB.exec(
            'CREATE TABLE IF NOT EXISTS Characters (' +
            'id string primary key,' +
            'user string not null,' +
            'name string not null,' +
            'ancestry string not null,' +
            'background string not null,' +
            'level integer not null,' +
            'payload text not null' +
            ')'
        );
        //await platform.env.D1_DB.exec('drop table if exists CharacterArchive');
        await platform.env.D1_DB.exec(
            'CREATE TABLE IF NOT EXISTS CharacterArchive (' +
            'key integer primary key autoincrement, ' +
            'id string not null,' +
            'user string not null,' +
            'timestamp integer not null,' +
            'payload text not null' +
            ')'
        );

        //await platform.env.D1_DB.exec('drop table if exists NPC');
        await platform.env.D1_DB.exec(
            'CREATE TABLE IF NOT EXISTS NPC (' +
            'id string primary key,' +
            'user string not null,' +
            'payload text not null,' +
            'name as (json_extract(payload, \'$.name\'))' +
            ')'
        );

        await platform.env.D1_DB.exec(
            'CREATE TABLE IF NOT EXISTS Encounters (' +
            'id string primary key,' +
            'user string not null,' +
            'payload text not null,' +
            'name as (json_extract(payload, \'$.name\'))' +
            ')'
        );


        initialised = true;
    }
    return wrapDb(platform);
}

export const listCharacters = async (platform: App.Platform): Promise<Array<CharacterInfo>> => {
    const db = await ensureInit(platform);
    const stmt = db.prepare('select c.id, c.name, c.background, c.ancestry, c.level, u.username from Characters c left join user u where u.id = c.user');
    return (await stmt.all()).results.map(({ id, name, background, ancestry, level, username }) => ({
        id,
        name,
        background,
        ancestry,
        level,
        user: username || '<public>'
    } as CharacterInfo));
}

export const loadAllCharacters = async (platform: App.Platform): Promise<Array<Character>> => {
    const db = await ensureInit(platform);
    const stmt = db.prepare('select payload from Characters');
    return (await stmt.all()).results.map(({ payload }) => JSON.parse(payload as string));
}

const archiveCharacter = async (platform: App.Platform, id: string) => {
    const db = await ensureInit(platform);
    let char: { character: Character, user: string } | undefined = undefined;
    try {
        char = await loadCharacter(platform, id);
    } catch (e) {
        // this is normal
    }

    if (char) {
        await db.prepare('insert into CharacterArchive (id, user, payload, timestamp) VALUES (?1,?2,?3, ?4)')
            .bind(char.character.id, char.user, JSON.stringify(char.character), Date.now())
            .run();
    }
}

export const loadArchiveVersions = async (platform: App.Platform, id: string): Promise<Array<{ char: Character, timestamp: number }>> => {
    const db = await ensureInit(platform);
    const stmt = db.prepare('select payload, timestamp from CharacterArchive where id=? order by key desc').bind(id);
    return (await stmt.all()).results.map(({ payload, timestamp }) => ({ char: JSON.parse(payload as string), timestamp: timestamp as number }));
}

const checkCharacterWriteable = async (platform: App.Platform, charId: string, userId?: string) => {
    const db = await ensureInit(platform);
    const currentUser = await db.prepare('select user from Characters where id=? limit 1').bind(charId).first();
    if (currentUser !== null && currentUser.user !== 'global' && currentUser.user !== userId) {
        throw fail(403);
    }
}

export const saveCharacter = async (platform: App.Platform, char: Character, userId: string) => {
    const db = await ensureInit(platform);
    await checkCharacterWriteable(platform, char.id, userId);
    //await archiveCharacter(platform, char.id);
    const res = await db.prepare('insert into Characters (id, user, name, ancestry, background, level, payload) VALUES (?1,?2,?3,?4,?5,?6,?7) ON CONFLICT(id) DO UPDATE SET name=?3, ancestry=?4, background=?5, level=?6, payload=?7')
        .bind(char.id, userId, char.name, char.ancestry, char.background, char.levels.length, JSON.stringify(char))
        .run();
}

export const deleteCharacter = async (platform: App.Platform, char: Pick<Character, 'id'>, userId?: string) => {
    const db = await ensureInit(platform);
    await checkCharacterWriteable(platform, char.id, userId);

    const { success } = await db.prepare('delete from Characters where id = ?')
        .bind(char.id)
        .run();
}

export const loadCharacter = async (platform: App.Platform, id: string): Promise<{ character: Character, user: string }> => {
    const db = await ensureInit(platform);
    const stmt = db.prepare('select payload, user from Characters where id = ?').bind(id);
    const found = await stmt.first();
    if (!found) {
        throw new Error('Character not found with id: ' + id);
    }
    return { character: upgrade(JSON.parse(found.payload as string)), user: found.user as string };
}

export const saveNPC = async (platform: App.Platform, char: NPC) => {
    const db = await ensureInit(platform);
    const res = await db.prepare('insert into NPC (id, user, payload) VALUES (?1,?2,?3) ON CONFLICT(id) DO UPDATE SET user=?2, payload=?3')
        .bind(char.id, 'global', JSON.stringify(char))
        .run();
}

export const listNPCs = async (platform: App.Platform): Promise<Array<Pick<NPC, 'id' | 'name'>>> => {
    const db = await ensureInit(platform);
    const stmt = db.prepare('select id, name from NPC');
    return (await stmt.all()).results.map(({ id, name }) => ({
        id,
        name,
    } as Pick<NPC, 'id' | 'name'>));
}

export const deleteNPC = async (platform: App.Platform, char: Pick<NPC, 'id'>) => {
    const db = await ensureInit(platform);
    const { success } = await db.prepare('delete from NPC where id = ?')
        .bind(char.id)
        .run();
}

export const loadNPC = async (platform: App.Platform, id: string): Promise<NPC> => {
    const db = await ensureInit(platform);
    const stmt = db.prepare('select payload from NPC where id = ?').bind(id);
    const found = await stmt.first();
    if (!found) {
        throw new Error('NPC not found with id: ' + id);
    }
    return JSON.parse(found.payload as string);
}

export const loadAllNPCs = async (platform: App.Platform): Promise<Array<NPC>> => {
    const db = await ensureInit(platform);
    const stmt = db.prepare('select payload from NPC');
    return (await stmt.all()).results.map(({ payload }) => JSON.parse(payload as string));
}

export const saveEncounter = async (platform: App.Platform, enc: Encounter) => {
    const db = await ensureInit(platform);
    const res = await db.prepare('insert into Encounters (id, user, payload) VALUES (?1,?2,?3) ON CONFLICT(id) DO UPDATE SET user=?2, payload=?3')
        .bind(enc.id, 'global', JSON.stringify(enc))
        .run();
}

export const listEncounters = async (platform: App.Platform): Promise<Array<Pick<Encounter, 'id' | 'name'>>> => {
    const db = await ensureInit(platform);
    const stmt = db.prepare('select id, name from Encounters');
    return (await stmt.all()).results.map(({ id, name }) => ({
        id,
        name,
    } as Pick<Encounter, 'id' | 'name'>));
}

export const deleteEncounter = async (platform: App.Platform, char: Pick<Encounter, 'id'>) => {
    const db = await ensureInit(platform);
    const { success } = await db.prepare('delete from Encounters where id = ?')
        .bind(char.id)
        .run();
}

export const loadEncounter = async (platform: App.Platform, id: string): Promise<Encounter> => {
    const db = await ensureInit(platform);
    const stmt = db.prepare('select payload from Encounters where id = ?').bind(id);
    const found = await stmt.first();
    if (!found) {
        throw new Error('Encounter not found with id: ' + id);
    }
    return JSON.parse(found.payload as string);
}

const upgrade = (character: Character): Character => {
    // changed action:counter to action:keep-away
    character.inventory.weapons.forEach(w => {
        if ('action:counter' in w.actions) {
            w.actions['action:keep-away'] = w.actions['action:counter'] as number;
            delete w.actions['action:counter'];
        }
    });
    // temporarily removed action:disarm
    character.inventory.weapons.forEach(w => {
        if ('action:disarm' in w.actions) {
            delete w.actions['action:disarm'];
        }
    });
    // added armours to inventory
    character.inventory.armours = character.inventory.armours ?? [];
    return character;
}