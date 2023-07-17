<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Background } from '../../model/Background';
	import {
		createCharacter,
		type CharacterTemplate,
		calculateCharacter
	} from '../../model/Karakter';
	import { Species } from '../../model/Species';
	import { keys } from '../../model/InfoList';
	import Box from '../../components/character/Box.svelte';
	import { kockaDobas, parseKocka } from '../../logic/Kocka';
	import Abilities from '../../components/character/Abilities.svelte';
	import Skills from '../../components/character/Skills.svelte';
	import { enhance } from '$app/forms';

	let name: string;
	let abilities: CharacterTemplate['abilities'] = {
		'ability:build': 0,
		'ability:activity': 0,
		'ability:presence': 0,
		'ability:magic': 0
	};
	let background: Background;
	let species: Species;
	let rolled = false;

	const speciesList = Species.list();
	const backgroundList = Background.list();

	const roll = () => {
		const abilityRoll = parseKocka('1d5+1');
		abilities['ability:build'] = kockaDobas(abilityRoll).osszeg;
		abilities['ability:activity'] = kockaDobas(abilityRoll).osszeg;
		abilities['ability:presence'] = kockaDobas(abilityRoll).osszeg;
		abilities['ability:magic'] = kockaDobas(abilityRoll).osszeg;
		rolled = true;
	};

	$: calculatedCharacter =
		species && background
			? calculateCharacter(createCharacter({ name, species, background, abilities }))
			: undefined;
</script>

<Box title={$_('label:create_character')} background="#ddffdd">
	<div class="character-sheet">
		<Box title={$_('label:character')} background="#ddddff">
			<div class="character-box">
				<label>
					{$_('label:name')}
					<input type="text" bind:value={name} />
				</label>
				<label>
					{$_('label:species')}
					<select bind:value={species}>
						{#each speciesList as s}
							<option value={s.name}>{$_(s.name)}</option>
						{/each}
					</select>
				</label>
				<label>
					{$_('label:background')}
					<select bind:value={background}>
						{#each backgroundList as s}
							<option value={s.name}>{$_(s.name)}</option>
						{/each}
					</select>
				</label>
				<form
					method="post"
					action="?/saveCharacter"
					use:enhance={({ formElement, formData, action, cancel, submitter }) => {
						formData.set(
							'character',
							JSON.stringify(createCharacter({ name, species, background, abilities }))
						);
					}}
				>
					<button type="button" on:click={roll}>Roll</button>
					<button disabled={!name || !species || !background || !rolled}>Create</button>
				</form>
			</div>
		</Box>
		<Box title={$_('character:abilities')} background="#ffdddd">
			<Abilities
				bind:abilities
				modifiers={species !== undefined ? Species.get(species).abilities : undefined}
			/>
		</Box>
		<Box title={$_('character:skills')} background="#ffddff">
			{#if calculatedCharacter}
				<Skills skills={calculatedCharacter.skills} />
			{/if}
		</Box>
	</div>
</Box>

<style>
	.character-box {
		display: flex;
		flex-direction: column;
	}

	.character-sheet {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: start;
	}
</style>
