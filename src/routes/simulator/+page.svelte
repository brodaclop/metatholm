<script lang="ts">
	import { _ } from 'svelte-i18n';
	import {
		calculateCharacter,
		type CalculatedCharacter,
		type Character
	} from '../../model/Karakter';
	import type { PageData } from './$types';
	import Box from '../../components/character/Box.svelte';
	import { kockaDobas, parseKocka } from '../../logic/Kocka';
	import ActionCard from '../../components/character/ActionCard.svelte';
	import CharacterSelector from '../../components/simulator/CharacterSelector.svelte';
	import CharacterLife from '../../components/simulator/CharacterLife.svelte';
	import WeaponSelector from '../../components/simulator/WeaponSelector.svelte';
	import {
		ActionDistances,
		type ActionDistance,
		type ActionVariant,
		type Action,
		ActionTypes
	} from '../../model/Action';
	import type { EvalExpression } from '../../logic/Expression';

	const AP_ROLL = parseKocka('1d10+10');

	export let data: PageData;

	let selectedCharacters: [Character, Character] = [null, null] as unknown as [
		Character,
		Character
	];

	let characters: [Character, Character] = [null, null] as unknown as [Character, Character];

	let weapons: [
		[number | undefined, number | undefined],
		[number | undefined, number | undefined]
	] = [
		[undefined, undefined],
		[undefined, undefined]
	];
	let ap: [number, number] = [0, 0];
	let turn = 0;
	let attacker: 0 | 1 = 0;
	let attack: { action: Action; variant: ActionVariant } | undefined;
	let defence: { action: Action; variant: ActionVariant } | undefined;
	let range: ActionDistance = 'in-range';
	let nextStep: { idx: 0 | 1; select: 'attack' | 'defend' | 'counter' } = {
		idx: 0,
		select: 'attack'
	};

	let attackResult: number | undefined;
	let defenceResult: number | undefined;
	let damageResult: number | undefined;
	let attackSucceeded: boolean;

	$: combatRunning = characters?.every((c) => c?.current.fp > 0 && c?.current.ep > 0);

	const startCombat = () => {
		characters = selectedCharacters.map((c) => JSON.parse(JSON.stringify(c))) as [
			Character,
			Character
		];
		nextTurn();
	};

	const nextTurn = () => {
		turn++;
		ap[0] = kockaDobas(AP_ROLL).osszeg;
		ap[1] = kockaDobas(AP_ROLL).osszeg;
		startAttack();
	};

	const startAttack = () => {
		attacker = ap[0] >= ap[1] ? 0 : 1;
		if (Math.max(ap[0], ap[1]) <= 0) {
			nextTurn();
		} else {
			attack = undefined;
			defence = undefined;
			nextStep = { idx: attacker, select: 'attack' };
		}
	};

	const select = (action: Action, variant: ActionVariant) => {
		if (nextStep.select === 'attack') {
			attack = { action, variant };
			nextStep = {
				idx: (1 - nextStep.idx) as 0 | 1,
				select:
					variant === 'action:close-in' || variant === 'action:disengage' ? 'counter' : 'defend'
			};
		} else {
			defence = { action, variant };
			hit();
		}
	};

	const hit = () => {
		const attackAction = attack!.action.variants.find((v) => v.name === attack!.variant);
		const defenceAction = defence!.action.variants.find((v) => v.name === defence!.variant);
		const apRoll = attackAction!.rolls.find((r) => r.name === 'action:ap');
		const attackRoll = attackAction!.rolls.find((r) => r.name === 'action:roll');
		const damageRoll = attackAction!.rolls.find((r) => r.name === 'label:damage');
		const defenceRoll = defenceAction!.rolls.find((r) => r.name === 'action:roll');
		attackResult = kockaDobas(parseKocka(attackRoll!.rollString as string)).osszeg;
		console.info(
			`Player ${attacker + 1} Attacks with ${attack!.action.name}: ${
				attackRoll!.rollString
			} = ${attackResult}`
		);
		defenceResult = kockaDobas(parseKocka(defenceRoll!.rollString as string)).osszeg;
		console.info(
			`Player ${2 - attacker} defends with ${defence!.action.name}: ${
				defenceRoll!.rollString
			} = ${defenceResult}`
		);
		if (attackResult > defenceResult) {
			attackSucceeded = true;
			if (attackAction?.name === 'action:close-in') {
				range = 'close-quarters';
			} else if (attackAction?.name === 'action:disengage') {
				range = 'in-range';
			} else {
				damageResult = kockaDobas(parseKocka(damageRoll!.rollString as string)).osszeg;
				console.info(`Damage ${damageRoll!.rollString} = ${damageResult}`);
				characters[1 - attacker].current.fp -= damageResult;
				characters[1 - attacker].current.ep -= Math.floor(damageResult / 10);
			}
		} else {
			attackSucceeded = false;
			damageResult = undefined;
		}

		ap[attacker] -= (apRoll!.roll as EvalExpression).result;
		startAttack();
	};
</script>

<Box background="#ffffee" title="Characters">
	<div class="characterSelector">
		{#each [0, 1] as idx}
			<CharacterSelector
				{idx}
				bind:selectedCharacter={selectedCharacters[idx]}
				characters={data.characters}
			/>
		{/each}
	</div>
	{#if selectedCharacters.every((sc) => !!sc) && !combatRunning}
		<div style:text-align="center">
			<button on:click={startCombat}>Start Combat</button>
		</div>
	{/if}
</Box>

<Box background="#eeffee" title="Combat">
	<div class="characterSelector">
		<div style:order={1}>
			{#if turn > 0}
				<Box background="#eeeeff">
					<div slot="title">
						Turn: {turn}
					</div>
					<div>Range: {range}</div>
					<div>
						{#if attackResult && defenceResult}
							<div>Player {attacker + 1} attacks for {attackResult}</div>
							<div>Player {2 - attacker} defends for {defenceResult}</div>
							<div>
								{#if attackSucceeded}
									{#if damageResult}
										Damage: {damageResult} FP / {Math.floor(damageResult / 10)} EP
									{/if}
								{:else}
									MISS!
								{/if}
							</div>
						{/if}
					</div>
				</Box>
			{/if}
		</div>
		{#each [0, 1] as idx}
			<div style:order={idx * 2}>
				{#if characters[idx]}
					{@const calculatedCharacter = calculateCharacter(characters[idx])}
					<CharacterLife character={characters[idx]} ap={ap[idx]} />
					<WeaponSelector
						{calculatedCharacter}
						active
						bind:left={weapons[idx][0]}
						bind:right={weapons[idx][1]}
					/>
					<div class="actions">
						{#each [0, 1] as handIdx}
							{#if weapons[idx][handIdx] !== undefined}
								{@const weaponIdx = weapons[idx][handIdx] ?? 0}
								{@const action = calculatedCharacter.actions.find(
									(a) => a.name === calculatedCharacter.weapons[weaponIdx].name
								)}
								{#if action}
									<ActionCard
										{action}
										isSelectable={(variant) =>
											combatRunning &&
											nextStep.idx === idx &&
											ActionDistances[variant] === range &&
											ActionTypes[variant] === nextStep.select}
										select={(variant) => select(action, variant)}
									/>
								{/if}
							{/if}
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</Box>

<style>
	.characterSelector {
		display: flex;
		justify-content: space-around;
	}

	.actions {
		display: flex;
		flex-direction: row;
	}
</style>
