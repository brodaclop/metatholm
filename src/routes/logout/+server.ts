import { fail, redirect } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";


export async function GET(event: RequestEvent): Promise<Response> {
    const lucia = event.platform!.env.lucia;
    if (!event.locals.session) {
        throw fail(401);
    }
    await lucia.invalidateSession(event.locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
    });
    throw redirect(302, "/");
};
