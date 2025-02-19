<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import Box from '../elements/Box.svelte';
	import MarkdownText from './renderers/MarkdownText.svelte';
	import { lore, loreIncomingLinks } from '../../model/Lore';
	import { getContext, setContext } from 'svelte';
	import Heading from '../elements/Heading.svelte';

	export let id: string = '';
	export let params: Record<string, unknown> = {};
	export let includeTitlePrefix = true;
	export let modal = false;

	const bookMode: boolean = getContext('bookMode') ?? false;
	const headingLevel: number = getContext('headingLevel') ?? 0;

	setContext('headingLevel', Math.min(headingLevel + 1, 6));

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

	$: incomingLinks = bookMode
		? []
		: loreIncomingLinks(id, $locale)
				.map(({ id, title }) => ({ id, title: `${$_(calculatePrefix(id))}: ${title}` }))
				.sort((a, z) => a.title.localeCompare(z.title));

	// TODO: számozás
	// TODO: mobil kinézet
</script>

{#if !title}
	<span>Lore not found</span>
{:else if !bookMode || modal}
	{#key text}
		<Box flavour="lore" marginless>
			<span slot="title" class="title">
				{#if includeTitlePrefix && !bookMode}{$_(calculatePrefix(id))}: {/if}{title.replace(
					/#/g,
					''
				)}
			</span>

			<div
				style:max-height={modal ? '80vh' : undefined}
				style:overflow-y={modal ? 'auto' : undefined}
			>
				{#if incomingLinks.length > 0 && id !== 'main'}
					<div class="references">
						<h4>{$_('label:references')}:</h4>
						<ul>
							{#each incomingLinks as link}
								<li><a href="/codex/{link.id}">{link.title}</a></li>
							{/each}
						</ul>
					</div>
				{/if}

				<div class="contents">
					<MarkdownText {text} />
				</div>
			</div>
		</Box>
	{/key}
{:else}
	<section {id} class="title">
		<Heading>{title.replace(/#/g, '')}</Heading>
		<div class="contents">
			<MarkdownText {text} />
		</div>
	</section>
{/if}

<style>
	.title {
		scroll-margin-top: 3em;
	}

	.contents {
		text-align: left;
		white-space: initial;
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
