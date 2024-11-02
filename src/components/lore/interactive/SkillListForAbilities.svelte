<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Ability } from '../../../model/Abilities';
	import { Skill, type SkillInfo } from '../../../model/Skills';
	import { sort } from '../../../model/InfoList';
	import LoreLink from './LoreLink.svelte';

	export let id: Ability;
	export let positive: boolean;

	const skills = sort(
		Skill.list().filter((s) => s.ability === id && s.positive === positive),
		'name',
		$_
	);

	const allSkillTypes: Array<SkillInfo['type']> = [
		'skill_type:basic',
		'skill_type:movement',
		'skill_type:combat',
		'skill_type:focus',
		'skill_type:knowledge'
	];

	const types = allSkillTypes.filter((type) => skills.some((s) => s.type === type));
</script>

<table>
	<thead>
		<tr>
			<th />
			<th>{$_('label:difficulty:1')}</th>
			<th>{$_('label:difficulty:2')}</th>
			<th>{$_('label:difficulty:3')}</th>
		</tr>
	</thead>
	<tbody>
		{#each types as type}
			<tr class="first">
				<th>{$_(type)}</th>
				{#each [1, 2, 3] as difficulty}
					{@const filteredSkills = skills.filter(
						(s) => s.type === type && s.difficulty === difficulty
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
		{/each}
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
		border: 1px solid var(--box-border-c);
	}

	tr:nth-child(even) {
		background-color: var(--striped-table-even-c);
	}

	tr:nth-child(odd) {
		background-color: var(--striped-table-odd-c);
	}

	tr.first {
		border-top: 1px solid var(--box-border-c);
	}

	td,
	th {
		padding-right: 0.5em;
	}

	th {
		background-color: var(--table-head-background-c);
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
