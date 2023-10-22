<script lang="ts">
	import { _ } from 'svelte-i18n';
	import ExpressionTooltip from '../expression/ExpressionTooltip.svelte';
	import Box from './Box.svelte';
	import ExpressionWidget from '../expression/ExpressionWidget.svelte';
	import {
		ActionDistances,
		type Action,
		type ActionVariant,
		type ActionDistance
	} from '../../model/Action';
	import { entries, group } from '../../model/InfoList';

	export let action: Action;
	export let isSelectable: (variant: ActionVariant) => boolean = () => false;
	export let select: (variant: ActionVariant) => void = () => {};
	export let distance: ActionDistance | undefined = undefined;

	let current: ActionVariant | undefined = undefined;

	$: sorted = group(
		[...action.variants].sort((a, z) => a.name.localeCompare(z.name)),
		(v) => ActionDistances[v.name]
	);
</script>

<Box background={'#ffeeff'} title={$_(action.name)}>
	{#each entries(sorted) as [currentDistance, variants]}
		<div class="distances">
			{#if distance === undefined || distance === currentDistance}
				<div class="title">
					<Box background="#eedddd" title={$_(`label:${currentDistance}`)} />
				</div>
				{#each variants as variant}
					{@const selectable = isSelectable(variant.name)}
					<Box
						background={!selectable
							? 'lightgray'
							: current === variant.name
							? 'aquamarine'
							: 'white'}
						title={$_(variant.name)}
						on:mouseenter={() => {
							if (selectable) {
								current = variant.name;
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
						{#each variant.rolls as roll}
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
			{/if}
		</div>
	{/each}
</Box>

<style>
	.distances {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		align-items: flex-start;
	}

	.distances .title {
		flex-basis: 20%;
		align-self: center;
	}

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

	span:not(.label) {
		flex-basis: 10%;
	}
</style>
