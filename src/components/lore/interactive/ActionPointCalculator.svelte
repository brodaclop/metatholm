<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Circles from '../../elements/Circles.svelte';
	import { ATTACK_AP } from '../../../model/Rules';
	import { E } from '../../../logic/Expression';
	import type { Character } from '../../../model/Karakter';
	import type { Weapon } from '../../../model/Weapon';
	import { Skill } from '../../../model/Skills';
	import { ACTION_VARIANT_PROPERTIES, type ActionVariant } from '../../../model/Action';

	let difficulty: 1 | 2 | 3 = 1;
	let skill = 1;
	let speed = 1;

	export let weapon: Weapon | undefined = undefined;
	export let skills: Character['skills'] | undefined = undefined;
	export let id: ActionVariant;

	$: if (weapon) {
		speed = weapon.speed;
		difficulty = Skill.get(weapon.skill).difficulty;
		if (skills && ACTION_VARIANT_PROPERTIES[id]) {
			skill = Math.max(0, (skills[weapon.skill] ?? 0) + (weapon.actions[id] ?? 0));
		}
	}

	const calculate = (_speed: number, _skill: number, _difficulty: number): number =>
		Math.round(
			E.evaluate(ATTACK_AP, {
				'weapon:speed': _speed,
				'weapon:skill': _skill,
				'weapon:difficulty': _difficulty
			}).result * (_skill === 0 ? 0 : 1)
		);

	const i18n = $_;

	const select = (_skill: number, _speed: number) => {
		if (!skills) {
			skill = _skill;
		}
		if (!weapon) {
			speed = _speed;
		}
	};
</script>

<table>
	<tbody>
		<tr><td /></tr>
		<Circles
			name="label:difficulty"
			bind:value={difficulty}
			subName={$_(`weapon:difficulty:${difficulty}`)}
			max={3}
			min={1}
			editable={!weapon}
		/>
	</tbody>
</table>

<table class="standard">
	<thead>
		<tr>
			<th />
			<th />
			<th colspan="21" style:text-align="center">{$_('weapon:speed')}</th>
		</tr>
		<tr>
			<th />
			<th />
			{#each Array(21) as _, _speed}
				<th class:semi-highlighted={speed === _speed}>{_speed}</th>
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
				{#each Array(21) as _, _speed}
					<td
						on:mouseenter={() => select(_skill, _speed)}
						on:mouseleave={() => select(-1, -1)}
						class:semi-highlighted={(skill === _skill) !== (speed === _speed)}
						class:highlighted={skill === _skill && speed === _speed}
						>{calculate(_speed, _skill, difficulty)}</td
					>
				{/each}
			</tr>
		{/each}
	</tbody>
	<caption
		>{$_(id)}: {skill !== -1 && speed !== -1 ? calculate(skill, speed, difficulty) : '-'}</caption
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
