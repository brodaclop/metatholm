<script lang="ts">
	import SkillRolls from '../interactive/SkillRolls.svelte';
	import DiceRoller from '../interactive/DiceRoller.svelte';

	export let raw: string;

	const components: Record<string, any> = {
		SkillRolls: SkillRolls,
		DiceRoller: DiceRoller
	};

	$: [name, params] = raw.replace(/`/g, '').split('|', 2);

	$: paramOb = params ? JSON.parse(params) : {};
</script>

<div>
	<svelte:component this={components[name]} {...paramOb} />
</div>
