<script lang="ts">
	import { parseKocka, kockaDobas } from '../logic/Kocka';
	import { Bar } from 'svelte-chartjs';

	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	let first = '1d2!';
	let second = '0d0';
	let tries = 1000;

	let wins = 0;
	let ties = 0;
	let loss = 0;
	let data: any;
	let avg = 0;

	const createData = (rolls: Array<number>, start: number) => {
		const colors = rolls.map((_, i) => {
			const value = i + start;
			if (value < -50) {
				return '#ff0000';
			} else if (value < 0) {
				return '#ff8080';
			} else if (value === 0) {
				return '#000';
			} else if (value <= 50) {
				return '#80ff00';
			} else {
				return '#00ff00';
			}
		});
		data = {
			labels: rolls.map((_, i) => start + i),
			datasets: [
				{
					label: 'Dobások',
					data: rolls,
					backgroundColor: colors,
					//borderColor: colors,
					borderWidth: 0
				}
			]
		};
	};

	const contest = (sumMode: boolean) => {
		const firstKocka = parseKocka(first);
		const secondKocka = parseKocka(second);
		const rolls: Map<number, number> = new Map<number, number>();
		wins = 0;
		ties = 0;
		loss = 0;
		avg = 0;
		for (let i = 0; i < tries; i++) {
			const firstRes = kockaDobas(firstKocka);
			const secondRes = kockaDobas(secondKocka);
			const result = firstRes.osszeg - secondRes.osszeg;
			rolls.set(result, (rolls.get(result) ?? 0) + 1);
			if (result > 0) {
				wins++;
			} else if (result === 0) {
				ties++;
			} else {
				loss++;
			}
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

<table>
	<thead>
		<tr>
			<th colspan="3"><h3>Dobások</h3></th>
		</tr>
		<tr>
			<th>Támad</th>
			<th />
			<th>Véd</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><input type="test" bind:value={first} /></td>
			<td />

			<td><input type="test" bind:value={second} /></td>
		</tr>
		<tr>
			<td />
			<td>Próbák: <input type="number" bind:value={tries} /></td>
			<td />
		</tr>
		<tr>
			<td><button on:click={() => contest(true)}>Összeg</button></td>
			<td><button on:click={() => contest(false)}>Külön</button></td>
			<td>Átlag: {avg}</td>
		</tr>
	</tbody>
	<tbody>
		<tr>
			<th colspan="3"><h3>Eredmények</h3></th>
		</tr>
		<tr>
			<th>Nyer</th>
			<th>Döntetlen</th>
			<th>Veszít</th>
		</tr>
		<tr>
			<td>{wins}</td>
			<td>{ties}</td>
			<td>{loss}</td>
		</tr>
		<tr>
			<td colspan="3">
				<Bar {data} />
			</td>
		</tr>
	</tbody>
</table>

<style>
	td {
		text-align: center;
	}
</style>
