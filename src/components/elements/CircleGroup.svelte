<script lang="ts">
	import Circles from './Circles.svelte';

	type T = $$Generic<string>;

	export let rows: Array<T | { name: T; subName: string }>;
	export let values: Partial<Record<T, number>>;
	export let newValues: Partial<Record<T, number>> = {};
	export let max: number;
	export let canPlus: (name: T) => boolean = () => true;
	export let canMinus: (name: T) => boolean = () => true;
	export let editable: boolean = false;
	export let plus: (name: T) => void = () => {};
	export let minus: (name: T) => void = () => {};
	export let inlineLore: boolean = false;
	export let loreParams: Record<string, unknown> = {};
	export let wrapInTable = true;
</script>

{#if wrapInTable}
	<table>
		<tbody>
			{#each rows as key}
				{@const name = typeof key === 'string' ? key : key.name}
				<Circles
					{name}
					value={values[name] ?? 0}
					newValue={newValues[name]}
					{max}
					{editable}
					{inlineLore}
					subName={typeof key === 'string' ? '' : key.subName}
					plus={() => plus(name)}
					minus={() => minus(name)}
					canPlus={canPlus(name)}
					canMinus={canMinus(name)}
					{loreParams}
				>
					<svelte:fragment slot="extra">
						<slot name="extra" key={name} />
					</svelte:fragment>
				</Circles>
			{/each}
		</tbody>
	</table>
{:else}
	{#each rows as key}
		{@const name = typeof key === 'string' ? key : key.name}
		<Circles
			{name}
			value={values[name] ?? 0}
			newValue={newValues[name]}
			{max}
			{editable}
			{inlineLore}
			subName={typeof key === 'string' ? '' : key.subName}
			plus={() => plus(name)}
			minus={() => minus(name)}
			canPlus={canPlus(name)}
			canMinus={canMinus(name)}
			{loreParams}
		>
			<svelte:fragment slot="extra">
				<slot name="extra" key={name} />
			</svelte:fragment>
		</Circles>
	{/each}
{/if}

<style>
	table {
		border-spacing: 0;
		border-collapse: collapse;
	}
</style>
