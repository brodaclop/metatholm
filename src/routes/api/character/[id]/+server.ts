import { loadCharacter } from '$lib/server/Db.js';

export const GET = async ({ params, platform }) => {

    try {
        const character = await loadCharacter(platform!, params.id);
        return new Response(JSON.stringify(character), { headers: { contentType: 'application/json' } });
    } catch (e) {
        return new Response('Failed to load character', { status: 404 });
    }
}
