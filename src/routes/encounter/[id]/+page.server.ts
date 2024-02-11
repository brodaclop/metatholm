import { deleteEncounter, listNPCs, loadAllNPCs, loadEncounter, saveEncounter } from '$lib/server/Db';
import type { PageServerLoad } from './$types';
import { fail, redirect, type Actions } from '@sveltejs/kit';


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
    deleteEncounter: async ({ request, platform }) => {
        const formData = await request.formData();
        const encounterString = formData.get('encounter');
        if (encounterString) {
            const encounter = JSON.parse(encounterString.toString());
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await deleteEncounter(platform!, encounter);
            redirect(303, `/`);
        } else {
            fail(400);
        }
    }
}

export const load: PageServerLoad = async ({ params, platform, depends }) => {
    depends('db:npclist');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const encounter = await loadEncounter(platform!, params.id);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const npcs = await loadAllNPCs(platform!);
    return {
        encounter,
        npcs
    };
}