<script lang="ts">
	export let title: string = '';
	import { setContext, getContext } from 'svelte';
	import { _ } from 'svelte-i18n';
	import LoreInfoIcon from '../LoreInfoIcon.svelte';
	import type { BoxFlavour } from '../BoxFlavours';

	export let flavour: BoxFlavour;
	export let marginless: boolean = false;
	export let grow: number | undefined = undefined;

	const level: number = getContext('level') ?? 1;
	setContext('level', Math.min(level + 1, 5));
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<article
	class={flavour}
	style:background-color={`var(--box-c-${flavour})`}
	on:mouseenter
	on:mouseleave
	on:click
	class:marginless
	style:flex-grow={grow}
>
	<header>
		{#if level === 1}
			<h2><slot name="title"><LoreInfoIcon id={title} /> {$_(title ?? '')}</slot></h2>
		{:else if level === 2}
			<h3><slot name="title"><LoreInfoIcon id={title} /> {$_(title ?? '')}</slot></h3>
		{:else if level === 3}
			<h4><slot name="title"><LoreInfoIcon id={title} /> {$_(title ?? '')}</slot></h4>
		{:else if level === 4}
			<h5><slot name="title"><LoreInfoIcon id={title} /> {$_(title ?? '')}</slot></h5>
		{:else if level === 5}
			<h6><slot name="title"><LoreInfoIcon id={title} /> {$_(title ?? '')}</slot></h6>
		{/if}
	</header>
	<slot />
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
		font-weight: bold;
		margin-top: 0;
		margin-bottom: 0.5em;
	}
</style>
