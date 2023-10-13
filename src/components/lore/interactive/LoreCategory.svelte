<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { loreCategoryList } from '../../../model/Lore';

	export let category: string;
</script>

<ul>
	{#await loreCategoryList(category, $locale)}
		Loading...
	{:then list}
		{@const sortedList = list.sort((a, z) => a.title.localeCompare(z.title))}
		{#each sortedList as lc}
			<li><a href="/lore/{lc.id}">{lc.title.replace(/#/g, '')}</a></li>
		{/each}
	{/await}
</ul>
