<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Box from './Box.svelte';
	import type { Character } from '../../model/Karakter';
	import LevelUpModal from './LevelUpModal.svelte';
	import IconButton from '../elements/IconButton.svelte';
	import MdAdd from 'svelte-icons/md/MdAdd.svelte';
	import LoreInfoIcon from '../LoreInfoIcon.svelte';

	export let character: Character;
	export let editable: boolean;
	let levellingUp = false;
</script>

<Box title="label:character" flavour="character">
	<table>
		<tr>
			<th>{$_('label:name')}</th>
			<td><input type="text" disabled={!editable} bind:value={character.name} /></td>
		</tr>
		<tr>
			<th><LoreInfoIcon id="character:ancestry" />{$_('character:ancestry')}</th>
			<td>{$_(character.ancestry)}</td>
		</tr>
		<tr>
			<th><LoreInfoIcon id="character:background" />{$_('character:background')}</th>
			<td>{$_(character.background)}</td>
		</tr>
		<tr>
			<th><LoreInfoIcon id="character:level" />{$_('character:level')}</th>
			<td
				>{character.levels.length}
				<IconButton
					disabled={!editable}
					title={'label:levelup'}
					on:click={() => (levellingUp = true)}><MdAdd /></IconButton
				>
			</td>
		</tr>
	</table>
	<LevelUpModal bind:character showModal={levellingUp} close={() => (levellingUp = false)} />
</Box>

<style>
	th {
		text-align: left;
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
</style>
