<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { calculateUnarmed, type Character } from '../../model/Karakter';
	import WeaponEditor from './WeaponEditor.svelte';
	import type { Weapon } from '../../model/Weapon';
	import IconButton from '../elements/IconButton.svelte';
	import GiSwordSmithing from 'svelte-icons/gi/GiSwordSmithing.svelte';
	import DeleteButton from '../elements/DeleteButton.svelte';
	import EditButton from '../elements/EditButton.svelte';

	export let character: Character;

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

<table>
	<thead>
		<tr>
			<th>{$_('label:name')}</th>
			<th>{$_('weapon:speed')}</th>
			<th>{$_('weapon:attack')}</th>
			<th>{$_('weapon:defence')}</th>
			<th>{$_('label:damage')}</th>
			<th>{$_('weapon:reach')}</th>
			<th>{$_('weapon:skill')}</th>
			<th />
		</tr>
	</thead>
	<tbody>
		{#each calculateUnarmed(character.skills) as weapon}
			<tr>
				<td>{$_(weapon.name)}</td>
				<td>{weapon.speed}</td>
				<td>{weapon.attack}</td>
				<td>{weapon.defence}</td>
				<td>{weapon.damage}</td>
				<td>{weapon.reach}</td>
				<td>{$_(weapon.skill)}</td>
				<td />
			</tr>
		{/each}
		{#each character.inventory.weapons as weapon}
			<tr>
				<td>{weapon.name}</td>
				<td>{weapon.speed}</td>
				<td>{weapon.attack}</td>
				<td>{weapon.defence}</td>
				<td>{weapon.damage}</td>
				<td>{weapon.reach}</td>
				<td>{$_(weapon.skill)}</td>
				<td>
					<EditButton on:click={() => (editedWeapon = weapon)} />
					<DeleteButton on:click={() => remove(weapon)} />
				</td>
			</tr>
		{/each}
	</tbody>
	<caption>
		<IconButton
			title="label:new"
			on:click={() => {
				editedWeapon = 'new';
			}}><GiSwordSmithing /></IconButton
		></caption
	>
</table>

<WeaponEditor
	weapon={editedWeapon !== 'new' ? editedWeapon : undefined}
	showModal={editedWeapon !== undefined}
	close={() => (editedWeapon = undefined)}
	on:submit={submit}
/>

<style>
	th {
		text-align: left;
	}

	caption {
		caption-side: bottom;
		text-align: center;
	}
</style>
