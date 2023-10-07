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

	export let initialCharacter: Character;
	export let deleteCharacter: () => void;
	export let saveCharacter: (char: Character) => void;

	let character: Character;

	$: if (!character) {
		console.log('setting character', initialCharacter);
		character = JSON.parse(JSON.stringify(initialCharacter));
	}

	$: changed = character && JSON.stringify(initialCharacter) !== JSON.stringify(character);

	$: calculatedCharacter = calculateCharacter(character);
</script>

<Box background={'#ffeeee'} title={character.name}>
	<div>
		<MainBox bind:character />
		<Box title={$_('character:abilities')} background={'#eeeeff'}>
			<Abilities bind:abilities={character.abilities} />
		</Box>

		<Box title={$_('character:skills')} background={'#eeffee'}>
			<Skills skills={calculatedCharacter.skills} />
		</Box>
		<Box title={$_('character:points')} background={'#eeffff'}>
			<Points bind:character {calculatedCharacter} />
		</Box>
		<Box title={$_('action:title')} background="#ffffee">
			<div>
				{#each calculatedCharacter.actions as action}
					<ActionCard {action} />
				{/each}
			</div>
		</Box>
		<Box background="#eeeeee" title={$_('character:weapons')}>
			<Weapons bind:character />
		</Box>
	</div>
	<button disabled={!changed} on:click={() => saveCharacter(character)}>Save</button>
	<button on:click={deleteCharacter}>Delete</button>
</Box>

<style>
	div {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: start;
	}
</style>
