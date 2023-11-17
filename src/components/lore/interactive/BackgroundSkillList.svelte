<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Background } from '../../../model/Background';
	import Box from '../../character/Box.svelte';
	import Skills from '../../character/Skills.svelte';

	export let background: Background;

	$: info = Background.get(background);
</script>

<Box title={$_('character:skills')} flavour="skills">
	{#if info}
		<Skills skills={info.skills} />
	{/if}
</Box>
