<script lang="ts">
	import { getContext } from 'svelte';
	export let depth;
	export let raw;
	export let text;

	const headingLevel: number = getContext('headingLevel') ?? 1;
	depth = Math.min(depth + headingLevel, 6);
</script>

{#if depth === 1}
	<h1><slot /></h1>
{:else if depth === 2}
	<h2><slot /></h2>
{:else if depth === 3}
	<h3><slot /></h3>
{:else if depth === 4}
	<h4><slot /></h4>
{:else if depth === 5}
	<h5><slot /></h5>
{:else if depth === 6}
	<h6><slot /></h6>
{:else}
	{raw}
{/if}
