<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { SPELL_AP } from '../../../model/Rules';
	import { E } from '../../../logic/Expression';
	import type { Character } from '../../../model/Karakter';
	import { Spell } from '../../../model/Spell';
	import { SpeedModifiers } from '../../../model/calculations/SpellAction';
	import PointsTable from '../../PointsTable.svelte';

	let skill = 1;
	let speed = 1;

	export let spell: Spell | undefined = undefined;
	export let skills: Character['skills'] | undefined = undefined;
	export let id: 'action:cast' | 'action:cast-snap' | 'action:cast-slow';

	$: if (spell) {
		const spellInfo = Spell.get(spell);
		speed = spellInfo.speed;
		if (skills) {
			skill = skills[spellInfo.skill] ?? 0;
		}
	}

	const calculate = (_speed: number, _skill: number, _multiplier: number): number =>
		Math.round(
			E.evaluate(SPELL_AP, {
				'expr:spell_speed': _speed,
				'expr:spell_focus_skill': _skill,
				'combat:multiplier': _multiplier
			}).result
		);
</script>

<PointsTable
	columnName="expr:spell_speed"
	columnMax={10}
	bind:column={speed}
	columnChangeable={!skills}
	rowName="weapon:skill"
	rowMax={10}
	rowChangeable={!spell}
	bind:row={skill}
	{id}
	valueCalculator={(row, column) => calculate(column, row, SpeedModifiers[id])}
/>
