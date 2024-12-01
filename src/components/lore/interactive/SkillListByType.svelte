<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Skill, type SkillInfo, type SkillType } from '../../../model/Skills';
	import { sort } from '../../../model/InfoList';
	import MarkdownText from '../renderers/MarkdownText.svelte';
	import LoreLink from './LoreLink.svelte';

	export let type: SkillType;
	export let caption: string;

	const skills = sort(
		Skill.list().filter((s) => s.type === type),
		'name',
		$_
	);

	const allAbilities: Array<SkillInfo['ability']> = [
		'ability:build',
		'ability:activity',
		'ability:presence',
		'ability:magic',
		'skill_type:general'
	];

	const abilities: Array<SkillInfo['ability']> = allAbilities.filter((ability) =>
		skills.some((s) => s.ability === ability)
	);
</script>

<table class="standard">
	<thead>
		<tr>
			<th />
			<th />
			<th>{$_('weapon:difficulty:1')}</th>
			<th>{$_('weapon:difficulty:2')}</th>
			<th>{$_('weapon:difficulty:3')}</th>
		</tr>
	</thead>
	<tbody>
		{#each abilities as ability}
			{@const isGeneral = ability === 'skill_type:general'}
			<tr class="first">
				<th rowspan={isGeneral ? 1 : 2}>{$_(ability)}</th>
				<th
					>{#if !isGeneral}↑{/if}</th
				>
				{#each [1, 2, 3] as difficulty}
					{@const filteredSkills = skills.filter(
						(s) => s.ability === ability && s.difficulty === difficulty && s.positive
					)}
					<td>
						{#if filteredSkills.length > 0}
							<ul>
								{#each filteredSkills as skill}
									<li><LoreLink target={skill.name} /></li>
								{/each}
							</ul>
						{:else}
							–
						{/if}
					</td>
				{/each}
			</tr>
			{#if !isGeneral}
				<tr>
					<th>↓ </th>
					{#each [1, 2, 3] as difficulty}
						{@const filteredSkills = skills.filter(
							(s) => s.ability === ability && s.difficulty === difficulty && !s.positive
						)}
						<td>
							{#if filteredSkills.length > 0}
								<ul>
									{#each filteredSkills as skill}
										<li><LoreLink target={skill.name} /></li>
									{/each}
								</ul>
							{:else}
								–
							{/if}
						</td>
					{/each}
				</tr>
			{/if}
		{/each}
	</tbody>
	<caption>
		<MarkdownText isInline text={caption} />
	</caption>
</table>

<style>
	tr.first {
		border-top-style: groove;
		border-top-width: 2px;
		border-top-color: var(--box-border-c);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style-type: none;
	}

	caption {
		text-align: left;
		border: 1px solid var(--box-border-c);
	}
</style>
