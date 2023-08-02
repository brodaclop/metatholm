<script lang="ts">
	import SkillRolls from '../interactive/SkillRolls.svelte';
	import DiceRoller from '../interactive/DiceRoller.svelte';
	import SkillTraining from '../interactive/SkillTraining.svelte';
	import SkillListForAbilities from '../interactive/SkillListForAbilities.svelte';

	export let raw: string;

	const components: Record<string, any> = {
		SkillRolls: SkillRolls,
		DiceRoller: DiceRoller,
		SkillTraining: SkillTraining,
		SkillListForAbilities: SkillListForAbilities
	};

	$: [name, params] = raw.replace(/`/g, '').split('|', 2);

	$: paramOb = params ? JSON.parse(params) : {};
</script>

<div>
	<svelte:component this={components[name]} {...paramOb} />
</div>
