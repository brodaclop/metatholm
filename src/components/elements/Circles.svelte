<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Circle from './Circle.svelte';
	import FaMinus from 'svelte-icons/fa/FaMinus.svelte';
	import FaPlus from 'svelte-icons/fa/FaPlus.svelte';

	export let value: number;
	export let newValue: number | undefined = undefined;
	export let name: string;
	export let subName: string = '';
	export let max: number;
	export let min: number = 0;
	export let editable: boolean = false;
	export let plus: () => void = () => {
		value = Math.min(max, value + 1);
	};
	export let minus: () => void = () => {
		value = Math.max(min, value - 1);
	};

	$: _newValue = newValue ?? value;
</script>

<tr>
	<td class="name"
		>{$_(name)}
		{#if subName}<i>({$_(subName)})</i>{/if}</td
	>
	<td class="score">
		{#if editable}
			<Circle status={_newValue === 0 ? 'half' : 'empty'} on:click={minus}>
				<FaMinus slot="value" />
			</Circle>
		{/if}
		{#each Array(max) as _, i}
			{#if i < Math.min(value, _newValue)}
				<Circle status="full" />
			{:else if i < Math.max(value, _newValue)}
				{#if _newValue < value}
					<Circle status="reduced" />
				{:else}
					<Circle status="increased" />
				{/if}
			{:else}
				<Circle status="empty" />
			{/if}
		{/each}
		{#if editable}
			<Circle status={_newValue === max ? 'half' : 'empty'} on:click={plus}>
				<FaPlus slot="value" />
			</Circle>
		{/if}
	</td>
	{#if $$slots.extra}
		<td class="extra">
			<slot name="extra" />
		</td>
	{/if}
</tr>

<style>
	.name {
		font-weight: bold;
		white-space: nowrap;
	}

	.score {
		display: flex;
		flex-wrap: nowrap;
	}
</style>
