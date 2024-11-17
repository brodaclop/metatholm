<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { sort } from '../../model/InfoList';
	import type { CalculatedCharacter } from '../../model/Karakter';
	import Box from './Box.svelte';
	import ActionCard from './ActionCard.svelte';
	import { Skill } from '../../model/Skills';

	import IconButton from '../elements/IconButton.svelte';
	import { Spell } from '../../model/Spell';
	import SkillIcon from './SkillIcon.svelte';

	export let calculatedCharacter: CalculatedCharacter;

	let allowedFoci: Set<Skill> = new Set<Skill>();
	let deniedFoci: Set<Skill> = new Set<Skill>();

	const FOCUS_SKILLS = sort(
		Skill.list().filter((si) => si.type === 'skill_type:focus'),
		'name',
		$_
	).map((si) => si.name);

	$: color = (focus: Skill) =>
		allowedFoci.has(focus)
			? 'var(--spell-action-filter-allowed)'
			: deniedFoci.has(focus)
			? 'var(--spell-action-filter-denied)'
			: undefined;

	$: filteredSpells = calculatedCharacter.spellActions.filter((sa) => {
		const focus = Spell.get(sa.spell!).skill;
		if (deniedFoci.has(focus)) {
			return false;
		}
		if (allowedFoci.has(focus)) {
			return true;
		}
		return allowedFoci.size === 0;
	});
</script>

<Box title="character:spells" flavour="action-container">
	<div class="buttonbar">
		<span>
			{#each FOCUS_SKILLS as focus}
				<IconButton
					title={focus}
					withText
					verticalCorrection="-1px"
					backgroundColor={color(focus)}
					on:click={() => {
						if (allowedFoci.has(focus)) {
							allowedFoci.delete(focus);
							deniedFoci.add(focus);
						} else if (deniedFoci.has(focus)) {
							deniedFoci.delete(focus);
						} else {
							allowedFoci.add(focus);
						}
						allowedFoci = allowedFoci;
						deniedFoci = deniedFoci;
					}}
				>
					<SkillIcon skill={focus} />
				</IconButton>
			{/each}
		</span>
	</div>
	<div>
		{#each sort(filteredSpells, 'name', $_) as action}
			<ActionCard {action} skills={calculatedCharacter.skills} />
		{/each}
	</div>
</Box>

<style>
	div {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: start;
	}

	div.buttonbar {
		justify-content: space-around;
		text-align: center;
	}
</style>
