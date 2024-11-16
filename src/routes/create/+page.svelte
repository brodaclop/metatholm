<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Background } from '../../model/Background';
	import {
		createCharacter,
		type CharacterTemplate,
		calculateCharacter,
		Character
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

	type Highlight = 'name' | 'patron' | 'ancestry' | 'background' | 'roll' | 'save';

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

	let highlight: Highlight = 'name';

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
		updateHighlight();
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

	$: updateHighlight = () => {
		console.log('rolled', rolled);
		if ((name?.trim() ?? '') === '') {
			highlight = 'name';
		} else if ((patron?.trim() ?? '') === '') {
			highlight = 'patron';
		} else if (!ancestry) {
			highlight = 'ancestry';
		} else if (!background) {
			highlight = 'background';
		} else if (!rolled) {
			highlight = 'roll';
		} else {
			highlight = 'save';
		}
	};
</script>

<Box flavour="character-sheet" title="label:create_character">
	<div class="character-sheet">
		<Box title="label:character" flavour="character">
			<table>
				<tr>
					<td><LoreInfoIcon id="character:name" /> {$_('label:name')}</td>
					<td
						><input
							type="text"
							bind:value={name}
							class:highlighted={highlight === 'name'}
							class:hl={true}
							on:blur={updateHighlight}
						/></td
					>
				</tr>
				<tr>
					<td><LoreInfoIcon id="character:patron" />{$_('character:patron')}</td>
					<td
						><input
							type="text"
							bind:value={patron}
							class:highlighted={highlight === 'patron'}
							class:hl={true}
							on:blur={updateHighlight}
						/>
					</td>
				</tr>
				<tr>
					<td><LoreInfoIcon id="character:ancestry" />{$_('character:ancestry')}</td>
					<td>
						<select
							bind:value={ancestry}
							class:highlighted={highlight === 'ancestry'}
							class:hl={true}
							on:change={updateHighlight}
						>
							<option disabled value={undefined}>{$_('label:select')}</option>
							{#each ancestryList as s}
								<option value={s.name}>{$_(s.name)}</option>
							{/each}
						</select>
					</td>
				</tr>
				<tr>
					<td><LoreInfoIcon id="character:background" />{$_('character:background')}</td>
					<td>
						<select
							bind:value={background}
							class:hl={true}
							class:highlighted={highlight === 'background'}
							on:change={updateHighlight}
						>
							<option disabled value={undefined}>{$_('label:select')}</option>
							{#each backgroundList as s}
								<option value={s.name}>{$_(s.name)}</option>
							{/each}
						</select>
					</td>
				</tr>
				<tr>
					<td colspan="2" class="center">
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
							<IconButton
								title="label:save"
								disabled={!name || !ancestry || !background || !rolled}
								backgroundColor={highlight === 'save' ? 'lightgreen' : undefined}
							>
								<FaSave />
								<svelte:fragment slot="text">{$_('label:save')}</svelte:fragment>
							</IconButton>
						</form>
					</td>
				</tr>
			</table>
		</Box>
		<Box flavour="abilities">
			<div slot="title" class="title">
				<IconButton
					title="label:roll"
					on:click={roll}
					backgroundColor={highlight === 'roll' ? 'lightgreen' : undefined}
					><GiRollingDices />
					<svelte:fragment slot="text">{$_('label:roll')}</svelte:fragment>
				</IconButton>
				<span>{$_('character:abilities')}</span>
				<LoreInfoIcon id="character:abilities" />
			</div>
			<Abilities bind:abilities modifiers={abilityModifiers} />
		</Box>
		<div class="lore">
			{#if character}
				<Box title="character:skills" flavour="skills">
					<Skills skills={character.skills} abilities={character.abilities} />
				</Box>
			{/if}
			{#if character && calculatedCharacter}
				<Box title="character:points" flavour="points">
					<Points editable={false} bind:character {calculatedCharacter} />
				</Box>
			{/if}
		</div>
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
		justify-content: space-between;
		width: 100%;
	}

	.lore > div {
		flex-basis: 50%;
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

	.hl {
		transition: background-color 0.5s ease-in-out;
	}

	.highlighted {
		background-color: lightgreen;
	}

	option {
		background-color: unset;
	}

	.center {
		text-align: center;
	}
</style>
