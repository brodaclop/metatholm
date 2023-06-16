<script lang="ts">
	import { E } from '../logic/Expression';
	import {
		simulateCombat,
		type HitResult,
		type SimulationCharacter
	} from '../model/CombatSimulation';
	import { WEAPON_ATK, WEAPON_DEF } from '../model/Rules';
	import ExpressionWidget from './expression/ExpressionWidget.svelte';

	let result: Record<HitResult, number> = {
		critical: 0,
		hit: 0,
		miss: 0
	};

	let attacker: SimulationCharacter = {
		difficulty: 2,
		skill: 2,
		weapon: {
			attack: 3,
			defence: 3,
			ap: 3
		}
	};

	let defender: SimulationCharacter = {
		difficulty: 2,
		skill: 2,
		weapon: {
			attack: 3,
			defence: 3,
			ap: 3
		}
	};

	$: attackRule = E.evaluate(WEAPON_ATK, {
		'weapon:attack': attacker.weapon.attack,
		'weapon:skill': attacker.skill,
		'weapon:difficulty': attacker.difficulty
	});

	$: defenceRule = E.evaluate(WEAPON_DEF, {
		'weapon:defence': defender.weapon.defence,
		'weapon:skill': defender.skill,
		'weapon:difficulty': defender.difficulty
	});

	const simulate = () => {
		result = simulateCombat(attacker, defender, 10000);
	};
</script>

<h2>Simulation</h2>

<table>
	<tbody>
		<tr>
			<td>
				Attack weapon: <input type="number" bind:value={attacker.weapon.attack} />
				Attack ap: <input type="number" bind:value={attacker.weapon.ap} />
			</td>
			<td>
				Attack difficulty: <input type="number" bind:value={attacker.difficulty} />
			</td>
			<td>
				Attack skill: <input type="number" bind:value={attacker.skill} />
			</td>
		</tr>
		<tr>
			<td colspan="2">
				<ExpressionWidget expr={attackRule} />
			</td>
			<td>
				{attackRule.result}
			</td>
		</tr>
		<tr>
			<td>
				Defence weapon: <input type="number" bind:value={defender.weapon.defence} />
			</td>
			<td>
				Defence difficulty: <input type="number" bind:value={defender.difficulty} />
			</td>
			<td>
				Defence skill: <input type="number" bind:value={defender.skill} />
			</td>
		</tr>
		<tr>
			<td colspan="2">
				<ExpressionWidget expr={defenceRule} />
			</td>
			<td>
				{defenceRule.result}
			</td>
		</tr>
		<tr>
			<td colspan="3"><button on:click={simulate}>Simulate</button></td>
		</tr>
	</tbody>
	<tbody>
		<tr>
			<td>
				Miss: {result.miss}
			</td>
			<td>
				Hit: {result.hit}
			</td>
			<td>
				Critical: {result.critical}
			</td>
		</tr>
	</tbody>
</table>
