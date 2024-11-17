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
	import Abbr from '../Abbr.svelte';

	export let character: Character;
	export let editable: boolean;

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

	//TODO: templates and i18n
</script>

<table class="standard wide">
	<thead>
		<tr>
			<th><Abbr text="label:name" /></th>
			<th><Abbr text="armour:dr" /></th>
			<th><Abbr text="armour:hindrance" /></th>
			<th />
		</tr>
	</thead>
	<tbody>
		{#each character.inventory.armours as armour, idx}
			<tr>
				<td class="ellipsis" title={$_(armour.name)}>{$_(armour.name)}</td>
				<td>{armour.dr}</td>
				<td>{armour.hindrance}</td>
				<td class="right">
					<IconButton
						title="label:wear"
						color={character.current.armourWorn === idx ? 'black' : 'lightgrey'}
						on:click={() =>
							(character.current.armourWorn =
								character.current.armourWorn === idx ? undefined : idx)}
						><GiShoulderArmor /></IconButton
					>
					{#if editable}
						<EditButton on:click={() => (editedArmour = armour)} />

						<DeleteButton on:click={() => remove(armour)} />
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
	<caption>
		{#if editable}
			<IconButton
				withText
				title="label:new"
				verticalCorrection="-1px"
				on:click={() => {
					editedArmour = 'new';
				}}><GiSwordSmithing /></IconButton
			>
		{/if}
	</caption>
</table>

<ArmourEditor
	armour={editedArmour !== 'new' ? editedArmour : undefined}
	showModal={editedArmour !== undefined}
	close={() => (editedArmour = undefined)}
	on:submit={submit}
/>

<style>
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

	td.ellipsis {
		max-width: 7rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
