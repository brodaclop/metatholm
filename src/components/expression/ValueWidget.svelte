<script lang="ts">
	import type { Value } from '../../logic/Expression';
	import { printKocka } from '../../logic/Kocka';
	import { _ } from 'svelte-i18n';

	export let expr: Value | undefined;
	export let result: number | undefined;
</script>

<span>
	{#if expr === undefined && result !== undefined}
		<i>{result}</i>
	{:else}
		{#if expr && expr.name && expr.roll === undefined}<span class="label">{$_(expr.name)}</span
			>{/if}

		{#if expr?.roll}
			{typeof expr.roll === 'object' ? printKocka(expr.roll) : expr.roll}
		{/if}
		{#if result !== undefined && typeof expr?.roll !== 'number'}
			<i>({result})</i>
		{/if}
	{/if}
</span>

<style>
	.label {
		font-weight: bold;
	}
</style>
