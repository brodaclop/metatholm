<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Ability } from '../../../model/Abilities';
	import { Skill } from '../../../model/Skills';

	export let ability: Ability;
	export let positive: boolean;
</script>

<ul>
	{#each Skill.list()
		.filter((s) => s.ability === ability && s.positive === positive)
		.sort((a, z) => a.name.localeCompare(z.name)) as skill}
		<li><a href="/lore/{skill.name}">{$_(skill.name)} <i>({$_(skill.type)})</i></a></li>
	{/each}
</ul>
