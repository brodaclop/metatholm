<script lang="ts">
	import { E } from '../logic/Expression';
	import { ATTACK_AP, WEAPON_ATK } from '../model/Rules';

	let hardness = 3;

	const calc = (base: number, skill: number, mult: number) => {
		const ret = E.evaluate(ATTACK_AP, {
			'weapon:speed': base,
			'weapon:skill': skill,
			'weapon:difficulty': mult,
			'weapon:reach': 0
		}).result;
		return Math.round(ret * (skill === 0 ? 0 : 1));
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
