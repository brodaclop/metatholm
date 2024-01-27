<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let title: string;
	export let color: string | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let plain: boolean = false;
</script>

<button title={$_(title)} on:click {disabled} style:color class:plain>
	<span class="icon">
		<slot />
	</span>
	{#if $$slots.text}
		<span class="text"><slot name="text" /></span>
	{/if}
</button>

<style>
	.plain {
		outline: inherit;
		background: none;
		border: none;
	}

	.icon {
		display: inline-block;
		width: 1em;
	}

	.text {
		display: inline-block;
		padding-bottom: 1px;
	}

	button {
		height: 1.5em;
		padding: 2px;
	}
</style>
