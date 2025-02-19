<script lang="ts">
	import { page } from '$app/stores';
	import Lore from '../../../components/lore/Lore.svelte';

	$: id = $page.params.id ?? '';
</script>

<div>
	<Lore {id} />
</div>

<style>
	div {
		margin: 0.5em;
	}
</style>
