<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Ability } from '../../../model/Abilities';
	import { Skill } from '../../../model/Skills';

	export let id: Ability;
	export let positive: boolean;
</script>

<ul>
	{#each Skill.list()
		.filter((s) => s.ability === id && s.positive === positive)
		.sort((a, z) => $_(a.name).localeCompare($_(z.name))) as skill}
		<li>
			<a href="/lore/{skill.name}"
				>{$_(skill.name)}
				<i>({$_(skill.type)} / {$_(`label:difficulty:${skill.difficulty}`)})</i></a
			>
		</li>
	{/each}
</ul>
