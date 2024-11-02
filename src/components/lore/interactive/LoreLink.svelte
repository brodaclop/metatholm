<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let target: string;
</script>

<a href="/lore/{target}">{$_(target)}</a>
