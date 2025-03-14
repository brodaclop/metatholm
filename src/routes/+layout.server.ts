import { findParties } from '$lib/server/db/party';
import { listCharacters } from '../lib/server/db/character';
import type { LayoutServerLoad } from './$types';

export const prerender = false;

export const load: LayoutServerLoad = async ({ depends, platform, locals }) => {
    depends('db:characterlist');
    depends('db:partylist');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (locals.user) {
        const parties = await findParties(platform!, locals.user!.id);
        return {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            characters: await listCharacters(platform!, locals.user!.id),
            parties,
            user: locals.user
        };
    }
    return {}
}
