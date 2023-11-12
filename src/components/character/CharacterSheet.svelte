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
	import IconButton from '../elements/IconButton.svelte';
	import DeleteButton from '../elements/DeleteButton.svelte';

	export let initialCharacter: Character;
	export let deleteCharacter: () => void;
	export let saveCharacter: (char: Character) => void;

	let character: Character;

	$: if (!character) {
		character = JSON.parse(JSON.stringify(initialCharacter));
	}

	$: changed = character && JSON.stringify(initialCharacter) !== JSON.stringify(character);

	$: calculatedCharacter = calculateCharacter(character);

	beforeNavigate(({ cancel }) => {
		if (changed) {
			if (!confirm('Save changes to character?')) {
				cancel();
			}
		}
	});
</script>

<Box background={'#ffeeee'}>
	<div slot="title" class="title" class:changed>
		<IconButton title="label:save" disabled={!changed} on:click={() => saveCharacter(character)}
			><FaSave /></IconButton
		>
		{character.name}
		<DeleteButton on:click={deleteCharacter} />
	</div>
	<div>
		<MainBox bind:character />
		<Box title={$_('character:abilities')} background={'#eeeeff'}>
			<Abilities bind:abilities={character.abilities} />
		</Box>

		<Box title={$_('character:skills')} background={'#eeffee'}>
			<Skills skills={character.skills} modifiedSkills={calculatedCharacter.skills} />
		</Box>
		<Box title={$_('character:points')} background={'#eeffff'}>
			<Points bind:character {calculatedCharacter} />
		</Box>
		<Box background="#eeeeee" title={$_('character:weapons')}>
			<Weapons bind:character />
		</Box>
		<Box background="#eeeeee" title={$_('character:armours')}>
			<Armours bind:character />
		</Box>

		<Box title={$_('action:title')} background="#ffffee">
			<div>
				{#each calculatedCharacter.actions as action}
					<ActionCard {action} />
				{/each}
			</div>
		</Box>
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
</style>
