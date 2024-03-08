import { closeParty, leaveParty, loadPartyWithUsers, regenerateInviteCode, setRole } from '$lib/server/db/party';
import type { PageServerLoad } from './$types';
import { fail, type Actions, redirect } from '@sveltejs/kit';

export const actions: Actions = {
    leaveParty: async ({ request, platform, locals, params }) => {
        const formData = await request.formData();
        const userId = formData.get('userId')?.toString();
        const partyId = params.id;
        if (userId && partyId) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await leaveParty(platform!, partyId, userId, locals.user!.id);
            if (userId === locals.user?.id) {
                throw redirect(302, '/');
            }
            return { success: true };
        } else {
            fail(400);
        }
    },
    setRole: async ({ request, platform, locals, params }) => {
        const formData = await request.formData();
        const userId = formData.get('userId')?.toString();
        const role = formData.get('role')?.toString();
        const partyId = params.id;
        if (userId && partyId && role) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await setRole(platform!, partyId, userId, locals.user!.id, role);
            return { success: true };
        } else {
            fail(400);
        }
    },
    closeParty: async ({ platform, locals, params }) => {
        const partyId = params.id;
        if (partyId) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await closeParty(platform!, partyId, locals.user!.id);
        }
        throw redirect(302, '/');
    },
    regenerateInvite: async ({ platform, locals, params }) => {
        const partyId = params.id;
        if (partyId) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await regenerateInviteCode(platform!, partyId, locals.user!.id);
            return { success: true };
        } else {
            fail(400);
        }
    },
}

export const load: PageServerLoad = async ({ params, platform, locals }) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ret = await loadPartyWithUsers(platform!, params.id, locals.user!.id);
    if (ret === null) {
        throw fail(404);
    }
    return {
        ...ret,
        user: locals.user
    }
}