<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Circles from '../../elements/Circles.svelte';
	import { WEAPON_ATK, WEAPON_DEF } from '../../../model/Rules';
	import { E } from '../../../logic/Expression';
	import type { ActionRange } from '../../../model/Action';
	import { ReachMultipliers } from '../../../model/calculations/WeaponAction';

	let difficulty: 1 | 2 | 3 = 1;
	let skill = 1;
	let weapon = 1;
	let reach = 1;
	export let range: ActionRange = 'in-range';
	export let type: 'attack' | 'defend';

	$: result = Math.max(
		0,
		Math.round(
			E.evaluate(type === 'attack' ? WEAPON_ATK : WEAPON_DEF, {
				'weapon:attack': weapon,
				'weapon:defence': weapon,
				'weapon:skill': skill,
				'weapon:difficulty': difficulty,
				'weapon:reach': reach * ReachMultipliers[range]
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
			name={type === 'attack' ? 'weapon:attack' : 'weapon:defence'}
			bind:value={weapon}
			subName={String(weapon)}
			max={20}
			editable
		/>
		<Circles name="weapon:reach" bind:value={reach} subName={String(reach)} max={20} editable />
	</tbody>
	<caption>{$_(type === 'attack' ? 'action:attack' : 'action:defend')}: {result}</caption>
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
