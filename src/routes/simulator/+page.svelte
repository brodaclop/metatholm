<script lang="ts">
	import { _ } from 'svelte-i18n';
	import {
		calculateCharacter,
		type CalculatedCharacter,
		type Character
	} from '../../model/Karakter';
	import type { PageData } from './$types';
	import Box from '../../components/character/Box.svelte';
	import Skills from '../../components/character/Skills.svelte';
	import Points from '../../components/character/Points.svelte';
	import { kockaDobas, parseKocka } from '../../logic/Kocka';

	const AP_ROLL = parseKocka('1d10+10');

	export let data: PageData;

	let characters: [Character, Character] = [null, null] as unknown as [Character, Character];

	let calculatedCharacters: [CalculatedCharacter, CalculatedCharacter];

	$: calculatedCharacters = characters.map((c) =>
		c ? calculateCharacter(c) : undefined
	) as unknown as [CalculatedCharacter, CalculatedCharacter];

	let combatRunning = false;
	let turn: number = 1;
	let ap: [number, number] = [0, 0];
	let actions: [string, string] = ['', ''];
	let history: string = '';
	let historyComponent: HTMLTextAreaElement;

	const startCombat = () => {
		combatRunning = true;
		turn = 0;
		history += 'Start combat\n';
		startTurn();
	};

	const startTurn = () => {
		turn++;
		ap[0] = kockaDobas(AP_ROLL).osszeg;
		ap[1] = kockaDobas(AP_ROLL).osszeg;
		history += `===== TURN ${turn} =====\n`;
	};

	const hit = (idx: 0 | 1) => {
		const attackAction = calculatedCharacters[idx].actions.find((a) => a.name === actions[idx])!
			.variants['action:attack'];
		const defenceAction = calculatedCharacters[1 - idx].actions.find(
			(a) => a.name === actions[1 - idx]
		)!.variants['action:defend'];
		const apRoll = attackAction!.find((r) => r.name === 'action:ap');
		const attackRoll = attackAction!.find((r) => r.name === 'action:roll');
		const damageRoll = attackAction!.find((r) => r.name === 'label:damage');
		const defenceRoll = defenceAction!.find((r) => r.name === 'action:roll');
		const attackResult = kockaDobas(parseKocka(attackRoll!.rollString as string)).osszeg;
		history += `----- Initiative: ${ap[idx]} / ${characters[idx].name} (ap: ${
			apRoll!.rollString
		}) -----\n`;
		history += `${characters[idx].name} attacks with ${actions[idx]}: ${
			attackRoll!.rollString
		} = ${attackResult}\n`;
		const defenceResult = kockaDobas(parseKocka(defenceRoll!.rollString as string)).osszeg;
		history += `${characters[1 - idx].name} defends with ${actions[1 - idx]}: ${
			defenceRoll!.rollString
		} = ${defenceResult}\n`;
		if (attackResult > defenceResult) {
			const damageResult = kockaDobas(parseKocka(damageRoll!.rollString as string)).osszeg;
			history += `Damage ${damageRoll!.rollString} = ${damageResult}\n`;
			characters[1 - idx].current.fp -= damageResult;
		}

		ap[idx] -= Number(apRoll!.rollString);
	};

	$: if (history) {
		setTimeout(
			() =>
				historyComponent?.scrollTo({
					top: historyComponent.scrollHeight,
					left: 0,
					behavior: 'smooth'
				}),
			0
		);
	}
</script>

<Box background="#ffffee" title="Characters">
	<div class="characterSelector">
		{#each [0, 1] as idx}
			{@const calculatedCharacter = characters[idx]
				? calculateCharacter(characters[idx])
				: undefined}
			<Box background="#ffeeff">
				<div slot="title">
					<h3>{`Player ${idx + 1}`}</h3>
					<select bind:value={characters[idx]}>
						{#each data.characters as character}
							<option value={character}
								>{character.name} ({$_(character.species)}
								{$_(character.background)} / {$_('character:level')}
								{character.levels.length})</option
							>
						{/each}
					</select>
				</div>
				{#if characters[idx] !== null && calculatedCharacter}
					<Skills skills={calculatedCharacter.skills} />
					<Points character={characters[idx]} {calculatedCharacter} />
				{/if}
			</Box>
		{/each}
	</div>
</Box>

<Box background="#eeffee" title="Combat">
	{#if combatRunning}
		{@const initiative = Math.max(ap[0], ap[1])}
		{@const idx = ap[0] >= ap[1] ? 0 : 1}
		{@const character = characters[idx]}
		<div>
			Turn: {turn} / Player: {characters[idx].name}
		</div>
		<div>
			Initiative: {initiative}
		</div>
		{#each [0, 1] as i}
			<div>
				{characters[i].name}:
				<select bind:value={actions[i]}>
					{#each calculatedCharacters[i].actions.filter((a) => a.variants['action:attack'] && a.variants['action:defend']) as a}
						<option value={a.name}>{$_(a.name)}</option>
					{/each}
				</select>
			</div>
		{/each}
		{#if ap[0] <= 0 && ap[1] <= 0}
			<button on:click={startTurn}>Next turn</button>
		{:else}
			<div><button on:click={() => hit(idx)}>Hit</button></div>
		{/if}
		<div>
			<textarea bind:this={historyComponent} style:width="80em" style:height="40em"
				>{history}</textarea
			>
		</div>

		{#if ap[0] <= 0 && ap[1] <= 0}
			<button on:click={startTurn}>Next turn</button>
		{/if}
	{:else}
		<button on:click={startCombat}>Start Combat</button>
	{/if}
</Box>

<style>
	.characterSelector {
		display: flex;
		justify-content: space-around;
	}
</style>
