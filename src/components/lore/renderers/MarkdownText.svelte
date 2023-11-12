<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import ActiveElementRenderer from './ActiveElementRenderer.svelte';
	import LinkRenderer from './LinkRenderer.svelte';
	import TableRow from './TableRow.svelte';
	import Table from './Table.svelte';

	export let text: string;
</script>

{#key Math.random()}
	<div class="markdown">
		<SvelteMarkdown
			source={text}
			renderers={{
				codespan: ActiveElementRenderer,
				code: ActiveElementRenderer,
				link: LinkRenderer,
				tablerow: TableRow,
				table: Table
			}}
		/>
	</div>
{/key}
