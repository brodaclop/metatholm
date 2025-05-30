import { fail } from "@sveltejs/kit";
import type { Character, CharacterInfo } from "../../../model/Karakter";
import { ensureInit } from "./Db";
import { activeParty } from "./party";


//TODO: create personal party on user creation
export const listCharacters = async (platform: App.Platform, userId: string): Promise<Array<CharacterInfo>> => {
    const db = await ensureInit(platform);

    const partyId = await activeParty(platform, userId);

    if (partyId) {
        return await db.all(
            'select c.id, c.name, c.background, c.ancestry, c.level, c.user, c.ispublic, u.username ' +
            'from Characters c ' +
            'inner join PartyUserAssoc pa on pa.user_id = c.user and (c.ispublic != 0 or c.user = ?2)' +
            'left join user u where u.id = c.user and pa.party_id = ?1 '
            //+ 'and (c.user is null or exists (select 1 from PartyUserAssoc pa, Party p where pa.user_id = c.user))'
            ,
            ({ id, name, background, ancestry, level, username, user, ispublic, party_id }) => ({
                id,
                name,
                background,
                ancestry,
                level,
                isPublic: ispublic !== 0,
                partyId: party_id,
                userId: user,
                user: username || '<public>'
            } as CharacterInfo), partyId, userId);
    } else {
        return [];
    }

}

//TODO: fix this
export const loadAllCharacters = async (platform: App.Platform): Promise<Array<Character>> => {
    const db = await ensureInit(platform);
    return await db.all('select payload from Characters', ({ payload }) => JSON.parse(payload as string));
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
        await db.run(
            'insert into CharacterArchive (id, user, payload, timestamp) VALUES (?1,?2,?3, ?4)',
            char.character.id, char.user, JSON.stringify(char.character), Date.now()
        );
    }
}

export const loadArchiveVersions = async (platform: App.Platform, id: string): Promise<Array<{ char: Character, timestamp: number }>> => {
    const db = await ensureInit(platform);
    return await db.all(
        'select payload, timestamp from CharacterArchive where id=? order by key desc',
        ({ payload, timestamp }) => ({ char: upgrade(JSON.parse(payload as string)), timestamp: timestamp as number }),
        id
    );
}

const checkCharacterWriteable = async (db: Awaited<ReturnType<typeof ensureInit>>, charId: string, userId?: string) => {
    const currentUser = await db.one('select user from Characters where id=? limit 1', r => r, charId);
    if (currentUser !== null && currentUser.user !== 'global' && currentUser.user !== userId) {
        throw fail(403);
    }
}

export const saveCharacter = async (platform: App.Platform, char: Character, userId: string) => {
    const db = await ensureInit(platform);
    await checkCharacterWriteable(db, char.id, userId);
    await archiveCharacter(platform, char.id);
    await db.run(
        'insert into Characters (id, user, name, ancestry, background, level, ispublic, payload) VALUES (?1,?2,?3,?4,?5,?6,?7,?8) ON CONFLICT(id) DO UPDATE SET name=?3, ancestry=?4, background=?5, level=?6, ispublic=?7, payload=?8',
        char.id, userId, char.name, char.ancestry, char.background, char.levels.length, char.isPublic ? 1 : 0, JSON.stringify(char));
}

export const deleteCharacter = async (platform: App.Platform, char: Pick<Character, 'id'>, userId?: string) => {
    const db = await ensureInit(platform);
    await checkCharacterWriteable(db, char.id, userId);
    await db.run('delete from Characters where id = ?', char.id);
}

export const loadCharacter = async (platform: App.Platform, id: string): Promise<{ character: Character, user: string }> => {
    const db = await ensureInit(platform);
    const ret = await db.one('select payload, user from Characters where id = ?', found => ({ character: upgrade(JSON.parse(found.payload as string)), user: found.user as string }), id);
    if (!ret) {
        throw new Error('Character not found with id: ' + id);
    }
    return ret;
}

const upgrade = (character: Character): Character => {
    // changed action:counter to action:keep-away
    character.inventory.weapons.forEach(w => {
        if ('action:counter' in w.actions) {
            w.actions['action:keep-away'] = w.actions['action:counter'] as number;
            delete w.actions['action:counter'];
        }
    });
    character.inventory.weapons.forEach(w => {
        // temporarily removed action:disarm
        if ('action:disarm' in w.actions) {
            delete w.actions['action:disarm'];
        }
        // add missing empty container for enchantments
        w.enchantment = w.enchantment ?? {};
    });
    // renamed Vagabond background to Rover
    if ((character.background as unknown) === 'background:vagabond') {
        character.background = 'background:rover';
    }
    // added armours to inventory
    character.inventory.armours = character.inventory.armours ?? [];
    // added public flag, defaults to true if missing
    character.isPublic = character.isPublic ?? true;
    // added patron, ip and spirit animal, should default to empty values
    character.patron = character.patron ?? '';
    character.ip = character.ip ?? 0;
    character.spiritAnimals = character.spiritAnimals ?? [];
    // added wealth, should default to 0
    character.wealth = character.wealth ?? 0;
    return character;
}