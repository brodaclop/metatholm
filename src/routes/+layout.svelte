<script lang="ts">
	import { _, getLocaleFromNavigator, isLoading, init, locale, addMessages } from 'svelte-i18n';
	import { Labels_en, Labels_hu, convertToDescription } from '../model/Labels';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import Select from 'svelte-select';
	import { Hu, Gb } from 'svelte-flags';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let data: PageData;

	const LANGUAGES = [
		{ value: 'en', label: Gb },
		{ value: 'hu', label: Hu }
	];

	let lang = LANGUAGES[0];

	addMessages('en', Labels_en);
	addMessages('hu', Labels_hu);

	init({
		fallbackLocale: 'en',
		initialLocale: lang?.value
	});

	let currentCharacter: string = '';
	let lastPath: string = '';

	onMount(() => {
		const langKey = window.localStorage.getItem('lang');
		if (langKey) {
			lang = LANGUAGES.find((l) => l.value === langKey) ?? lang;
		}
	});

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
</script>

<header>
	<nav>
		<ul>
			<li>Logo</li>
			<li>
				<select bind:value={currentCharacter} on:change={switchCharacter}>
					<option value="">Select character</option>
					{#each data.characters as character}
						<option value={character.id}
							>{character.name} ({$_(character.ancestry)}
							{$_(character.background)} / {$_('character:level')}
							{character.level})</option
						>
					{/each}
				</select>
			</li>
			<li><a href="/create">Create</a></li>
			<li><a href="/simulator">Simulator</a></li>
			<li><a href="/lore/main">Lore</a></li>
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
		<p>Loading...</p>
	{:else}
		<slot />
	{/if}
</div>

<style>
	:global(html) {
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	}

	:global(.markdown tr:nth-child(even):not(.circles)) {
		background-color: whitesmoke;
	}

	header {
		position: sticky;
		top: 0;
		background-color: wheat;
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

	nav ul li:last-child {
		margin-left: auto;
	}
</style>
