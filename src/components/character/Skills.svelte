<script lang="ts">
	import { keys } from '../../model/InfoList';
	import type { Level } from '../../model/Karakter';
	import { Skill } from '../../model/Skills';
	import CircleGroup from '../elements/CircleGroup.svelte';

	export let skills: Level['skills'];
</script>

<CircleGroup
	rows={keys(skills).map((s) => ({ name: s, subName: Skill.get(s).type }))}
	values={skills}
	max={10}
/>
