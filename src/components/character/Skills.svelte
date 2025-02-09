<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { keys, sort } from '../../model/InfoList';
	import type { Character } from '../../model/Karakter';
	import { Skill } from '../../model/Skills';
	import CircleGroup from '../elements/CircleGroup.svelte';
	import Box from '../elements/Box.svelte';

	export let abilities: Character['abilities'] | undefined = undefined;
	export let skills: Character['skills'];
	export let modifiedSkills: Character['skills'] | undefined = undefined;

	export let slender = false;
</script>

<Box title="character:skills" flavour="skills">
	{#if slender}
		<CircleGroup
			rows={sort(
				keys(skills).map((s) => ({ name: s, subName: Skill.get(s).type })),
				'name',
				$_
			)}
			values={skills}
			loreParams={{ abilities }}
			newValues={modifiedSkills}
			max={0}
			><span slot="extra" let:key>
				{skills[key]}
			</span>
		</CircleGroup>
	{:else}
		<CircleGroup
			rows={sort(
				keys(skills).map((s) => ({ name: s, subName: Skill.get(s).type })),
				'name',
				$_
			)}
			values={skills}
			loreParams={{ abilities }}
			newValues={modifiedSkills}
			max={10}
		/>
	{/if}
</Box>
