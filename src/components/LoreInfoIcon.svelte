<script lang="ts">
	import { Popover } from 'svelte-smooth-popover';
	import GiInfo from 'svelte-icons/gi/GiInfo.svelte';
	import Lore from './lore/Lore.svelte';
	import { hasLore } from '../model/Lore';
	import { locale } from 'svelte-i18n';
	import IconButton from './elements/IconButton.svelte';

	export let id: string = '';
	export let params: Record<string, unknown> = {};
	export let inline: boolean = false;
	export let disablePlaceholder: boolean = false;
	// TODO: popover in dialog zIndex
</script>

{#if hasLore(id, $locale)}
	{#if inline}
		<IconButton title={id} on:click>
			<GiInfo />
		</IconButton>
	{:else}
		<IconButton title={id}>
			<GiInfo />
			<Popover
				open={false}
				showOnClick={true}
				borderRadius={10}
				caretBg="var(--default-border-c)"
				hideOnExternalClick={true}
			>
				<div style:max-width="80vw">
					<Lore {id} {params} />
				</div>
			</Popover>
		</IconButton>
	{/if}
{:else if !disablePlaceholder}
	<span class="placeholder" />
{/if}

<style>
	span {
		margin-right: 0.2em;
	}

	span.placeholder {
		display: inline-block;
		width: 1em;
		margin-left: 1px;
	}
</style>
