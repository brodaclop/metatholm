<script lang="ts">
	import { _, unwrapFunctionStore } from 'svelte-i18n';
	import Box from './Box.svelte';
	import type { Weapon } from '../../model/Weapon';
	import { v4 } from 'uuid';
	import { Skill } from '../../model/Skills';
	export let showModal: boolean; // boolean
	import { createEventDispatcher } from 'svelte';
	import { WEAPON_LIST } from '../../model/WeaponList';
	import { entries } from '../../model/InfoList';
	import { ACTION_VARIANT_PROPERTIES } from '../../model/Action';
	import type { Armour } from '../../model/Armour';
	import { ARMOUR_LIST } from '../../model/ArmourList';

	const dispatch = createEventDispatcher();
	let dialog: HTMLDialogElement; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();

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
		dialog.close();
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

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => {
		showModal = false;
		close();
	}}
	on:click|self={() => dialog.close()}
	on:keypress={(e) => {
		if (e.key === 'Escape') {
			dialog.close();
		}
	}}
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="content" on:click|stopPropagation>
		<Box title={$_('label:armour')} background={'#eeffee'}>
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
		</Box>
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
		background: transparent;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	caption {
		caption-side: bottom;
		text-align: center;
	}
</style>
