<script lang="ts">
	import { E } from '../logic/Expression';
	import { kockaDobas, parseKocka } from '../logic/Kocka';

	const CHECK_LEVELS: Record<string, string> = {
		'5': 'Könnyű',
		'10': 'Átlagos',
		'20': 'Nehéz',
		'40': 'Kurva nehéz',
		'80': 'Lehetetlen'
	} as const;

	const roll = (skill: number, count: number): Record<keyof typeof CHECK_LEVELS, number> => {
		const ret: Record<keyof typeof CHECK_LEVELS, number> = Object.keys(CHECK_LEVELS).reduce(
			(acc, curr) => {
				acc[curr as keyof typeof CHECK_LEVELS] = 0;
				return acc;
			},
			{} as Record<keyof typeof CHECK_LEVELS, number>
		);

		const dobas = parseKocka(skill === 0 ? '1d5!' : `${skill}d10!`);

		for (let i = 0; i < count; i++) {
			const result = kockaDobas(dobas).osszeg;
			Object.keys(ret).forEach((key) => {
				if (result >= Number(key)) {
					ret[key]++;
				}
			});
		}

		return ret;
	};

	const results: Array<Record<keyof typeof CHECK_LEVELS, number>> = Array(11)
		.fill(undefined)
		.map((_, i) => roll(i, 10000));
</script>

<h3>Képzettségek</h3>

<table>
	<thead>
		<tr>
			<th>Szint</th>
			{#each Object.entries(CHECK_LEVELS) as [key, value]}
				<th>{value} <i>({key})</i></th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each results as result, i}
			<tr>
				<th>{i}</th>
				{#each Object.values(result) as value}
					<td>{value / 100}%</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
