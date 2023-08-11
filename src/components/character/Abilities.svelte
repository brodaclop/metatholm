<script lang="ts">
	import type { Ability } from '../../model/Abilities';
	import { entries, keys } from '../../model/InfoList';
	import type { Character } from '../../model/Karakter';
	import CircleGroup from '../elements/CircleGroup.svelte';

	export let abilities: Character['abilities'];
	export let modifiers: Partial<Record<Ability, number>> = {};
</script>

<CircleGroup
	rows={keys(abilities)}
	values={abilities}
	max={10}
	newValues={Object.fromEntries(
		entries(abilities).map(([key, value]) => [key, abilities[key] + (modifiers[key] ?? 0)])
	)}
/>
