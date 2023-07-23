<script lang="ts">
	import { page } from '$app/stores';
	import RuleLore from '../../../components/lore/RuleLore.svelte';
	import SkillLore from '../../../components/lore/SkillLore.svelte';

	$: id = $page.params.id ?? '';

	$: prefix = id.split(':', 2)[0];

	const DESCRIPTION_COMPONENT: Record<string, any> = {
		rule: RuleLore,
		skill: SkillLore
	};
</script>

<svelte:component this={DESCRIPTION_COMPONENT[prefix]} {id} />
