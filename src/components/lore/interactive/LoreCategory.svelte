<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { loreCategoryList } from '../../../model/Lore';
	import Box from '../../../components/character/Box.svelte';
	import Loading from '../../Loading.svelte';

	export let category: string;
	export let title: string;
</script>

<Box {title} flavour="lore">
	<ul>
		{#await loreCategoryList(category, $locale)}
			<Loading />
		{:then list}
			{@const sortedList = list.sort((a, z) => a.title.localeCompare(z.title))}
			{#each sortedList as lc}
				<li><a href="/lore/{lc.id}">{lc.title.replace(/#/g, '')}</a></li>
			{/each}
			<li />
			<li />
			<li />
			<li />
			<li />
		{/await}
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
