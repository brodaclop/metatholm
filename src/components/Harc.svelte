<script lang="ts">
	import { E } from '../logic/Expression';
	import { WEAPON_ATK } from '../model/Rules';

	let hardness = 3;

	const calc = (base: number, skill: number, mult: number) => {
		const ret = E.evaluate(WEAPON_ATK, {
			'weapon:attack': base,
			'weapon:skill': Math.max(1, skill),
			'weapon:difficulty': mult
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
