<script lang="ts">
	import IconButton from '../elements/IconButton.svelte';
	import { _, date, time } from 'svelte-i18n';
	import MdHistory from 'svelte-icons/md/MdHistory.svelte';
	import MdRestore from 'svelte-icons/md/MdRestore.svelte';
	import type { Character } from '../../model/Karakter';
	import DialogBox from '../elements/DialogBox.svelte';

	export let character: Character;
	export let archives: Array<{ char: Character; timestamp: number }>;
	export let disabled: boolean = false;

	let showing = false;
</script>

<IconButton
	title="label:previous_versions"
	disabled={disabled || archives.length === 0}
	withText
	on:click={() => (showing = true)}
>
	<MdHistory />
</IconButton>

<DialogBox
	title="label:previous_versions"
	flavour="character"
	close={() => (showing = false)}
	showModal={showing}
>
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
					on:click={() => {
						character = archive.char;
						showing = false;
					}}
				>
					<MdRestore />
				</IconButton>
			</li>
		{/each}
	</ul>
</DialogBox>

<style>
	ul {
		padding-left: 0;
		list-style-type: none;
		font-style: italic;
	}
</style>
