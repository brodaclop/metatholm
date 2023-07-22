<script lang="ts">
	import { _, addMessages } from 'svelte-i18n';
	import { kockaDobas, parseKocka } from '../../../logic/Kocka';

	addMessages('en', {
		'check_difficulty:5': 'Easy',
		'check_difficulty:10': 'Average',
		'check_difficulty:20': 'Hard',
		'check_difficulty:40': 'Legendary',
		'check_difficulty:80': 'Impossible'
	});

	addMessages('hu', {
		'check_difficulty:5': 'Könnyű',
		'check_difficulty:10': 'Átlagos',
		'check_difficulty:20': 'Nehéz',
		'check_difficulty:40': 'Legendás',
		'check_difficulty:80': 'Lehetetlen'
	});

	const CHECK_LEVELS: Array<string> = ['5', '10', '20', '40', '80'];

	const roll = (skill: number, count: number): Record<(typeof CHECK_LEVELS)[number], number> => {
		const ret: Record<(typeof CHECK_LEVELS)[number], number> = CHECK_LEVELS.reduce((acc, curr) => {
			acc[curr as (typeof CHECK_LEVELS)[number]] = 0;
			return acc;
		}, {} as Record<(typeof CHECK_LEVELS)[number], number>);

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

	const results: Array<Record<(typeof CHECK_LEVELS)[number], number>> = Array(11)
		.fill(undefined)
		.map((_, i) => roll(i, 10000));
</script>

<table>
	<caption>{$_('label:skill')}</caption>
	<thead>
		<tr>
			<th>{$_('expr:skill_level')}</th>
			{#each CHECK_LEVELS as level}
				<th>{$_(`check_difficulty:${level}`)} <i>({level})</i></th>
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
