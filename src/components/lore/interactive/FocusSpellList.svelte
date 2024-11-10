<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Skill } from '../../../model/Skills';
	import { Spell } from '../../../model/Spell';
	import { sort } from '../../../model/InfoList';

	export let id: Skill;

	$: spells = sort(Spell.available(id, 10), 'name', $_);

	const i18n = $_;
</script>

<table class="standard">
	<thead>
		<tr>
			<th />
			<th>{$_('label:name')}</th>
			<th>{$_('expr:spell_speed')}</th>
			<th>{$_('label:spell_target')}</th>
			<th>{$_('label:spell_duration')}</th>
		</tr>
	</thead>
	<tbody>
		{#each Array(11) as _, level}
			{@const levelSpells = spells.filter((s) => s.level === level)}
			{#if levelSpells.length > 0}
				{#each levelSpells as spell, idx}
					<tr class:first={idx === 0}>
						{#if idx === 0}
							<th rowspan={levelSpells.length}>{i18n('expr:skill_level')}: {level}</th>
						{/if}
						<td>{i18n(spell.name)}</td>
						<td>{spell.speed}</td>
						<td>{i18n(spell.target)}</td>
						<td>{i18n(spell.duration)}</td>
					</tr>
				{/each}
			{/if}
		{/each}
	</tbody>
</table>
