<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { ENCHANTMENT_MAGNITUDE, type Weapon } from '../../../model/Weapon';
	import { type Skill, WEAPON_MULTIPLIERS } from '../../../model/Skills';

	export let editedWeapon: Weapon;
	export let value: 'speed' | 'attack' | 'defence' | 'damage';
	export let multipliers: (typeof WEAPON_MULTIPLIERS)[Skill];

	const enchantmentMagnitude = ENCHANTMENT_MAGNITUDE[value];
</script>

<span class="header">{$_(`weapon:${value}`)}</span>
<span>
	<input type="number" min="0" max="10" bind:value={editedWeapon[value]} />
	x {(multipliers?.[value] ?? 1) * enchantmentMagnitude}
	+
	<select bind:value={editedWeapon.enchantment[value]}>
		<option value={undefined}>-</option>
		{#each Array(9) as _, i}
			<option value={i + 1}>{(i + 1) * enchantmentMagnitude}</option>
		{/each}
	</select>
</span>

<style>
	select {
		width: 3em;
	}

	.header {
		font-weight: bold;
		padding-right: 0.5em;
	}
</style>
