<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import ScenarioBox from '../scenario/ScenarioBox.svelte';
	import type { Scenario } from '../../../model/scenario/Scenario';

	export let scenario: string;

	const SCENARIOS: Record<string, Scenario> = import.meta.glob('$lib/scenario/*.json', {
		eager: true,
		import: 'default'
	}) as unknown as Record<string, Scenario>;

	$: fileName = `${scenario}_${$locale}.json`;

	$: scenarioFile = SCENARIOS[`/src/lib/scenario/${fileName}`];
</script>

{#if scenarioFile}
	<ScenarioBox scenario={scenarioFile} />
{/if}
