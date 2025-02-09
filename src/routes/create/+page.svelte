<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Background } from '../../model/Background';
	import {
		createCharacter,
		type CharacterTemplate,
		calculateCharacter,
		type Character
	} from '../../model/Karakter';
	import { Ancestry } from '../../model/Ancestry';
	import Box from '../../components/elements/Box.svelte';
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
	import LoreLink from '../../components/lore/interactive/LoreLink.svelte';

	type Highlight = 'name' | 'patron' | 'ancestry' | 'background' | 'roll' | 'skills' | 'save';

	const nullAbilities = (): Record<Ability, number> => ({
		'ability:build': 0,
		'ability:activity': 0,
		'ability:presence': 0,
		'ability:magic': 0
	});

	let name: string = '';
	let patron: string = '';
	let abilities: CharacterTemplate['abilities'] = nullAbilities();
	let background: Background | undefined = undefined;
	let ancestry: Ancestry | undefined = undefined;
	let rolled = false;

	let highlight: Highlight = 'name';

	$: ancestralAbilities = ancestry !== undefined ? Ancestry.get(ancestry).abilities : {};
	$: backgroundAbilities = background !== undefined ? Background.get(background).abilities : {};
	$: if ((character?.current.kp ?? 30) < 30) {
		updateHighlight();
	}

	const ancestryList = Ancestry.list();
	const backgroundList = Background.list();
	const abilityRoll = parseKocka('1d5+2');

	let character: Character | undefined;

	const rerollCharacter = () => {
		character =
			ancestry && background
				? createCharacter({ name, patron, ancestry, background, abilities })
				: undefined;
		console.log('skills', character?.skills);
		updateHighlight();
	};

	const roll = () => {
		abilities['ability:build'] = kockaDobas(abilityRoll).osszeg;
		abilities['ability:activity'] = kockaDobas(abilityRoll).osszeg;
		abilities['ability:presence'] = kockaDobas(abilityRoll).osszeg;
		abilities['ability:magic'] = kockaDobas(abilityRoll).osszeg;
		rolled = true;
		rerollCharacter();
	};

	$: abilityModifiers = Object.fromEntries(
		entries(nullAbilities()).map(([a, n]) => [
			a,
			n + (ancestralAbilities[a] ?? 0) + (backgroundAbilities[a] ?? 0)
		])
	);

	$: calculatedCharacter = character ? calculateCharacter(character) : undefined;

	const updateHighlight = () => {
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
		} else if (character?.current.kp === 30) {
			highlight = 'skills';
		} else {
			highlight = 'save';
		}
	};

	$: createCharacterJSON = () =>
		ancestry && background
			? JSON.stringify(createCharacter({ name, ancestry, background, patron, abilities }))
			: '';

	let displayRole = false;
</script>

<Box flavour="character-sheet" title="label:create_character">
	<div slot="title" class="title">
		<span />
		<span>{$_('label:create_character')}</span>
		<LoreInfoIcon
			id="world:concepts:character"
			inline
			on:click={() => (displayRole = !displayRole)}
		/>
	</div>
	{#if displayRole}
		<div>
			<Lore id="world:concepts:character" />
		</div>
	{/if}
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
							on:change={rerollCharacter}
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
							on:change={rerollCharacter}
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
								formData.set('character', createCharacterJSON());
							}}
						>
							<IconButton
								title="label:save"
								disabled={!name || !ancestry || !background || !rolled}
								withText
								backgroundColor={highlight === 'save' ? 'var(--highlight-c)' : undefined}
							>
								<FaSave />
							</IconButton>
						</form>
					</td>
				</tr>
			</table>
		</Box>
		<Abilities bind:abilities modifiers={abilityModifiers}>
			<div slot="title" class="title">
				<IconButton
					title="label:roll"
					withText
					on:click={roll}
					backgroundColor={highlight === 'roll' ? 'var(--highlight-c)' : undefined}
					><GiRollingDices />
				</IconButton>
				<span>{$_('character:abilities')}</span>
				<LoreInfoIcon id="character:abilities" />
			</div>
		</Abilities>
		<div class="lore">
			{#if character}
				<Skills skills={character.skills} abilities={character.abilities} />
			{/if}
			{#if character && calculatedCharacter}
				<Points
					editable={true}
					bind:character
					{calculatedCharacter}
					highlightSkillEditButton={highlight === 'skills'}
				/>
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
		background-color: var(--highlight-c);
	}

	select.highlighted:focus {
		background-color: var(--background-c);
	}

	option {
		background-color: unset;
	}

	.center {
		text-align: center;
	}
</style>
