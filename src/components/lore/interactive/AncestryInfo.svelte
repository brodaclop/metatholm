<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Ancestry } from '../../../model/Ancestry';
	import { entries } from '../../../model/InfoList';
	import Box from '../../character/Box.svelte';

	export let ancestry: Ancestry;
	const ancestryInfo = Ancestry.get(ancestry);
</script>

<Box title={$_('character:abilities')} background={'#eeeeff'}>
	<table>
		<tbody>
			{#each entries(ancestryInfo.abilities) as [ability, modifier]}
				<tr>
					<th>{$_(ability)}</th>
					<td>{modifier}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</Box>
