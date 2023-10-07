<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { loreCategoryList } from '../../../model/Lore';

	export let category: string;
</script>

<ul>
	{#await loreCategoryList(category, $locale)}
		Loading...
	{:then list}
		{#each list as lc}
			<li><a href="/lore/{lc.id}">{lc.title.replace(/#/g, '')}</a></li>
		{/each}
	{/await}
</ul>
