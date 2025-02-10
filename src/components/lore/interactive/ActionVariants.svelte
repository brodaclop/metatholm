<script lang="ts">
	import { _ } from 'svelte-i18n';
	import {
		ACTION_VARIANT_PROPERTIES,
		type ActionRange,
		type ActionType
	} from '../../../model/Action';
	import { entries } from '../../../model/InfoList';
	import LoreLink from './LoreLink.svelte';

	export let bookMode: boolean;

	const RANGES: Array<ActionRange | 'any-range'> = [
		'close-quarters',
		'in-range',
		'out-of-range',
		'any-range'
	];
	const TYPES: Array<ActionType> = ['action', 'reaction'];
</script>

<table>
	<thead>
		<tr>
			<th />
			<th>{$_('label:action')}</th>
			<th>{$_('label:reaction')}</th>
		</tr>
	</thead>
	<tbody>
		{#each RANGES as range}
			<tr>
				<th>{$_(`label:${range}`)}</th>
				{#each TYPES as type}
					<td>
						{#each entries(ACTION_VARIANT_PROPERTIES).filter(([key, value]) => (value.range === range || (range === 'any-range' && value.range === undefined)) && value.type === type) as [variant]}
							<div><LoreLink target={variant} {bookMode} /></div>
						{/each}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	th,
	td {
		text-align: left;
		vertical-align: top;
		padding-bottom: 0.5em;
	}
</style>
