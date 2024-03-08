import { makePartyActive } from '$lib/server/db/party.js';

export async function POST({ platform, params, locals }): Promise<Response> {
    const partyId = params.id;

    await makePartyActive(platform!, partyId, locals.user!.id);
    return new Response();

}