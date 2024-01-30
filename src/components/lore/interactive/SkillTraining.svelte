<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Skill, type SkillInfo } from '../../../model/Skills';
	import { E } from '../../../logic/Expression';
	import { SKILL_KP } from '../../../model/Rules';
	import Circles from '../../elements/Circles.svelte';
	import FaRegArrowAltCircleUp from 'svelte-icons/fa/FaRegArrowAltCircleUp.svelte';
	import FaRegArrowAltCircleDown from 'svelte-icons/fa/FaRegArrowAltCircleDown.svelte';
	import IconButton from '../../elements/IconButton.svelte';
	import type { Character } from '../../../model/Karakter';

	export let difficulty: SkillInfo['difficulty'] = 2;

	export let id: Skill | undefined = undefined;
	export let abilities: Character['abilities'];
	export let level: number | undefined = undefined;

	let ability: number = 0;
	let positive: boolean = true;

	$: skillInfo = Skill.has(id) ? Skill.get(id) : undefined;

	$: if (skillInfo) {
		difficulty = skillInfo.difficulty;
		positive = skillInfo.positive;
		if (abilities && skillInfo?.ability !== 'skill_type:general') {
			ability = abilities[skillInfo.ability];
		}
	}

	$: isGeneral = skillInfo?.ability === 'skill_type:general';

	const effectiveAbility = (num: number, positive: boolean) =>
		isGeneral ? 10 : positive ? num : 10 - num;

	$: kpNeeded = Array(10)
		.fill(undefined)
		.map((_, skillLevel) =>
			E.evaluate(SKILL_KP, {
				'expr:skill_level': skillLevel + 1,
				'expr:skill_difficulty': difficulty,
				'expr:skill_ability': effectiveAbility(ability, skillInfo?.positive ?? positive)
			})
		);

	$: {
		const sumKp = kpNeeded.reduce((acc, curr) => (acc += curr.result), 0);
		console.debug('sumKp', sumKp, sumKp / 30);
	}
</script>

<table>
	<thead>
		{#if skillInfo}
			<tr>
				<th>{$_('label:type')}</th>
				<td>{$_(skillInfo.type)}</td>
			</tr>
		{/if}
	</thead>
	<tbody>
		<Circles
			name="label:difficulty"
			bind:value={difficulty}
			subName={$_(`label:difficulty:${difficulty}`)}
			max={3}
			canMinus={difficulty > 1}
			editable={!skillInfo}
		/>
		{#if !isGeneral}
			<Circles
				name={skillInfo?.ability ?? 'character:ability'}
				bind:value={ability}
				subName={String(ability)}
				max={10}
				editable={true}
			>
				<IconButton
					title="character:ability"
					slot="extra"
					disabled={!!skillInfo || isGeneral}
					on:click={() => (positive = !positive)}
				>
					{#if positive}
						<FaRegArrowAltCircleUp />
					{:else}
						<FaRegArrowAltCircleDown />
					{/if}
				</IconButton>
			</Circles>
		{:else}
			<Circles
				name={skillInfo?.ability ?? 'character:ability'}
				value={10}
				subName={'10'}
				max={10}
				editable={false}
			/>
		{/if}
	</tbody>
</table>
<table class="points">
	<thead>
		<tr>
			<th class="rowhead">{$_('expr:skill_level')}</th>
			{#each Array(10) as _, skillLevel (skillLevel)}
				<th class="header" class:active={skillLevel === level}>{skillLevel}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		<tr>
			<th class="rowhead">{$_('character:kp')}</th>
			{#each kpNeeded as kp, skillLevel}
				<td class:active={skillLevel === level}>{kp.result}</td>
			{/each}
		</tr>
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
	}

	td,
	th {
		padding-right: 0.25em;
		text-align: left;
	}

	td:nth-child(odd),
	th.header:nth-child(odd) {
		background-color: whitesmoke;
	}

	th.rowhead {
		padding-right: 0.75em;
	}

	td.active,
	th.active {
		background-color: lavender !important;
	}

	.points td,
	.points thead th.header {
		padding-left: 0.25em;
		padding-right: 0.25em;
	}
</style>
