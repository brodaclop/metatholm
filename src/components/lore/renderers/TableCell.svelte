<script lang="ts">
	export let header: boolean;
	export let align: any;
</script>

{#if header}
	<th {align}><slot /></th>
{:else}
	<td {align}><slot /></td>
{/if}

<style>
	td,
	th {
		padding-right: 0.25em;
	}
</style>
