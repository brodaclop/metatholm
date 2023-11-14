import { saveCharacter } from '$lib/server/Db';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
    saveCharacter: async ({ request, platform }) => {
        const formData = await request.formData();
        const characterString = formData.get('character');
        if (characterString) {
            const character = JSON.parse(characterString.toString());
            await saveCharacter(platform!, character);
            throw redirect(303, `/character/${character.id}`);
        } else {
            throw fail(400);
        }
    }
}