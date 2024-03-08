import { deleteEncounter, listEncounters, loadEncounter, saveEncounter, } from '../../lib/server/db/dm';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { v4 } from 'uuid';

export const prerender = false;

export const load: PageServerLoad = async ({ depends, platform, locals }) => {
    depends('db:encounterlist');
    return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        encounters: listEncounters(platform!, locals.user!.id)
    };
}

export const actions: Actions = {
    saveEncounter: async ({ request, platform, locals }) => {
        const formData = await request.formData();
        const encounterString = formData.get('encounter');
        if (encounterString) {
            const encounter = JSON.parse(encounterString.toString());
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await saveEncounter(platform!, encounter, locals.user!.id);
            return { success: true };
        } else {
            fail(400);
        }
    },
    cloneEncounter: async ({ request, platform, locals }) => {
        const formData = await request.formData();
        const encounterString = formData.get('encounter');
        if (encounterString) {
            const encounter = JSON.parse(encounterString.toString());
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const toClone = await loadEncounter(platform!, encounter.id, locals.user!.id);
            toClone.name += ' (clone)';
            toClone.id = v4();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await saveEncounter(platform!, toClone, locals.user!.id);
            return { success: true };
        } else {
            fail(400);
        }
    },

    deleteEncounter: async ({ request, platform, locals }) => {
        const formData = await request.formData();
        const encounterString = formData.get('encounter');
        if (encounterString) {
            const encounter = JSON.parse(encounterString.toString());
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await deleteEncounter(platform!, encounter, locals.user!.id);
        } else {
            fail(400);
        }
    }
}
