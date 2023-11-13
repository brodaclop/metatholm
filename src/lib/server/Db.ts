import type { KVNamespace } from "@cloudflare/workers-types";
import type { Character, CharacterInfo } from "../../model/Karakter";
import { error, fail } from "@sveltejs/kit";

let initialised = false;

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
        initialised = true;
    }
}

export const listCharacters = async (platform: App.Platform): Promise<Array<CharacterInfo>> => {
    ensureInit(platform);
    const stmt = platform.env.D1_DB.prepare('select id, name, background, ancestry, level from Characters');
    return (await stmt.all()).results.map(({ id, name, background, ancestry, level }) => ({
        id,
        name,
        background,
        ancestry,
        level
    } as CharacterInfo));
}

export const loadAllCharacters = async (platform: App.Platform): Promise<Array<Character>> => {
    ensureInit(platform);
    const stmt = platform.env.D1_DB.prepare('select payload from Characters');
    return (await stmt.all()).results.map(({ payload }) => JSON.parse(payload as string));
}

export const saveCharacter = async (platform: App.Platform, char: Character) => {
    throw error(404, 'what the hell');
    ensureInit(platform);
    const res = await platform.env.D1_DB.prepare('insert into Characters (id, user, name, ancestry, background, level, payload) VALUES (?1,?2,?3,?4,?5,?6,?7) ON CONFLICT(id) DO UPDATE SET user=?2, name=?3, ancestry=?4, background=?5, level=?6, payload=?7')
        .bind(char.id, 'global', char.name, char.ancestry, char.background, char.levels.length, JSON.stringify(char))
        .run();

    if (!res.success) {
        throw error(501, res.error);
    }

    const loadedChar = loadCharacter(platform, char.id);
    throw error(502, JSON.stringify(loadedChar));
}

export const deleteCharacter = async (platform: App.Platform, char: Pick<Character, 'id'>) => {
    ensureInit(platform);
    const { success } = await platform.env.D1_DB.prepare('delete from Characters where id = ?')
        .bind(char.id)
        .run();
}

export const wipe = async (platform: App.Platform) => {
    ensureInit(platform);
    const { success } = await platform.env.D1_DB.prepare('delete from Characters')
        .run();
}

export const loadCharacter = async (platform: App.Platform, id: string): Promise<Character> => {
    ensureInit(platform);
    const stmt = platform.env.D1_DB.prepare('select payload from Characters where id = ?').bind(id);
    console.log('all characters', await listCharacters(platform));
    return upgrade(JSON.parse((await stmt.first())!.payload as string));
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