<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Box from '../../character/Box.svelte';
	import type { Skill } from '../../../model/Skills';
	import { Spell } from '../../../model/Spell';

	export let id: Skill;

	$: spells = Spell.available(id, 10).map((s) => ({ ...s, label: $_(s.name) }));

	const i18n = $_;
</script>

<Box title={$_('character:spells')} flavour="skills">
	{#each Array(11) as _, level}
		{@const levelSpells = spells
			.filter((s) => s.level === level)
			.sort((a, z) => a.label.localeCompare(z.label))}
		{#if levelSpells.length > 0}
			<h4>{i18n('expr:skill_level')}: {level}</h4>
			<ul>
				{#each levelSpells as spell}
					<li><a href="/lore/{spell.name}">{spell.label}</a></li>
				{/each}
			</ul>
		{/if}
	{/each}
</Box>
