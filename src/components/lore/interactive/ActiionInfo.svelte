<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { ACTION_VARIANT_PROPERTIES, type ActionVariant } from '../../../model/Action';
	import { entries } from '../../../model/InfoList';

	export let action: ActionVariant;

	$: info = ACTION_VARIANT_PROPERTIES[action];
	$: counteredBy = entries(ACTION_VARIANT_PROPERTIES)
		.filter(([key, value]) => value.reactionTo?.includes(action))
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
				<span class="counter-item"><a href="/lore/{ra}">{$_(ra)}</a></span>
			{/each}
		</li>
	{/if}
	{#if counteredBy.length > 0}
		<li>
			<b>{$_('label:countered-by')}:</b>{#each counteredBy as ra}
				<span class="counter-item"><a href="/lore/{ra}">{$_(ra)}</a></span>
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
