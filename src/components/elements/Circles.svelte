<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Circle from './Circle.svelte';

	export let value: number | undefined;
	export let max: number;
	export let name: string;
</script>

<div>
	<span class="name">{$_(name)}</span>
	<span class="score">
		{#each Array(max) as _, i}
			<Circle status={value !== undefined && i < value ? 'full' : 'empty'} />
		{/each}
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
