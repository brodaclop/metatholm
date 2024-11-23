<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { v4 } from 'uuid';
	export let showModal: boolean; // boolean
	import { createEventDispatcher } from 'svelte';
	import type { Armour } from '../../model/Armour';
	import { ARMOUR_LIST } from '../../model/ArmourList';
	import DialogBox from '../elements/DialogBox.svelte';

	const dispatch = createEventDispatcher();

	export let armour: Armour | undefined;
	export let close: () => void;

	let editedArmour: Armour = {
		id: v4(),
		name: '',
		dr: 0,
		hindrance: 0
	};

	let armourInitialised: boolean = false;

	$: if (!showModal) {
		armourInitialised = false;
	}

	$: {
		if (showModal && !armourInitialised) {
			editedArmour = armour
				? { ...armour }
				: {
						id: v4(),
						name: '',
						dr: 0,
						hindrance: 0
				  };
			armourInitialised = true;
		}
	}

	const submit = () => {
		dispatch('submit', editedArmour);
		close();
	};

	let template: Armour | null = null;

	const templateSelected = () => {
		if (template) {
			const id = editedArmour.id ?? v4();
			editedArmour = JSON.parse(JSON.stringify(template));
			editedArmour.id = id;
			template = null;
		}
	};
</script>

<DialogBox title="label:armour" flavour="inventory" {close} {showModal}>
	<table>
		<tbody>
			<tr>
				<td colspan="2">
					<select bind:value={template} on:change={templateSelected}>
						<option value={null}>Select template</option>
						{#each ARMOUR_LIST as tw}
							<option value={tw}>{tw.name}</option>
						{/each}
					</select>
				</td>
			</tr>
			<tr>
				<th>{$_('label:name')}</th>
				<td><input type="text" bind:value={editedArmour.name} /></td>
			</tr>
			<tr>
				<th>{$_('armour:dr')}</th>
				<td><input type="number" min="0" max="10" bind:value={editedArmour.dr} /></td>
			</tr>
			<tr>
				<th>{$_('armour:hindrance')}</th>
				<td><input type="number" min="0" max="10" bind:value={editedArmour.hindrance} /></td>
			</tr>
		</tbody>
		<caption><button on:click={submit}>OK</button></caption>
	</table>
</DialogBox>

<style>
	caption {
		caption-side: bottom;
		text-align: center;
	}
</style>
