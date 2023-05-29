<script lang="ts">
	let hardness = 3;

	const calc = (base: number, skill: number, mult: number) => {
		const ret = Math.max(1, (base * (30 + 3 * Math.max(0, skill - 1) * mult)) / 30);
		return Math.round(ret * (skill === 0 ? 1 : 2));
	};
</script>

<h1>Izé</h1>

<div>
	<div>Nehézség: <input type="number" bind:value={hardness} /></div>
</div>

<table>
	<thead>
		<tr>
			<th>Skill/Base</th>
			{#each Array(10) as _, base (base)}
				<th>{base + 1}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each Array(11) as _, skill (skill)}
			<tr>
				<th>{skill}</th>
				{#each Array(10) as _, base (base)}
					<td>{calc(base + 1, skill, hardness)}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
