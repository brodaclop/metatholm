<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Scenario, ScenarioStep } from '../../../model/scenario/Scenario';
	import Box from '../../character/Box.svelte';
	import MarkdownText from '../renderers/MarkdownText.svelte';
	import ScenarioStepLine from './ScenarioStepLine.svelte';

	export let scenario: Scenario;
	let steps: Array<ScenarioStep> = [scenario.start];
</script>

<Box title={`${$_('label:scenario')}: ${scenario.title}`} flavour="lore">
	<div class="background">
		<MarkdownText text={scenario.background} />
	</div>
	<div class="container">
		{#each steps as step, i (step.text)}
			<div class="line player-{step.player}">
				<ScenarioStepLine
					participants={scenario.participants}
					{step}
					next={(next) => {
						steps = [...steps.slice(0, i + 1), next];
					}}
				/>
			</div>
		{/each}
	</div>
</Box>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}

	.line {
		max-width: 60%;
		flex-grow: 0;
		border-radius: 1em;
		border-style: groove;
		border-width: 3px;
		border-color: var(--box-border-c);
		padding: 0.5em;
		margin: 0.5em;
		filter: drop-shadow(0.2em 0.2em 0.2em var(--box-shadow-c));
	}

	.player-0 {
		align-self: flex-start;
		background-color: var(--striped-table-even-c);
	}

	.player-1 {
		align-self: flex-end;
		background-color: var(--striped-table-odd-c);
	}
</style>
