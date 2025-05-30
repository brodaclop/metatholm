<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Box from '../elements/Box.svelte';
	import { calculateCharacter, type Character } from '../../model/Karakter';
	import LevelUpModal from './LevelUpModal.svelte';
	import IconButton from '../elements/IconButton.svelte';
	import MdAdd from 'svelte-icons/md/MdAdd.svelte';
	import LoreInfoIcon from '../LoreInfoIcon.svelte';
	import { WEALTH_KEYS } from '../../model/Wealth';

	export let character: Character;
	export let editable: boolean;
	let levellingUp = false;

	$: calculatedCharacter = calculateCharacter(character);
</script>

<Box title="label:character" flavour="character">
	<table>
		<tr>
			<th><LoreInfoIcon />{$_('label:name')}</th>
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
					withText
					title={'label:levelup'}
					on:click={() => (levellingUp = true)}><MdAdd /></IconButton
				>
			</td>
		</tr>
		<tr>
			<th><LoreInfoIcon id="character:personality" />{$_('character:personality')}</th>
			<td>
				{calculatedCharacter.personality.map((p) => $_(p)).join(', ')}
			</td>
		</tr>
		<tr>
			<th><LoreInfoIcon id="character:patron" />{$_('character:patron')}</th>
			<td><input type="text" disabled={!editable} bind:value={character.patron} /></td>
		</tr>
		<tr>
			<th><LoreInfoIcon id="character:ip" />{$_('character:ip')}</th>
			<td
				>{character.ip}
				<IconButton
					withText
					disabled={!editable}
					title={'label:gain_ip'}
					on:click={() => (character.ip = character.ip + 1)}><MdAdd /></IconButton
				></td
			>
		</tr>
		<tr>
			<th><LoreInfoIcon id="character:wealth" />{$_('character:wealth')}</th>
			<td>
				<select bind:value={character.wealth} disabled={!editable}>
					{#each WEALTH_KEYS as key, wealth (wealth)}
						<option value={wealth}>{$_(key)} ({wealth})</option>
					{/each}
				</select>
			</td>
		</tr>
		<tr>
			<th><LoreInfoIcon id="character:public" />{$_('character:public')}</th>
			<td>
				<input type="checkbox" bind:checked={character.isPublic} disabled={!editable} />
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

	input {
		width: 7rem;
	}

	input[type='checkbox'] {
		width: unset;
	}
</style>
