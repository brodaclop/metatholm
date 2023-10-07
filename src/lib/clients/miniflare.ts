import { Miniflare, Log, LogLevel } from 'miniflare';
import { dev } from '$app/environment';

const MINIFLARE_KV_NAMESPACE = 'CHARACTER_DB';
const MINIFLARE_KV_PERSIST_PATH = './kv-data'; //kv dev config refer to Miniflare documentation

const miniflareScript = `
    addEventListener("fetch", (event) => {
        event.waitUntil(Promise.resolve(event.request.url));
        event.respondWith(new Response(event.request.headers.get("X-Message")));
    });
    addEventListener("scheduled", (event) => {
        event.waitUntil(Promise.resolve(event.scheduledTime));
    });
`;

const miniflareConfig = {
    log: new Log(LogLevel.INFO),
    kvPersist: MINIFLARE_KV_PERSIST_PATH,
    kvNamespaces: [MINIFLARE_KV_NAMESPACE],
    globalAsyncIO: true,
    globalTimers: true,
    globalRandom: true,
    script: miniflareScript
};

export const fallBackPlatformToMiniFlareInDev = async (_platform: App.Platform) => {
    if (!dev) return _platform;
    if (_platform) return _platform;

    const mf = new Miniflare(miniflareConfig);
    await mf.dispatchFetch('https://host.tld'); //simulate a fetch request to start the Miniflare worker
    const env: App.Platform['env'] = await mf.getBindings(); //get the environment bindings from the script

    const platform: App.Platform = { env }; //create a platform with the bindings

    return platform;
};