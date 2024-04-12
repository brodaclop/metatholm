<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Circles from '../../elements/Circles.svelte';
	import { MAGIC_EFFECTIVE_SKILL } from '../../../model/Rules';
	import { E } from '../../../logic/Expression';
	import type { Character } from '../../../model/Karakter';
	import { Spell } from '../../../model/Spell';
	import { LevelModifiers } from '../../../model/calculations/SpellAction';
	import FixedDiceRoller from '../FixedDiceRoller.svelte';

	let skill = 1;
	let level = 0;

	export let spell: Spell | undefined = undefined;
	export let skills: Character['skills'] | undefined = undefined;
	export let id: 'action:cast' | 'action:cast-snap' | 'action:cast-slow';

	$: if (spell) {
		const spellInfo = Spell.get(spell);
		level = spellInfo.level;
		if (skills) {
			skill = skills[spellInfo.skill] ?? 0;
		}
	}

	$: spellCheck = E.evaluate(MAGIC_EFFECTIVE_SKILL, {
		'expr:spell_level': Math.max(0, level + LevelModifiers[id]),
		'expr:spell_focus_skill': skill
	}).result;

	$: roll = spellCheck > 0 ? `${spellCheck}d10!` : undefined;
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
			name="expr:spell_level"
			bind:value={level}
			subName={String(level)}
			max={10}
			editable={!spell}
		/>
	</tbody>
	<caption>
		{#if roll}
			<FixedDiceRoller {roll} />
		{/if}
	</caption>
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
