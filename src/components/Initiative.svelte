<script lang="ts">
	let hardness = 3;
	let base = 10;

	$: initiative = Array(11)
		.fill(undefined)
		.map((_, skill) => {
			const bottom = 2 * (10 - base);
			if (skill === 0) {
				const value = bottom * 1.5;
				return Math.max(1, Math.round(value));
			} else {
				const value = bottom - (bottom * (1 + hardness) * (skill - 1)) / 54;
				return Math.max(1, Math.round(value));
			}
		});
</script>

<h1>Kezdemény</h1>

<div>
	<div>Alap: <input type="number" bind:value={base} /></div>
	<div>Nehézség: <input type="number" bind:value={hardness} /></div>
</div>

<table>
	<tbody>
		{#each initiative as value, i}
			<tr>
				<th>{i}</th>
				<td>{value}</td>
			</tr>
		{/each}
	</tbody>
</table>
