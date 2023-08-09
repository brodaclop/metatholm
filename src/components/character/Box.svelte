<script lang="ts">
	export let title: string = '';
	import { setContext, getContext } from 'svelte';
	export let background: string;
	const level: number = getContext('level') ?? 1;
	setContext('level', Math.min(level + 1, 5));
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<article style:background-color={background} on:mouseenter on:mouseleave on:click>
	<header>
		{#if level === 1}
			<h2>{title ?? ''} <slot name="title" /></h2>
		{:else if level === 2}
			<h3>{title ?? ''} <slot name="title" /></h3>
		{:else if level === 3}
			<h4>{title ?? ''} <slot name="title" /></h4>
		{:else if level === 4}
			<h5>{title ?? ''} <slot name="title" /></h5>
		{:else if level === 5}
			<h6>{title ?? ''} <slot name="title" /></h6>
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
	}

	h2,
	h3,
	h4,
	h5 {
		font-size: large;
		text-align: center;
		font-weight: bold;
		margin-top: 0;
		margin-bottom: 0.5em;
	}
</style>
