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

	$: ap = Math.round(
		E.evaluate(SPELL_AP, {
			'expr:spell_speed': Math.min(20, speed * SpeedModifiers[id]),
			'expr:spell_focus_skill': skill
		}).result * (skill === 0 ? 0 : 1)
	);
</script>

<table>
	<tbody>
		<tr><td /></tr>
		<Circles
			name="expr:spell_focus_skill"
			bind:value={skill}
			subName={String(skill)}
			max={10}
			editable={!spell || !skills}
		/>
		<Circles
			name="expr:spell_speed"
			bind:value={speed}
			subName={String(speed)}
			max={20}
			editable={!spell}
		/>
	</tbody>
	<caption>{$_('action:ap')}: {ap}</caption>
</table>

<style>
	table {
		caption-side: bottom;
	}

	caption {
		font-weight: var(--font-weight-bold);
		font-size: x-large;
	}
</style>
