<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import Lore from '../../components/lore/Lore.svelte';
	import { onMount, setContext } from 'svelte';
	import TableOfContents from '../../components/lore/TableOfContents.svelte';

	setContext('bookMode', true);

	interface Heading {
		title: string;
		id: string | null;
		level: number;
		subheadings: Array<Heading>;
		parent?: Heading;
	}

	let article: HTMLElement;

	const parseHeadings = (elem: HTMLElement) => {
		const headingElements = Array.from(elem.querySelectorAll('h1, h2, h3, h4, h5, h6'));
		let ret: Heading = {
			id: '',
			title: '',
			level: 0,
			subheadings: [],
			parent: undefined
		};
		let currentHeading: Heading = ret;
		let currentLevel = 0;
		headingElements.forEach((elem) => {
			const level = Number(elem.tagName.charAt(1));
			const id = elem.parentElement?.getAttribute('id');
			if (!id) {
				return;
			}
			if (level <= currentLevel) {
				while (currentHeading.level > level) {
					currentHeading = currentHeading.parent!;
				}
				currentHeading = {
					id,
					title: elem.textContent ?? '',
					subheadings: [],
					level,
					parent: currentHeading?.parent
				};
				currentHeading.parent?.subheadings.push(currentHeading);
			} else {
				currentHeading = {
					id,
					title: elem.textContent ?? '',
					subheadings: [],
					level,
					parent: currentHeading
				};
				currentHeading.parent?.subheadings.push(currentHeading);
			}
			currentLevel = level;
		});
		return ret;
	};

	$: headings = article ? parseHeadings(article) : null;

	let highlights: Array<string> = [];

	onMount(() => {
		const handler = (e: Event) => {
			if (article) {
				const sections = Array.from(article.querySelectorAll('section[id]'));
				const inView = sections.filter((section) => {
					const rect = section.getBoundingClientRect();
					const screenHeight = document.documentElement.clientHeight;
					const before = rect.top < 0 && rect.bottom < 0;
					const after = rect.top >= screenHeight && rect.bottom >= screenHeight;
					return !after && !before;
				});
				highlights = inView.map((elem) => elem.getAttribute('id') ?? '');
				const last = highlights.at(-1);
				if (last) {
					history.pushState(null, '', `#${last}`);
				}
			}
		};
		document.addEventListener('scroll', handler);
		return () => document.removeEventListener('scroll', handler);
	});
</script>

{#if headings}
	<article class="toc" data-lang={$locale}>
		<header>
			<h1>{$_('label:toc')}</h1>
			<TableOfContents heading={headings} {highlights} />
		</header>
	</article>
{/if}

{#key $locale}
	<article class="lore" bind:this={article}>
		<Lore id="book" />
	</article>
{/key}

<style>
	.lore {
		width: 60vw;
	}

	.toc {
		position: fixed;
		top: 3.5em;
		right: 0;
		z-index: 500;
		max-height: calc(100vh - 4em);
		padding-left: 0.5em;
		padding-right: 0.5em;
		width: 30vw;
		overflow: auto;

		border: 1px solid var(--default-border-c);
		background-color: var(--lore-references-background-c);
		border-radius: 1em;
	}
</style>
