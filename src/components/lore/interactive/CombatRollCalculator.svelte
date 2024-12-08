<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Circles from '../../elements/Circles.svelte';
	import { WEAPON_ATK, WEAPON_DEF } from '../../../model/Rules';
	import { E } from '../../../logic/Expression';
	import { ACTION_VARIANT_PROPERTIES, type ActionVariant } from '../../../model/Action';
	import { ReachMultipliers } from '../../../model/calculations/WeaponAction';
	import type { Weapon } from '../../../model/Weapon';
	import type { Character } from '../../../model/Karakter';
	import { Skill } from '../../../model/Skills';
	import PointsTable from '../../PointsTable.svelte';

	let difficulty: 1 | 2 | 3 = 1;
	let skill = 1;
	let weaponProp = 1;
	let reach = 1;
	export let weapon: Weapon | undefined = undefined;
	export let skills: Character['skills'] | undefined = undefined;
	export let id: ActionVariant;

	$: variantProps = ACTION_VARIANT_PROPERTIES[id];

	$: if (weapon && variantProps) {
		weaponProp = variantProps.type === 'action' ? weapon.attack : weapon.defence;
		reach = weapon.reach;
		difficulty = Skill.get(weapon.skill).difficulty;
		if (skills) {
			skill = Math.max(0, (skills[weapon.skill] ?? 0) + (weapon.actions[id] ?? 0));
		}
	}

	const calculate = (
		_weapon: number,
		_skill: number,
		_difficulty: number,
		_reach: number
	): number =>
		Math.max(
			0,
			Math.round(
				E.evaluate(variantProps.type === 'action' ? WEAPON_ATK : WEAPON_DEF, {
					'weapon:attack': _weapon,
					'weapon:defence': _weapon,
					'weapon:skill': _skill,
					'weapon:difficulty': _difficulty,
					'weapon:reach': _reach * ReachMultipliers[variantProps.range ?? 'in-range']
				}).result * (_skill === 0 ? 0 : 1)
			)
		);

	const select = (_skill: number, _weapon: number) => {
		if (!skills) {
			skill = _skill;
		}
		if (!weapon) {
			weaponProp = _weapon;
		}
	};

	const i18n = $_;
</script>

<table>
	<tbody>
		<Circles
			name="label:difficulty"
			bind:value={difficulty}
			subName={$_(`weapon:difficulty:${difficulty}`)}
			max={3}
			min={1}
			canMinus={difficulty > 1}
			editable={!weapon}
		/>
		<Circles
			name="weapon:reach"
			bind:value={reach}
			subName={String(reach)}
			max={20}
			editable={!weapon}
		/>
	</tbody>
</table>

<PointsTable
	columnName={variantProps.type === 'action' ? 'weapon:attack' : 'weapon:defence'}
	columnMax={20}
	columnChangeable={!weapon}
	bind:column={weaponProp}
	rowName="weapon:skill"
	rowChangeable={!skills}
	rowMax={10}
	bind:row={skill}
	{id}
	valueCalculator={(row, column) => calculate(column, row, difficulty, reach)}
/>
