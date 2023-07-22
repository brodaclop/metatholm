<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import SkillRolls from './interactive/SkillRolls.svelte';
	import ExplodedDice from './interactive/ExplodedDice.svelte';

	export let raw: string;

	const components: Record<string, any> = {
		SkillRolls: SkillRolls,
		ExplodedDice: ExplodedDice
	};

	$: [name, params] = raw.replace(/`/g, '').split('|');

	$: paramOb = params ? JSON.parse(params) : {};
</script>

<div>
	<svelte:component this={components[name]} {...paramOb} />
</div>
