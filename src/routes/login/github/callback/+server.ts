// routes/login/github/callback/+server.ts
import { github } from "$lib/server/auth/auth";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";

import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
    const db = event.platform!.env.D1_DB;
    const lucia = event.platform!.env.lucia;
    const code = event.url.searchParams.get("code");
    const state = event.url.searchParams.get("state");
    const storedState = event.cookies.get("github_oauth_state") ?? null;
    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }
    try {
        const tokens = await github.validateAuthorizationCode(code);
        const githubUserResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
                'User-Agent': 'metatholm'
            }
        });
        const responseText = await githubUserResponse.text();
        const githubUser: GitHubUser = JSON.parse(responseText);
        const existingUser: Record<string, string> | null = await db.prepare('select * from user where github_id = ?').bind(githubUser.id).first();

        if (existingUser) {
            const session = await lucia.createSession(existingUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            event.cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes
            });
        } else {
            const userId = generateId(15);
            await db.prepare('insert into user (id, github_id, username) VALUES (?, ?, ?)').bind(userId, githubUser.id, githubUser.login).run();
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

interface GitHubUser {
    id: number;
    login: string;
}
