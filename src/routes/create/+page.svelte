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
	import IconButton from '../../components/elements/IconButton.svelte';
	import FaSave from 'svelte-icons/fa/FaSave.svelte';
	import GiRollingDices from 'svelte-icons/gi/GiRollingDices.svelte';
	import Points from '../../components/character/Points.svelte';
	import LoreInfoIcon from '../../components/LoreInfoIcon.svelte';

	const nullAbilities = (): Record<Ability, number> => ({
		'ability:build': 0,
		'ability:activity': 0,
		'ability:presence': 0,
		'ability:magic': 0
	});

	let name: string;
	let patron: string;
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
		ancestry && background
			? createCharacter({ name, patron, ancestry, background, abilities })
			: undefined;

	$: abilityModifiers = Object.fromEntries(
		entries(nullAbilities()).map(([a, n]) => [
			a,
			n + (ancestralAbilities[a] ?? 0) + (backgroundAbilities[a] ?? 0)
		])
	);

	$: calculatedCharacter = character ? calculateCharacter(character) : undefined;
</script>

<Box flavour="character-sheet">
	<div slot="title" class="title">
		<form
			method="post"
			action="?/saveCharacter"
			use:enhance={({ formElement, formData, action, cancel, submitter }) => {
				formData.set(
					'character',
					JSON.stringify(createCharacter({ name, ancestry, background, patron, abilities }))
				);
			}}
		>
			<IconButton title="label:save" disabled={!name || !ancestry || !background || !rolled}>
				<FaSave />
			</IconButton>
		</form>
		{$_('label:create_character')}
		<span />
	</div>
	<div class="character-sheet">
		<Box title="label:character" flavour="character">
			<div class="character-box">
				<label>
					<div>{$_('label:name')}</div>
					<input type="text" bind:value={name} />
				</label>
				<label>
					<div>{$_('character:patron')}</div>
					<input type="text" bind:value={patron} />
				</label>
				<label>
					<div>{$_('character:ancestry')}</div>
					<select bind:value={ancestry}>
						{#each ancestryList as s}
							<option value={s.name}>{$_(s.name)}</option>
						{/each}
					</select>
				</label>
				<label>
					<div>{$_('character:background')}</div>
					<select bind:value={background}>
						{#each backgroundList as s}
							<option value={s.name}>{$_(s.name)}</option>
						{/each}
					</select>
				</label>
			</div>
		</Box>
		<Box flavour="abilities">
			<div slot="title" class="title">
				<IconButton title="label:roll" on:click={roll}><GiRollingDices /></IconButton>
				<span>{$_('character:abilities')}</span>
				<LoreInfoIcon id="character:abilities" />
			</div>
			<Abilities bind:abilities modifiers={abilityModifiers} />
		</Box>
		<Box title="character:skills" flavour="skills">
			{#if character}
				<Skills skills={character.skills} abilities={character.abilities} />
			{/if}
		</Box>
		{#if character && calculatedCharacter}
			<Box title="character:points" flavour="points">
				<Points editable={false} bind:character {calculatedCharacter} />
			</Box>
		{/if}
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
		align-items: stretch;
	}

	div.title {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		border-radius: 0.2em;
		padding-left: 1px;
		padding-right: 1px;
	}
</style>
