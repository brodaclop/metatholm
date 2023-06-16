<script lang="ts">
	export let status: 'empty' | 'half' | 'full';
	export let value: string = '';
</script>

<span class={status}>
	{#if value}{value}{/if}
</span>

<style>
	span {
		border: 1px solid black;
		box-shadow: 0.1em 0.1em 0.1em slategray;
		border-radius: 50%;
		width: 1em;
		height: 1em;
		display: inline-block;
		margin-left: 0.2em;
		margin-bottom: 0.2em;
		white-space: pre;
		font-size: small;
		padding: 0.1em;
	}

	.empty {
		background-color: white;
	}

	.half {
		background-color: lightgray;
	}

	.full {
		background-color: slategray;
	}
</style>
