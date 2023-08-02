<script lang="ts">
	import { page } from '$app/stores';
	import Lore from '../../../components/lore/Lore.svelte';

	$: id = $page.params.id ?? '';
</script>

<Lore {id} />
