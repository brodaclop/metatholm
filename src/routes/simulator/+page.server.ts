import { loadAllCharacters } from "$lib/server/Db";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    return {
        characters: loadAllCharacters()
    };
}