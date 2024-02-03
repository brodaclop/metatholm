<script lang="ts">
	import { date as df } from 'svelte-i18n';

	export let date: string;
</script>

<span
	>{$df(new Date(date), {
		month: 'numeric',
		day: 'numeric',
		year: 'numeric'
	})}</span
>
