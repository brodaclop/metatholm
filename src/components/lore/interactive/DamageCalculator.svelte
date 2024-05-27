<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Circles from '../../elements/Circles.svelte';
	import FixedDiceRoller from '../FixedDiceRoller.svelte';
	import type { Weapon } from '../../../model/Weapon';

	let damage = 1;

	export let weapon: Weapon | undefined = undefined;

	$: if (weapon) {
		damage = weapon.damage;
	}
</script>

<table>
	<tbody>
		<Circles
			name="weapon:damage"
			bind:value={damage}
			subName={String(damage)}
			max={20}
			min={1}
			editable={!weapon}
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
		font-weight: var(--font-weight-bold);
		font-size: x-large;
	}
</style>
