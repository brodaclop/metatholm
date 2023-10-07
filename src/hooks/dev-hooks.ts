import { dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';

export const devStep_setupKVPlatform: Handle = async ({ event, resolve }) => {
    if (dev) {
        const { fallBackPlatformToMiniFlareInDev } = await import('$lib/clients/miniflare');
        event.platform = await fallBackPlatformToMiniFlareInDev(event.platform);
    }
    return resolve(event);
};

export const devSteps = [devStep_setupKVPlatform];