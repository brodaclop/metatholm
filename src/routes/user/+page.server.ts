import { renameUser } from '$lib/server/db/Db';
import { createParty, findParties } from '$lib/server/db/party';
import type { PageServerLoad } from './$types';
import { fail, type Actions, redirect } from '@sveltejs/kit';

export const actions: Actions = {
    createParty: async ({ request, platform, locals }) => {
        const formData = await request.formData();
        const name = formData.get('name');
        if (name) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const partyId = await createParty(platform!, name.toString(), locals.user!.id);
            throw redirect(302, `/party/${partyId}`)
        } else {
            fail(400);
        }
    },
    renameUser: async ({ request, platform, locals }) => {
        const formData = await request.formData();
        const name = formData.get('name')?.toString();
        if (name) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await renameUser(platform!, locals.user!.id, name);
        }
        return { success: true };
    },
}

export const load: PageServerLoad = async ({ platform, locals }) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const parties = await findParties(platform!, locals.user!.id);
    return {
        parties
    };
}