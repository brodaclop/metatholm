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
	import Weapons from '../../components/character/Weapons.svelte';
	import ActionCard from '../../components/character/ActionCard.svelte';
	import type { ActionVariant } from '../../model/Action';
	import type { EvalExpression } from '../../logic/Expression';

	const AP_ROLL = parseKocka('1d10+10');

	export let data: PageData;

	interface HistoryRecord {
		align: 'left' | 'right' | 'center';
		text: string;
	}

	let selectedCharacters: [Character, Character] = [null, null] as unknown as [
		Character,
		Character
	];

	let characters: [Character, Character] = [null, null] as unknown as [Character, Character];

	let calculatedCharacters: [CalculatedCharacter, CalculatedCharacter];

	$: calculatedCharacters = characters.map((c) =>
		c ? calculateCharacter(c) : undefined
	) as unknown as [CalculatedCharacter, CalculatedCharacter];

	let combatRunning = false;
	let turn: number = 1;
	let ap: [number, number] = [0, 0];
	let actions: [string, string] = ['', ''];
	let history: Array<HistoryRecord> = [];
	let historyTag: HTMLDivElement;

	const message = (text: string, align: HistoryRecord['align'] = 'center') => {
		history.push({ align, text });
		history = history;
	};

	const startCombat = () => {
		if (selectedCharacters.every((sc) => !!sc)) {
			combatRunning = true;
			history = [];
			turn = 0;
			characters[0] = JSON.parse(JSON.stringify(selectedCharacters[0]));
			characters[1] = JSON.parse(JSON.stringify(selectedCharacters[1]));
			message('Start combat');
			startTurn();
		}
	};

	const startTurn = () => {
		turn++;
		ap[0] = kockaDobas(AP_ROLL).osszeg;
		ap[1] = kockaDobas(AP_ROLL).osszeg;
		message(`===== TURN ${turn} =====`);
	};

	const hit = (idx: 0 | 1, variant: ActionVariant) => {
		const attackAction = calculatedCharacters[idx].actions.find((a) => a.name === actions[idx])!
			.variants.find(v => v.name === variant);
		const defenceAction = calculatedCharacters[1 - idx].actions.find(
			(a) => a.name === actions[1 - idx]
		)!.variants.find(v => v.name === 'action:defend');
		const apRoll = attackAction!.rolls.find((r) => r.name === 'action:ap');
		const attackRoll = attackAction!.rolls.find((r) => r.name === 'action:roll');
		const damageRoll = attackAction!.rolls.find((r) => r.name === 'label:damage');
		const defenceRoll = defenceAction!.rolls.find((r) => r.name === 'action:roll');
		const attackResult = kockaDobas(parseKocka(attackRoll!.rollString as string)).osszeg;
		message(
			`Attacks with ${actions[idx]}: ${attackRoll!.rollString} = ${attackResult}`,
			idx === 0 ? 'left' : 'right'
		);
		const defenceResult = kockaDobas(parseKocka(defenceRoll!.rollString as string)).osszeg;
		message(
			`Defends with ${actions[1 - idx]}: ${defenceRoll!.rollString} = ${defenceResult}\n`,
			idx === 1 ? 'left' : 'right'
		);
		if (attackResult > defenceResult) {
			const damageResult = kockaDobas(parseKocka(damageRoll!.rollString as string)).osszeg;
			message(`Damage ${damageRoll!.rollString} = ${damageResult}`, idx === 0 ? 'left' : 'right');
			characters[1 - idx].current.fp -= damageResult;
			characters[1 - idx].current.ep -= Math.floor(damageResult / 10);
		}

		ap[idx] -= (apRoll!.roll as EvalExpression).result;
	};

	$: if (history && historyTag) {
		historyTag.scrollTo({ top: historyTag.clientHeight });
	}
</script>

<Box background="#ffffee" title="Characters">
	<div class="characterSelector">
		{#each [0, 1] as idx}
			{@const calculatedCharacter = selectedCharacters[idx]
				? calculateCharacter(selectedCharacters[idx])
				: undefined}
			<Box background="#ffeeff">
				<div slot="title">
					<h3>{`Player ${idx + 1}`}</h3>
					<select bind:value={selectedCharacters[idx]}>
						{#each data.characters as character}
							<option value={character}
								>{character.name} ({$_(character.ancestry)}
								{$_(character.background)} / {$_('character:level')}
								{character.levels.length})</option
							>
						{/each}
					</select>
				</div>
				{#if selectedCharacters[idx] !== null && calculatedCharacter}
					<Skills skills={calculatedCharacter.skills} />
					<Points bind:character={selectedCharacters[idx]} {calculatedCharacter} />
					<Box background="#eeeeee" title={$_('character:weapons')}>
						<Weapons bind:character={selectedCharacters[idx]} />
					</Box>
				{/if}
			</Box>
		{/each}
	</div>
	{#if !combatRunning && selectedCharacters.every((sc) => !!sc)}
		<div style:text-align="center">
			<button on:click={startCombat}>Start Combat</button>
		</div>
	{/if}
</Box>

{#if combatRunning}
	<Box background="#eeffee" title="Combat">
		{@const initiative = Math.max(ap[0], ap[1])}
		{@const current = ap[0] >= ap[1] ? 0 : 1}
		{@const oneIsDead = characters.some((c) => c.current.fp <= 0 || c.current.ep <= 0)}
		<div class="characterSelector">
			<div style:order={1}>
				<Box background={'aqua'} title={`Turn ${turn}`}>
					<div style:text-align="center" style:margin-bottom="1em">
						{current === 0 ? '<-- ' : '-->'}
					</div>
					<div style:text-align="center" style:margin-bottom="1em">
						{#if oneIsDead}
							<button disabled={selectedCharacters.some((sc) => !sc)} on:click={startCombat}
								>Restart Combat</button
							>
						{:else if initiative <= 0}
							<div style:text-align="center">
								<button on:click={startTurn}>Next turn</button>
							</div>
						{/if}
					</div>
					<div class="history" bind:this={historyTag}>
						{#each history as message}
							<div class={message.align}>{message.text}</div>
						{/each}
					</div>
				</Box>
			</div>
			{#each [0, 1] as idx}
				{@const action = calculatedCharacters[idx].actions.find((a) => a.name === actions[idx])}
				{@const isDead = characters[idx].current.fp <= 0 || characters[idx].current.ep <= 0}
				<div style:order={idx * 2}>
					<Box background="cornsilk">
						<div class="bignumber-container">
							<div class="bignumber">
								{ap[idx]}
							</div>
							<div class="caption">Action points</div>
						</div>
						<div class="bignumber-container">
							<div class="bignumber">
								{characters[idx].current.fp}
							</div>
							<div class="caption">{$_('character:fp')}</div>
						</div>
						<div class="bignumber-container">
							<div class="bignumber">
								{characters[idx].current.ep}
							</div>
							<div class="caption">{$_('character:ep')}</div>
						</div>
					</Box>
					<Box background={idx === current && ap[idx] > 0 && !isDead ? 'cornsilk' : 'grey'}>
						<div class="bignumber-container">
							<div class="bignumber">Weapon</div>
							<div class="caption">
								<select bind:value={actions[idx]}>
									{#each calculatedCharacters[idx].actions.filter((a) => a.variants['action:attack'] && a.variants['action:defend']) as a}
										<option value={a.name}>{$_(a.name)}</option>
									{/each}
								</select>
							</div>
						</div>
						<!-- <div class="bignumber-container">
							<div class="bignumber">
								<button
									on:click={() => {
										characters[idx].current.fp = calculatedCharacters[idx].fp.result;
										characters[idx].current.ep = calculatedCharacters[idx].ep.result;
									}}>Reset life</button
								>
							</div>
						</div> -->
						<div>
							{#if action}
								<ActionCard
									{action}
									isSelectable={(variant) =>
										idx === current &&
										initiative > 0 &&
										!isDead &&
										(variant === 'action:attack' || variant === 'action:attack-cq')}
									select={(variant) => hit(current, variant)}
								/>
							{/if}
						</div>
					</Box>
				</div>
			{/each}
		</div>
	</Box>
{/if}

<style>
	.characterSelector {
		display: flex;
		justify-content: space-around;
	}

	.history {
		display: flex;
		flex-direction: column;
		max-height: 30em;
		overflow-y: scroll;
	}

	.history > * {
		border: 1px solid black;
		border-radius: 0.5em;
		background-color: aliceblue;
		padding-left: 1em;
		padding-right: 1em;
		margin-bottom: 0.2em;
	}

	.history .left {
		align-self: flex-start;
		text-align: left;
		max-width: 70%;
	}

	.history .right {
		align-self: flex-end;
		text-align: right;
		max-width: 70%;
	}

	.history .center {
		align-self: stretch;
		text-align: center;
	}

	.bignumber-container {
		text-align: center;
	}

	.bignumber {
		font-size: x-large;
		font-weight: bold;
	}
</style>
