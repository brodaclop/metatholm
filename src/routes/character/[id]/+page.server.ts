import { deleteCharacter, loadArchiveVersions, loadCharacter, saveCharacter } from '$lib/server/db/character';
import type { PageServerLoad } from './$types';
import { fail, redirect, type Actions } from '@sveltejs/kit';


export const actions: Actions = {
    saveCharacter: async ({ request, platform, locals }) => {
        const formData = await request.formData();
        const characterString = formData.get('character');
        if (characterString) {
            const character = JSON.parse(characterString.toString());
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await saveCharacter(platform!, character, locals.user!.id);
            return { success: true };
        } else {
            fail(400);
        }
    },
    deleteCharacter: async ({ request, platform, locals }) => {
        const formData = await request.formData();
        const characterString = formData.get('character');
        if (characterString) {
            const character = JSON.parse(characterString.toString());
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await deleteCharacter(platform!, character, locals.user?.id);
            throw redirect(303, `/`);
        } else {
            fail(400);
        }
    }
}

export const load: PageServerLoad = async ({ params, platform, locals }) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { character, user } = await loadCharacter(platform!, params.id);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const archives = await loadArchiveVersions(platform!, params.id);
    return {
        character,
        owner: user,
        user: locals.user,
        archives
    };
}