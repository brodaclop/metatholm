<script lang="ts">
	import type { EvalExpression, Expression } from '../../logic/Expression';
	import { _ } from 'svelte-i18n';
	import ValueWidget from './ValueWidget.svelte';

	export let expr: EvalExpression | Expression;

	let result = 'result' in expr ? expr.result : undefined;
</script>

{#if expr.type === 'value'}
	<ValueWidget {expr} {result} />
{:else if expr.name}
	<!-- dropdown display -->
	<details>
		<summary>
			{$_(expr.name)}
			{#if 'result' in expr && expr.result !== undefined}
				<i>({expr.result})</i>
			{/if}
		</summary>
		<svelte:self expr={{ ...expr, name: undefined }} />
	</details>
{:else}
	<!-- inline display -->
	<span class="inline">
		{#if expr.type === 'div'}
			<svelte:self expr={expr.args[0]} /> / <svelte:self expr={expr.args[1]} />
		{:else if expr.type === 'levelsum'}
			<svelte:self expr={expr.arg} /> / {$_('character:level')}
		{:else if expr.type === 'add' || expr.type === 'mul'}
			{#each expr.args as arg, i}
				<svelte:self expr={arg} />
				{#if i < expr.args.length - 1}
					<span class="operator">{expr.type === 'add' ? '+' : '*'}</span>
				{/if}
			{/each}
		{:else if expr.type === 'max' || expr.type === 'min'}
			{expr.type}(
			{#each expr.args as arg, i}
				<svelte:self expr={arg} />
				{#if i < expr.args.length - 1}
					<span class="operator">,</span>
				{/if}
			{/each}
			)
		{/if}
	</span>
{/if}

<style>
	details {
		display: inline;
	}

	.inline,
	.operator,
	details {
		vertical-align: top;
	}

	summary::marker {
		size: 5px;
	}
</style>
