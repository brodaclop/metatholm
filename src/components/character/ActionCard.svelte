<script lang="ts">
	import { _ } from 'svelte-i18n';
	import ExpressionTooltip from '../expression/ExpressionTooltip.svelte';
	import Box from './Box.svelte';
	import ExpressionWidget from '../expression/ExpressionWidget.svelte';
	import type { Action } from '../../model/Action';

	export let action: Action;
</script>

<Box background={'#ffeeff'} title={$_(action.name)}>
	<div>
		{#each Object.entries(action.variants) as [key, variant]}
			<Box background="#ffffff" title={$_(key)}>
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
		<!-- {#if action.ap}
			<div class="row">
				<span class="label">{$_('action:ap')}</span>
				<ExpressionTooltip expr={action.ap} />
			</div>
		{/if}
		<div class="row">
			<span class="label">{$_('action:roll')}</span>
			<span><ExpressionTooltip expr={action.roll} text={action.rollString} /></span>
		</div>
		{#if action.damage}
			<div class="row">
				<span class="label">{$_('label:damage')}</span>
				<ExpressionWidget expr={action.damage} />
			</div>
		{/if} -->
	</div>
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
