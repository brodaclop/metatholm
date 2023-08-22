<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import Box from '../character/Box.svelte';
	import MarkdownText from './renderers/MarkdownText.svelte';
	import { lore } from '../../model/Lore';

	export let id: string;
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
</script>

{#if file}
	<Box background="white">
		<span slot="title">{$_(`label:${idPrefix}`)}: {title.replace(/#/g, '')}</span>

		<MarkdownText {text} />
	</Box>
{:else if notFound}
	<span>Lore not found</span>
{:else}
	<span>Loading...</span>
{/if}
