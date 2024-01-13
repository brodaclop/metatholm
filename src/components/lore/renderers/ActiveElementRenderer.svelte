<script lang="ts">
	import SkillRolls from '../interactive/SkillRolls.svelte';
	import DiceRoller from '../interactive/DiceRoller.svelte';
	import SkillTraining from '../interactive/SkillTraining.svelte';
	import SkillListForAbilities from '../interactive/SkillListForAbilities.svelte';
	import Ancestries from '../interactive/Ancestries.svelte';
	import AbilitiesList from '../interactive/AbilitiesList.svelte';
	import LoreCategory from '../interactive/LoreCategory.svelte';
	import BackgroundSkillList from '../interactive/BackgroundSkillList.svelte';
	import SkillListByType from '../interactive/SkillListByType.svelte';
	import ActiionInfo from '../interactive/ActiionInfo.svelte';
	import ActionVariants from '../interactive/ActionVariants.svelte';
	import ActionPointCalculator from '../interactive/ActionPointCalculator.svelte';
	import DamageCalculator from '../interactive/DamageCalculator.svelte';
	import CombatRollCalculator from '../interactive/CombatRollCalculator.svelte';
	import { Popover } from 'svelte-smooth-popover';
	import FixedDiceRoller from '../FixedDiceRoller.svelte';
	import GiRollingDices from 'svelte-icons/gi/GiRollingDices.svelte';
	import { getContext } from 'svelte';
	import FocusSpellList from '../interactive/FocusSpellList.svelte';

	export let raw: string;

	const additionalParams = getContext<Record<string, unknown>>('activeElementParams') ?? {};

	const DICE_ROLL_PATTERN = /^[0-9]*d[0-9]*(\+[0-9]+)?\!?$/;

	const components: Record<string, any> = {
		SkillRolls: SkillRolls,
		DiceRoller: DiceRoller,
		SkillTraining: SkillTraining,
		SkillListForAbilities: SkillListForAbilities,
		Ancestries: Ancestries,
		AbilitiesList: AbilitiesList,
		LoreCategory: LoreCategory,
		BackgroundSkillList: BackgroundSkillList,
		SkillListByType: SkillListByType,
		ActionInfo: ActiionInfo,
		ActionVariants: ActionVariants,
		ActionPointCalculator: ActionPointCalculator,
		CombatRollCalculator: CombatRollCalculator,
		DamageCalculator: DamageCalculator,
		FocusSpellList: FocusSpellList
	};

	$: [name, params] = raw.replace(/`/g, '').split('|', 2);

	$: paramOb = { ...additionalParams, ...(params ? JSON.parse(params) : {}) };
</script>

{#if DICE_ROLL_PATTERN.test(name)}
	<span class="dice"
		><span class="icon"><GiRollingDices /></span>{name}<Popover
			open={false}
			showOnClick={true}
			borderRadius={10}
			caretBg="black"
			hideOnExternalClick={true}
		>
			<div class="popover">
				<FixedDiceRoller roll={name} />
			</div>
		</Popover>
	</span>
{:else}
	<div>
		<svelte:component this={components[name]} {...paramOb} />
	</div>
{/if}

<style>
	.dice {
		background-color: bisque;
		font-weight: bold;
	}

	.popover {
		background-color: white;
		border: 1px solid black;
		border-radius: 10px;
		padding: 10px;
	}

	.icon {
		height: 1em;
		display: inline-block;
		vertical-align: text-bottom;
	}
</style>
