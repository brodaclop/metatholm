<script lang="ts">
	import Circles from './Circles.svelte';

	type T = $$Generic<string>;

	export let rows: Array<T | { name: T; subName: string }>;
	export let values: Partial<Record<T, number>>;
	export let newValues: Partial<Record<T, number>> = {};
	export let max: number;
	export let editable: boolean = false;
	export let plus: (name: T) => void = () => {};
	export let minus: (name: T) => void = () => {};
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
				{max}
				{editable}
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
