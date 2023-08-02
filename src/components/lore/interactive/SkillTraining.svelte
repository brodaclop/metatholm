<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Skill, type SkillInfo } from '../../../model/Skills';
	import { E } from '../../../logic/Expression';
	import { SKILL_KP } from '../../../model/Rules';

	export let difficulty: SkillInfo['difficulty'] = 2;
	export let skill: Skill | undefined = undefined;

	$: skillInfo = skill ? Skill.get(skill) : undefined;

	$: isGeneral = skillInfo?.ability === 'skill_type:general';

	const effectiveAbility = (num: number) => (!isGeneral && skillInfo?.positive ? num : 10 - num);
</script>

<table>
	<caption
		>{$_('label:difficulty')}:
		{#if skillInfo}
			{$_(`label:difficulty:${skillInfo.difficulty}`)}
		{:else}
			<select bind:value={difficulty}>
				{#each [1, 2, 3] as d}
					<option value={d}>{$_(`label:difficulty:${d}`)}</option>
				{/each}
			</select>
		{/if}
	</caption>
	<thead>
		{#if !isGeneral}
			<tr>
				<th />
				<th colspan={11}>{$_(skillInfo?.ability ?? 'label:ability')}</th>
			</tr>
		{/if}
		<tr>
			<th>{$_('expr:skill_level')}</th>
			{#if isGeneral}
				<th>{$_('character:kp')}</th>
			{:else}
				{#each Array(11) as _, ability (ability)}
					<th>{ability}</th>
				{/each}
			{/if}
		</tr>
	</thead>
	<tbody>
		{#each Array(10) as _, level (level)}
			<tr>
				<th>{level}</th>
				{#each Array(isGeneral ? 1 : 11) as _, ability (ability)}
					{@const kp = E.evaluate(SKILL_KP, {
						'expr:skill_level': level + 1,
						'expr:skill_difficulty': difficulty,
						'expr:skill_ability': effectiveAbility(ability)
					})}
					<td>{kp.result}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
	}

	td,
	th {
		padding-right: 0.25em;
	}

	table tbody th,
	table thead tr th:first-child {
		background-color: aliceblue;
	}

	table tbody td,
	table thead tr th:not(:first-child) {
		background-color: antiquewhite;
	}
</style>
