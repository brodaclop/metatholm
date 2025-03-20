<script lang="ts">
	import { _ } from 'svelte-i18n';
	import LoreInfoIcon from '../LoreInfoIcon.svelte';

	export let title;
</script>

<article>
	<header>
		<div>
			<span class="info">
				<LoreInfoIcon id={title} disablePlaceholder square />
			</span>
			{$_(title)}
		</div>
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

	.info {
		font-size: xx-small;
		position: absolute;
		top: 0;
		right: 0;
	}

	article {
		width: fit-content;
		border: 2px ridge var(--box-border-c);
		padding: 0.5em;
		border-radius: 0.25em;
		position: relative;
		box-sizing: border-box;
	}
</style>
