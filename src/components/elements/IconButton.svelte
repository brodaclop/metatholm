<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let title: string;
	export let color: string | undefined = undefined;
	export let backgroundColor: string | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let plain: boolean = false;
	export let square: boolean = false;
	export let withText = false;
	export let verticalCorrection: string | undefined = undefined;
	export let popovertarget: string | undefined = undefined;
</script>

<button
	title={$_(title)}
	on:click
	{disabled}
	{popovertarget}
	popovertargetaction={popovertarget !== undefined ? 'auto' : undefined}
	style:color
	style:background-color={backgroundColor}
	style:border-color={backgroundColor}
	style:border-radius={!$$slots.text && !withText && !square ? '50%' : undefined}
	class:plain
	class:square
>
	{#if $$slots.default}
		<span
			class="icon"
			style:transform={verticalCorrection ? `translateY(${verticalCorrection})` : undefined}
		>
			<slot />
		</span>
	{/if}
	{#if $$slots.text}
		<span class="text"><slot name="text" /></span>
	{:else if withText}
		<span class="text">{$_(title)}</span>
	{/if}
</button>

<style>
	button {
		border-radius: 0.5rem;
		margin-left: 1px;
		margin-right: 1px;
		transition: background-color 0.5s ease-in-out;
	}

	.plain {
		outline: inherit;
		background: none;
		border: none;
	}

	.square {
		border-radius: 0;
	}

	.icon {
		display: inline-block;
		vertical-align: sub;
		width: 1em;
		height: 1em;
	}

	.text {
		display: inline-block;
		padding-right: 1px;
	}

	button {
		/* height: 1.5em; */
		padding-left: 1px;
		padding-right: 1px;
		padding-top: 0;
		padding-bottom: 0;
	}
</style>
