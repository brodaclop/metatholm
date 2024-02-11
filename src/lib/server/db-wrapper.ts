import type { D1PreparedStatement, D1Result } from "@cloudflare/workers-types";

export const wrapDb = (platform: App.Platform) => {
    const db = platform.env.D1_DB;

    return {
        exec: db.exec,
        prepare: (query: string): D1PreparedStatement => {
            const prepared = db.prepare(query);
            return {
                bind: prepared.bind,
                all: async <T = Record<string, unknown>>(): Promise<D1Result<T>> => {
                    const res = await prepared.all();
                    console.debug('Query run', query, res.meta);
                    return res as D1Result<T>;
                },
                raw: prepared.raw,
                first: prepared.first,
                run: async <T = Record<string, unknown>>(): Promise<D1Result<T>> => {
                    const res = await prepared.run();
                    console.debug('Query run', query, res.meta);
                    return res as D1Result<T>;
                },
            }
        }
    };
}