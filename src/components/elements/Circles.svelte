<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Circle from './Circle.svelte';

	export let value: number = 0;
	export let modifier: number = 0;
	export let max: number;
	export let name: string;
	export let editable: boolean = false;

	$: modified = value + (modifier ?? 0);

	const plus = () => (value = Math.min(max, value + 1));
	const minus = () => (value = Math.max(0, value - 1));
</script>

<div>
	<span class="name">{$_(name)}</span>
	<span class="score">
		{#if editable}
			<Circle status={value === 0 ? 'half' : 'empty'} value=" -" on:click={minus} />
		{/if}
		{#each Array(max) as _, i}
			{#if i < Math.min(value, modified)}
				<Circle status="full" />
			{:else if i < Math.max(value, modified)}
				{#if modified < value}
					<Circle status="almost-empty" />
				{:else}
					<Circle status="half" />
				{/if}
			{:else}
				<Circle status="empty" />
			{/if}
		{/each}
		{#if editable}
			<Circle status={value === max ? 'half' : 'empty'} value=" +" on:click={plus} />
		{/if}
	</span>
</div>

<style>
	div {
		display: flex;
		flex-wrap: nowrap;
	}

	.name {
		flex-basis: 50%;
		font-weight: bold;
	}

	.score {
		display: flex;
		flex-wrap: nowrap;
	}
</style>
