import { deleteNPC, listNPCs, loadNPC, saveNPC } from '../../lib/server/db/dm';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { v4 } from 'uuid';

export const prerender = false;

export const load: PageServerLoad = async ({ depends, platform, locals }) => {
    depends('db:npclist');
    return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        characters: listNPCs(platform!, locals.user!.id)
    };
}

export const actions: Actions = {
    saveCharacter: async ({ request, platform, locals }) => {
        const formData = await request.formData();
        const characterString = formData.get('character');
        if (characterString) {
            const character = JSON.parse(characterString.toString());
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await saveNPC(platform!, character, locals.user!.id);
            return { success: true };
        } else {
            fail(400);
        }
    },
    cloneCharacter: async ({ request, platform, locals }) => {
        const formData = await request.formData();
        const characterString = formData.get('character');
        if (characterString) {
            const character = JSON.parse(characterString.toString());
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const toClone = await loadNPC(platform!, character.id, locals.user!.id);
            toClone.name += ' (clone)';
            toClone.id = v4();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await saveNPC(platform!, toClone, locals.user!.id);
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
            await deleteNPC(platform!, character, locals.user!.id);
        } else {
            fail(400);
        }
    }
}
