<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Skill, type SkillInfo } from '../../../model/Skills';
	import { E } from '../../../logic/Expression';
	import { SKILL_KP } from '../../../model/Rules';
	import IconButton from '../../elements/IconButton.svelte';
	import type { Character } from '../../../model/Karakter';
	import LoreInfoIcon from '../../LoreInfoIcon.svelte';
	import CircleRow from '../../elements/CircleRow.svelte';
	import PointsTable from '../../PointsTable.svelte';

	export let difficulty: SkillInfo['difficulty'] = 2;

	export let id: Skill | undefined = undefined;
	export let abilities: Character['abilities'];
	export let level: number | undefined = undefined;

	let ability: number = 0;
	let effect: boolean | 'none' = true;
	let selectedLevel: number = -1;

	$: if (level !== undefined) selectedLevel = level;

	$: skillInfo = Skill.has(id) ? Skill.get(id) : undefined;

	$: if (skillInfo) {
		difficulty = skillInfo.difficulty;
		effect = skillInfo.ability === 'skill_type:general' ? 'none' : skillInfo.positive;
		if (abilities && skillInfo?.ability !== 'skill_type:general') {
			ability = abilities[skillInfo.ability];
		}
	}

	const effectiveAbility = (num: number, effect: boolean | 'none') =>
		effect === 'none' ? 10 : effect ? num : 10 - num;

	const calculate = (
		_level: number,
		_difficulty: number,
		_ability: number,
		effect: boolean | 'none'
	) =>
		E.evaluate(SKILL_KP, {
			'expr:skill_rank': _level + 1,
			'expr:skill_difficulty': _difficulty,
			'expr:skill_ability': effectiveAbility(_ability, effect)
		}).result;
</script>

<table class="maintable">
	<tbody>
		{#if skillInfo}
			<tr>
				<th><LoreInfoIcon />{$_('label:type')}</th>
				<td>{$_(skillInfo.type)}</td>
			</tr>
			<tr>
				<th><LoreInfoIcon id="character:personality" />{$_('character:personality')}</th>
				<td>{skillInfo.personality.map((p) => $_(p)).join(', ')}</td>
			</tr>
		{/if}
		<tr>
			<th
				><LoreInfoIcon id="label:difficulty" />{$_('label:difficulty')}
				({$_(`weapon:difficulty:${difficulty}`)})
			</th>
			<td>
				<CircleRow
					bind:value={difficulty}
					max={3}
					canMinus={difficulty > 1}
					editable={!skillInfo}
				/>
			</td>
			<td />
		</tr>
		<tr>
			<th
				><LoreInfoIcon />{$_(
					(skillInfo?.ability !== 'skill_type:general' ? skillInfo?.ability : undefined) ??
						'character:ability'
				)}
				{$_('label:skill_effect_direction')}</th
			>
			<td colspan={3}>
				<button
					disabled={!!skillInfo}
					class:selected={effect === true}
					on:click={() => (effect = true)}>{$_('label:skill_effect:positive')}</button
				>
				<button
					disabled={!!skillInfo}
					class:selected={effect === 'none'}
					on:click={() => (effect = 'none')}>{$_('label:skill_effect:none')}</button
				>
				<button
					disabled={!!skillInfo}
					class:selected={effect === false}
					on:click={() => (effect = false)}>{$_('label:skill_effect:negative')}</button
				>
			</td>
		</tr>
		<tr>
			<td colspan={4}>
				<div class="points-table-container">
					{#if !abilities && effect !== 'none'}
						<PointsTable
							columnName={skillInfo?.ability ?? 'character:ability'}
							columnMax={10}
							bind:column={ability}
							columnChangeable={abilities === undefined}
							rowName="expr:skill_rank"
							rowMax={9}
							rowChangeable={level === undefined}
							bind:row={selectedLevel}
							id="character:kp"
							fullWidth
							valueCalculator={(row, column) => calculate(row, difficulty, column, effect)}
						/>
					{:else}
						<PointsTable
							columnName={'expr:skill_rank'}
							columnMax={9}
							bind:column={selectedLevel}
							columnChangeable={level === undefined}
							rowName="character:kp"
							rowMax={0}
							rowChangeable={false}
							row={0}
							hideRowCounter
							fullWidth
							id="character:kp"
							valueCalculator={(row, column) => calculate(column, difficulty, row, effect)}
						/>
					{/if}
				</div>
			</td>
		</tr>
	</tbody>
</table>

<style>
	th {
		padding-right: 0.75em;
	}

	button.selected {
		background-color: var(--spell-action-filter-allowed);
	}

	.points-table-container {
		margin-left: calc(1em + 0.2em + 1px);
	}
</style>
