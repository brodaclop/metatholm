<script lang="ts">
	import type { Character } from '../../model/Karakter';
	import Circles from '../elements/Circles.svelte';

	export let abilities: Character['abilities'];
</script>

<div>
	{#each Object.entries(abilities) as [key, value]}
		<Circles bind:value max={10} name={key} />
	{/each}
</div>
