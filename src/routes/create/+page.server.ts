import { saveCharacter } from '$lib/server/Db';
import { fail, redirect, type Actions, error } from '@sveltejs/kit';

export const actions: Actions = {
    saveCharacter: async ({ request, platform }) => {
        console.log('seriously, what is going on');
        throw error(401, 'come on now');
        const formData = await request.formData();
        const characterString = formData.get('character');
        if (characterString) {
            const character = JSON.parse(characterString.toString());
            saveCharacter(platform!, character);
            throw redirect(303, `/character/${character.id}`);
        } else {
            fail(400);
        }
    }
}