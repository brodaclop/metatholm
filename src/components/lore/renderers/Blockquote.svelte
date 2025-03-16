<script lang="ts">
	export let text: string;

	$: note = text?.startsWith('[note]');
</script>

<blockquote class:note><slot /></blockquote>

<style>
	blockquote {
		text-align: right;
		font-style: italic;
		margin-right: 0;
	}

	blockquote.note {
		text-align: justify;
		font-style: italic;
		max-width: fit-content;
		border: 1px solid var(--box-border-c);
		border-radius: 0.25em;
		background-color: var(--lore-references-background-c);
		padding: 0.5em;
		margin-right: 0;
		overflow: auto;
	}

	blockquote.note :global(p) {
		margin: 0;
	}
</style>
