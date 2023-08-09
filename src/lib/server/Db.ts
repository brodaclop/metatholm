import Database from "better-sqlite3";
import type { Character, CharacterInfo } from "../../model/Karakter";

const db = new Database('./data/db');

db.exec('create table if not exists CHARACTERS (id primary key, info, payload)');
export const listCharacters = (): Array<CharacterInfo> => {
    const stmt = db.prepare('select info from CHARACTERS');
    const rows = stmt.all();
    return rows.map(row => JSON.parse((row as any).info ?? '{}'));
}

export const loadAllCharacters = (): Array<Character> => {
    const stmt = db.prepare('select payload from CHARACTERS');
    const rows = stmt.all();
    return rows.map(row => JSON.parse((row as any).payload));
}

export const saveCharacter = (char: Character) => {
    const stmt = db.prepare('insert into CHARACTERS(id, info, payload) VALUES ($id, $info, $payload) on conflict(id) do update set payload=$payload, info=$info');
    const info: CharacterInfo = { background: char.background, ancestry: char.ancestry, id: char.id, name: char.name, level: char.levels.length };
    stmt.run({ id: char.id, info: JSON.stringify(info), payload: JSON.stringify(char) });
}

export const deleteCharacter = (char: Pick<Character, 'id'>) => {
    const stmt = db.prepare('delete from CHARACTERS where id=$id');
    stmt.run({ id: char.id });
}

export const loadCharacter = (id: string): Character => {
    const stmt = db.prepare('select payload from CHARACTERS where id=$id');
    const row = stmt.get({ id });
    const ret: Character = JSON.parse((row as any).payload);
    return ret;
}