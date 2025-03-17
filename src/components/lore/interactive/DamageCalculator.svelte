<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Circles from '../../elements/Circles.svelte';
	import FixedDiceRoller from '../FixedDiceRoller.svelte';
	import type { Weapon } from '../../../model/Weapon';
	import { Skill } from '../../../model/Skills';
	import LoreInfoIcon from '../../LoreInfoIcon.svelte';

	let damage = 1;
	let weaponSkill: Skill;

	export let weapon: Weapon | undefined = undefined;

	$: if (weapon) {
		weaponSkill = weapon.skill;
		damage = weapon.damage;
	}

	const multiplier = (skill: Skill) => Skill.get(skill).weaponMultipliers?.damage ?? 1;
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
		<Circles
			name="weapon:damage"
			bind:value={damage}
			subName={String(damage)}
			max={10}
			min={1}
			editable={!weapon}
		/>
	</tbody>
	<tbody>
		<tr>
			<td colspan="3">
				<FixedDiceRoller roll="{Math.floor(damage * multiplier(weaponSkill))}d5!" />
			</td>
		</tr>
	</tbody>
</table>
