<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Circles from '../../elements/Circles.svelte';
	import { ATTACK_AP } from '../../../model/Rules';
	import { E } from '../../../logic/Expression';
	import type { Character } from '../../../model/Karakter';
	import type { Weapon } from '../../../model/Weapon';
	import { Skill } from '../../../model/Skills';
	import type { ActionVariant } from '../../../model/Action';

	let difficulty: 1 | 2 | 3 = 1;
	let skill = 1;
	let speed = 1;

	export let weapon: Weapon | undefined = undefined;
	export let skills: Character['skills'] | undefined = undefined;
	export let variant: ActionVariant;

	$: if (weapon) {
		speed = weapon.speed;
		difficulty = Skill.get(weapon.skill).difficulty;
		if (skills) {
			skill = Math.max(0, (skills[weapon.skill] ?? 0) + (weapon.actions[variant] ?? 0));
		}
	}

	$: ap = Math.round(
		E.evaluate(ATTACK_AP, {
			'weapon:speed': speed,
			'weapon:skill': skill,
			'weapon:difficulty': difficulty
		}).result * (skill === 0 ? 0 : 1)
	);
</script>

<table>
	<tbody>
		<tr><td /></tr>
		<Circles
			name="label:difficulty"
			bind:value={difficulty}
			subName={$_(`label:difficulty:${difficulty}`)}
			max={3}
			min={1}
			editable={!weapon}
		/>
		<Circles
			name="weapon:skill"
			bind:value={skill}
			subName={String(skill)}
			max={10}
			editable={!skills}
		/>
		<Circles
			name="weapon:speed"
			bind:value={speed}
			subName={String(speed)}
			max={20}
			editable={!weapon}
		/>
	</tbody>
	<caption>{$_('action:ap')}: {ap}</caption>
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
