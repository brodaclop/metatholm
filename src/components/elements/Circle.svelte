<script lang="ts">
	export let status: 'empty' | 'half' | 'full' | 'reduced' | 'increased' | 'active';
	export let clickable = false;
</script>

<span
	class={`${status} main`}
	style:background-color={`var(--circle-c-${status})`}
	on:click
	on:keypress
	tabindex="0"
	class:clickable
	role="button"
>
	<span class="inner">
		<slot />
	</span>
</span>

<style>
	span.main {
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
		text-align: center;
		padding: 0.1em;
	}

	span.inner {
		padding-bottom: 1px;
		height: 1rem;
	}

	.clickable {
		cursor: pointer;
	}

	.half {
		opacity: 0.3;
	}

	.active:hover {
		opacity: 0.7;
	}
</style>
