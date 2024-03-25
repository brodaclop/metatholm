<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import Box from '../character/Box.svelte';
	import MarkdownText from './renderers/MarkdownText.svelte';
	import { lore } from '../../model/Lore';
	import { onMount, setContext } from 'svelte';
	import Loading from '../Loading.svelte';

	export let id: string;
	export let params: Record<string, unknown> = {};
	export let includeTitlePrefix = true;

	$: setContext('activeElementParams', { ...params, id });

	let loadedLore: Promise<{ title: string; text: string; notFound: boolean }> = Promise.resolve({
		title: '',
		text: '',
		notFound: false
	});

	const loadLore = (loreId: string, locale: string | null | undefined) => {
		loadedLore = lore(loreId, locale)
			.then((res) => {
				const [title, ...textLines] = res.split('\n') ?? [];
				return {
					title,
					text: textLines.join('\n'),
					notFound: false
				};
			})
			.catch((e) => ({ notFound: true, text: '', title: '' }));
	};

	$: loadLore(id, $locale);

	let idPrefix: string;

	$: {
		const parts = id.split(':');
		idPrefix = parts.at(id.startsWith('world:realms') && parts.length === 4 ? -3 : -2) ?? 'main';
	}

	const PREFIX_MAPPING: Record<string, string> = {
		ability: 'character:ability',
		character: 'label:character',
		action: 'label:action',
		ancestry: 'character:ancestry',
		background: 'character:background',
		rule: 'label:rule',
		skill: 'character:skill',
		main: 'label:lore',
		spell: 'label:spell',
		world: 'label:world',
		notes: 'label:notes',
		realms: 'world:realm',
		settlements: 'world:settlement',
		organisations: 'world:organisation',
		concepts: 'world:concept'
	};
</script>

{#await loadedLore}
	<Loading />
{:then { title, text, notFound }}
	{#if notFound}
		<span>Lore not found</span>
	{:else}
		<Box flavour="lore" marginless>
			<span slot="title">
				{#if includeTitlePrefix}{$_(PREFIX_MAPPING[idPrefix])}: {/if}{title.replace(/#/g, '')}
			</span>

			<MarkdownText {text} />
		</Box>
	{/if}
{/await}
