<script lang="ts">
	interface Heading {
		title: string;
		id: string | null;
		level: number;
		subheadings: Array<Heading>;
		parent?: Heading;
	}

	export let heading: Heading;
</script>

<ol>
	{#each heading.subheadings as sub}
		<li>
			<a href="#{sub.id}" title={sub.title}>{sub.title}</a>
			<svelte:self heading={sub} />
		</li>
	{/each}
</ol>
