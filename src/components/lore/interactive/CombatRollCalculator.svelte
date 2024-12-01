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

<table class="standard">
	<thead>
		<tr>
			<th />
			<th />
			<th colspan="21" style:text-align="center"
				>{$_(variantProps.type === 'action' ? 'weapon:attack' : 'weapon:defence')}</th
			>
		</tr>
		<tr>
			<th />
			<th />
			{#each Array(21) as _, _weapon}
				<th class:semi-highlighted={weaponProp === _weapon}>{_weapon}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each Array(11) as _, _skill}
			<tr>
				{#if _skill === 0}
					<th rowspan="11">{i18n('weapon:skill')}</th>
				{/if}
				<th class:semi-highlighted={skill === _skill}>
					{_skill}
				</th>
				{#each Array(21) as _, _weapon}
					<td
						on:mouseenter={() => select(_skill, _weapon)}
						on:mouseleave={() => select(-1, -1)}
						class:semi-highlighted={(skill === _skill) !== (weaponProp === _weapon)}
						class:highlighted={skill === _skill && weaponProp === _weapon}
						>{calculate(_weapon, _skill, difficulty, reach)}</td
					>
				{/each}
			</tr>
		{/each}
	</tbody>
	<caption
		>{$_(id)}: {skill !== -1 && weaponProp !== -1
			? calculate(skill, weaponProp, difficulty, reach)
			: '-'}</caption
	>
</table>

<style>
	table {
		caption-side: bottom;
	}

	td,
	th {
		transition: background-color 0.05s ease-in-out;
	}

	.semi-highlighted {
		background-color: hsl(from var(--lore-active-cells-c) h calc(s/2) l);
	}

	.highlighted {
		background-color: var(--lore-active-cells-c);
	}

	caption {
		font-weight: var(--font-weight-bold);
		font-size: large;
	}
</style>
