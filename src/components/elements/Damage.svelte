<script lang="ts">
	import Circle from './Circle.svelte';

	export let max: number = 10;
	export let selected: (value: number) => void;
	import MdFastRewind from 'svelte-icons/md/MdFastRewind.svelte';
	import MdFastForward from 'svelte-icons/md/MdFastForward.svelte';
	let page = 0;
</script>

<Circle status={page === 0 ? 'half' : 'active'} on:click={() => (page = Math.max(0, page - 1))}>
	<MdFastRewind />
</Circle>
{#each Array(max) as _, i}
	{@const value = page * max + i + 1}
	<Circle status="active" on:click={() => selected(value)} clickable>
		<span>
			{value}
		</span>
	</Circle>
{/each}
<Circle status="active" on:click={() => (page = page + 1)}>
	<MdFastForward />
</Circle>
