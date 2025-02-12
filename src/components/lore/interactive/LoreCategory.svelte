<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { loreCategoryList } from '../../../model/Lore';
	import Box from '../../../components/elements/Box.svelte';
	import Lore from '../Lore.svelte';
	import { getContext, setContext } from 'svelte';
	import Heading from '../../elements/Heading.svelte';

	export let category: string;
	export let title: string;
	export let bookMode: boolean;

	const headingLevel: number = getContext('headingLevel') ?? 0;
	setContext('headingLevel', headingLevel + 1);

	$: sortedList = loreCategoryList(category, $locale)
		.sort((a, z) => (bookMode ? a.id.localeCompare(z.id) : a.title.localeCompare(z.title)))
		.filter((item) => !bookMode || !excludeInBookMode.includes(item.id));

	const excludeInBookMode: Array<string> = ['rule:changes'];
</script>

{#if bookMode}
	<section id={category}>
		<Heading>{title}</Heading>
		{#each sortedList as lc}
			<Lore id={lc.id} />
		{/each}
	</section>
{:else}
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
{/if}

<style>
	ul {
		list-style-type: none;
		display: grid;
		gap: 1em;
		grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
	}
</style>
