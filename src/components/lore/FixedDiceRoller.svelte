<script lang="ts">
	import {
		Chart,
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale,
		BarController
	} from 'chart.js/auto';
	import { kockaDobas, parseKocka } from '../../logic/Kocka';
	import { _ } from 'svelte-i18n';
	import Box from '../elements/Box.svelte';

	Chart.register(Title, BarController, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	export let roll: string;
	const TRIES = 100000;

	let chartCanvas: HTMLCanvasElement;
	let chart: Chart;

	$: config = {
		type: 'bar',
		data: contest(roll),
		options: {
			responsive: true,
			spacing: 2,
			plugins: {
				title: {
					display: false,
					text: $_('label:roll') + ':' + roll
				},
				legend: {
					display: false
				}
			}
		}
	};

	$: if (config && chartCanvas) {
		chart?.destroy();
		const ctx = chartCanvas.getContext('2d');
		chart = new Chart(ctx!, config);
	}

	const createData = (rolls: Array<number>, start: number): any => {
		const colors = rolls.map((_, i, arr) => {
			const value = i + start;
			if (arr[i] >= 50 && arr[i + 1] < 50) {
				return '#88ff88';
			}
			if (value % 20 <= 10) {
				return '#888888';
			} else {
				return '#cccccc';
			}
		});
		return {
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

	const contest = (diceRoll: string) => {
		const firstKocka = parseKocka(diceRoll);
		const rolls: Map<number, number> = new Map<number, number>();
		for (let i = 0; i < TRIES; i++) {
			const result = kockaDobas(firstKocka).osszeg;
			rolls.set(result, (rolls.get(result) ?? 0) + 1);
		}
		const keys = Array.from(rolls.keys()).sort((a, z) => a - z);
		const minimum = keys.at(0) ?? 0;
		const maximum = keys.at(-1) ?? 0;
		const rollArray: Array<number> = [];
		let sum = TRIES;
		for (let i = minimum; i <= maximum; i++) {
			rollArray.push((sum * 100) / TRIES);
			const roll = rolls.get(i) ?? 0;
			sum -= roll;
		}
		return createData(rollArray, minimum);
	};
</script>

<Box flavour="plain" title={$_('label:roll') + ': ' + roll}>
	<canvas bind:this={chartCanvas} width={800} height={400} />
</Box>

<style>
</style>
