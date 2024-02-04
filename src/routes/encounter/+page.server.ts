import { deleteEncounter, deleteNPC, listEncounters, listNPCs, loadEncounter, loadNPC, saveEncounter, saveNPC } from '../../lib/server/Db';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { v4 } from 'uuid';

export const prerender = false;

export const load: PageServerLoad = async ({ depends, platform }) => {
    depends('db:encounterlist');
    return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        encounters: listEncounters(platform!)
    };
}

export const actions: Actions = {
    saveEncounter: async ({ request, platform }) => {
        const formData = await request.formData();
        const encounterString = formData.get('encounter');
        if (encounterString) {
            const encounter = JSON.parse(encounterString.toString());
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await saveEncounter(platform!, encounter);
            return { success: true };
        } else {
            fail(400);
        }
    },
    cloneEncounter: async ({ request, platform }) => {
        const formData = await request.formData();
        const encounterString = formData.get('encounter');
        if (encounterString) {
            const encounter = JSON.parse(encounterString.toString());
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const toClone = await loadEncounter(platform!, encounter.id);
            toClone.name += ' (clone)';
            toClone.id = v4();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await saveEncounter(platform!, toClone);
            return { success: true };
        } else {
            fail(400);
        }
    },

    deleteEncounter: async ({ request, platform }) => {
        const formData = await request.formData();
        const encounterString = formData.get('encounter');
        if (encounterString) {
            const encounter = JSON.parse(encounterString.toString());
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await deleteEncounter(platform!, encounter);
        } else {
            fail(400);
        }
    }
}
