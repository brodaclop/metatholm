<script lang="ts">
	import IconButton from './IconButton.svelte';
	import MdDelete from 'svelte-icons/md/MdDelete.svelte';
	export let disabled = false;
	export let withText = false;
</script>

<IconButton title="label:delete" color="var(--delete-icon-c)" on:click {disabled} {withText}
	><MdDelete /></IconButton
>
