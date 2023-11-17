<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Circles from '../../elements/Circles.svelte';
	import { WEAPON_ATK, WEAPON_DEF } from '../../../model/Rules';
	import { E } from '../../../logic/Expression';
	import {
		ACTION_VARIANT_PROPERTIES,
		type ActionRange,
		type ActionVariant
	} from '../../../model/Action';
	import { ReachMultipliers } from '../../../model/calculations/WeaponAction';
	import type { Weapon } from '../../../model/Weapon';
	import type { Character } from '../../../model/Karakter';
	import { Skill } from '../../../model/Skills';

	let difficulty: 1 | 2 | 3 = 1;
	let skill = 1;
	let weaponProp = 1;
	let reach = 1;
	export let weapon: Weapon | undefined = undefined;
	export let skills: Character['skills'] | undefined = undefined;
	export let variant: ActionVariant;

	$: variantProps = ACTION_VARIANT_PROPERTIES[variant];

	$: if (weapon) {
		weaponProp = variantProps.type === 'action' ? weapon.attack : weapon.defence;
		reach = weapon.reach;
		difficulty = Skill.get(weapon.skill).difficulty;
		if (skills) {
			skill = Math.max(0, (skills[weapon.skill] ?? 0) + (weapon.actions[variant] ?? 0));
		}
	}

	$: result = Math.max(
		0,
		Math.round(
			E.evaluate(variantProps.type === 'action' ? WEAPON_ATK : WEAPON_DEF, {
				'weapon:attack': weaponProp,
				'weapon:defence': weaponProp,
				'weapon:skill': skill,
				'weapon:difficulty': difficulty,
				'weapon:reach': reach * ReachMultipliers[variantProps.range ?? 'in-range']
			}).result * (skill === 0 ? 0 : 1)
		)
	);
</script>

<table>
	<tbody>
		<Circles
			name="label:difficulty"
			bind:value={difficulty}
			subName={$_(`label:difficulty:${difficulty}`)}
			max={3}
			min={1}
			editable
		/>
		<Circles name="weapon:skill" bind:value={skill} subName={String(skill)} max={10} editable />
		<Circles
			name={variantProps.type === 'action' ? 'weapon:attack' : 'weapon:defence'}
			bind:value={weaponProp}
			subName={String(weaponProp)}
			max={20}
			editable
		/>
		<Circles name="weapon:reach" bind:value={reach} subName={String(reach)} max={20} editable />
	</tbody>
	<caption>{$_(variant)}: {result}</caption>
</table>

<style>
	table {
		caption-side: bottom;
	}

	caption {
		font-weight: bold;
		font-size: x-large;
	}
</style>
