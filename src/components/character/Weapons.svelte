<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { calculateUnarmed, type Character } from '../../model/Karakter';
	import WeaponEditor from './WeaponEditor.svelte';
	import type { Weapon } from '../../model/Weapon';
	import IconButton from '../elements/IconButton.svelte';
	import GiSwordSmithing from 'svelte-icons/gi/GiSwordSmithing.svelte';
	import MdContentCopy from 'svelte-icons/md/MdContentCopy.svelte';
	import DeleteButton from '../elements/DeleteButton.svelte';
	import EditButton from '../elements/EditButton.svelte';
	import Abbr from '../Abbr.svelte';
	import SkillIcon from './SkillIcon.svelte';
	import { calculateWeaponPower } from '../../model/calculations/WeaponPower';
	import Box from '../elements/Box.svelte';

	export let character: Character;
	export let editable: boolean;

	let editedWeapon: Weapon | 'new' | undefined;

	const submit = (e: CustomEvent<Weapon>) => {
		const weapon = e.detail;
		const idx = character.inventory.weapons.findIndex((w) => w.id === weapon.id);
		if (idx === -1) {
			character.inventory.weapons = [...character.inventory.weapons, weapon];
		} else {
			character.inventory.weapons[idx] = weapon;
		}
	};

	const remove = (weapon: Weapon) => {
		character.inventory.weapons = character.inventory.weapons.filter((w) => w.id !== weapon.id);
	};
</script>

<Box flavour="inventory" title="character:weapons">
	<table class="standard wide">
		<thead>
			<tr>
				<th><Abbr text="label:name" /></th>
				<th><Abbr text="weapon:speed" /></th>
				<th><Abbr text="weapon:attack" /></th>
				<th><Abbr text="weapon:defence" /></th>
				<th><Abbr text="weapon:damage" /></th>
				<th><Abbr text="weapon:reach" /></th>
				<th><Abbr text="weapon:hands" /></th>
				<th><Abbr text="weapon:skill" /></th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#each calculateUnarmed(character.skills) as weapon}
				<tr>
					<td class="ellipsis" title={$_(weapon.name)}>{$_(weapon.name)}</td>
					<td>{weapon.speed}</td>
					<td>{weapon.attack}</td>
					<td>{weapon.defence}</td>
					<td>{weapon.damage}</td>
					<td>{weapon.reach}</td>
					<td>{weapon.hands}</td>
					<td>
						<div class="skill-icon">
							<SkillIcon skill={weapon.skill} />
						</div>
					</td>
					<td />
				</tr>
			{/each}
			{#each character.inventory.weapons as weapon}
				<tr>
					<td
						class="ellipsis"
						title={`${$_(weapon.name)} (${calculateWeaponPower(weapon)})${
							weapon.notes ? '\n\n' + weapon.notes : ''
						}`}>{$_(weapon.name)}</td
					>
					<td>{weapon.speed}</td>
					<td>{weapon.attack}</td>
					<td>{weapon.defence}</td>
					<td>{weapon.damage}</td>
					<td>{weapon.reach}</td>
					<td>{weapon.hands}</td>
					<td>
						<div class="skill-icon">
							<SkillIcon skill={weapon.skill} />
						</div>
					</td>
					<td class="right">
						<IconButton
							title="label:copy"
							on:click={() =>
								navigator.clipboard.writeText(JSON.stringify({ ...weapon, id: undefined }))}
						>
							<MdContentCopy />
						</IconButton>
						{#if editable}
							<EditButton on:click={() => (editedWeapon = weapon)} />
							<DeleteButton on:click={() => remove(weapon)} />
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
		<caption>
			{#if editable}
				<IconButton
					withText
					verticalCorrection="-1px"
					title="label:new"
					on:click={() => {
						editedWeapon = 'new';
					}}><GiSwordSmithing /></IconButton
				>
			{/if}
		</caption>
	</table>
</Box>

<WeaponEditor
	weapon={editedWeapon !== 'new' ? editedWeapon : undefined}
	showModal={editedWeapon !== undefined}
	close={() => (editedWeapon = undefined)}
	on:submit={submit}
/>

<style>
	.skill-icon {
		color: var(--actioncard-skill-icon-c);
		width: 1em;
		display: inline-block;
		vertical-align: middle;
	}

	th,
	td {
		text-align: left;
		padding-right: 0.25rem;
	}

	caption {
		caption-side: bottom;
		text-align: center;
		padding-top: 0.5em;
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	td.ellipsis {
		max-width: 7rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
