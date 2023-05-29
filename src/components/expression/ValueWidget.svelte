<script lang="ts">
	import type { Value } from '../../logic/Expression';
	import { printKocka } from '../../logic/Kocka';
	import { _ } from 'svelte-i18n';

	export let expr: Value;
	export let result: number | undefined;
</script>

<span
	>{#if expr.name && expr.roll === undefined}{$_(expr.name)}{/if}

	{#if expr.roll}
		{typeof expr.roll === 'object' ? printKocka(expr.roll) : expr.roll}
	{/if}
	{#if result !== undefined && typeof expr.roll !== 'number'}
		<i>({result})</i>
	{/if}
</span>
