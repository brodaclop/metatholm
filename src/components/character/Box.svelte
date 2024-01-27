<script lang="ts">
	export let title: string = '';
	import { setContext, getContext } from 'svelte';
	import { _ } from 'svelte-i18n';
	import LoreInfoIcon from '../LoreInfoIcon.svelte';
	import type { BoxFlavour } from '../BoxFlavours';

	export let flavour: BoxFlavour;
	export let marginless: boolean = false;

	const level: number = getContext('level') ?? 1;
	setContext('level', Math.min(level + 1, 5));
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<article class={flavour} on:mouseenter on:mouseleave on:click class:marginless>
	<header>
		{#if level === 1}
			<h2><slot name="title"><LoreInfoIcon id={title} />{$_(title ?? '')}</slot></h2>
		{:else if level === 2}
			<h3><slot name="title"><LoreInfoIcon id={title} />{$_(title ?? '')}</slot></h3>
		{:else if level === 3}
			<h4><slot name="title"><LoreInfoIcon id={title} />{$_(title ?? '')}</slot></h4>
		{:else if level === 4}
			<h5><slot name="title"><LoreInfoIcon id={title} />{$_(title ?? '')}</slot></h5>
		{:else if level === 5}
			<h6><slot name="title"><LoreInfoIcon id={title} />{$_(title ?? '')}</slot></h6>
		{/if}
	</header>
	<slot />
</article>

<style>
	article {
		border-radius: 1em;
		border-style: groove;
		border-width: 3px;
		border-color: gray;
		padding: 0.5em;
		margin: 0.5em;
		filter: drop-shadow(0.2em 0.2em 0.2em #00000080);
	}

	article.marginless {
		margin: 0;
	}

	article.character-sheet {
		background-color: #ffeeee;
	}

	article.character {
		background-color: #ddddff;
	}

	article.abilities {
		background-color: #eeeeff;
	}

	article.skills {
		background-color: #eeffee;
	}

	article.points {
		background-color: #eeffff;
	}

	article.inventory {
		background-color: #eeeeee;
	}

	article.action-container {
		background-color: #ffffee;
	}

	article.action-card {
		background-color: #ffeeff;
	}

	article.action-card-spell {
		background-color: #eeeeff;
	}

	article.action-card-weapon {
		background-color: #ffeeee;
	}

	article.action-distance {
		background-color: #eedddd;
	}

	article.action-variant-selectable {
		background-color: white;
	}

	article.action-variant-unselectable {
		background-color: lightgray;
	}

	article.action-variant-selected {
		background-color: aquamarine;
	}

	article.lore {
		background-color: white;
		margin: 0;
	}

	article.simulator-life {
		background-color: cornsilk;
	}

	article.simulator-turns {
		background-color: #eeeeff;
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
