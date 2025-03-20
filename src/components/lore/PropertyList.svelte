<script lang="ts">
	import { _ } from 'svelte-i18n';
	import PropertyCard from './PropertyCard.svelte';
	import LoreLink from './interactive/LoreLink.svelte';

	interface PropertyBase {
		title: string;
	}

	type Property = PropertyBase &
		(
			| {
					type: 'text';
					value: string | number;
			  }
			| {
					type: 'link';
					bookMode: boolean;
					targets: Array<string>;
			  }
		);

	export let properties: Array<Property>;
</script>

<ul>
	{#each properties as property}
		<li>
			<PropertyCard title={property.title}>
				{#if property.type === 'text'}
					{typeof property.value === 'string' ? $_(property.value) : property.value}
				{:else if property.type === 'link'}
					{#each property.targets as target}
						<div><LoreLink {target} bookMode={property.bookMode} /></div>
					{/each}
				{/if}
			</PropertyCard>
		</li>
	{/each}
</ul>

<style>
	ul {
		padding: 0;
		list-style: none;
		display: flex;
	}
</style>
