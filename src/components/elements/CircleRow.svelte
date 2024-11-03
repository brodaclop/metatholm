<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Circle from './Circle.svelte';
	import MdAdd from 'svelte-icons/md/MdAdd.svelte';
	import MdRemove from 'svelte-icons/md/MdRemove.svelte';

	export let value: number;
	export let newValue: number | undefined = undefined;
	export let max: number;
	export let editable: boolean = false;
	export let canPlus = true;
	export let canMinus = true;

	export let plus: () => void = () => {
		value = Math.min(max, value + 1);
	};
	export let minus: () => void = () => {
		value = Math.max(0, value - 1);
	};

	$: _newValue = newValue ?? value;
</script>

{#if editable}
	{@const active = _newValue > 0 && canMinus}
	<Circle status={!active ? 'half' : 'active'} on:click={() => active && minus()} clickable>
		<MdRemove />
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
	{@const active = _newValue < max && canPlus}
	<Circle status={!active ? 'half' : 'active'} on:click={() => active && plus()} clickable>
		<MdAdd />
	</Circle>
{/if}
