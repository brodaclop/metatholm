<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Ancestry } from '../../../model/Ancestry';
	import { entries, keys } from '../../../model/InfoList';
	import Box from '../../elements/Box.svelte';
	import { Background } from '../../../model/Background';
	import CircleGroup from '../../elements/CircleGroup.svelte';

	export let id: Ancestry | Background | undefined = undefined;
	$: abilities = (
		Ancestry.has(id)
			? Ancestry.get(id)
			: Background.has(id)
			? Background.get(id)
			: { abilities: {} }
	).abilities;
</script>

<Box title={$_('character:abilities')} flavour="abilities">
	<table>
		<CircleGroup
			max={10}
			editable={false}
			rows={keys(abilities)}
			values={Object.fromEntries(entries(abilities).map(([a, n]) => [a, n < 0 ? -n : 0]))}
			newValues={abilities}
		/>
	</table>
</Box>
