import type { D1Database } from "@cloudflare/workers-types";
import { Lucia } from "lucia";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: {
				D1_DB: D1Database;
				lucia: Lucia;
			}
			// context: {
			// 	waitUntil(promise: Promise<unknown>): void;
			// };
			// caches: CacheStorage & { default: Cache }
		}

		// interface Error {}
		interface Locals {
			user: (import("lucia").User & { username: string }) | null;
			session: import("lucia").Session | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
