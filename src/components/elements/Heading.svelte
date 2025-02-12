<script lang="ts">
	import { getContext } from 'svelte';

	const headingLevel: number = Math.min(getContext('headingLevel') ?? 1, 6);
</script>

{#if headingLevel === 1}
	<h1><slot /></h1>
{:else if headingLevel === 2}
	<h2><slot /></h2>
{:else if headingLevel === 3}
	<h3><slot /></h3>
{:else if headingLevel === 4}
	<h4><slot /></h4>
{:else if headingLevel === 5}
	<h5><slot /></h5>
{:else if headingLevel === 6}
	<h6><slot /></h6>
{/if}
