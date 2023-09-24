<script lang="ts">
	import type { EvalExpression, E, Expression, Operation } from '../../logic/Expression';
	import { _ } from 'svelte-i18n';
	import ValueWidget from './ValueWidget.svelte';

	export let expr: EvalExpression | Expression;
	export let parentType: Operation['type'] | undefined;

	let result = typeof expr === 'number' ? expr : 'result' in expr ? expr.result : undefined;
</script>

{#if typeof expr === 'number'}
	<ValueWidget expr={undefined} {result} />
{:else if expr.type === 'value'}
	<ValueWidget {expr} {result} />
{:else if expr.name}
	<!-- dropdown display -->
	<details>
		<summary>
			<span class="label">
				{$_(expr.name)}
			</span>
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
			<svelte:self parentType={expr.type} expr={expr.args[0]} /> / <svelte:self  parentType={expr.type} expr={expr.args[1]} />
		{:else if expr.type === 'sub'}
			{#if parentType === 'div' || parentType === 'mul'}({/if}
			<svelte:self parentType={expr.type} expr={expr.args[0]} /> - <svelte:self parentType={expr.type} expr={expr.args[1]} />
			{#if parentType === 'div' || parentType === 'mul'}){/if}
		{:else if expr.type === 'levelsum'}
			<svelte:self expr={expr.arg} /> / {$_('character:level')}
		{:else if expr.type === 'add' || expr.type === 'mul'}
			{#if expr.type === 'add' && (parentType === 'div' || parentType === 'mul')}({/if}
			{#each expr.args as arg, i}
				<svelte:self parentType={expr.type} expr={arg} />
				{#if i < expr.args.length - 1}
					<span class="operator">{expr.type === 'add' ? '+ ' : '* '}</span>
				{/if}
			{/each}
			{#if expr.type === 'add' && (parentType === 'div' || parentType === 'mul')}){/if}
		{:else if expr.type === 'max' || expr.type === 'min'}
			{expr.type}(
			{#each expr.args as arg, i}
				<svelte:self parentType={expr.type} expr={arg} />
				{#if i < expr.args.length - 1}
					<span class="operator">,&nbsp;</span>
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

	.label {
		font-weight: bold;
	}

	summary::marker {
		size: 5px;
	}
</style>
