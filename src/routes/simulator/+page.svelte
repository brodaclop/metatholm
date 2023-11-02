<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { calculateCharacter, type Character } from '../../model/Karakter';
	import type { PageData } from './$types';
	import Box from '../../components/character/Box.svelte';
	import { kockaDobas, parseKocka } from '../../logic/Kocka';
	import ActionCard from '../../components/character/ActionCard.svelte';
	import CharacterSelector from '../../components/simulator/CharacterSelector.svelte';
	import CharacterLife from '../../components/simulator/CharacterLife.svelte';

	import type { EvalExpression } from '../../logic/Expression';
	import {
		ACTION_VARIANT_PROPERTIES,
		MOVES_ACTION,
		type Action,
		type ActionRange,
		type ActionType,
		type ActionVariant
	} from '../../model/Action';

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
	let range: ActionRange = 'in-range';
	let nextStep: { idx: 0 | 1; select: ActionType; initial?: ActionVariant } = {
		idx: 0,
		select: 'action'
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
			nextStep = { idx: attacker, select: 'action' };
		}
	};

	const select = (action: Action, variant: ActionVariant) => {
		if (variant === 'action:step-in') {
			range = 'in-range';
		} else if (variant === 'action:step-out') {
			range = 'out-of-range';
		} else if (nextStep.select === 'action') {
			attack = { action, variant };
			nextStep = {
				idx: (1 - nextStep.idx) as 0 | 1,
				select: 'reaction',
				initial: variant
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

	const isVariantSelectable = (
		variant: ActionVariant,
		type: ActionType,
		initial?: ActionVariant
	) => {
		return (
			combatRunning &&
			(ACTION_VARIANT_PROPERTIES[variant].range ?? range) === range &&
			ACTION_VARIANT_PROPERTIES[variant].type === type &&
			(!initial || (ACTION_VARIANT_PROPERTIES[variant].reactionTo?.includes(initial) ?? true))
		);
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
						{#if attackResult !== undefined && defenceResult !== undefined}
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
					<div class="actions">
						{#each [0, 1] as handIdx}
							{@const action =
								weapons[idx][handIdx] !== undefined
									? calculatedCharacter.actions.find(
											(a) => a.name === calculatedCharacter.weapons[weapons[idx][handIdx] ?? 0].name
									  )
									: undefined}
							<div style:order={handIdx * 2}>
								<ActionCard
									{action}
									{range}
									isSelectable={(variant) =>
										!!action &&
										nextStep.idx === idx &&
										isVariantSelectable(variant, nextStep.select, nextStep.initial)}
									select={(variant) => action && select(action, variant)}
								>
									<div slot="title">
										<select bind:value={weapons[idx][handIdx]}>
											{#each calculatedCharacter.weapons as weapon, idx}
												<option value={idx}>{$_(weapon.name)}</option>
											{/each}
										</select>
									</div>
								</ActionCard>
							</div>
						{/each}
						<div style:order={1}>
							<ActionCard
								action={MOVES_ACTION}
								{range}
								isSelectable={(variant) =>
									nextStep.idx === idx &&
									isVariantSelectable(variant, nextStep.select, nextStep.initial)}
								select={(variant) => select(MOVES_ACTION, variant)}
							/>
						</div>
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
