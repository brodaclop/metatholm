import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { devSteps } from './hooks/dev-hooks';

export const handle: Handle = sequence(
    ...devSteps,
);