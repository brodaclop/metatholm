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

	$: calculatedCharacter = character ? calculateCharacter(character) : undefined;
</script>

<Box background="#ddffdd">
	<div slot="title" class="title">
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
			<IconButton title="label:save" disabled={!name || !ancestry || !background || !rolled}>
				<FaSave />
			</IconButton>
		</form>
		{$_('label:create_character')}
		<span />
	</div>
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
			</div>
		</Box>
		<Box background="#ffdddd">
			<div slot="title" class="title">
				<IconButton title="label:roll" on:click={roll}><GiRollingDices /></IconButton>
				<span>{$_('character:abilities')}</span>
				<span />
			</div>
			<Abilities bind:abilities modifiers={abilityModifiers} />
		</Box>
		<Box title={$_('character:skills')} background="#ffddff">
			{#if character}
				<Skills skills={character.skills} />
			{/if}
		</Box>
		{#if character && calculatedCharacter}
			<Box title={$_('character:points')} background={'#eeffff'}>
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
		align-items: start;
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
