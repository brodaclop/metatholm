<script lang="ts">
	import { keys } from '../../model/InfoList';
	import type { Character, Level } from '../../model/Karakter';
	import { Skill } from '../../model/Skills';
	import CircleGroup from '../elements/CircleGroup.svelte';

	export let skills: Character['skills'];
</script>

<CircleGroup
	rows={keys(skills).map((s) => ({ name: s, subName: Skill.get(s).type }))}
	values={skills}
	max={10}
/>
