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
	import LoreInfoIcon from '../../LoreInfoIcon.svelte';

	let skill = 1;
	let weaponProp = 1;
	let reach = 1;
	let weaponSkill: Skill;
	export let weapon: Weapon | undefined = undefined;
	export let skills: Character['skills'] | undefined = undefined;
	export let id: ActionVariant;

	$: variantProps = ACTION_VARIANT_PROPERTIES[id];

	let prop: 'attack' | 'defence' = 'attack';

	$: if (variantProps) prop = variantProps.type === 'action' ? 'attack' : 'defence';

	$: if (weapon && variantProps) {
		weaponSkill = weapon.skill;
		weaponProp = variantProps.type === 'action' ? weapon.attack : weapon.defence;
		reach = weapon.reach;
	}

	$: if (skills) {
		skill = Math.max(0, (skills[weaponSkill] ?? 0) + (weapon?.actions[id] ?? 0));
	}

	const calculate = (
		_weapon: number,
		_skill: number,
		_multiplier: number,
		_reach: number
	): number =>
		Math.max(
			0,
			Math.round(
				E.evaluate(variantProps.type === 'action' ? WEAPON_ATK : WEAPON_DEF, {
					'weapon:attack': _weapon,
					'weapon:defence': _weapon,
					'weapon:skill': _skill,
					'combat:multiplier': _multiplier,
					'weapon:reach': _reach * ReachMultipliers[variantProps.range ?? 'in-range'],
					'weapon:enchantment': weapon?.enchantment[prop] ?? 0
				}).result * (_skill === 0 ? 0 : 1)
			)
		);

	const multiplier = (skill: Skill) => Skill.get(skill).weaponMultipliers?.[prop] ?? 1;

	$: unarmedWeaponSkill = weaponSkill ? Skill.get(weaponSkill).unarmedWeaponSkill : undefined;

	$: rowName = (weaponSkill ? $_(weaponSkill) + '\n' : '') + $_('weapon:skill');
	$: columnName =
		weaponSkill && unarmedWeaponSkill
			? $_(unarmedWeaponSkill) + ' ' + $_('weapon:skill')
			: `weapon:${prop}`;
</script>

<table>
	<tbody>
		<tr>
			<th>
				<LoreInfoIcon id="weapon:skill" />
				{$_('weapon:skill')}</th
			>
			<td
				><select bind:value={weaponSkill} disabled={!!weapon}>
					<option disabled value={undefined}>{$_('label:select_combat_skill')}</option>
					{#each Skill.list().filter((s) => s.type === 'skill_type:combat') as skill}
						<option value={skill.name}>{$_(skill.name)} (x{multiplier(skill.name)})</option>
					{/each}
				</select></td
			>
		</tr>
		<Circles
			name="weapon:reach"
			bind:value={reach}
			subName={String(reach)}
			max={10}
			editable={!weapon}
		/>
	</tbody>
</table>

<PointsTable
	{columnName}
	columnMax={10}
	columnChangeable={!weapon}
	bind:column={weaponProp}
	{rowName}
	rowChangeable={!skills}
	rowMax={10}
	bind:row={skill}
	{id}
	valueCalculator={(row, column) => calculate(column, row, multiplier(weaponSkill), reach)}
/>

<style>
	select {
		width: 100%;
	}
</style>
