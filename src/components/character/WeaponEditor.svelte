<script lang="ts">
	import { _, unwrapFunctionStore } from 'svelte-i18n';
	import Box from './Box.svelte';
	import type { Weapon } from '../../model/Weapon';
	import { v4 } from 'uuid';
	import { Skill } from '../../model/Skills';
	export let showModal: boolean; // boolean
	import { createEventDispatcher } from 'svelte';
	import { WEAPON_ACTIONS } from "../../model/calculations/WeaponAction";

	const dispatch = createEventDispatcher();
	let dialog: HTMLDialogElement; // HTMLDialogElement

	const labels = unwrapFunctionStore(_);

	$: if (dialog && showModal) dialog.showModal();

	export let weapon: Weapon | undefined;
	export let close: () => void;

	let editedWeapon: Weapon = {
		id: v4(),
		name: '',
		attack: 0,
		damage: 0,
		defence: 0,
		reach: 0,
		speed: 0,
		skill: 'skill:knives',
		actions: {}
	};

	let weaponInitialised: boolean = false;

	$: if (!showModal) {
		weaponInitialised = false;
	}

	$: {
		if (showModal && !weaponInitialised) {
			editedWeapon = weapon
				? { ...weapon }
				: {
						id: v4(),
						name: '',
						attack: 0,
						damage: 0,
						defence: 0,
						reach: 0,
						speed: 0,
						skill: 'skill:knives',
						actions: {}
				  };
			weaponInitialised = true;
		}
	}

	const submit = () => {
		dispatch('submit', editedWeapon);
		dialog.close();
	};
</script>

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
	<div class="content" on:click|stopPropagation>
		<Box title={$_('label:weapon')} background={'#eeffee'}>
			<table>
				<tbody>
					<tr>
						<th>{$_('label:name')}</th>
						<td><input type="text" bind:value={editedWeapon.name} /></td>
					</tr>
					<tr>
						<th>{$_('weapon:speed')}</th>
						<td><input type="number" min="0" max="10" bind:value={editedWeapon.speed} /></td>
					</tr>
					<tr>
						<th>{$_('weapon:attack')}</th>
						<td><input type="number" min="0" max="10" bind:value={editedWeapon.attack} /></td>
					</tr>
					<tr>
						<th>{$_('weapon:defence')}</th>
						<td><input type="number" min="0" max="10" bind:value={editedWeapon.defence} /></td>
					</tr>
					<tr>
						<th>{$_('label:damage')}</th>
						<td><input type="number" min="0" max="10" bind:value={editedWeapon.damage} /></td>
					</tr>
					<tr>
						<th>{$_('weapon:reach')}</th>
						<td><input type="number" min="0" max="10" bind:value={editedWeapon.reach} /></td>
					</tr>
					<tr>
						<th>{$_('weapon:skill')}</th>
						<td
							><select bind:value={editedWeapon.skill}>
								{#each Skill.list().filter((s) => s.type === 'skill_type:combat') as s}
									<option value={s.name}>{$_(s.name)}</option>
								{/each}
							</select></td
						>
					</tr>
					<tr>
						<th>{$_('action:title')}</th>
						<td>
							<table>
								<tbody>
									{#each WEAPON_ACTIONS as action}
									<tr>
										<th>{$_(action)}</th>
										<td>
											<input type="number" disabled={!(action in editedWeapon.actions)} bind:value={editedWeapon.actions[action]}/>
											<input type="checkbox" checked={action in editedWeapon.actions} on:change={e => {
												if (action in editedWeapon.actions) {
													delete editedWeapon.actions[action];
													editedWeapon = editedWeapon;
												} else {
													editedWeapon.actions[action] = 0;
												}
											}}/>
										</td>
									</tr>
								{/each}
		
								</tbody>								
							</table>
					</td>
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
