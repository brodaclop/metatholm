<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let title;
</script>

<article>
	<header>
		<div>{$_(title)}</div>
	</header>
	<slot />
</article>

<style>
	div {
		font-size: small;
		font-variant: small-caps;
		font-style: italic;
		font-weight: bold;
	}

	article {
		width: fit-content;
		border: 2px ridge var(--box-border-c);
		padding: 0.5em;
		border-radius: 0.25em;
	}
</style>
