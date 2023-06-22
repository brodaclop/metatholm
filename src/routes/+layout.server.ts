import { listCharacters } from '../lib/server/Db';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ depends }) => {
    depends('db:characterlist');
    return {
        characters: listCharacters()
    };
}
