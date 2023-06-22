<script lang="ts">
	import type { Ability } from '../../model/Abilities';
	import { keys } from '../../model/InfoList';
	import type { Character } from '../../model/Karakter';
	import Circles from '../elements/Circles.svelte';

	export let abilities: Character['abilities'];
	export let modifiers: Partial<Record<Ability, number>> = {};
</script>

<div>
	{#each keys(abilities) as key}
		<Circles bind:value={abilities[key]} max={10} name={key} modifier={modifiers[key]} />
	{/each}
</div>
