<script lang="ts">
	import { _, getLocaleFromNavigator, isLoading, register, init, locale } from 'svelte-i18n';
	import { Labels_en, Labels_hu } from '../model/Labels';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import Select from 'svelte-select';
	import { Hu, Gb } from 'svelte-flags';
	export let data: PageData;

	const LANGUAGES = [
		{ value: 'en', label: Gb },
		{ value: 'hu', label: Hu }
	];

	const initLang = getLocaleFromNavigator()?.substring(0, 2);

	let lang = LANGUAGES.find((l) => l.value === initLang);

	register('en', async () => Labels_en);
	register('hu', async () => Labels_hu);

	init({
		fallbackLocale: 'en',
		initialLocale: lang?.value
	});

	let currentCharacter: string;

	$: if (currentCharacter) {
		goto(`/character/${currentCharacter}`);
	}

	$: lang && locale.set(lang.value);
</script>

<header>
	<nav>
		<ul>
			<li>Logo</li>
			<li>
				<select bind:value={currentCharacter}>
					{#each data.characters as character}
						<option value={character.id}
							>{character.name} ({$_(character.species)}
							{$_(character.class)} / {$_('character:level')}
							{character.level})</option
						>
					{/each}
				</select>
			</li>
			<li><a href="/create">Create</a></li>
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
	header {
		position: sticky;
		top: 0;
		background-color: wheat;
		padding-bottom: 0.1em;
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
