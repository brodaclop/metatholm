<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Circles from '../../elements/Circles.svelte';
	import { SPELL_AP } from '../../../model/Rules';
	import { E } from '../../../logic/Expression';
	import type { Character } from '../../../model/Karakter';
	import { Spell } from '../../../model/Spell';
	import { SpeedModifiers } from '../../../model/calculations/SpellAction';

	let skill = 1;
	let speed = 1;

	export let spell: Spell | undefined = undefined;
	export let skills: Character['skills'] | undefined = undefined;
	export let id: 'action:cast' | 'action:cast-snap';

	$: if (spell) {
		const spellInfo = Spell.get(spell);
		speed = spellInfo.speed;
		if (skills) {
			skill = skills[spellInfo.skill] ?? 0;
		}
	}

	const calculate = (_speed: number, _skill: number): number =>
		_skill === 0
			? 40
			: Math.round(
					E.evaluate(SPELL_AP, {
						'expr:spell_speed': Math.min(20, _speed * SpeedModifiers[id]),
						'expr:spell_focus_skill': _skill
					}).result
			  );

	const i18n = $_;

	const select = (_skill: number, _speed: number) => {
		if (!skills) {
			skill = _skill;
		}
		if (!spell) {
			speed = _speed;
		}
	};
</script>

<table class="standard">
	<thead>
		<tr>
			<th />
			<th />
			<th colspan="11" style:text-align="center">{$_('weapon:speed')}</th>
		</tr>
		<tr>
			<th />
			<th />
			{#each Array(11) as _, _speed}
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
				{#each Array(11) as _, _speed}
					<td
						on:mouseenter={() => select(_skill, _speed)}
						on:mouseleave={() => select(-1, -1)}
						class:semi-highlighted={(skill === _skill) !== (speed === _speed)}
						class:highlighted={skill === _skill && speed === _speed}>{calculate(_speed, _skill)}</td
					>
				{/each}
			</tr>
		{/each}
	</tbody>
	<caption>{$_(id)}: {skill !== -1 && speed !== -1 ? calculate(skill, speed) : '-'}</caption>
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
