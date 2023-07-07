<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { CharacterClass } from '../../model/CharacterClass';
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
	let characterClass: CharacterClass;
	let species: Species;

	$: console.log('species', species);
	const speciesList = Species.list();
	const classList = CharacterClass.list();

	const roll = () => {
		const abilityRoll = parseKocka('1d6+1');
		abilities['ability:build'] = kockaDobas(abilityRoll).osszeg;
		abilities['ability:activity'] = kockaDobas(abilityRoll).osszeg;
		abilities['ability:presence'] = kockaDobas(abilityRoll).osszeg;
		abilities['ability:magic'] = kockaDobas(abilityRoll).osszeg;
	};

	$: calculatedCharacter =
		species && characterClass
			? calculateCharacter(createCharacter({ name, species, class: characterClass, abilities }))
			: undefined;
</script>

<div>
	<Box title="Create new character" background="#ddffdd">
		<Box title="Main" background="#ddddff">
			<label>
				{$_('label:name')}
				<input type="text" bind:value={name} />
			</label>
			<label>
				Species:
				<select bind:value={species}>
					{#each speciesList as s}
						<option value={s.name}>{$_(s.name)}</option>
					{/each}
				</select>
			</label>
			<label>
				Class:
				<select bind:value={characterClass}>
					{#each classList as s}
						<option value={s.name}>{$_(s.name)}</option>
					{/each}
				</select>
			</label>
			<button on:click={roll}>Roll</button>
			<form
				method="post"
				action="?/saveCharacter"
				use:enhance={({ formElement, formData, action, cancel, submitter }) => {
					formData.set(
						'character',
						JSON.stringify(createCharacter({ name, species, class: characterClass, abilities }))
					);
				}}
			>
				<button disabled={!species || !characterClass}>Create</button>
			</form>
		</Box>
	</Box>
	<div>
		<!-- {#each keys(abilities) as ability}
			<div>
				<label>
					{$_(ability)}
					<input type="number" bind:value={abilities[ability]} />
					{#if species}
						{@const info = Species.get(species)}
						{info.abilities[ability] ?? ''}
					{/if}
				</label>
			</div>
		{/each} -->
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
</div>
