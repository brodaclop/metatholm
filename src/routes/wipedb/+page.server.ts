import { wipe } from "$lib/server/Db";
import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ platform }) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await wipe(platform!);
        throw redirect(303, `/`);
    }
}