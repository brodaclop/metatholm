<script lang="ts">
	import Circles from './Circles.svelte';

	type T = $$Generic<string>;

	export let rows: Array<T | { name: T; subName: string }>;
	export let values: Partial<Record<T, number>>;
	export let newValues: Partial<Record<T, number>> = {};
	export let min: number | ((key: T) => number) = 0;
	export let max: number | ((key: T) => number);
	export let editable: boolean = false;
	export let plus: (name: T) => void = () => {};
	export let minus: (name: T) => void = () => {};
	export let inlineLore: boolean = false;
	export let loreParams: Record<string, unknown> = {};
</script>

<table>
	<tbody>
		{#each rows as key}
			{@const name = typeof key === 'string' ? key : key.name}
			<Circles
				{name}
				value={values[name] ?? 0}
				newValue={newValues[name]}
				min={typeof min === 'number' ? min : min(name)}
				max={typeof max === 'number' ? max : max(name)}
				{editable}
				{inlineLore}
				subName={typeof key === 'string' ? '' : key.subName}
				plus={() => plus(name)}
				minus={() => minus(name)}
				{loreParams}
			>
				<svelte:fragment slot="extra">
					<slot name="extra" key={name} />
				</svelte:fragment>
			</Circles>
		{/each}
	</tbody>
</table>

<style>
	table {
		border-spacing: 0;
		border-collapse: collapse;
	}
</style>
