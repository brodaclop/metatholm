<script lang="ts">
	import { _, addMessages } from 'svelte-i18n';
	import { kockaDobas, parseKocka } from '../../../logic/Kocka';
	import Box from '../../elements/Box.svelte';

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

	const ROLLS = 100000;

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
				if (result > Number(key)) {
					ret[key]++;
				}
			});
		}

		return ret;
	};

	const results: Array<Record<(typeof CHECK_LEVELS)[number], number>> = Array(11)
		.fill(undefined)
		.map((_, i) => roll(i, ROLLS));
</script>

<table class="standard">
	<caption>{$_('label:skill_check_success_probabilities')}</caption>
	<thead>
		<tr>
			<th rowspan="2">{$_('expr:skill_rank')}</th>
			<th colspan={CHECK_LEVELS.length}>{$_('label:difficulty')}</th>
		</tr>
		<tr>
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
					<td>{Number(((value * 100) / ROLLS).toFixed(2))}%</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		caption-side: top;
	}

	caption {
		border: 2px ridge var(--box-border-c);
		background-color: var(--table-head-background-c);
		font-weight: bold;
	}

	td,
	th {
		padding-right: 0.25em;
	}

	th {
		text-align: center;
	}
</style>
