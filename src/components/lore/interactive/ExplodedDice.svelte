<script lang="ts">
	import { Bar } from 'svelte-chartjs';

	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
	import { kockaDobas, parseKocka } from '../../../logic/Kocka';
	import { _ } from 'svelte-i18n';
	import Box from '../../character/Box.svelte';

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	export let roll = '1d10!';
	const tries = 100000;

	let data: any;
	let avg = 0;

	$: if (!data) {
		contest(true);
	}

	const createData = (rolls: Array<number>, start: number) => {
		const colors = rolls.map((_, i) => {
			const value = i + start;
			if (value % 20 <= 10) {
				return '#888888';
			} else {
				return '#cccccc';
			}
		});
		data = {
			labels: rolls.map((_, i) => start + i),
			datasets: [
				{
					label: '%',
					data: rolls,
					backgroundColor: colors,
					//borderColor: colors,
					borderWidth: 0
				}
			]
		};
	};

	const contest = (sumMode: boolean) => {
		const firstKocka = parseKocka(roll);
		const rolls: Map<number, number> = new Map<number, number>();
		avg = 0;
		for (let i = 0; i < tries; i++) {
			const result = kockaDobas(firstKocka).osszeg;
			rolls.set(result, (rolls.get(result) ?? 0) + 1);
		}
		const keys = Array.from(rolls.keys()).sort((a, z) => a - z);
		const minimum = keys.at(0) ?? 0;
		const maximum = keys.at(-1) ?? 0;
		const rollArray: Array<number> = [];
		let sum = tries;
		for (let i = minimum; i <= maximum; i++) {
			const roll = rolls.get(i) ?? 0;
			avg += roll * i;
			if (sumMode) {
				sum -= roll;
			} else {
				sum = roll;
			}
			rollArray.push((sum * 100) / tries);
		}
		avg /= tries;
		createData(rollArray, minimum);
	};
</script>

<Box background="peach" title={$_('rule:exploded_dice')}>
	<div>
		Roll: <input type="test" bind:value={roll} />
	</div>
	<button on:click={() => contest(true)}>At least</button>
	<button on:click={() => contest(false)}>Exactly</button>
	<Bar {data} />
	<div>Average: {avg}</div>
</Box>
