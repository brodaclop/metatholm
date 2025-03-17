<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { ATTACK_AP } from '../../../model/Rules';
	import { E } from '../../../logic/Expression';
	import type { Character } from '../../../model/Karakter';
	import type { Weapon } from '../../../model/Weapon';
	import { ACTION_VARIANT_PROPERTIES, type ActionVariant } from '../../../model/Action';
	import PointsTable from '../../PointsTable.svelte';
	import { Skill, WEAPON_MULTIPLIERS } from '../../../model/Skills';
	import LoreInfoIcon from '../../LoreInfoIcon.svelte';

	let skill = 1;
	let speed = 1;
	let weaponSkill: Skill;

	export let weapon: Weapon | undefined = undefined;
	export let skills: Character['skills'] | undefined = undefined;
	export let id: ActionVariant;

	$: if (weapon) {
		weaponSkill = weapon.skill;
		speed = weapon.speed;
		if (skills && ACTION_VARIANT_PROPERTIES[id]) {
			skill = Math.max(0, (skills[weaponSkill] ?? 0) + (weapon.actions[id] ?? 0));
		}
	}

	const calculate = (_speed: number, _skill: number, _multiplier: number): number =>
		Math.round(
			E.evaluate(ATTACK_AP, {
				'weapon:speed': _speed,
				'weapon:skill': _skill,
				'combat:multiplier': _multiplier,
				'weapon:enchantment': weapon?.enchantment.speed ?? 0
			}).result * (_skill === 0 ? 0 : 1)
		);

	const multiplier = (skill: Skill) => WEAPON_MULTIPLIERS[skill]?.speed ?? 1;

	$: unarmedWeaponSkill = weaponSkill ? Skill.get(weaponSkill).unarmedWeaponSkill : undefined;

	$: rowName = (weaponSkill ? $_(weaponSkill) + '\n' : '') + $_('weapon:skill');
	$: columnName =
		weaponSkill && unarmedWeaponSkill
			? $_(unarmedWeaponSkill) + ' ' + $_('weapon:skill')
			: `weapon:speed`;
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
					<option value={undefined}>{$_('label:select_combat_skill')}</option>
					{#each Skill.list().filter((s) => s.type === 'skill_type:combat') as skill}
						<option value={skill.name}>{$_(skill.name)} (x{multiplier(skill.name)})</option>
					{/each}
				</select></td
			>
		</tr>
	</tbody>
</table>

<PointsTable
	{columnName}
	columnMax={10}
	bind:column={speed}
	columnChangeable={!skills}
	{rowName}
	rowMax={10}
	rowChangeable={!weapon}
	bind:row={skill}
	{id}
	valueCalculator={(row, column) => calculate(column, row, multiplier(weaponSkill))}
/>
