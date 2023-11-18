<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import Box from '../character/Box.svelte';
	import MarkdownText from './renderers/MarkdownText.svelte';
	import { lore } from '../../model/Lore';
	import { setContext } from 'svelte';

	export let id: string;
	export let params: Record<string, unknown> = {};

	$: setContext('activeElementParams', { ...params, id });

	let file: string = '';
	let notFound: boolean = false;

	$: lore(id, $locale)
		.then((res) => {
			file = res;
			notFound = false;
		})
		.catch((e) => {
			notFound = true;
			file = '';
		});

	$: [title, ...textLines] = file?.split('\n') ?? [];

	$: text = textLines?.join('\n');

	$: idPrefix = id?.split(':')?.[0];

	const PREFIX_MAPPING: Record<string, string> = {
		ability: 'character:ability',
		character: 'label:character',
		action: 'label:action',
		ancestry: 'character:ancestry',
		background: 'character:background',
		rule: 'label:rule',
		skill: 'character:skill'
	};
</script>

{#if file}
	<Box flavour="lore">
		<span slot="title">{$_(PREFIX_MAPPING[idPrefix])}: {title.replace(/#/g, '')}</span>

		<MarkdownText {text} />
	</Box>
{:else if notFound}
	<span>Lore not found</span>
{:else}
	<span>Loading...</span>
{/if}
