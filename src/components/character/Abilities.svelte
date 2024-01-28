<script lang="ts">
	import type { Ability } from '../../model/Abilities';
	import { entries, keys } from '../../model/InfoList';
	import type { Character } from '../../model/Karakter';
	import CircleGroup from '../elements/CircleGroup.svelte';

	export let editable: boolean = false;
	export let abilities: Character['abilities'];
	export let modifiers: Partial<Record<Ability, number>> = {};
</script>

<CircleGroup
	rows={keys(abilities)}
	values={abilities}
	{editable}
	max={10}
	min={0}
	plus={(key) => (abilities[key] = abilities[key] + 1)}
	minus={(key) => (abilities[key] = abilities[key] - 1)}
	newValues={Object.fromEntries(
		entries(abilities).map(([key, value]) => [key, abilities[key] + (modifiers[key] ?? 0)])
	)}
/>
