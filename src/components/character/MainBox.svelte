<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Box from './Box.svelte';
	import type { Character } from '../../model/Karakter';
	import LevelUpModal from './LevelUpModal.svelte';
	import IconButton from '../elements/IconButton.svelte';
	import FaPlus from 'svelte-icons/fa/FaPlus.svelte';
	import LoreInfoIcon from '../LoreInfoIcon.svelte';

	export let character: Character;
	let levellingUp = false;
</script>

<Box title="label:character" flavour="character">
	<table>
		<tr>
			<th>{$_('label:name')}</th>
			<td><input type="text" bind:value={character.name} /></td>
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
				<IconButton title={'label:levelup'} on:click={() => (levellingUp = true)}
					><FaPlus /></IconButton
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
</style>
