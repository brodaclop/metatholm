<script lang="ts">
	import { _ } from 'svelte-i18n';
	export let id: string;
	export let rowName: string;
	export let columnName: string;
	export let rowChangeable = true;
	export let columnChangeable = true;

	export let row: number;
	export let column: number;
	export let rowMax: number;
	export let columnMax: number;
	export let hideRowCounter = false;
	export let fullWidth = false;
	export let valueCalculator: (_row: number, _column: number) => number;

	const i18n = $_;

	$: select = (_row: number, _column: number) => {
		if (columnChangeable) {
			column = _column;
		}
		if (rowChangeable) {
			row = _row;
		}
	};
</script>

<table class="standard" class:fullWidth>
	<thead>
		<tr>
			<th />
			{#if !hideRowCounter}
				<th />
			{/if}
			<th colspan={columnMax + 1} style:text-align="center">{$_(columnName)}</th>
		</tr>
		<tr>
			<th />
			{#if !hideRowCounter}
				<th />
			{/if}
			{#each Array(columnMax + 1) as _, _column}
				<th class:semi-highlighted={column === _column}>{_column}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each Array(rowMax + 1) as _, _row}
			<tr>
				{#if _row === 0}
					<th rowspan={rowMax + 1}>{i18n(rowName)}</th>
				{/if}
				{#if !hideRowCounter}
					<th class:semi-highlighted={row === _row}>
						{_row}
					</th>
				{/if}
				{#each Array(columnMax + 1) as _, _column}
					<td
						on:mouseenter={() => select(_row, _column)}
						on:mouseleave={() => select(-1, -1)}
						class:semi-highlighted={(_row === row) !== (_column === column)}
						class:highlighted={_row === row && _column === column}
						>{valueCalculator(_row, _column)}</td
					>
				{/each}
			</tr>
		{/each}
	</tbody>
	<caption>{$_(id)}: {row !== -1 && column !== -1 ? valueCalculator(row, column) : '-'}</caption>
</table>

<style>
	table {
		caption-side: bottom;
	}

	table.fullWidth {
		width: 100%;
	}

	td,
	th {
		transition: background-color 0.05s ease-in-out;
	}

	.semi-highlighted {
		background-color: hsl(from var(--lore-active-cells-c) h calc(s/2) l);
	}

	.highlighted {
		background-color: var(--lore-active-cells-c);
	}

	caption {
		font-weight: var(--font-weight-bold);
		font-size: large;
	}
</style>
