<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Ancestry } from '../../../model/Ancestry';
</script>

<ul>
	{#each Ancestry.list().sort((a, z) => a.name.localeCompare(z.name)) as a}
		<li><a href="/lore/{a.name}">{$_(a.name)}</a></li>
	{/each}
</ul>
