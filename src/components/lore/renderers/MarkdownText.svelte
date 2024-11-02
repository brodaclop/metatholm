<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import ActiveElementRenderer from './ActiveElementRenderer.svelte';
	import LinkRenderer from './LinkRenderer.svelte';
	import TableRow from './TableRow.svelte';
	import Table from './Table.svelte';
	import Image from './Image.svelte';
	import TableCell from './TableCell.svelte';
	import TableHead from './TableHead.svelte';

	export let text: string;
	export let isInline = false;
</script>

{#key Math.random()}
	<div class="markdown" class:inline={isInline}>
		<SvelteMarkdown
			{isInline}
			source={text}
			renderers={{
				codespan: ActiveElementRenderer,
				code: ActiveElementRenderer,
				link: LinkRenderer,
				tablerow: TableRow,
				tablecell: TableCell,
				tablehead: TableHead,
				image: Image,
				table: Table
			}}
		/>
	</div>
{/key}

<style>
	.inline {
		display: inline;
	}
</style>
