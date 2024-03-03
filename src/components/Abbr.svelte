<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Labels } from '../model/Labels';

	export let text: Labels;
</script>

<span title={$_(text)}>{$_(`${text}:abbr`)}</span>
