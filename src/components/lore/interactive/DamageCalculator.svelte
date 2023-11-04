<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Circles from '../../elements/Circles.svelte';
	import FixedDiceRoller from '../FixedDiceRoller.svelte';

	let damage = 1;
</script>

<table>
	<tbody>
		<Circles
			name="label:damage"
			bind:value={damage}
			subName={String(damage)}
			max={20}
			min={1}
			editable
		/>
	</tbody>
	<tbody>
		<tr>
			<td colspan="3">
				<FixedDiceRoller roll="{damage}d5!" />
			</td>
		</tr>
	</tbody>
</table>

<style>
	table {
		caption-side: bottom;
	}

	caption {
		font-weight: bold;
		font-size: x-large;
	}
</style>
