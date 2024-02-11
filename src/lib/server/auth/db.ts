import type { D1Database } from "@cloudflare/workers-types";

export const ensureInit = async (db: D1Database) => {
    // await db.exec('drop table if exists session');
    // await db.exec('drop table if exists user');
    await db.exec(`CREATE TABLE IF NOT EXISTS user ( id TEXT NOT NULL PRIMARY KEY, github_id INTEGER, google_id text, username TEXT NOT NULL )`);

    await db.exec(`CREATE TABLE IF NOT EXISTS session ( id TEXT NOT NULL PRIMARY KEY, expires_at INTEGER NOT NULL, user_id TEXT NOT NULL, FOREIGN KEY (user_id) REFERENCES user(id) )`);
    await db.exec('INSERT INTO user (id, username) SELECT \'global\', \'\'  WHERE NOT EXISTS(SELECT 1 FROM user WHERE id = \'global\')');
}

export interface DatabaseUser {
    id: string;
    username: string;
    github_id: number;
    google_id: string;
}
