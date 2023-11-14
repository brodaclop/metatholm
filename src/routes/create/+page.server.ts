import { saveCharacter } from '$lib/server/Db';
import { fail, redirect, type Actions, error } from '@sveltejs/kit';

export const actions: Actions = {
    saveCharacter: async ({ request, platform }) => {
        const formData = await request.formData();
        const characterString = formData.get('character');
        console.log('characterString', characterString);
        if (characterString) {
            const character = JSON.parse(characterString.toString());
            console.log('character', character);
            saveCharacter(platform!, character);
            console.log('saved character');
            throw redirect(303, `/character/${character.id}`);
        } else {
            fail(400);
        }
    }
}