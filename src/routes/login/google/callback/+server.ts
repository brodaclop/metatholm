// routes/login/github/callback/+server.ts
import { google } from "$lib/server/auth/auth";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";

import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
    const db = event.platform!.env.D1_DB;
    const lucia = event.platform!.env.lucia;
    const code = event.url.searchParams.get("code");
    const state = event.url.searchParams.get("state");
    const storedCodeVerifier = event.cookies.get('google_code_verifier');
    const storedState = event.cookies.get("github_oauth_state") ?? null;
    if (!code || !state || !storedCodeVerifier || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }

    try {
        const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);
        const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });
        const user: GoogleUser = await response.json();

        console.log('user', user);

        const existingUser: Record<string, string> | null = await db.prepare('select * from user where github_id =?1 or google_id=?1').bind(user.sub).first();

        if (existingUser) {
            const session = await lucia.createSession(existingUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            event.cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes
            });
        } else {
            const userId = generateId(15);
            await db.prepare('insert into user (id, google_id, username) VALUES (?, ?, ?)').bind(userId, user.sub, user.email).run();
            const session = await lucia.createSession(userId, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            event.cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes
            });
        }
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        });
    } catch (e) {
        console.error('some bad shit', e);
        // the specific error message depends on the provider
        if (e instanceof OAuth2RequestError) {
            // invalid code
            return new Response(null, {
                status: 400
            });
        }
        return new Response(null, {
            status: 500
        });
    }
}

interface GoogleUser {
    sub: string;
    email: string;
}
