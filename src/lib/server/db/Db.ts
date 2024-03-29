let initialised = false;

//TODO: use virtual generated columns for name, ancestry, background and level

export const ensureInit = async (platform: App.Platform) => {
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
        try {
            await platform.env.D1_DB.exec('alter table Characters add column ispublic integer');
        } catch (e) {
            // console.info('Failed to create column "is#public"', e);
        }

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

        // await platform.env.D1_DB.exec('drop table if exists Parties');
        // await platform.env.D1_DB.exec('drop table if exists PartyUserAssoc');


        await platform.env.D1_DB.exec(
            'CREATE TABLE IF NOT EXISTS Parties (' +
            'id string primary key,' +
            'invite_code string unique,' +
            'name string not null' +
            ')'
        );

        await platform.env.D1_DB.exec(
            'CREATE TABLE IF NOT EXISTS PartyUserAssoc (' +
            'party_id string not null,' +
            'user_id string not null,' +
            'role string not null,' +
            'active integer not null,' +
            'foreign key(party_id) references Parties(id) on update cascade,' +
            'foreign key(user_id) references user(id) on delete cascade' +
            ')'
        );



        initialised = true;
    }
    return {
        one: async <T>(query: string, resultConverter: (record: Record<string, unknown>) => T, ...bindings: Array<unknown>): Promise<T | null> => {
            const result = await platform.env.D1_DB.prepare(query).bind(...bindings).first();
            return result ? resultConverter(result) : null;
        },
        all: async <T>(query: string, resultConverter: (record: Record<string, unknown>) => T, ...bindings: Array<unknown>): Promise<Array<T>> => {
            const result = await platform.env.D1_DB.prepare(query).bind(...bindings).all();
            return result.results.map(resultConverter);
        },
        run: async (query: string, ...bindings: Array<unknown>): Promise<void> => {
            await platform.env.D1_DB.prepare(query).bind(...bindings).run();
        }
    }
}

export const renameUser = async (platform: App.Platform, userId: string, newName: string) => {
    const db = await ensureInit(platform);
    await db.run('update user set username=?1 where id=?2', newName, userId);
}


