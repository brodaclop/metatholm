<script lang="ts">
	import type { CalculatedCharacter } from '../../model/Karakter';
	import Box from '../character/Box.svelte';
	import { _ } from 'svelte-i18n';

	export let calculatedCharacter: CalculatedCharacter;
	export let left: number | undefined = undefined;
	export let right: number | undefined = undefined;
	export let active: boolean;
</script>

<Box background={active ? 'cornsilk' : 'grey'} title={$_('character:weapons')}>
	<label
		>left
		<select bind:value={left}>
			{#each calculatedCharacter.weapons as weapon, idx}
				<option value={idx}>{$_(weapon.name)}</option>
			{/each}
		</select>
	</label>
	<label
		>Right
		<select bind:value={right}>
			{#each calculatedCharacter.weapons as weapon, idx}
				<option value={idx}>{$_(weapon.name)}</option>
			{/each}
		</select>
	</label>
</Box>
