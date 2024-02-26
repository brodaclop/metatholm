<script lang="ts">
	import IconButton from '../elements/IconButton.svelte';
	import { _, date, time } from 'svelte-i18n';
	import MdHistory from 'svelte-icons/md/MdHistory.svelte';
	import MdRestore from 'svelte-icons/md/MdRestore.svelte';
	import { Popover } from 'svelte-smooth-popover';
	import type { Character } from '../../model/Karakter';
	import Box from './Box.svelte';

	export let character: Character;
	export let archives: Array<{ char: Character; timestamp: number }>;
	export let disabled: boolean = false;
</script>

<IconButton title="label:previous_versions" disabled={disabled || archives.length === 0}>
	<MdHistory />
	{#if !(disabled || archives.length === 0)}
		<Popover
			open={false}
			showOnClick={true}
			borderRadius={10}
			caretBg="black"
			hideOnExternalClick={true}
		>
			<div style:max-width="20rem">
				<Box title="label:previous_versions" flavour="character" marginless>
					<ul>
						{#each archives as archive}
							<li>
								{$date(new Date(archive.timestamp), {
									month: 'numeric',
									day: 'numeric',
									year: 'numeric'
								})}
								{$time(new Date(archive.timestamp))}
								<IconButton
									title="label:restore_version"
									on:click={() => (character = archive.char)}
								>
									<MdRestore />
								</IconButton>
							</li>
						{/each}
					</ul>
				</Box>
			</div>
		</Popover>
	{/if}
</IconButton>

<style>
	ul {
		padding-left: 0;
		list-style-type: none;
		font-style: italic;
	}
</style>
