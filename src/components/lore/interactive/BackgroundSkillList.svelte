<script lang="ts">
	import { Background } from '../../../model/Background';
	import Skills from '../../character/Skills.svelte';

	export let id: Background;

	$: info = Background.get(id);
</script>

{#if info}
	<Skills skills={info.skills} />
{/if}
