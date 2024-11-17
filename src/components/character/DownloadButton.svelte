<script lang="ts">
	import { _ } from 'svelte-i18n';
	import IconButton from '../elements/IconButton.svelte';

	export let title: string;
	export let href: string;
	export let download: string;
	export let disabled: boolean = false;
</script>

<IconButton
	{disabled}
	withText
	title={$_(title)}
	on:click={() => {
		const a = document.createElement('a');
		a.href = href;
		a.download = download;
		document.documentElement.appendChild(a);
		try {
			a.click();
		} finally {
			document.documentElement.removeChild(a);
		}
	}}
>
	<slot />
</IconButton>
