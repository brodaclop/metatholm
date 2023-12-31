<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Box from './Box.svelte';
	import Abilities from './Abilities.svelte';
	import Skills from './Skills.svelte';
	import { calculateCharacter, type Character } from '../../model/Karakter';
	import Points from './Points.svelte';
	import ActionCard from './ActionCard.svelte';
	import Weapons from './Weapons.svelte';
	import MainBox from './MainBox.svelte';
	import { beforeNavigate } from '$app/navigation';
	import Armours from './Armours.svelte';
	import FaSave from 'svelte-icons/fa/FaSave.svelte';
	import FaSpinner from 'svelte-icons/fa/FaSpinner.svelte';
	import IconButton from '../elements/IconButton.svelte';
	import DeleteButton from '../elements/DeleteButton.svelte';

	export let initialCharacter: Character;
	export let deleteCharacter: () => void;
	export let saveCharacter: (char: Character) => Promise<void>;

	let character: Character;
	let saving = false;

	$: if (!character || character.id !== initialCharacter.id) {
		character = JSON.parse(JSON.stringify(initialCharacter));
	}

	$: changed = character && JSON.stringify(initialCharacter) !== JSON.stringify(character);

	$: calculatedCharacter = calculateCharacter(character);

	const save = async () => {
		saving = true;
		await saveCharacter(character);
		saving = false;
	};

	beforeNavigate(({ cancel }) => {
		if (changed) {
			if (!confirm('Save changes to character?')) {
				cancel();
			}
		}
	});
</script>

<Box flavour="character-sheet">
	<div slot="title" class="title" class:changed>
		<IconButton title="label:save" disabled={!changed || saving} on:click={save}>
			{#if saving}
				<FaSpinner />
			{:else}
				<FaSave />
			{/if}
		</IconButton>
		{$_('label:character')}: {character.name}
		<DeleteButton on:click={deleteCharacter} />
	</div>
	<div>
		<MainBox bind:character />
		<Box title="character:abilities" flavour="abilities">
			<Abilities bind:abilities={character.abilities} />
		</Box>

		<Box title={'character:skills'} flavour="skills">
			<Skills
				skills={character.skills}
				modifiedSkills={calculatedCharacter.skills}
				abilities={character.abilities}
			/>
		</Box>
		<Box title="character:points" flavour="points">
			<Points bind:character {calculatedCharacter} />
		</Box>
		<Box flavour="inventory" title="character:weapons">
			<Weapons bind:character />
		</Box>
		<Box flavour="inventory" title="character:armours">
			<Armours bind:character />
		</Box>

		<div class="actionRow">
			<Box title="action:title" flavour="action-container">
				<div>
					{#each calculatedCharacter.actions as action}
						<ActionCard {action} skills={calculatedCharacter.skills} />
					{/each}
				</div>
			</Box>
		</div>
	</div>
</Box>

<style>
	div {
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

	div.changed {
		background-color: darksalmon;
	}

	.actionRow {
		flex-basis: 100%;
	}
</style>
