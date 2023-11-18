<script lang="ts">
	import { Popover } from 'svelte-smooth-popover';
	import FaInfoCircle from 'svelte-icons/fa/FaInfoCircle.svelte';
	import Lore from './lore/Lore.svelte';
	import { hasLore } from '../model/Lore';
	import { locale } from 'svelte-i18n';
	import IconButton from './elements/IconButton.svelte';

	export let id: string;
	export let params: Record<string, unknown> = {};
</script>

{#if hasLore(id, $locale)}
	<span>
		<IconButton title={id}>
			<FaInfoCircle />
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
	</span>
{/if}

<style>
	span {
		margin-right: 0.2em;
	}
</style>
