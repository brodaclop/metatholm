<script lang="ts">
	export let bookMode: boolean;
	import { _ } from 'svelte-i18n';
</script>

{#if !bookMode}
	<footer>
		<p><a href="/codex/main">{$_('label:read_codex')}</a></p>
		<p><a href="/scroll">{$_('label:read_scroll')}</a></p>
	</footer>
{/if}

<style>
	p {
		margin: 0;
	}
</style>
