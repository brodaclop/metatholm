<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Circles from '../../elements/Circles.svelte';
	import { ATTACK_AP } from '../../../model/Rules';
	import { E } from '../../../logic/Expression';
	import type { Character } from '../../../model/Karakter';
	import type { Weapon } from '../../../model/Weapon';
	import { Skill } from '../../../model/Skills';
	import { ACTION_VARIANT_PROPERTIES, type ActionVariant } from '../../../model/Action';
	import PointsTable from '../../PointsTable.svelte';

	let skill = 1;
	let speed = 1;

	export let weapon: Weapon | undefined = undefined;
	export let skills: Character['skills'] | undefined = undefined;
	export let id: ActionVariant;

	$: if (weapon) {
		speed = weapon.speed;
		if (skills && ACTION_VARIANT_PROPERTIES[id]) {
			skill = Math.max(0, (skills[weapon.skill] ?? 0) + (weapon.actions[id] ?? 0));
		}
	}

	const calculate = (_speed: number, _skill: number): number =>
		Math.round(
			E.evaluate(ATTACK_AP, {
				'weapon:speed': _speed,
				'weapon:skill': _skill
			}).result * (_skill === 0 ? 0 : 1)
		);
</script>

<PointsTable
	columnName="weapon:speed"
	columnMax={20}
	bind:column={speed}
	columnChangeable={!skills}
	rowName="weapon:skill"
	rowMax={10}
	rowChangeable={!weapon}
	bind:row={skill}
	{id}
	valueCalculator={(row, column) => calculate(column, row)}
/>
