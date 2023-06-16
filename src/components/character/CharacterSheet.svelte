<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Header from './Header.svelte';
	import Box from './Box.svelte';
	import Abilities from './Abilities.svelte';
	import Skills from './Skills.svelte';
	import { calculateCharacter, type Character } from '../../model/Karakter';
	import Points from './Points.svelte';
	import ActionCard from './ActionCard.svelte';

	export let character: Character;

	$: calculatedCharacter = calculateCharacter(character);
</script>

<Box background={'#ffeeee'}>
	<Header slot="title" bind:character />
	<div>
		<Box title={$_('character:abilities')} background={'#eeeeff'}>
			<Abilities bind:abilities={character.abilities} />
		</Box>

		<Box title={$_('character:skills')} background={'#eeffee'}>
			<Skills skills={calculatedCharacter.skills} />
		</Box>
		<Box title={$_('character:points')} background={'#eeffff'}>
			<Points {character} {calculatedCharacter} />
		</Box>
		<Box title={$_('action:title')} background="#ffffee">
			{#each calculatedCharacter.actions as action}
				<ActionCard {action} />
			{/each}
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
</style>
