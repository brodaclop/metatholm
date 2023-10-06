import { listCharacters } from '../lib/server/Db';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ depends, platform }) => {
    depends('db:characterlist');
    return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        characters: listCharacters(platform!)
    };
}
