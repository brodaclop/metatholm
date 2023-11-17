<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Labels } from '../../model/Labels';

	export let title: string;
	export let color: string | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
</script>

<button title={$_(title)} on:click {disabled} style:color><slot /></button>

<style>
	button {
		height: 1.5em;
		vertical-align: bottom;
		padding: 1px;
	}
</style>
