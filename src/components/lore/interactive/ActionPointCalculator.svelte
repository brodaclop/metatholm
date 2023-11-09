<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Circles from '../../elements/Circles.svelte';
	import { ATTACK_AP } from '../../../model/Rules';
	import { E } from '../../../logic/Expression';

	let difficulty: 1 | 2 | 3 = 1;
	let skill = 1;
	let speed = 1;

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
			editable
		/>
		<Circles name="weapon:skill" bind:value={skill} subName={String(skill)} max={10} editable />
		<Circles name="weapon:speed" bind:value={speed} subName={String(speed)} max={20} editable />
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
