import { dev } from "$app/environment";
import { Lucia } from "lucia";
import { D1Adapter } from "@lucia-auth/adapter-sqlite";

import { ensureInit, type DatabaseUser } from "./lib/server/auth/db";
import { redirect } from "@sveltejs/kit";

declare module "lucia" {
    interface Register {
        Lucia: Lucia;
        DatabaseUserAttributes: Omit<DatabaseUser, "id">;
    }
}



export let lucia: Lucia<Record<never, never>, {
    username: string;
    githubId: number;
    googleId: string;
}> | undefined = undefined;

export async function handle({ event, resolve }) {
    if (dev) {
        const { Miniflare, Log, LogLevel } = await import("miniflare");

        const mf = new Miniflare({
            log: new Log(LogLevel.INFO),
            // kvPersist: "./kv-data",
            // kvNamespaces: ["KV"],
            d1Persist: "./d1-data",
            d1Databases: ["D1_DB"],
            // you should also be able to add durable objects & r2
            script: "",
            modules: true,
        })
        event.platform = { env: await mf.getBindings() };
    }
    if (event.platform) {
        if (!lucia) {
            console.debug('Initialising lucia');
            const db = event.platform!.env.D1_DB;
            await ensureInit(db);
            const adapter = new D1Adapter(db, {
                user: "user",
                session: "session"
            });

            lucia = new Lucia(adapter, {
                sessionCookie: {
                    attributes: {
                        secure: !dev
                    }
                },
                getUserAttributes: (attributes) => {
                    return {
                        username: attributes.username,
                        githubId: attributes.github_id,
                        googleId: attributes.google_id,
                    };
                }
            });
        }

        event.platform!.env.lucia = lucia;

        const sessionId = event.cookies.get(lucia.sessionCookieName);
        if (!sessionId) {
            event.locals.user = null;
            event.locals.session = null;
        } else {
            const { session, user } = await lucia.validateSession(sessionId);
            if (session?.fresh) {
                const sessionCookie = lucia.createSessionCookie(session.id);
                event.cookies.set(sessionCookie.name, sessionCookie.value, {
                    path: ".",
                    ...sessionCookie.attributes
                });
            }
            if (!session) {
                const sessionCookie = lucia.createBlankSessionCookie();
                event.cookies.set(sessionCookie.name, sessionCookie.value, {
                    path: ".",
                    ...sessionCookie.attributes
                });
            }
            event.locals.user = user as never;
            event.locals.session = session;
        }

        // check is authenticated endpoint
        const needsAuth = event.url.pathname !== '/' && !event.url.pathname.startsWith('/login') && !event.url.pathname.startsWith('/lore') && !event.url.pathname.startsWith('/logout');
        console.log('path', event.url.pathname, 'needsAuth', needsAuth);
        if (!event.locals.user && needsAuth) {
            throw redirect(302, "/");
        }
    }

    return resolve(event);
}