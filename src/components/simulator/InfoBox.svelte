<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Box from '../character/Box.svelte';

	export let lines: Array<{ label: string; value: unknown }>;
	export let background: string;
	export let title: string | undefined = undefined;
</script>

<Box {background} {title}>
	{#each lines as line}
		<div class="bignumber-container">
			<div class="bignumber">
				{line.value}
			</div>
			<div class="caption">{$_(line.label)}</div>
		</div>
	{/each}
	{#if $$slots.default}
		<div class="bignumber-container">
			<div class="bignumber">
				<slot />
			</div>
		</div>
	{/if}
</Box>

<style>
	.bignumber-container {
		text-align: center;
		margin-bottom: 0.5em;
	}

	.bignumber {
		font-size: x-large;
		font-weight: bold;
	}
</style>
