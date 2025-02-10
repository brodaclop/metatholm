<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let target: string;
	export let bookMode: boolean;
</script>

{#if bookMode}
	<a href="#{target}">{$_(target)}</a>
{:else}
	<a href="/lore/{target}">{$_(target)}</a>
{/if}
