<script lang="ts">
	export let status: 'empty' | 'half' | 'full' | 'reduced' | 'increased' | 'active';
</script>

<span class={status} on:click on:keypress>
	<slot name="value" />
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
		opacity: 0.3;
	}

	.active {
		background-color: lightgray;
	}

	.active:hover {
		background-color: lightgray;
		opacity: 0.7;
	}

	.reduced {
		background-color: firebrick;
	}

	.increased {
		background-color: chartreuse;
	}

	.full {
		background-color: slategray;
	}
</style>
