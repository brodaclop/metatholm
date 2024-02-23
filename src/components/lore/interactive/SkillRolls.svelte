<script lang="ts">
	import { _, addMessages } from 'svelte-i18n';
	import { kockaDobas, parseKocka } from '../../../logic/Kocka';
	import Box from '../../character/Box.svelte';

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
				if (result >= Number(key)) {
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

<Box flavour="plain" title={$_('label:skill_check_success_probabilities')}>
	<table>
		<thead>
			<tr>
				<th />
				<th colspan={CHECK_LEVELS.length}>{$_('label:difficulty')}</th>
			</tr>
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
						<td>{Number(((value * 100) / ROLLS).toFixed(2))}%</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</Box>

<style>
	table {
		border-collapse: collapse;
	}

	td,
	th {
		padding-right: 0.25em;
	}

	table tbody th,
	table thead tr th:first-child {
		background-color: var(--lore-skill-rolls-header-c);
	}

	table tbody td,
	table thead tr th:not(:first-child) {
		background-color: var(--lore-skill-rolls-cells-c);
	}
</style>
