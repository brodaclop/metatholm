<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Circle from './Circle.svelte';
	import MdAdd from 'svelte-icons/md/MdAdd.svelte';
	import MdRemove from 'svelte-icons/md/MdRemove.svelte';
	import LoreInfoIcon from '../LoreInfoIcon.svelte';
	import Lore from '../lore/Lore.svelte';
	import CircleRow from './CircleRow.svelte';

	export let value: number;
	export let newValue: number | undefined = undefined;
	export let name: string | undefined = undefined;
	export let subName: string = '';
	export let max: number;
	export let editable: boolean = false;
	export let inlineLore: boolean = false;
	export let canPlus = true;
	export let canMinus = true;

	export let plus: () => void = () => {
		value = Math.min(max, value + 1);
	};
	export let minus: () => void = () => {
		value = Math.max(0, value - 1);
	};
	export let loreParams: Record<string, unknown> = {};

	let loreOpen: boolean = false;

	$: _newValue = newValue ?? value;
</script>

<tr class="circles">
	{#if name}
		<td class="name">
			<LoreInfoIcon
				id={name}
				inline={inlineLore}
				params={{ ...loreParams, level: value }}
				on:click={() => (loreOpen = !loreOpen)}
			/>
			{$_(name)}
			{#if subName}<i>({$_(subName)})</i>{/if}
		</td>
	{/if}
	<td class="score">
		<CircleRow {canMinus} {canPlus} {editable} {max} {plus} {minus} {value} {newValue} />
	</td>
	{#if $$slots.extra}
		<td class="extra">
			<slot name="extra" />
		</td>
	{/if}
</tr>
{#if inlineLore && loreOpen}
	<tr>
		<td colspan="3">
			<div class="loreContainer">
				<Lore id={name} params={loreParams} />
			</div>
		</td>
	</tr>
{/if}

<style>
	.name {
		font-weight: var(--font-weight-bold);
		white-space: nowrap;
	}

	.score {
		display: flex;
		flex-wrap: nowrap;
	}

	.loreContainer {
		max-width: 30em;
	}
</style>
