<script lang="ts">
	import type { EvalExpression } from '../../logic/Expression';
	import ExpressionWidget from './ExpressionWidget.svelte';
	export let expr: EvalExpression;
	export let text: string = '';

	import { Popover } from 'svelte-smooth-popover';
</script>

<span
	>{text ? text : Math.round(expr.result)}
	<Popover
		open={false}
		showOnClick={true}
		borderRadius={10}
		caretBg="black"
		hideOnExternalClick={true}
	>
		<div>
			<ExpressionWidget {expr} />
		</div>
	</Popover>
</span>

<style>
	div {
		background-color: var(--background-c);
		border: 1px solid var(--default-border-c);
		border-radius: 10px;
		padding: 10px;
	}
</style>
