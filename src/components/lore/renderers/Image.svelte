<script lang="ts">
	export let href = '';
	export let title: string | null | undefined = undefined;
	export let text = '';
</script>

<div>
	<img src={href} {title} alt={text} />
</div>

<style>
	img {
		max-width: 80%;
		border-width: 3px;
		border-style: inset;
		border-color: aqua;
		border-radius: 2px;
	}
</style>
