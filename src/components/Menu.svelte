<script lang="ts">
	import type { ComponentType, SvelteComponent } from 'svelte';
	import { _ } from 'svelte-i18n';
	import IconButton from './elements/IconButton.svelte';
	import { detectOutsideClick } from '$lib/client/outside-click';

	interface LinkMenuItem {
		type: 'link';
		href: string;
		text: string;
	}

	interface DividerMenuItem {
		type: 'divider';
	}

	interface TitleMenuItem {
		type: 'title';
		text: string;
	}

	interface ButtonMenuItem {
		type: 'button';
		text: string;
		onClick: () => void;
		icon?: ComponentType<SvelteComponent>;
	}

	type MenuItem = LinkMenuItem | DividerMenuItem | ButtonMenuItem | TitleMenuItem;

	export let items: Array<MenuItem>;

	let container: HTMLElement;
	let open = false;

	const click = (item: MenuItem) => item.type === 'button' && item.onClick();

	$: if (open) {
		detectOutsideClick(container, () => (open = false));
	}
</script>

<div class="menu-container" bind:this={container}>
	<button on:click={() => (open = !open)}>
		<slot />
	</button>
	<ul class="menu" style:--display-dropdown={!open ? 'none' : 'flex'}>
		{#each items as item}
			{#if item.type === 'link'}
				<a on:click={() => (open = false)} href={item.href}>{$_(item.text)}</a>
			{:else if item.type === 'button'}
				<IconButton
					on:click={() => {
						click(item);
						open = false;
					}}
					title={item.text}
					><span slot="text">{item.text}</span><svelte:component this={item.icon} /></IconButton
				>
			{:else if item.type === 'divider'}
				<li class="divider">&nbsp;</li>
			{:else}
				<li class="title">{$_(item.text)}</li>
			{/if}
		{/each}
	</ul>
</div>

<style>
	.menu-container {
		position: relative;
	}

	.menu {
		display: var(--display-dropdown);
		flex-direction: column;
		position: absolute;
		right: 0;
		padding-left: 0.15rem;
		padding-right: 0.15rem;
		background-color: var(--menu-item-background-c);
		opacity: 0.9;
		border-bottom-left-radius: 0.5rem;
		border-bottom-right-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
		max-height: 80vh;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.menu .divider {
		border-bottom: 1px solid var(--text-c);
		border-left: none;
		height: 1px;
		width: 100%;
		padding: 0;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}
</style>
