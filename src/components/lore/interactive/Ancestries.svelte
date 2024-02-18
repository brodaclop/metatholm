<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Ancestry } from '../../../model/Ancestry';
	import { sort } from '../../../model/InfoList';
</script>

<ul>
	{#each sort(Ancestry.list(), 'name', $_) as a}
		<li><a href="/lore/{a.name}">{$_(a.name)}</a></li>
	{/each}
</ul>
