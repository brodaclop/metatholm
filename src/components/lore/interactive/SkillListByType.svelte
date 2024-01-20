<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Skill, type SkillType } from '../../../model/Skills';

	export let type: SkillType;
</script>

<ul>
	{#each Skill.list()
		.filter((s) => s.type === type)
		.sort((a, z) => $_(a.name).localeCompare($_(z.name))) as skill}
		<li>
			<a href="/lore/{skill.name}"
				>{$_(skill.name)}
				<i
					>({skill.ability === 'skill_type:general'
						? $_('skill_type:general')
						: (skill.positive ? '+' : '-') + $_(skill.ability)} / {$_(
						`label:difficulty:${skill.difficulty}`
					)})</i
				></a
			>
		</li>
	{/each}
</ul>
