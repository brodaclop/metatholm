<script lang="ts">
	import { Labels_en } from '../../../model/Labels';

	export let href: string = '';
	export let title: string | undefined = undefined;

	$: effectiveHref = href in Labels_en ? `/lore/${href}` : href;
</script>

<a href={effectiveHref} {title}><slot /></a>
