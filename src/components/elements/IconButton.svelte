<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Labels } from '../../model/Labels';

	export let title: Labels;
	export let color: string | undefined = undefined;
</script>

<button title={$_(title)} on:click style:color><slot /></button>

<style>
	button {
		height: 1.5em;
		vertical-align: bottom;
		padding: 1px;
	}
</style>
