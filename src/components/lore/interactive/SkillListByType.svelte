<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Skill, type SkillType } from '../../../model/Skills';
	import { sort } from '../../../model/InfoList';

	export let type: SkillType;
</script>

<ul>
	{#each sort( Skill.list().filter((s) => s.type === type), 'name', $_ ) as skill}
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
