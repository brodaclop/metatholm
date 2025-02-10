<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Ancestry } from '../../../model/Ancestry';
	import { sort } from '../../../model/InfoList';
	import LoreLink from './LoreLink.svelte';

	export let bookMode: boolean;
</script>

<ul>
	{#each sort(Ancestry.list(), 'name', $_) as a}
		<li><LoreLink target={a.name} {bookMode} /></li>
	{/each}
</ul>
