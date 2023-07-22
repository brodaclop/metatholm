<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { RuleLabels } from '../../model/Rules';
	import SvelteMarkdown from 'svelte-markdown';
	import Box from '../character/Box.svelte';
	import ActiveElementRenderer from './ActiveElementRenderer.svelte';
	export let rule: RuleLabels;
</script>

<Box background="white">
	<span slot="title">{$_('label:rule')}: {$_(rule)}</span>
	<SvelteMarkdown
		source={$_(`description:${rule}`)}
		renderers={{
			codespan: ActiveElementRenderer
		}}
	/>
</Box>
