<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Background } from '../../../model/Background';
	import Box from '../../elements/Box.svelte';
	import Skills from '../../character/Skills.svelte';

	export let id: Background;

	$: info = Background.get(id);
</script>

<Box title={$_('character:skills')} flavour="skills">
	{#if info}
		<Skills skills={info.skills} />
	{/if}
</Box>
