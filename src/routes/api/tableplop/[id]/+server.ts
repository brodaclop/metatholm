import { loadCharacter } from '$lib/server/db/character';
import { Labels_en, Labels_hu, type Labels } from '../../../../model/Labels.js';
import { generateTableplopJSON } from '../../../../model/tableplop/TPExporter.js';

export const GET = async ({ params, platform, url }) => {
    try {
        const { character } = await loadCharacter(platform!, params.id);
        const language = url.searchParams.get('lang');
        console.log('language', language);
        const i18n = (key: string) => (language === 'hu' ? Labels_hu : Labels_en)[key as Labels] ?? key;

        const output = generateTableplopJSON(character, i18n);

        return new Response(output, { headers: { contentType: 'application/json' } });
    } catch (e) {
        return new Response('Failed to load character', { status: 404 });
    }
}
