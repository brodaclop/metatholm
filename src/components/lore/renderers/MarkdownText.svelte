<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import ActiveElementRenderer from './ActiveElementRenderer.svelte';
	import LinkRenderer from './LinkRenderer.svelte';
	import TableRow from './TableRow.svelte';
	import Table from './Table.svelte';

	export let text: string;
</script>

<SvelteMarkdown
	source={text}
	renderers={{
		codespan: ActiveElementRenderer,
		link: LinkRenderer,
		tablerow: TableRow,
		table: Table
	}}
/>
