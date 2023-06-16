<script lang="ts">
	import { E, type EvalExpression, type Expression } from '../logic/Expression';
	import type { SimulationCharacter } from '../model/CombatSimulation';

	import { WEAPON_ATK, WEAPON_DEF } from '../model/Rules';
	import ExpressionWidget from './expression/ExpressionWidget.svelte';

	let attackDifficulty: number = 3;

	let defender: SimulationCharacter = {
		difficulty: 2,
		skill: 2,
		weapon: {
			attack: 3,
			defence: 3,
			ap: 3
		}
	};

	// $: attackRule = E.evaluate(WEAPON_ATK, {
	// 	'weapon:attack': attacker.weapon.attack,
	// 	'weapon:skill': attacker.skill,
	// 	'weapon:difficulty': attacker.difficulty
	// });

	$: defenceRule = E.evaluate(WEAPON_DEF, {
		'weapon:defence': defender.weapon.defence,
		'weapon:skill': defender.skill,
		'weapon:difficulty': defender.difficulty
	});

	const calculate = (weapon: number, skill: number, defender2: SimulationCharacter): number => {
		const defenceRule = E.evaluate(WEAPON_DEF, {
			'weapon:defence': defender2.weapon.defence,
			'weapon:skill': defender2.skill,
			'weapon:difficulty': defender2.difficulty
		});
		const attackRule = E.evaluate(WEAPON_ATK, {
			'weapon:attack': weapon,
			'weapon:skill': skill,
			'weapon:difficulty': attackDifficulty
		});
		return Math.round(attackRule.result - defenceRule.result);
	};
</script>

<h2>Combat calculation</h2>

<table>
	<tbody>
		<tr>
			<td />
			<td>
				Attack difficulty: <input type="number" bind:value={attackDifficulty} />
			</td>
			<td />
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
				<ExpressionWidget
					expr={E.evaluate(WEAPON_DEF, {
						'weapon:defence': defender.weapon.defence,
						'weapon:skill': defender.skill,
						'weapon:difficulty': defender.difficulty
					})}
				/>
			</td>
			<td>
				{defenceRule.result}
			</td>
		</tr>
	</tbody>
</table>

<table>
	<thead>
		<tr>
			<th>Skill/Weapon</th>
			{#each Array(10) as _, weapon (weapon)}
				<th>{weapon + 1}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each Array(10) as _, skill (skill)}
			<tr>
				<th>{skill + 1}</th>
				{#each Array(10) as _, weapon (weapon)}
					<td>{calculate(weapon + 1, skill + 1, defender)}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
