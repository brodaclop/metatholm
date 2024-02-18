<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { keys, sort } from '../../model/InfoList';
	import type { Character } from '../../model/Karakter';
	import { Skill } from '../../model/Skills';
	import CircleGroup from '../elements/CircleGroup.svelte';

	export let abilities: Character['abilities'] | undefined = undefined;
	export let skills: Character['skills'];
	export let modifiedSkills: Character['skills'] | undefined = undefined;
</script>

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
