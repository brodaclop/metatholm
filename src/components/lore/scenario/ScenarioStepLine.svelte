<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { entries } from '../../../model/InfoList';
	import type { ScenarioStep } from '../../../model/scenario/Scenario';
	import IconButton from '../../elements/IconButton.svelte';
	import MarkdownText from '../renderers/MarkdownText.svelte';

	export let step: ScenarioStep;
	export let participants: Array<string>;
	export let next: (step: ScenarioStep) => void;
	let options: Record<string, ScenarioStep> = {};
	$: options =
		step.next !== null
			? 'options' in step.next
				? step.next.options
				: { [$_('label:next')]: step.next }
			: {};
</script>

<div>
	<b>{participants[step.player]}:</b>
	<MarkdownText isInline text={step.text} />
	<div class="buttons">
		{#each entries(options) as [key, nextStep]}
			<IconButton title={key} on:click={() => next(nextStep)}
				><span slot="text">{key}</span></IconButton
			>
		{/each}
	</div>
</div>

<style>
	.buttons {
		display: flex;
		justify-content: flex-end;
	}
</style>
