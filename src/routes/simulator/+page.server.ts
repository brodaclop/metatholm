import { loadAllCharacters } from "$lib/server/Db";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, platform }) => {
    return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        characters: loadAllCharacters(platform!)
    };
}