import { loadCharacter } from '$lib/server/Db';
import type { PageServerLoad } from './$types';
import { saveCharacter } from '$lib/server/Db';
import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
    saveCharacter: async ({ request, locals }) => {
        const formData = await request.formData();
        const characterString = formData.get('character');
        if (characterString) {
            const character = JSON.parse(characterString.toString());
            saveCharacter(character);
            return { success: true };
        } else {
            fail(400);
        }
    }
}

export const load: PageServerLoad = async ({ params }) => {
    return {
        character: loadCharacter(params.id)
    };
}