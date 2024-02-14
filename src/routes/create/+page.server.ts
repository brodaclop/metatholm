import { saveCharacter } from '$lib/server/Db';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
    saveCharacter: async ({ request, platform, locals }) => {
        const formData = await request.formData();
        const characterString = formData.get('character');
        if (characterString) {
            const character = JSON.parse(characterString.toString());
            throw new Error('locals: ' + JSON.stringify(locals));
            await saveCharacter(platform!, character, locals.user!.id);
            throw redirect(303, `/character/${character.id}`);
        } else {
            throw fail(400);
        }
    }
}