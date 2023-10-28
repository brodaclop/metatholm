<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Skill, type SkillType } from '../../../model/Skills';

	export let type: SkillType;
</script>

<ul>
	{#each Skill.list()
		.filter((s) => s.type === type)
		.sort((a, z) => a.name.localeCompare(z.name)) as skill}
		<li><a href="/lore/{skill.name}">{$_(skill.name)}</a></li>
	{/each}
</ul>
