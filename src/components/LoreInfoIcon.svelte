<script lang="ts">
	import FaInfo from 'svelte-icons/fa/FaInfo.svelte';
	import Lore from './lore/Lore.svelte';
	import { hasLore } from '../model/Lore';
	import { locale } from 'svelte-i18n';
	import IconButton from './elements/IconButton.svelte';
	import { getContext } from 'svelte';

	export let id: string = '';
	export let params: Record<string, unknown> = {};
	export let inline: boolean = false;
	export let disablePlaceholder: boolean = false;

	const bookMode: boolean = getContext('bookMode') ?? false;

	// TODO: popover in dialog zIndex
</script>

{#if hasLore(id, $locale)}
	{#if inline}
		<IconButton title={id} verticalCorrection="-1px" on:click>
			<FaInfo />
		</IconButton>
	{:else if !bookMode}
		<IconButton title={id} verticalCorrection="-1px" popovertarget="popover|{id}">
			<FaInfo />
		</IconButton>
		<div class="popover reset-font" popover="auto" id="popover|{id}">
			<Lore {id} {params} modal />
		</div>
	{:else}
		<IconButton
			title={id}
			verticalCorrection="-1px"
			on:click={() => document.getElementById(id)?.scrollIntoView()}
		>
			<FaInfo />
		</IconButton>
	{/if}
{:else if !disablePlaceholder}
	<span class="placeholder" />
{/if}

<style>
	div.popover {
		max-width: 80vw;
		border: none;
		background-color: transparent;
		text-shadow: none;
	}

	span {
		margin-right: 0.2em;
	}

	span.placeholder {
		display: inline-block;
		width: 1em;
		margin-left: 1px;
	}
</style>
