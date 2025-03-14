<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import Box from '../elements/Box.svelte';
	import type { Weapon } from '../../model/Weapon';
	import { v4 } from 'uuid';
	import { Skill, WEAPON_MULTIPLIERS } from '../../model/Skills';
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
	import BasicValues from './weaponeditor/BasicValues.svelte';

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
		actions: {},
		enchantment: {}
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
						actions: {},
						enchantment: {}
				  };
			weaponInitialised = true;
		}
	}

	const submit = () => {
		dispatch('submit', editedWeapon);
		close();
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
		.filter(([key, value]) => value.weapon && !value.noRoll)
		.map(([key]) => key)
		.sort((a, z) => $_(a).localeCompare($_(z)));

	$: langKey = ($locale ?? 'en') as 'hu' | 'en';

	let openLore: string | undefined;

	$: multipliers = WEAPON_MULTIPLIERS[editedWeapon.skill];

	$: power = calculateWeaponPower(editedWeapon);

	const BASIC_VALUES: Array<keyof Weapon['enchantment']> = ['speed', 'attack', 'defence', 'damage'];
</script>

<DialogBox title="label:weapon" flavour="inventory" bind:showModal {close}>
	{#if !openLore}
		<div class="horizontal-group">
			<div>
				<select bind:value={template} on:change={templateSelected}>
					<option disabled value={null}>--- {$_('label:weapon:select_template')} ---</option>
					{#each WEAPON_LIST as tw}
						<option value={tw}
							>{WEAPON_NAMES_LIST[tw.name][langKey]} ({calculateWeaponPower(tw)})</option
						>
					{/each}
				</select>
			</div>
			<span>
				<IconButton title="label:paste">
					<MdContentPaste />
				</IconButton>
				<input type="text" bind:value={pasted} placeholder={$_('label:weapon:paste_here')} />
			</span>
		</div>
		<div class="horizontal-group">
			<div class="rows">
				<h3>{$_('weapon:base_values')}</h3>
				<div class="row">
					<span>{$_('label:name')}</span>
					<span><input type="text" bind:value={editedWeapon.name} /></span>
				</div>
				<div class="row">
					<span>{$_('weapon:skill')}</span>
					<span
						><select bind:value={editedWeapon.skill}>
							{#each Skill.list().filter((s) => s.type === 'skill_type:combat') as s}
								<option value={s.name}>{$_(s.name)}</option>
							{/each}
						</select></span
					>
				</div>
				{#each BASIC_VALUES as value}
					<div class="row">
						<BasicValues bind:editedWeapon {multipliers} {value} />
					</div>
				{/each}
				<div class="row">
					<span>{$_('weapon:reach')}</span>
					<span><input type="number" min="0" max="10" bind:value={editedWeapon.reach} /></span>
				</div>
				<div class="row">
					<span>{$_('weapon:hands')}</span>
					<span
						><select bind:value={editedWeapon.hands}>
							{#each [0.5, 1, 1.5, 2] as s}
								<option value={s}>{s}</option>
							{/each}
						</select></span
					>
				</div>
				<div class="row">
					<span>{$_('weapon:power')}</span>
					<span>{power}</span>
				</div>
			</div>

			<div class="rows">
				<h3>
					{$_('action:title')}
				</h3>
				{#each WEAPON_VARIANTS as action, i}
					<div class="row">
						<span class="header">
							<LoreInfoIcon
								id={action}
								inline
								on:click={() => (openLore = openLore === undefined ? action : undefined)}
							/>
							{$_(action)}
						</span>
						<span class="value">
							<input
								alt={$_('label:skill_modifier')}
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
						</span>
					</div>
				{/each}
			</div>
		</div>
		<div class="notes">
			<Box title="label:notes" flavour="notes" grow={1}>
				<div class="noteDiv">
					<textarea bind:value={editedWeapon.notes} />
				</div>
			</Box>
		</div>
		<div class="button"><button on:click={submit}>OK</button></div>
	{:else}
		<button on:click={() => (openLore = undefined)}>{$_('label:back_to_editor')}</button>
		<Lore id={openLore} />
	{/if}
</DialogBox>

<style>
	div.row > span:nth-child(1) {
		font-weight: bold;
		padding-right: 0.5em;
	}

	.horizontal-group {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
	}

	.horizontal-group > * {
		margin-left: 1em;
		margin-right: 1em;
	}

	input[type='number'] {
		width: 3em;
	}

	div.rows {
		display: flex;
		flex-direction: column;
	}

	div.row {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		text-align: left;
		margin-bottom: 1px;
	}

	div.row > * {
		white-space: nowrap;
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
</style>
