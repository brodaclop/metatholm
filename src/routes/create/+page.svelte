<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Background } from '../../model/Background';
	import {
		createCharacter,
		type CharacterTemplate,
		calculateCharacter
	} from '../../model/Karakter';
	import { Ancestry } from '../../model/Ancestry';
	import Box from '../../components/character/Box.svelte';
	import { kockaDobas, parseKocka } from '../../logic/Kocka';
	import Abilities from '../../components/character/Abilities.svelte';
	import Skills from '../../components/character/Skills.svelte';
	import { enhance } from '$app/forms';
	import Lore from '../../components/lore/Lore.svelte';
	import { entries } from '../../model/InfoList';
	import type { Ability } from '../../model/Abilities';

	const nullAbilities = (): Record<Ability, number> => ({
		'ability:build': 0,
		'ability:activity': 0,
		'ability:presence': 0,
		'ability:magic': 0
	});

	let name: string;
	let abilities: CharacterTemplate['abilities'] = nullAbilities();
	let background: Background;
	let ancestry: Ancestry;
	let rolled = false;

	$: ancestralAbilities = ancestry !== undefined ? Ancestry.get(ancestry).abilities : {};
	$: backgroundAbilities = background !== undefined ? Background.get(background).abilities : {};

	const ancestryList = Ancestry.list();
	const backgroundList = Background.list();

	const roll = () => {
		const abilityRoll = parseKocka('1d5+2');
		abilities['ability:build'] = kockaDobas(abilityRoll).osszeg;
		abilities['ability:activity'] = kockaDobas(abilityRoll).osszeg;
		abilities['ability:presence'] = kockaDobas(abilityRoll).osszeg;
		abilities['ability:magic'] = kockaDobas(abilityRoll).osszeg;
		rolled = true;
	};

	$: character =
		ancestry && background ? createCharacter({ name, ancestry, background, abilities }) : undefined;

	$: abilityModifiers = Object.fromEntries(
		entries(nullAbilities()).map(([a, n]) => [
			a,
			n + (ancestralAbilities[a] ?? 0) + (backgroundAbilities[a] ?? 0)
		])
	);
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
					{$_('label:ancestry')}
					<select bind:value={ancestry}>
						{#each ancestryList as s}
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
							JSON.stringify(createCharacter({ name, ancestry, background, abilities }))
						);
					}}
				>
					<button type="button" on:click={roll}>Roll</button>
					<button disabled={!name || !ancestry || !background || !rolled}>Create</button>
				</form>
			</div>
		</Box>
		<Box title={$_('character:abilities')} background="#ffdddd">
			<Abilities bind:abilities modifiers={abilityModifiers} />
		</Box>
		<Box title={$_('character:skills')} background="#ffddff">
			{#if character}
				<Skills skills={character.skills} />
			{/if}
		</Box>
	</div>
	<div class="lore">
		<div>
			{#if ancestry}
				<Lore id={ancestry} />
			{/if}
		</div>
		<div>
			{#if background}
				<Lore id={background} />
			{/if}
		</div>
	</div>
</Box>

<style>
	.lore {
		display: flex;
		flex-direction: row;
	}

	.lore > div {
		flex-basis: 50%;
	}

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
