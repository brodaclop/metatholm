<script lang="ts">
	import { _ } from 'svelte-i18n';
	import IconButton from '../elements/IconButton.svelte';

	export let title: string;
	export let disabled: boolean = false;
	export let onUpload: (contents: string) => void;

	const onchange = async (e: any) => {
		const files: FileList | null = (e.target as HTMLInputElement).files;
		const file = files?.[0];
		if (file) {
			onUpload(await file.text());
			e.target.value = '';
		}
	};
</script>

<IconButton
	title={$_(title)}
	withText
	{disabled}
	on:click={() => {
		const input = document.createElement('input');
		input.type = 'file';
		input.onchange = onchange;
		document.documentElement.appendChild(input);
		try {
			input.click();
		} finally {
			document.documentElement.removeChild(input);
		}
	}}
>
	<slot />
</IconButton>
