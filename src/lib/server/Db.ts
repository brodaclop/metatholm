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
    console.log('saving', char.id);
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
    console.log('deleting', char?.id);
    await platform.env.CHARACTER_DB.delete(char.id);
}

export const wipe = async (platform: App.Platform) => {
    const list = await listCharacters(platform);
    await Promise.all(list.map(c => deleteCharacter(platform, c)));
}

export const loadCharacter = async (platform: App.Platform, id: string): Promise<Character> => {
    console.log('loading', id, await platform.env.CHARACTER_DB.get(id));
    return await platform.env.CHARACTER_DB.get(id, { type: 'json' }) as Character;
}