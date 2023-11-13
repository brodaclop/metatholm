import type { D1Database } from "@cloudflare/workers-types";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: {
				D1_DB: D1Database
			}
			// context: {
			// 	waitUntil(promise: Promise<unknown>): void;
			// };
			// caches: CacheStorage & { default: Cache }
		}

		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
