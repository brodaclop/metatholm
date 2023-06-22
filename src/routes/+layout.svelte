<script lang="ts">
	import { _, getLocaleFromNavigator, isLoading, register, init, locale } from 'svelte-i18n';
	import { Labels_en, Labels_hu } from '../model/Labels';
	import type { PageData } from './$types';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	export let data: PageData;
	let lang = getLocaleFromNavigator()?.substring(0, 2);

	register('en', async () => Labels_en);
	register('hu', async () => Labels_hu);

	init({
		fallbackLocale: 'en',
		initialLocale: lang
	});

	let currentCharacter: string;

	$: if (currentCharacter) {
		goto(`/character/${currentCharacter}`);
	}

	$: lang && locale.set(lang);
</script>

<header>
	<nav>
		<ul>
			<li>
				Language: <select bind:value={lang}>
					<option>en</option>
					<option>hu</option>
				</select>
			</li>
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
