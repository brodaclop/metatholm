<script lang="ts">
	import { calculateCharacter, type Character } from '../../model/Karakter';
	import Box from '../character/Box.svelte';
	import { _ } from 'svelte-i18n';
	import Skills from '../character/Skills.svelte';
	import Points from '../character/Points.svelte';
	import Weapons from '../character/Weapons.svelte';
	import Armours from '../character/Armours.svelte';

	export let idx: number;
	export let selectedCharacter: Character | null;
	export let characters: Array<Character>;

	$: calculatedCharacter =
		selectedCharacter !== null ? calculateCharacter(selectedCharacter) : null;
</script>

<Box flavour="character-sheet">
	<div slot="title">
		<h3>{`Player ${idx + 1}`}</h3>
		<select bind:value={selectedCharacter}>
			{#each characters as character}
				<option value={character}
					>{character.name} ({$_(character.ancestry)}
					{$_(character.background)} / {$_('character:level')}
					{character.levels.length})</option
				>
			{/each}
		</select>
	</div>
	{#if selectedCharacter !== null && calculatedCharacter}
		<Skills
			skills={selectedCharacter.skills}
			modifiedSkills={calculatedCharacter.skills}
			abilities={selectedCharacter.abilities}
		/>
		<Points bind:character={selectedCharacter} {calculatedCharacter} />
		<Box flavour="inventory" title={$_('character:weapons')}>
			<Weapons bind:character={selectedCharacter} />
		</Box>
		<Box flavour="inventory" title={$_('character:armours')}>
			<Armours bind:character={selectedCharacter} />
		</Box>
	{/if}
</Box>
