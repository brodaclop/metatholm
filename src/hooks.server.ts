import { dev } from "$app/environment";
import type { Miniflare } from "miniflare";

let mf: Miniflare;

export async function handle({ event, resolve }) {
    if (dev) {
        if (!mf) {
            const { Miniflare, Log, LogLevel } = await import("miniflare");
            mf = new Miniflare({
                log: new Log(LogLevel.INFO),
                // kvPersist: "./kv-data",
                // kvNamespaces: ["KV"],
                d1Persist: "./d1-data",
                d1Databases: ["D1_DB"],
                // you should also be able to add durable objects & r2
                script: "",
                modules: true,
            });
        }
        event.platform = { env: await mf.getBindings() };
    }
    return resolve(event);
}