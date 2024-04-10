<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import ScenarioBox from '../scenario/ScenarioBox.svelte';
	import { VARAZSLAS_SCENARIO } from '../../../model/scenario/Scenario';

	export let id: string;

	$: fileName = `${id}-${$locale}.json`;
</script>

<ScenarioBox scenario={VARAZSLAS_SCENARIO} />
