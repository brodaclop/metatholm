<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { RuleLabels } from '../../model/Rules';
	import Box from '../character/Box.svelte';
	import MarkdownText from './renderers/MarkdownText.svelte';
	export let id: RuleLabels;
</script>

<Box background="white">
	<span slot="title">{$_('label:rule')}: {$_(id)}</span>
	<MarkdownText text={$_(`description:${id}`)} />
</Box>
