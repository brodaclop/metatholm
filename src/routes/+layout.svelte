<script lang="ts">
	import { _, isLoading, init, locale, addMessages } from 'svelte-i18n';
	import { Labels_en, Labels_hu } from '../model/labels/Labels';
	import type { PageData } from './$types';
	import { invalidate, invalidateAll } from '$app/navigation';
	import Select from 'svelte-select';
	import { Hu, Gb } from 'svelte-flags';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import MdCheck from 'svelte-icons/md/MdCheck.svelte';
	import MdMenu from 'svelte-icons/md/MdMenu.svelte';
	import MdWbSunny from 'svelte-icons/md/MdWbSunny.svelte';
	import FaMoon from 'svelte-icons/fa/FaMoon.svelte';
	import IconButton from '../components/elements/IconButton.svelte';
	import Loading from '../components/Loading.svelte';
	import '../css/themes.css';
	import CharacterSelector from '../components/CharacterSelector.svelte';
	import { detectOutsideClick } from '$lib/client/outside-click';
	import type { Party } from '../model/party/Party';
	import Menu from '../components/Menu.svelte';

	export let data: PageData;

	export const LANGUAGES = [
		{ value: 'en', label: Gb },
		{ value: 'hu', label: Hu }
	];

	const storedLang = () => {
		if (browser) {
			const langKey = window.localStorage.getItem('lang');
			if (langKey) {
				return LANGUAGES.find((l) => l.value === langKey);
			}
		}
	};

	//TODO: when joining new party, make it the active party
	//TODO: limit character and other object sizes, including archive list size
	//TODO: display level in archive list

	let lang = storedLang() ?? LANGUAGES[0];

	addMessages('en', Labels_en);
	addMessages('hu', Labels_hu);

	init({
		fallbackLocale: 'en',
		initialLocale: lang?.value
	});

	let currentCharacter: string = '';
	let lastPath: string = '';

	let theme: 'dark' | 'light' | undefined = undefined;

	$: if (theme) {
		document.querySelector('html')?.classList.remove('light');
		document.querySelector('html')?.classList.remove('dark');
		document.querySelector('html')?.classList.add(theme);
		window?.localStorage?.setItem('theme', theme);
	}

	onMount(() => (lang = storedLang() ?? lang));

	onMount(() => {
		const storedMode = window.localStorage.getItem('theme');
		if (storedMode) {
			theme = storedMode === 'dark' ? 'dark' : 'light';
		}
	});

	$: {
		if (lastPath !== $page.url.pathname) {
			const paths = $page.url.pathname.split('/');
			const penultimate = paths.at(-2);
			const last = paths.at(-1);
			menuOpen = false;
			if (penultimate === 'character' && last) {
				currentCharacter = last;
			} else {
				currentCharacter = '';
			}
		}
		lastPath = $page.url.pathname;
	}

	const langChanged = () => {
		if (browser) {
			window.localStorage.setItem('lang', lang.value);
		}
	};

	$: lang && locale.set(lang.value);

	let menuOpen = false;
	let dropdown: HTMLElement;

	$: if (menuOpen) {
		detectOutsideClick(dropdown, () => (menuOpen = false));
	}

	const activateParty = (party: Party) => {
		return fetch(`/party/${party.id}/activate`, {
			method: 'POST',
			headers: {
				'x-sveltekit-action': 'true'
			}
		})
			.then(() => invalidate('db:partylist'))
			.then(() => invalidate('db:characterlist'))
			.then(() => invalidateAll());
	};

	$: userMenu = [
		{
			type: 'link',
			text: 'label:settings',
			href: '/user'
		},
		{
			type: 'divider'
		},
		{
			type: 'title',
			text: 'label:parties'
		},
		...(data.parties ?? []).map(({ party, active }) => ({
			type: 'button',
			text: party.name,
			onClick: () => activateParty(party),
			icon: active ? MdCheck : undefined
		})),
		{
			type: 'divider'
		},
		{
			type: 'link',
			text: 'label:logout',
			href: '/logout'
		}
	] as any;

	$: noActiveParty = data.parties?.every((p) => !p.active);
</script>

<header>
	<nav>
		<ul>
			<li class="nohover"><a href="/"><img class="logo" src="/mt.svg" alt="Metatholm" /></a></li>
			<li bind:this={dropdown} class="responsive">
				<button class="menu-opener" on:click={() => (menuOpen = !menuOpen)}>
					<span><MdMenu /></span>
				</button>
				<ul style:--display-dropdown={!menuOpen ? 'none' : 'flex'}>
					<li><a href="/lore/main">{$_('label:lore')}</a></li>
					{#if data.user}
						<li>
							<CharacterSelector disabled={noActiveParty} characters={data.characters} />
						</li>
						<li class="divider">&nbsp;</li>
						<li><a href="/npc">{$_('label:npcs')}</a></li>
						<li><a href="/encounter">{$_('label:encounters')}</a></li>
					{/if}
				</ul>
			</li>
			<li class="nohover">
				<div class="right-controls">
					{#if data.user}
						<Menu items={userMenu}>
							<span class="nowrap">
								<span class="username">{data.user.username} </span>
								<span class="username">
									/ {data.parties.find((p) => p.active)?.party.name ?? '-'}
								</span>
							</span>
						</Menu>
					{:else}
						<a href="/login">Login</a>
					{/if}
					<IconButton
						title="label:lightdark"
						on:click={() => (theme = theme === 'dark' ? 'light' : 'dark')}
					>
						{#if theme === 'dark'}
							<MdWbSunny />
						{:else}
							<FaMoon />
						{/if}
					</IconButton>
					<Select
						bind:value={lang}
						items={LANGUAGES}
						searchable={false}
						clearable={false}
						--height="1.5em"
						--max-height="1.5em"
						--value-container-padding="0"
						--padding="0 0 0 0.2em"
						--item-padding="0 0 0 0.2em"
						--internal-padding="0 0 0 0.2em"
						--selected-item-padding="0 0.2em 0 0"
						on:change={langChanged}
					>
						<div slot="item" let:item>
							<svelte:component this={item.label} />
						</div>
						<div slot="selection" let:selection>
							<svelte:component this={selection.label} />
						</div>
					</Select>
				</div>
			</li>
		</ul>
	</nav>
</header>
<div>
	{#if $isLoading}
		<Loading />
	{:else}
		<slot />
	{/if}
</div>

<style>
	@import url('https://fonts.cdnfonts.com/css/luminari');
	@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Display:ital,wght@0,100..900;1,100..900&display=swap');

	:global(.reset-font),
	:global(html),
	:global(button) {
		font-family: 'Noto Sans Display', 'Verdana', 'Gill Sans', 'Gill Sans MT', Calibri,
			'Trebuchet MS', sans-serif;
		color: var(--text-c);
		background-color: var(--background-c);
		font-weight: var(--font-weight);
		font-optical-sizing: auto;
		font-style: normal;
		font-variation-settings: 'wdth' 100;
	}

	:global(th) {
		font-weight: var(--font-weight-bold);
	}

	:global(h1, h2, h3, h4, h5, h6) {
		font-family: 'Luminari';
	}

	:global(button:disabled) {
		opacity: 0.3;
	}

	:global(button),
	:global(select),
	:global(input),
	:global(textarea),
	:global(dialog) {
		font-family: 'Noto Sans Display', 'Verdana', 'Gill Sans', 'Gill Sans MT', Calibri,
			'Trebuchet MS', sans-serif;
		font-weight: var(--font-weight);
		font-optical-sizing: auto;
		font-style: normal;
		font-variation-settings: 'wdth' 100;
	}

	:global(strong) {
		font-weight: var(--font-weight-bold);
	}

	:global(button),
	:global(select:enabled),
	:global(input:enabled),
	:global(textarea:enabled),
	:global(dialog) {
		color: var(--text-c);
		background-color: var(--background-c);
	}

	:global(select:disabled),
	:global(button:disabled),
	:global(input:disabled),
	:global(textarea:disabled) {
		color: var(--text-c);
		background-color: var(--button-disabled-c);
	}

	:global(a) {
		color: var(--link-c);
	}

	:global(a:visited) {
		color: var(--link-c);
	}

	:global(table) {
		border-collapse: collapse;
		border-spacing: 0;
	}

	:global(table.wide) {
		width: 100%;
	}

	:global(table.standard) {
		border-collapse: collapse;
		border: 1px solid var(--box-border-c);
		caption-side: bottom;
	}

	:global(table.standard tr:nth-child(even)) {
		background-color: var(--striped-table-even-c);
	}

	:global(table.standard tr:nth-child(odd)) {
		background-color: var(--striped-table-odd-c);
	}

	:global(table.standard td),
	:global(table.standard th) {
		padding-right: 0.5em;
		text-align: left;
	}

	:global(table.standard td.right),
	:global(table.standard th.right) {
		text-align: right;
	}

	:global(table.standard th) {
		background-color: var(--table-head-background-c);
	}

	header {
		position: sticky;
		top: 0;
		background-color: var(--header-background-c);
		padding-bottom: 0.1em;
		z-index: 1000;
	}

	nav ul {
		list-style-type: none;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		margin: 0;
		padding-left: 0.2em;
		padding-bottom: 0.2em;
		padding-top: 0.2em;
	}

	nav ul li {
		padding-left: 0.2em;
		padding-right: 0.2em;
		text-align: center;
		transition: background-color 0.2s ease-in-out;
	}

	nav ul li a {
		text-decoration: none;
	}

	nav ul li:not(.nohover):not(.responsive):hover {
		background-color: var(--menu-item-hover-c);
	}

	nav ul li:last-child {
		margin-left: auto;
	}

	.divider {
		border-left: 1px solid var(--text-c);
		width: 0;
		padding: 0;
		margin-left: 0.5rem;
		margin-right: 0.5rem;
	}

	.menu-opener {
		display: none;
	}

	.right-controls {
		display: flex;
		flex-wrap: nowrap;
		width: 100%;
		justify-content: right;
	}

	.nowrap {
		white-space: nowrap;
		display: inline-block;
		vertical-align: top;
	}

	.username {
		display: inline-block;
		max-width: 6rem;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.responsive ul {
		padding-left: 0;
	}

	.logo {
		height: 2em;
	}

	@media screen and (max-width: 1000px) {
		.menu-opener {
			display: var(--display-dropdown);
		}

		.menu-opener span {
			display: inline-block;
			width: 1em;
			vertical-align: middle;
		}

		.responsive {
			position: relative;
		}

		.responsive ul {
			display: var(--display-dropdown);
			flex-direction: column;
			position: absolute;
			padding-left: 0.15rem;
			padding-right: 0.15rem;
			background-color: var(--menu-item-background-c);
			opacity: 0.9;
			border-bottom-left-radius: 0.5rem;
			border-bottom-right-radius: 0.5rem;
			border-top-right-radius: 0.5rem;
			max-height: 80vh;
			overflow-x: hidden;
			overflow-y: scroll;
		}

		.responsive ul li {
			width: 100%;
			text-align: left;
			padding: 0;
			white-space: nowrap;
			white-space-collapse: collapse;
		}

		.divider {
			border-bottom: 1px solid var(--text-c);
			border-left: none;
			height: 1px;
			width: 100%;
			padding: 0;
			margin-top: 0.5rem;
			margin-bottom: 0.5rem;
		}
	}
</style>
