<script lang="ts">
	import SkillRolls from '../interactive/SkillRolls.svelte';
	import DiceRoller from '../interactive/DiceRoller.svelte';
	import SkillTraining from '../interactive/SkillTraining.svelte';
	import SkillListForAbilities from '../interactive/SkillListForAbilities.svelte';
	import Ancestries from '../interactive/Ancestries.svelte';
	import AncestryInfo from '../interactive/AncestryInfo.svelte';
	import LoreCategory from '../interactive/LoreCategory.svelte';
	import BackgroundSkillList from '../interactive/BackgroundSkillList.svelte';
	import SkillListByType from '../interactive/SkillListByType.svelte';
	import ActiionInfo from '../interactive/ActiionInfo.svelte';
	import ActionVariants from '../interactive/ActionVariants.svelte';

	export let raw: string;

	const components: Record<string, any> = {
		SkillRolls: SkillRolls,
		DiceRoller: DiceRoller,
		SkillTraining: SkillTraining,
		SkillListForAbilities: SkillListForAbilities,
		Ancestries: Ancestries,
		AncestryInfo: AncestryInfo,
		LoreCategory: LoreCategory,
		BackgroundSkillList: BackgroundSkillList,
		SkillListByType: SkillListByType,
		ActionInfo: ActiionInfo,
		ActionVariants: ActionVariants
	};

	$: [name, params] = raw.replace(/`/g, '').split('|', 2);

	$: paramOb = params ? JSON.parse(params) : {};
</script>

<div>
	<svelte:component this={components[name]} {...paramOb} />
</div>
