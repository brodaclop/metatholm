<script lang="ts">
	import { setContext, getContext } from 'svelte';
	import type { BoxFlavour } from '../BoxFlavours';
	import { _ } from 'svelte-i18n';
	import LoreInfoIcon from '../LoreInfoIcon.svelte';

	export let showModal: boolean; // boolean
	export let flavour: BoxFlavour;
	export let title: string = '';
	export let close: () => void;

	let dialog: HTMLDialogElement; // HTMLDialogElement

	$: if (dialog) {
		if (showModal) {
			dialog.showModal();
		} else {
			dialog.close();
		}
	}

	const level: number = getContext('level') ?? 1;
	setContext('level', Math.min(level + 1, 5));
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-autofocus -->
<dialog
	autofocus
	bind:this={dialog}
	on:close={() => {
		showModal = false;
		close();
	}}
	on:click|self={() => dialog.close()}
	on:keypress={(e) => {
		if (e.key === 'Escape') {
			dialog.close();
		}
	}}
>
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<article on:click|stopPropagation style:background-color={`var(--box-c-${flavour})`}>
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
		<div class="contents">
			<slot />
		</div>
	</article>
</dialog>

<style>
	dialog {
		max-width: 80vw;
		max-height: 80vh;
		border-radius: 0.2em;
		border: none;
		padding: 0;
		background: transparent;
		overflow-y: hidden;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.5);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	article {
		max-height: 80vh;
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
	}

	.contents {
		overflow-y: auto;
		max-height: 60vh;
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
