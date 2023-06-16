<script lang="ts">
	import type { Level } from '../../model/Karakter';
	import Circles from '../elements/Circles.svelte';

	export let skills: Level['skills'];
</script>

<div>
	{#each Object.entries(skills) as [key, value]}
		<Circles bind:value max={10} name={key} />
	{/each}
</div>
