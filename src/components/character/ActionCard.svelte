<script lang="ts">
	import { _ } from 'svelte-i18n';
	import ExpressionTooltip from '../expression/ExpressionTooltip.svelte';
	import Box from './Box.svelte';
	import ExpressionWidget from '../expression/ExpressionWidget.svelte';
	import type { Action, ActionVariant } from '../../model/Action';
	import { entries } from '../../model/InfoList';

	export let action: Action;
	export let isSelectable: (variant: ActionVariant) => boolean = () => false;
	export let select: (variant: ActionVariant) => void = () => {};

	let current: ActionVariant | undefined = undefined;
</script>

<Box background={'#ffeeff'} title={$_(action.name)}>
	{#each entries(action.variants) as [key, variant]}
		<Box
			background={current === key ? 'lightgray' : 'white'}
			title={$_(key)}
			on:mouseenter={() => {
				if (isSelectable(key)) {
					current = key;
				}
			}}
			on:mouseleave={() => (current = undefined)}
			on:click={() => {
				if (current) {
					select(current);
					current = undefined;
				}
			}}
		>
			{#each variant as roll}
				<div class="row">
					<span class="label">{$_(roll.name)}</span>
					<span>
						{#if typeof roll.roll !== 'number' && 'result' in roll.roll}
							<ExpressionTooltip expr={roll.roll} text={roll.rollString} />
						{:else}
							<ExpressionWidget expr={roll.roll} />
						{/if}
					</span>
				</div>
			{/each}
		</Box>
	{/each}
</Box>

<style>
	.row {
		display: flex;
		flex-wrap: nowrap;
	}

	span {
		white-space: nowrap;
	}

	.label {
		flex-basis: 90%;
		white-space: nowrap;
		font-weight: bold;
		padding-right: 0.5em;
	}

	.subtitle {
		font-style: italic;
	}

	span:not(.label) {
		flex-basis: 10%;
	}
</style>
