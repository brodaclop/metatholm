<script lang="ts">
	import { E } from '../logic/Expression';
	import {  SPELL_AP } from '../model/Rules';

	let hardness = 3;

	const calc = (base: number, skill: number, mult: number) => {
		const ret = E.evaluate(SPELL_AP, {
			'weapon:attack': base,
			'weapon:speed': base,
			'expr:spell_speed': base,
			'weapon:skill': skill,
			'expr:spell_focus_skill': skill,
			'weapon:difficulty': mult,
			'weapon:reach': 0
		}).result;
		return Math.round(ret);
	};

	const MAX_BASE = 20;
</script>

<h1>Izé</h1>

<div>
	<div>Nehézség: <input type="number" bind:value={hardness} /></div>
</div>

<table>
	<thead>
		<tr>
			<th>Skill/Base</th>
			{#each Array(MAX_BASE) as _, base (base)}
				<th>{base + 1}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each Array(11) as _, skill (skill)}
			<tr>
				<th>{skill}</th>
				{#each Array(MAX_BASE) as _, base (base)}
					<td>{calc(base + 1, skill, hardness)}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
