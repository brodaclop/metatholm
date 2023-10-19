<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Ability } from '../../../model/Abilities';
	import { Skill } from '../../../model/Skills';
	import { Background } from '../../../model/Background';
	import Box from '../../character/Box.svelte';
	import Skills from '../../character/Skills.svelte';

	export let background: Background;

	$: info = Background.get(background);

	$: console.log('info', info);
</script>

<Box title={$_('character:skills')} background="#ffddff">
	{#if info}
		<Skills skills={info.skills} />
	{/if}
</Box>
