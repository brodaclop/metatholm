import type { KVNamespace } from "@cloudflare/workers-types";
import type { Character, CharacterInfo } from "../../model/Karakter";


export const listCharacters = async (platform: App.Platform): Promise<Array<CharacterInfo>> => {
    const ids = (await platform.env.CHARACTER_DB.list()).keys;
    return ids.map(idRec => {
        const id = idRec.name;
        const { name, background, ancestry, level } = idRec.metadata as Omit<CharacterInfo, 'id'>;
        return {
            id, name, background, ancestry, level: Number(level)
        } as CharacterInfo;
    });
}

export const loadAllCharacters = async (platform: App.Platform): Promise<Array<Character>> => {
    return Promise.all((await listCharacters(platform)).map(info => loadCharacter(platform, info.id)));
}

export const saveCharacter = async (platform: App.Platform, char: Character) => {
    const value = JSON.stringify(char);
    await platform.env.CHARACTER_DB.put(char.id, value, {
        metadata: {
            name: char.name,
            ancestry: char.ancestry,
            background: char.background,
            level: char.levels.length
        }
    });
}

export const deleteCharacter = async (platform: App.Platform, char: Pick<Character, 'id'>) => {
    await platform.env.CHARACTER_DB.delete(char.id);
}

export const wipe = async (platform: App.Platform) => {
    const list = await listCharacters(platform);
    await Promise.all(list.map(c => deleteCharacter(platform, c)));
}

export const loadCharacter = async (platform: App.Platform, id: string): Promise<Character> => {
    return upgrade(await platform.env.CHARACTER_DB.get(id, { type: 'json' }) as Character);
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
    return character;
}