import { deleteCharacter, loadCharacter, saveCharacter, wipe } from '$lib/server/Db';
import type { PageServerLoad } from './$types';
import { fail, redirect, type Actions } from '@sveltejs/kit';


export const actions: Actions = {
    saveCharacter: async ({ request, platform }) => {
        const formData = await request.formData();
        const characterString = formData.get('character');
        if (characterString) {
            const character = JSON.parse(characterString.toString());
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            saveCharacter(platform!, character);
            return { success: true };
        } else {
            fail(400);
        }
    },
    deleteCharacter: async ({ request, platform }) => {
        const formData = await request.formData();
        const characterString = formData.get('character');
        if (characterString) {
            const character = JSON.parse(characterString.toString());
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            deleteCharacter(platform!, character);
            throw redirect(303, `/`);
        } else {
            fail(400);
        }
    }
}

export const load: PageServerLoad = async ({ params, platform }) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const character = await loadCharacter(platform!, params.id);
    return {
        character
    };
}