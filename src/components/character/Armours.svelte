<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Character } from '../../model/Karakter';
	import GiShoulderArmor from 'svelte-icons/gi/GiShoulderArmor.svelte';
	import IconButton from '../elements/IconButton.svelte';
	import GiSwordSmithing from 'svelte-icons/gi/GiSwordSmithing.svelte';
	import type { Armour } from '../../model/Armour';
	import ArmourEditor from './ArmourEditor.svelte';
	import DeleteButton from '../elements/DeleteButton.svelte';
	import EditButton from '../elements/EditButton.svelte';

	export let character: Character;

	let editedArmour: Armour | 'new' | undefined;

	const submit = (e: CustomEvent<Armour>) => {
		const armour = e.detail;
		const idx = character.inventory.armours.findIndex((a) => a.id === armour.id);
		if (idx === -1) {
			character.inventory.armours = [...character.inventory.armours, armour];
		} else {
			character.inventory.armours[idx] = armour;
		}
	};

	const remove = (armour: Armour) => {
		const idx = character.inventory.armours.findIndex((a) => a.id === armour.id);
		if (idx === -1) {
			return;
		}
		if (character.current.armourWorn !== undefined) {
			if (character.current.armourWorn > idx) {
				character.current.armourWorn--;
			} else if (character.current.armourWorn === idx) {
				delete character.current.armourWorn;
			}
		}
		character.inventory.armours.splice(idx, 1);
		character = character; // refresh screen
	};
</script>

<table>
	<thead>
		<tr>
			<th>{$_('label:name')}</th>
			<th>{$_('armour:dr')}</th>
			<th>{$_('armour:hindrance')}</th>
			<th />
		</tr>
	</thead>
	<tbody>
		{#each character.inventory.armours as armour, idx}
			<tr>
				<td>{armour.name}</td>
				<td>{armour.dr}</td>
				<td>{armour.hindrance}</td>
				<td>
					<IconButton
						title="label:wear"
						color={character.current.armourWorn === idx ? 'black' : 'lightgrey'}
						on:click={() =>
							(character.current.armourWorn =
								character.current.armourWorn === idx ? undefined : idx)}
						><GiShoulderArmor /></IconButton
					>
					<EditButton on:click={() => (editedArmour = armour)} />

					<DeleteButton on:click={() => remove(armour)} /></td
				>
			</tr>
		{/each}
	</tbody>
	<caption>
		<IconButton
			title="label:new"
			on:click={() => {
				editedArmour = 'new';
			}}><GiSwordSmithing /></IconButton
		></caption
	>
</table>

<ArmourEditor
	armour={editedArmour !== 'new' ? editedArmour : undefined}
	showModal={editedArmour !== undefined}
	close={() => (editedArmour = undefined)}
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
