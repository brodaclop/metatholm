<script lang="ts">
	//TODO: positive/negative button title
	import { _ } from 'svelte-i18n';
	import { Skill, type SkillInfo } from '../../../model/Skills';
	import { E } from '../../../logic/Expression';
	import { SKILL_KP } from '../../../model/Rules';
	import Circles from '../../elements/Circles.svelte';
	import FaRegArrowAltCircleUp from 'svelte-icons/fa/FaRegArrowAltCircleUp.svelte';
	import FaRegArrowAltCircleDown from 'svelte-icons/fa/FaRegArrowAltCircleDown.svelte';
	import IconButton from '../../elements/IconButton.svelte';

	export let difficulty: SkillInfo['difficulty'] = 2;

	export let skill: Skill | undefined = undefined;

	let ability: number = 0;
	let positive: boolean = true;

	$: skillInfo = skill ? Skill.get(skill) : undefined;

	$: isGeneral = skillInfo?.ability === 'skill_type:general';

	const effectiveAbility = (num: number, positive: boolean) =>
		isGeneral ? 0 : positive ? 10 - num : num;
</script>

<table>
	<tbody>
		<Circles
			name="label:difficulty"
			bind:value={difficulty}
			subName={$_(`label:difficulty:${difficulty}`)}
			max={3}
			min={1}
			editable={!skillInfo}
		/>
		{#if !isGeneral}
			<Circles
				name={skillInfo?.ability ?? 'label:ability'}
				bind:value={ability}
				subName={String(ability)}
				max={10}
				min={0}
				editable={true}
			>
				<IconButton
					title="label:ability"
					slot="extra"
					disabled={!!skillInfo || isGeneral}
					on:click={() => (positive = !positive)}
				>
					{#if skillInfo?.positive ?? positive}
						<FaRegArrowAltCircleDown />
					{:else}
						<FaRegArrowAltCircleUp />
					{/if}
				</IconButton>
			</Circles>
		{:else}
			<Circles
				name={skillInfo?.ability ?? 'label:ability'}
				value={10}
				subName={'10'}
				max={10}
				min={0}
				editable={false}
			/>
		{/if}
	</tbody>
</table>
<table>
	<thead>
		<tr>
			<th>{$_('expr:skill_level')}</th>
			{#each Array(10) as _, skillLevel (skillLevel)}
				<th>{skillLevel}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>{$_('character:kp')}</th>
			{#each Array(10) as _, level (level)}
				{@const kp = E.evaluate(SKILL_KP, {
					'expr:skill_level': level + 1,
					'expr:skill_difficulty': difficulty,
					'expr:skill_ability': effectiveAbility(ability, skillInfo?.positive ?? positive)
				})}
				<td>{kp.result}</td>
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
