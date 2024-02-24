<script lang="ts">
	import { _, isLoading, init, locale, addMessages } from 'svelte-i18n';
	import { Labels_en, Labels_hu } from '../model/Labels';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import Select from 'svelte-select';
	import { Hu, Gb } from 'svelte-flags';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { entries, group } from '../model/InfoList';
	import MdExitToApp from 'svelte-icons/md/MdExitToApp.svelte';
	import MdMenu from 'svelte-icons/md/MdMenu.svelte';
	import IconButton from '../components/elements/IconButton.svelte';
	import Loading from '../components/Loading.svelte';
	import '../css/themes.css';

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

	let lang = storedLang() ?? LANGUAGES[0];

	addMessages('en', Labels_en);
	addMessages('hu', Labels_hu);

	init({
		fallbackLocale: 'en',
		initialLocale: lang?.value
	});

	let currentCharacter: string = '';
	let lastPath: string = '';

	onMount(() => (lang = storedLang() ?? lang));

	$: {
		if (lastPath !== $page.url.pathname) {
			const paths = $page.url.pathname.split('/');
			const penultimate = paths.at(-2);
			const last = paths.at(-1);
			if (penultimate === 'character' && last) {
				currentCharacter = last;
			} else {
				currentCharacter = '';
			}
		}
		lastPath = $page.url.pathname;
	}

	$: switchCharacter = () => goto(currentCharacter ? `/character/${currentCharacter}` : '/');

	const langChanged = () => {
		if (browser) {
			window.localStorage.setItem('lang', lang.value);
		}
	};

	$: lang && locale.set(lang.value);

	let menuOpen = false;
</script>

{#if !data.user}
	<div class="login">
		<div>
			<h1>Metatholm Login</h1>
			<div><a href="/login/github">GitHub Login</a></div>
			<div><a href="/login/google">Google Login</a></div>
		</div>
	</div>
{:else}
	<header>
		<nav>
			<ul>
				<li><a href="/">M</a></li>
				<li>
					{data.user.username}
					<form method="post" action="/logout">
						<IconButton title="label:logout"><MdExitToApp /></IconButton>
					</form>
				</li>
				<li>
					<select bind:value={currentCharacter} on:change={switchCharacter}>
						<option disabled value="">{$_('label:select-character')}</option>
						{#each entries(group(data.characters, (c) => c.user)) as [user, characters]}
							<option disabled>-- {user} --</option>
							{#each characters as character}
								<option value={character.id}
									>{character.name} ({$_(character.ancestry)}
									{$_(character.background)} / {$_('character:level')}
									{character.level})</option
								>
							{/each}
						{/each}
					</select>
				</li>
				<li class="responsive">
					<button class="menu-opener" on:click={() => (menuOpen = !menuOpen)}>
						<span><MdMenu /></span>
					</button>
					<ul style:--display-dropdown={!menuOpen ? 'none' : 'flex'}>
						<li><a href="/create">{$_('label:new-character')}</a></li>
						<li><a href="/lore/main">{$_('label:lore')}</a></li>
						<li class="divider">&nbsp;</li>
						<li><a href="/npc">{$_('label:npcs')}</a></li>
						<li><a href="/encounter">{$_('label:encounters')}</a></li>
						<li class="divider">&nbsp;</li>
						<li><a href="/simulator">Simulator</a></li>
					</ul>
				</li>
				<li>
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
{/if}

<style>
	:global(html) {
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		color: var(--text-c);
		background-color: var(--background-c);
	}

	:global(button:disabled) {
		color: var(--button-disabled-c);
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
		padding-bottom: 0.2em;
		padding-top: 0.2em;
	}

	nav ul li {
		padding-left: 0.2em;
		padding-right: 0.2em;
		text-align: center;
	}

	nav ul li:not(.responsive):hover {
		background-color: var(--menu-item-hover-c);
	}

	nav ul li:last-child {
		margin-left: auto;
	}

	.login {
		height: 90vh;
		display: flex;
		justify-content: space-around;
		align-items: center;
		text-align: center;
	}

	.divider {
		border-left: 1px solid var(--text-c);
		width: 0;
		padding: 0;
		margin-left: 0.5rem;
		margin-right: 0.5rem;
	}

	form {
		display: inline-block;
	}

	.menu-opener {
		display: none;
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
			border-bottom-left-radius: 0.5rem;
			border-bottom-right-radius: 0.5rem;
			border-top-right-radius: 0.5rem;
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

	@media screen and (max-width: 600px) {
		.responsive ul {
			display: flex;
			flex-direction: column;
			position: absolute;
			right: 0.2rem;
			padding-left: 0.1rem;
			padding-right: 0.1rem;
			background-color: var(--menu-item-background-c);
			border-bottom-left-radius: 0.5rem;
			border-bottom-right-radius: 0.5rem;
			border-top-left-radius: 0.5rem;
			border-top-right-radius: 0;
		}
	}
</style>
