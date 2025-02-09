<script lang="ts">
	import { _ } from 'svelte-i18n';

	import type { Ability } from '../../model/Abilities';
	import { entries, keys } from '../../model/InfoList';
	import type { Character } from '../../model/Karakter';
	import Box from '../elements/Box.svelte';
	import CircleGroup from '../elements/CircleGroup.svelte';
	import LoreInfoIcon from '../LoreInfoIcon.svelte';

	export let editable: boolean = false;
	export let abilities: Character['abilities'];
	export let modifiers: Partial<Record<Ability, number>> = {};

	export let slender = false;
</script>

<Box title="character:abilities" flavour="abilities">
	<slot name="title" slot="title">
		<LoreInfoIcon disablePlaceholder id="character:abilities" />
		{$_('character:abilities')}
	</slot>
	{#if slender}
		<CircleGroup
			rows={keys(abilities)}
			values={abilities}
			{editable}
			max={0}
			plus={(key) => (abilities[key] = abilities[key] + 1)}
			minus={(key) => (abilities[key] = abilities[key] - 1)}
			newValues={Object.fromEntries(
				entries(abilities).map(([key, value]) => [key, abilities[key] + (modifiers[key] ?? 0)])
			)}
		>
			<span slot="extra" let:key>
				{abilities[key]}
			</span>
		</CircleGroup>
	{:else}
		<CircleGroup
			rows={keys(abilities)}
			values={abilities}
			{editable}
			max={10}
			plus={(key) => (abilities[key] = abilities[key] + 1)}
			minus={(key) => (abilities[key] = abilities[key] - 1)}
			newValues={Object.fromEntries(
				entries(abilities).map(([key, value]) => [key, abilities[key] + (modifiers[key] ?? 0)])
			)}
		/>
	{/if}
</Box>
