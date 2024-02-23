<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let title: string;
	export let color: string | undefined = undefined;
	export let backgroundColor: string | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let plain: boolean = false;
</script>

<button
	title={$_(title)}
	on:click
	{disabled}
	style:color
	style:background-color={backgroundColor}
	style:border-color={backgroundColor}
	class:plain
>
	<span class="icon">
		<slot />
	</span>
	{#if $$slots.text}
		<span class="text"><slot name="text" /></span>
	{/if}
</button>

<style>
	button {
		border-radius: 0.5rem;
		margin-left: 1px;
		margin-right: 1px;
	}

	.plain {
		outline: inherit;
		background: none;
		border: none;
	}

	.icon {
		display: inline-block;
		vertical-align: middle;
		width: 1em;
	}

	.text {
		display: inline-block;
	}

	button {
		/* height: 1.5em; */
		padding-left: 1px;
		padding-right: 1px;
		padding-top: 0;
		padding-bottom: 0;
	}
</style>
