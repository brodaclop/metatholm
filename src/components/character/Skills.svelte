<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { keys } from '../../model/InfoList';
	import type { Character } from '../../model/Karakter';
	import { Skill } from '../../model/Skills';
	import CircleGroup from '../elements/CircleGroup.svelte';

	export let abilities: Character['abilities'] | undefined = undefined;
	export let skills: Character['skills'];
	export let modifiedSkills: Character['skills'] | undefined = undefined;
</script>

<CircleGroup
	rows={keys(skills)
		.map((s) => ({ name: s, subName: Skill.get(s).type }))
		.sort((a, z) => $_(a.name).localeCompare($_(z.name)))}
	values={skills}
	loreParams={{ abilities }}
	newValues={modifiedSkills}
	max={10}
/>
