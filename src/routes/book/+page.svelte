<script lang="ts">
	import Lore from '../../components/lore/Lore.svelte';
	import { setContext } from 'svelte';
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
		const popovers = Array.from(elem.querySelectorAll('.popover'));
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
			const isInPopover = popovers.some((po) => po.contains(elem));
			const level = Number(elem.tagName.charAt(1));
			const id = elem.parentElement?.getAttribute('id');
			if (!id || isInPopover) {
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
</script>

{#if headings}
	<article class="toc">
		<header>
			<h1>Tartalomjegyzék</h1>
			<TableOfContents heading={headings} />
		</header>
	</article>
{/if}

<article class="lore" bind:this={article}>
	<Lore id="book" />
</article>

<style>
	.lore {
		width: 60vw;
	}

	.toc {
		position: fixed;
		top: 3em;
		right: 0;
		z-index: 1000;
		max-height: calc(100vh - 3em);
		padding-left: 0.5em;
		padding-right: 0.5em;
		width: 30vw;
		overflow: auto;

		border: 1px solid var(--default-border-c);
		background-color: var(--lore-references-background-c);
		border-radius: 1em;
	}
</style>
