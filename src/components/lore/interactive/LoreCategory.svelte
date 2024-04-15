<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { loreCategoryList } from '../../../model/Lore';
	import Box from '../../../components/character/Box.svelte';

	export let category: string;
	export let title: string;

	$: sortedList = loreCategoryList(category, $locale).sort((a, z) =>
		a.title.localeCompare(z.title)
	);
</script>

<Box {title} flavour="lore" marginless>
	<ul>
		{#each sortedList as lc}
			<li><a href="/lore/{lc.id}">{lc.title}</a></li>
		{/each}
		<li />
		<li />
		<li />
		<li />
		<li />
	</ul>
</Box>

<style>
	ul {
		list-style-type: none;
		display: grid;
		gap: 1em;
		grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
	}
</style>
