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
	import { kockaDobas, parseKocka } from '../../../logic/Kocka';
	import { _ } from 'svelte-i18n';
	import Box from '../../character/Box.svelte';

	Chart.register(Title, BarController, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	export let roll = '1d10!';
	let lastRoll: string = '';
	const TRIES = 100000;
	export let editable: boolean = true;

	let data: any;
	let avg = 0;

	let chartCanvas: HTMLCanvasElement;
	let chart: Chart;

	$: config = {
		type: 'bar',
		data: data,
		options: {
			responsive: true,
			spacing: 2,
			plugins: {
				title: {
					display: true,
					text: $_('label:roll') + ':' + lastRoll + ' / ' + $_('label:average') + ':' + avg
				},
				legend: {
					display: false
				}
			}
		}
	};

	$: if (!data) {
		contest(true);
	}

	$: if (data && chartCanvas) {
		chart?.destroy();
		const ctx = chartCanvas.getContext('2d');
		chart = new Chart(ctx!, config);
	}

	const createData = (rolls: Array<number>, start: number): any => {
		const colors = rolls.map((_, i) => {
			const value = i + start;
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

	const contest = (sumMode: boolean) => {
		lastRoll = roll;
		const firstKocka = parseKocka(roll);
		const rolls: Map<number, number> = new Map<number, number>();
		avg = 0;
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
			const roll = rolls.get(i) ?? 0;
			avg += roll * i;
			if (sumMode) {
				rollArray.push((sum * 100) / TRIES);
				sum -= roll;
			} else {
				sum = roll;
				rollArray.push((sum * 100) / TRIES);
			}
		}
		avg /= TRIES;
		data = createData(rollArray, minimum);
	};
</script>

<Box background="peach" title={$_('label:dice_roller')}>
	<div class="rollInputs">
		<div>
			{$_('label:roll')}: <input type="test" bind:value={roll} />
		</div>
		<div>
			<button on:click={() => contest(true)}>{$_('label:at_least')}</button>
			<button on:click={() => contest(false)}>{$_('label:exactly')}</button>
		</div>
	</div>

	<canvas bind:this={chartCanvas} width={800} height={400} />

	<!-- <Bar
		{data}
		options={{
			plugins: {
				title: {
					display: true,
					text: $_('label:roll') + ':' + lastRoll + ' / ' + $_('label:average') + ':' + avg
				},
				legend: {
					display: false
				}
			}
		}}
	/> -->
</Box>

<style>
	.rollInputs {
		text-align: center;
	}
</style>
