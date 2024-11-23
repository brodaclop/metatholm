<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import Box from '../elements/Box.svelte';
	import type { Weapon } from '../../model/Weapon';
	import { v4 } from 'uuid';
	import { Skill } from '../../model/Skills';
	import { createEventDispatcher } from 'svelte';
	import { WEAPON_LIST, WEAPON_NAMES_LIST } from '../../model/WeaponList';
	import { entries } from '../../model/InfoList';
	import { ACTION_VARIANT_PROPERTIES } from '../../model/Action';
	import MdContentPaste from 'svelte-icons/md/MdContentPaste.svelte';
	import IconButton from '../elements/IconButton.svelte';
	import { calculateWeaponPower } from '../../model/calculations/WeaponPower';
	import LoreInfoIcon from '../LoreInfoIcon.svelte';
	import Lore from '../lore/Lore.svelte';
	import DialogBox from '../elements/DialogBox.svelte';

	export let showModal: boolean; // boolean
	const dispatch = createEventDispatcher();

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
		hands: 1,
		skill: 'skill:knives',
		notes: '',
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
						hands: 1,
						skill: 'skill:knives',
						notes: '',
						actions: {}
				  };
			weaponInitialised = true;
		}
	}

	const submit = () => {
		dispatch('submit', editedWeapon);
	};

	$: console.log('WEAPON POWER', editedWeapon.name, calculateWeaponPower(editedWeapon));

	let template: Weapon | null = null;

	const templateSelected = () => {
		if (template) {
			const id = editedWeapon.id ?? v4();
			editedWeapon = JSON.parse(JSON.stringify(template));
			editedWeapon.id = id;
			editedWeapon.name = WEAPON_NAMES_LIST[template.name as never][langKey];
			template = null;
		}
	};

	let pasted: string = '';
	$: if (pasted) {
		try {
			const pastedWeapon = JSON.parse(pasted);
			//TODO: validate format
			editedWeapon = { ...pastedWeapon, id: v4() };
		} catch (e) {
			console.debug('Invalid weapon descriptor', e);
		}
		pasted = '';
	}

	const WEAPON_VARIANTS = entries(ACTION_VARIANT_PROPERTIES)
		.filter(([key, value]) => value.weapon)
		.map(([key]) => key);

	$: langKey = ($locale ?? 'en') as 'hu' | 'en';

	let openLore: string | undefined;
</script>

<DialogBox title="label:weapon" flavour="inventory" bind:showModal {close}>
	<table>
		<colgroup>
			<col style:width="30em" />
			<col />
		</colgroup>
		<tbody>
			<tr>
				<td>
					<div class="first">
						<select bind:value={template} on:change={templateSelected}>
							<option disabled value={null}>--- {$_('label:weapon:select_template')} ---</option>
							{#each WEAPON_LIST as tw}
								<option value={tw}
									>{WEAPON_NAMES_LIST[tw.name][langKey]} ({calculateWeaponPower(tw)})</option
								>
							{/each}
						</select>
						<IconButton title="label:paste">
							<MdContentPaste />
						</IconButton>
					</div>
				</td>
				<td>
					<input type="text" bind:value={pasted} placeholder={$_('label:weapon:paste_here')} />
				</td>
			</tr>
		</tbody><tbody>
			<tr>
				<th>{$_('label:name')}</th>
				<td><input type="text" bind:value={editedWeapon.name} /></td>
			</tr>
			<tr>
				<th>{$_('weapon:speed')}</th>
				<td><input type="number" min="0" max="20" bind:value={editedWeapon.speed} /></td>
			</tr>
			<tr>
				<th>{$_('weapon:attack')}</th>
				<td><input type="number" min="0" max="20" bind:value={editedWeapon.attack} /></td>
			</tr>
			<tr>
				<th>{$_('weapon:defence')}</th>
				<td><input type="number" min="0" max="20" bind:value={editedWeapon.defence} /></td>
			</tr>
			<tr>
				<th>{$_('weapon:damage')}</th>
				<td><input type="number" min="0" max="20" bind:value={editedWeapon.damage} /></td>
			</tr>
			<tr>
				<th>{$_('weapon:reach')}</th>
				<td><input type="number" min="0" max="20" bind:value={editedWeapon.reach} /></td>
			</tr>
			<tr>
				<th>{$_('weapon:hands')}</th>
				<td
					><select bind:value={editedWeapon.hands}>
						{#each [0.5, 1, 1.5, 2] as s}
							<option value={s}>{s}</option>
						{/each}
					</select></td
				>
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
				<th>Weapon power</th>
				<td>{calculateWeaponPower(editedWeapon)}</td>
			</tr>
		</tbody><tbody>
			<tr>
				<th colspan="2" class="title">{$_('action:title')}</th>
			</tr>
			{#each WEAPON_VARIANTS as action, i}
				<tr>
					<th>
						<LoreInfoIcon
							id={action}
							inline
							on:click={() => (openLore = openLore === undefined ? action : undefined)}
						/>
						{$_(action)}
					</th>
					<td class="combined">
						<input
							type="number"
							disabled={!(action in editedWeapon.actions)}
							bind:value={editedWeapon.actions[action]}
						/>
						<input
							type="checkbox"
							checked={action in editedWeapon.actions}
							on:change={(e) => {
								if (action in editedWeapon.actions) {
									delete editedWeapon.actions[action];
									editedWeapon = editedWeapon;
								} else {
									editedWeapon.actions[action] = 0;
								}
							}}
						/>
					</td>
				</tr>
				{#if openLore === action}
					<tr>
						<td colspan="2">
							<Lore id={action} />
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
		<tbody>
			<tr>
				<td colspan={4}>
					<Box title="label:notes" flavour="notes" grow={1}>
						<div class="noteDiv">
							<textarea bind:value={editedWeapon.notes} />
						</div>
					</Box>
				</td>
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

	th {
		text-align: left;
		padding-right: 0.5rem;
	}

	th.title {
		font-size: large;
		text-align: center;
	}

	td.combined {
		white-space: collapse nowrap;
	}

	tbody {
		margin-bottom: 0.5rem;
		border-bottom: 3px solid var(--default-border-c);
	}

	div.noteDiv {
		width: 100%;
		display: flex;
	}

	textarea {
		flex-grow: 1;
		width: 100%;
		height: 10rem;
		resize: vertical;
	}
	.first {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
	}
</style>
