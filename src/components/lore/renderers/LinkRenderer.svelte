<script lang="ts">
	export let href: string = '';
	export let title: string | undefined = undefined;

	$: effectiveHref = `/lore/${href}`;
</script>

<a href={effectiveHref} {title}><slot /></a>
