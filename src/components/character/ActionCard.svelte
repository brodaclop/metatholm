<script lang="ts">
	import type { Action } from '../../model/Karakter';
	import { _ } from 'svelte-i18n';
	import ExpressionTooltip from '../expression/ExpressionTooltip.svelte';
	import Box from './Box.svelte';
	import ExpressionWidget from '../expression/ExpressionWidget.svelte';

	export let action: Action;
</script>

<Box background={'#ffeeff'}>
	<span slot="title">
		<span class="title">{$_(action.name)}</span>
		{#if action.subtitle}
			<span>/</span>
			<span class="subtitle">
				{$_(action.subtitle)}
			</span>
		{/if}
	</span>
	<div>
		{#if action.ap}
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
				<span class="label">{$_('action:damage')}</span>
				<ExpressionWidget expr={action.damage} />
			</div>
		{/if}
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
