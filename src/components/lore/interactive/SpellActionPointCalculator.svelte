<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Circles from '../../elements/Circles.svelte';
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

<PointsTable
	columnName="weapon:speed"
	columnMax={20}
	bind:column={speed}
	columnChangeable={!skills}
	rowName="weapon:skill"
	rowMax={10}
	rowChangeable={!spell}
	bind:row={skill}
	{id}
	valueCalculator={(row, column) => calculate(column, row)}
/>
