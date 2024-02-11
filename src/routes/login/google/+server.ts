// routes/login/github/+server.ts
import { google } from "$lib/server/auth/auth";
import { generateCodeVerifier, generateState } from "arctic";
import { redirect } from "@sveltejs/kit";

import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    const url = await google.createAuthorizationURL(state, codeVerifier, { scopes: ["email"] });

    event.cookies.set("google_code_verifier", codeVerifier, {
        secure: import.meta.env.PROD,
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 10 // 10 min
    });


    event.cookies.set("github_oauth_state", state, {
        path: "/",
        secure: import.meta.env.PROD,
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax"
    });

    event.cookies.set("redirect_after_login", state, {
        path: "/",
        secure: import.meta.env.PROD,
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax"
    });

    throw redirect(302, url.toString());
}
