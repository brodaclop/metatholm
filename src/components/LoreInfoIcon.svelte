<script lang="ts">
	import { Popover } from 'svelte-smooth-popover';
	import MdHelpOutline from 'svelte-icons/md/MdHelpOutline.svelte';
	import Lore from './lore/Lore.svelte';
	import { hasLore } from '../model/Lore';
	import { locale } from 'svelte-i18n';
	import IconButton from './elements/IconButton.svelte';

	export let id: string;
	export let params: Record<string, unknown> = {};
	export let inline: boolean = false;
	// TODO: popover in dialog zIndex
</script>

{#if hasLore(id, $locale)}
	<span>
		{#if inline}
			<IconButton title={id} on:click>
				<MdHelpOutline />
			</IconButton>
		{:else}
			<IconButton title={id}>
				<MdHelpOutline />
				<Popover
					open={false}
					showOnClick={true}
					borderRadius={10}
					caretBg="black"
					hideOnExternalClick={true}
				>
					<div style:max-width="80vw">
						<Lore {id} {params} />
					</div>
				</Popover>
			</IconButton>
		{/if}
	</span>
{/if}

<style>
	span {
		margin-right: 0.2em;
	}
</style>
