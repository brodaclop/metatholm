<script lang="ts">
	import Lore from '../../components/lore/Lore.svelte';
	import { setContext } from 'svelte';

	setContext('bookMode', true);
</script>

<Lore id="main" />
