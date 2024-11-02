<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { ACTION_VARIANT_PROPERTIES, type ActionVariant } from '../../../model/Action';
	import { entries } from '../../../model/InfoList';
	import LoreLink from './LoreLink.svelte';

	export let id: ActionVariant;

	$: info = ACTION_VARIANT_PROPERTIES[id];
	$: counteredBy = entries(ACTION_VARIANT_PROPERTIES)
		.filter(([, value]) => value.reactionTo?.includes(id))
		.map(([key]) => key);
</script>

<ul>
	<li>
		<b>{$_('label:type')}:</b><span
			>{info.type === 'action' ? $_('label:action') : $_('label:reaction')}</span
		>
	</li>
	<li><b>{$_('label:range')}:</b><span>{$_(`label:${info.range ?? 'any-range'}`)}</span></li>
	{#if info.reactionTo}
		<li>
			<b>{$_('label:counters')}:</b>{#each info.reactionTo as ra}
				<span class="counter-item"><LoreLink target={ra} /></span>
			{/each}
		</li>
	{/if}
	{#if counteredBy.length > 0}
		<li>
			<b>{$_('label:countered-by')}:</b>{#each counteredBy as ra}
				<span class="counter-item"><LoreLink target={ra} /></span>
			{/each}
		</li>
	{/if}
</ul>

<style>
	ul {
		padding: 0;
		list-style: none;
	}

	b,
	.counter-item {
		padding-right: 0.5em;
	}
</style>
