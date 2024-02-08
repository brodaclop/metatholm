<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let value: unknown;
	export let editable = false;
	export let type: 'text' | 'number' | 'select';
	export let options: Array<string> = [];
</script>

{#if editable}
	{#if type === 'text'}
		<input type="text" bind:value />
	{:else if type === 'number'}
		<input type="number" bind:value />
	{:else if type === 'select'}
		<select bind:value>
			{#each options as option}
				<option value={option}>{$_(option)}</option>
			{/each}
		</select>
	{/if}
{:else}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<span
		on:click={() => {
			navigator.clipboard.writeText(String(value));
		}}
	>
		{typeof value === 'string' ? $_(value) : value ?? '–'}
	</span>
{/if}

<style>
	input[type='number'] {
		width: 3rem;
	}

	input[type='text'] {
		width: 7rem;
	}
</style>
