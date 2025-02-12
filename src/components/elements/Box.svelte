<script lang="ts">
	export let title: string = '';
	import { setContext, getContext } from 'svelte';
	import { _ } from 'svelte-i18n';
	import LoreInfoIcon from '../LoreInfoIcon.svelte';
	import type { BoxFlavour } from '../BoxFlavours';

	export let flavour: BoxFlavour;
	export let marginless: boolean = false;
	export let grow: number | undefined = undefined;
	export let flexBasis: string | undefined = undefined;

	const level: number = getContext('headingLevel') ?? 1;
	setContext('headingLevel', Math.min(level + 1, 6));

	const bookMode: boolean = getContext('bookMode') ?? false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<article
	id={bookMode ? undefined : title}
	class={flavour}
	style:background-color={`var(--box-c-${flavour})`}
	on:mouseenter
	on:mouseleave
	on:click
	class:marginless
	style:flex-grow={grow}
	style:flex-basis={flexBasis}
>
	<header>
		{#if level === 1}
			<h2>
				<slot name="title"><LoreInfoIcon disablePlaceholder id={title} /> {$_(title ?? '')}</slot>
			</h2>
		{:else if level === 2}
			<h3>
				<slot name="title"><LoreInfoIcon disablePlaceholder id={title} /> {$_(title ?? '')}</slot>
			</h3>
		{:else if level === 3}
			<h4>
				<slot name="title"><LoreInfoIcon disablePlaceholder id={title} /> {$_(title ?? '')}</slot>
			</h4>
		{:else if level === 4}
			<h5>
				<slot name="title"><LoreInfoIcon disablePlaceholder id={title} /> {$_(title ?? '')}</slot>
			</h5>
		{:else if level === 5}
			<h6>
				<slot name="title"><LoreInfoIcon disablePlaceholder id={title} /> {$_(title ?? '')}</slot>
			</h6>
		{/if}
	</header>
	<div>
		<div class="contents">
			<slot />
		</div>
	</div>
</article>

<style>
	article {
		border-radius: 1em;
		border-style: groove;
		border-width: 3px;
		border-color: var(--box-border-c);
		padding: 0.5em;
		margin: 0.5em;
		filter: drop-shadow(0.2em 0.2em 0.2em var(--box-shadow-c));
		flex-grow: 1;
		text-align: -moz-center;
		text-align: -webkit-center;
		scroll-margin-top: 5em;
	}

	article.lore {
		overflow-y: auto;
	}

	article.marginless {
		margin: 0;
	}

	h2,
	h3,
	h4,
	h5,
	h6 {
		font-size: large;
		text-align: center;
		font-weight: var(--font-weight-bold);
		color: var(--box-title-c);
		margin-top: 0;
		margin-bottom: 0.5em;
		text-shadow: 1px 1px 2px var(--title-shadow-c);
	}
</style>
