import type { KVNamespace } from "@cloudflare/workers-types";
import type { Character, CharacterInfo } from "../../model/Karakter";


declare const platform: App.Platform;

export const listCharacters = async (): Promise<Array<CharacterInfo>> => {
    const ids = (await platform.env.CHARACTER_DB.list()).keys;
    console.log('ids', ids);
    // return ids.map(idString => {
    //     const [id, name, background, ancestry, level] = idString.name.split(':');
    //     return {
    //         id, name, background, ancestry, level: Number(level)
    //     } as CharacterInfo;
    // });
    return [];
}

export const loadAllCharacters = (): Array<Character> => {
    // const stmt = db.prepare('select payload from CHARACTERS');
    // const rows = stmt.all();
    // return rows.map(row => JSON.parse((row as any).payload));
    return [];
}

export const saveCharacter = async (char: Character) => {

    //TODO: escape : from name
    const id = `${char.id}:${char.name}:${char.background}:${char.ancestry}:${char.levels.length}`;
    const value = JSON.stringify(char);
    console.log('saving character', char);
    await platform.env.CHARACTER_DB.put(id, value);

    // const stmt = db.prepare('insert into CHARACTERS(id, info, payload) VALUES ($id, $info, $payload) on conflict(id) do update set payload=$payload, info=$info');
    // const info: CharacterInfo = { background: char.background, ancestry: char.ancestry, id: char.id, name: char.name, level: char.levels.length };
    // stmt.run({ id: char.id, info: JSON.stringify(info), payload: JSON.stringify(char) });
}

export const deleteCharacter = (char: Pick<Character, 'id'>) => {
    // const stmt = db.prepare('delete from CHARACTERS where id=$id');
    // stmt.run({ id: char.id });
}

export const loadCharacter = (id: string): Character => {
    // const stmt = db.prepare('select payload from CHARACTERS where id=$id');
    // const row = stmt.get({ id });
    // const ret: Character = JSON.parse((row as any).payload);
    // return ret;
    return null as unknown as Character;
}