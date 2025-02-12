<script lang="ts">
	interface Heading {
		title: string;
		id: string | null;
		level: number;
		subheadings: Array<Heading>;
		parent?: Heading;
	}

	export let heading: Heading;
	export let highlights: Array<string>;
</script>

<ol>
	{#each heading.subheadings as sub}
		<li>
			<a
				class:highlighted={sub.id && highlights.includes(sub.id)}
				href="#{sub.id}"
				title={sub.title}>{sub.title}</a
			>
			<svelte:self heading={sub} {highlights} />
		</li>
	{/each}
</ol>

<style>
	.highlighted {
		background-color: var(--toc-highlight-c);
		transition: background-color 0.5s ease-in-out;
	}
</style>
