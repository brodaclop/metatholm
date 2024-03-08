import { joinParty } from '$lib/server/db/party';
import { redirect } from '@sveltejs/kit';

export async function GET({ platform, params, locals }): Promise<Response> {
    const inviteCode = params.inviteCode;

    await joinParty(platform!, inviteCode, locals.user!.id);

    throw redirect(302, '/user');
}