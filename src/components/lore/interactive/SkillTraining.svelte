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
	import LoreInfoIcon from '../../LoreInfoIcon.svelte';
	import CircleRow from '../../elements/CircleRow.svelte';

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
		console.debug('Character levels needed for skill level 10', sumKp, sumKp / 30);
	}

	//TODO: fix up/down arrow layout
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
		{#if !isGeneral}
			<tr>
				<th>
					<LoreInfoIcon id={skillInfo?.ability ?? 'character:ability'} />{$_(
						skillInfo?.ability ?? 'character:ability'
					)}
					({ability})
				</th>
				<td>
					<CircleRow bind:value={ability} max={10} editable={!abilities} />
				</td>
				<td>
					<IconButton
						title="character:ability"
						disabled={!!skillInfo || isGeneral}
						on:click={() => (positive = !positive)}
					>
						{#if positive}
							<FaRegArrowAltCircleUp />
						{:else}
							<FaRegArrowAltCircleDown />
						{/if}
					</IconButton>
				</td>
			</tr>
		{/if}
		<tr>
			<th><LoreInfoIcon />{$_('expr:skill_level')}</th>
			<td colspan={3} rowspan={2}>
				<table class="standard">
					<thead>
						<tr>
							{#each Array(10) as _, skillLevel (skillLevel)}
								<th class:active={skillLevel === level}>{skillLevel}</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						<tr>
							{#each kpNeeded as kp, skillLevel}
								<td class:active={skillLevel === level}>{kp.result}</td>
							{/each}
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		<tr>
			<th><LoreInfoIcon />{$_('character:kp')}</th>
		</tr>
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
	}

	th {
		padding-right: 0.75em;
	}

	.active {
		background-color: var(--lore-active-cells-c);
	}
</style>
