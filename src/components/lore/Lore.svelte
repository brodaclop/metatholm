<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import Box from '../elements/Box.svelte';
	import MarkdownText from './renderers/MarkdownText.svelte';
	import { lore, loreIncomingLinks } from '../../model/Lore';
	import { setContext } from 'svelte';

	export let id: string = '';
	export let params: Record<string, unknown> = {};
	export let includeTitlePrefix = true;

	$: setContext('activeElementParams', { ...params, id });

	$: loreText = lore(id, $locale);

	$: title = loreText?.split('\n', 1)[0];

	$: text = loreText?.split('\n').slice(1).join('\n');

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

	const calculatePrefix = (fullId: string): string => {
		const parts = fullId.split(':');
		return PREFIX_MAPPING[
			parts.at(fullId.startsWith('world:realms') && parts.length === 4 ? -3 : -2) ?? 'main'
		];
	};

	$: incomingLinks = loreIncomingLinks(id, $locale);
</script>

{#if !title}
	<span>Lore not found</span>
{:else}
	{#key text}
		<Box flavour="lore" marginless>
			<span slot="title">
				{#if includeTitlePrefix}{$_(calculatePrefix(id))}: {/if}{title.replace(/#/g, '')}
			</span>

			{#if incomingLinks.length > 0 && id !== 'main'}
				<div class="references">
					<h4>{$_('label:references')}:</h4>
					<ul>
						{#each incomingLinks as link}
							<li><a href="/lore/{link.id}">{$_(calculatePrefix(link.id))}: {link.title}</a></li>
						{/each}
					</ul>
				</div>
			{/if}

			<div class="contents">
				<MarkdownText {text} />
			</div>
		</Box>
	{/key}
{/if}

<style>
	.contents {
		text-align: left;
	}

	.references {
		float: right;
		clear: right;
		border: 1px solid var(--default-border-c);
		background-color: var(--lore-references-background-c);
		border-radius: 1em;
		padding: 0.25rem;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		margin: 0.25rem;
	}

	.references h4 {
		margin-top: 0;
	}

	.references ul {
		padding-left: 0rem;
		margin-bottom: 0;
		list-style-type: none;
	}
</style>
