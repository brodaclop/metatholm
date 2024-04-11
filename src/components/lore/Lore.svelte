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

	$: loreText = lore(id, $locale);

	$: title = loreText?.split('\n', 1)[0];

	$: text = loreText?.split('\n').slice(1).join('\n');

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

{#if !title}
	<span>Lore not found</span>
{:else}
	<Box flavour="lore" marginless>
		<span slot="title">
			{#if includeTitlePrefix}{$_(PREFIX_MAPPING[idPrefix])}: {/if}{title.replace(/#/g, '')}
		</span>

		<MarkdownText {text} />
	</Box>
{/if}
